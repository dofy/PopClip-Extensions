import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as core from "../src/EmojiAppend.popclipext/core.ts";
const settings = { apiBaseUrl: "https://example.test/v1", apiKey: "test-only-key", model: "test-model", maxEmojis: "3" };
const reply = (content) => ({ choices: [{ message: { content } }] });
function loadModule(relativePath, modules, globals = {}) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2023,
    },
  }).outputText;
  const exports = {};
  runInNewContext(js, {
    exports,
    Error,
    URL,
    AbortSignal,
    fetch,
    require: (name) => {
      if (!(name in modules)) throw new Error(`Unexpected import ${name}`);
      return modules[name];
    },
    ...globals,
  });
  return exports.default ?? exports;
}

test("PopClip uses its XHR adapter, preserves clipboard and does not paste on failures", async () => {
  for (const outcome of ["success", "401", "timeout", "network", "invalid-json", "bad-output"]) {
    const pasted = [];
    class XHR {
      headers = {};
      open(method, url) {
        assert.equal(method, "POST");
        assert.equal(url, "https://example.test/v1/chat/completions");
      }
      setRequestHeader(key, value) {
        this.headers[key] = value;
      }
      send(body) {
        assert.equal(JSON.parse(body).model, "test-model");
        assert.equal(this.timeout, 30000);
        this.status = outcome === "401" ? 401 : 200;
        this.responseText =
          outcome === "invalid-json"
            ? "invalid"
            : JSON.stringify(reply(outcome === "bad-output" ? "new text 🎉" : "🎉"));
        queueMicrotask(() => {
          if (outcome === "timeout") this.ontimeout();
          else if (outcome === "network") this.onerror();
          else this.onload();
        });
      }
    }
    const api = loadModule("../src/EmojiAppend.popclipext/api.ts", { "./core": core }, { XMLHttpRequest: XHR });
    const extension = loadModule(
      "../src/EmojiAppend.popclipext/Main.ts",
      { "./core": core, "./api": api },
      {
        XMLHttpRequest: XHR,
        popclip: {
          pasteText: async (text, options) => pasted.push([text, options.restore]),
        },
      },
    );
    if (outcome === "success") {
      await extension.actions[0].code({ text: "你好\n" }, settings);
      assert.deepEqual(pasted, [["你好 🎉\n", true]]);
    } else {
      await assert.rejects(extension.actions[0].code({ text: "你好" }, settings));
      assert.deepEqual(pasted, []);
    }
  }
});
