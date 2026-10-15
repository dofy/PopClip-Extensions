# Emoji Append · Raycast 普通 Command

选中文字，按快捷键，自动在末尾添加 1～3 个应景 emoji 并替换选区。
这是普通 `no-view` 扩展命令，直接调用自定义 API，不使用 Raycast AI Command，也不要求 Raycast Pro。

## 安装和配置

保留整个仓库：Raycast 与 PopClip 共用 `../src/EmojiAppend.popclipext/core.ts`。
需要 Node.js 22.18+ 或 24+、pnpm 和 macOS Raycast。

```sh
cd Raycast
pnpm install --frozen-lockfile
pnpm dev
```

开发模式将扩展加入本机 Raycast。配置以下字段，然后在 Raycast 的扩展设置中给
**Append Contextual Emoji** 绑定一个未占用的全局快捷键（例如 ⌃⌥E）。

- API Base URL：支持 `https://api.openai.com/v1`、完整 `/chat/completions` 地址或裸域名（自动补 `/v1/chat/completions`）；自定义路径作为版本根路径。
- API Key：在 Raycast 的 password 设置字段填写，源码不保存密钥。
- Model：你所选服务支持 Chat Completions 的模型，默认 `gpt-4o-mini`。
- Maximum Emojis：数量上限 1、2 或 3；模型根据语境选择数量。

输入文字 → 选中要处理的内容 → 按快捷键 → 等待写回。未选中文字时会提示先选择。
不自动选择整个输入框，不读取剪贴板作为输入，不发送消息。
等待期间若应用或选中文字改变，改为复制结果并提示手动粘贴。
同一应用内相同文字的另一处选区无法靠文本比较区分，等待时请保持原选区。

## 行为和隐私

原文在本地保留，只让模型生成 emoji；包含解释或超过上限的结果会被拒绝。
保留文字、标点、空格和换行；emoji 插入在末尾空白之前。末尾已有的同样 emoji 不再重复添加。
写回的是纯文本，选区内的字体、颜色等富文本格式不保证保留。
剪贴板写入遵循 Raycast 的粘贴 API 行为。

每次执行会将选中文字发送到配置的 API；费用与数据处理规则取决于该服务。
远程 API 使用 HTTPS；本地 OpenAI-compatible 服务可使用 HTTP。
仅支持 Bearer Key + Chat Completions，不直接支持 Anthropic Messages、Responses API 或 Azure api-key 鉴权。
最多处理 12,000 个 UTF-16 字符，请求超时 30 秒；HTTP 错误提示不显示响应正文或密钥。

## 验证

```sh
pnpm test
pnpm lint
pnpm build
pnpm exec tsc --noEmit
```

测试使用模拟响应和本地 HTTP 服务，不访问真实付费 API。
PopClip 原生运行时可额外执行（将路径换成你的 PopClip.app）：

```sh
'/Applications/Setapp/PopClip.app/Contents/MacOS/PopClip' run ../src/EmojiAppend.popclipext/_test-runtime.ts testRuntime
```
