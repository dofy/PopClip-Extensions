import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const popclip = [
  "/Applications/Setapp/PopClip.app/Contents/MacOS/PopClip",
  "/Applications/PopClip.app/Contents/MacOS/PopClip",
].find(existsSync);

test(
  "PopClip native XHR completes local HTTP requests and rejects HTTP/JSON failures",
  { skip: !popclip },
  async () => {
    const captured = [];
    const server = createServer(async (req, res) => {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      captured.push({
        path: req.url,
        authorization: req.headers.authorization,
        body: JSON.parse(Buffer.concat(chunks).toString()),
      });
      if (captured.length === 2) {
        res.writeHead(429);
        res.end("sensitive-provider-detail");
      } else if (captured.length === 3) {
        res.end("not json");
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ choices: [{ message: { content: "🎉😮‍💨" } }] }));
      }
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const fixture = mkdtempSync(join(tmpdir(), "emoji-append-popclip-"));
    try {
      for (const file of ["core.ts", "api.ts"]) {
        writeFileSync(
          join(fixture, file),
          readFileSync(new URL(`../src/EmojiAppend.popclipext/${file}`, import.meta.url)),
        );
      }
      writeFileSync(
        join(fixture, "test.ts"),
        `
      import { requestAPI } from './api';
      import { prepareRequest, appendResponse } from './core';
      export async function testHTTP() {
        const request = prepareRequest('修好了\\n', { apiBaseUrl: 'http://127.0.0.1:${server.address().port}/v1', apiKey: 'test-only-key', model: 'test-model', maxEmojis: '3' });
        const data = await requestAPI(request);
        if (appendResponse('修好了\\n', data, 3) !== '修好了 🎉😮‍💨\\n') throw new Error('Bad result');
        try { await requestAPI(request); throw new Error('Accepted 429'); }
        catch (error) { if (!error.message.includes('429')) throw error; }
        try { await requestAPI(request); throw new Error('Accepted malformed JSON'); }
        catch (error) { if (!error.message.includes('JSON')) throw error; }
        return 'POPCLIP_HTTP_PASSED';
      }
    `,
      );
      const { stdout, stderr } = await promisify(execFile)(popclip, ["run", "test.ts", "testHTTP"], {
        cwd: fixture,
        timeout: 15000,
      });
      assert.match(stdout + stderr, /POPCLIP_HTTP_PASSED/);
      assert.doesNotMatch(stdout + stderr, /sensitive-provider-detail/);
      assert.equal(captured.length, 3);
      for (const request of captured) {
        assert.equal(request.path, "/v1/chat/completions");
        assert.equal(request.authorization, "Bearer test-only-key");
        assert.equal(request.body.model, "test-model");
        assert.equal(request.body.messages[1].content, "修好了\n");
      }
    } finally {
      rmSync(fixture, { recursive: true, force: true });
      server.close();
      await once(server, "close");
    }
  },
);
