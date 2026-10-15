# 应景 Emoji · Emoji Append

选中输入框中的文字，点击单色线条笑脸图标，在末尾添加 1～3 个应景 emoji 并替换选区。
与本仓库 `Raycast/` 的普通命令共用 API 请求和 emoji 校验逻辑。

## 安装

```sh
./build.sh build EmojiAppend
```

执行 `./build.sh install EmojiAppend`，在 PopClip 中确认安装，然后填写下列选项。
安装脚本打开临时副本并保留 `dist/EmojiAppend.popclipextz`。直接打开安装包也能安装，
但 PopClip 会在安装后删除打开的 `.popclipextz` 文件。

- **API Base URL**：OpenAI-compatible 版本根地址，如 `https://api.openai.com/v1`，或完整 `/chat/completions` 地址。裸域名自动补 `/v1/chat/completions`。
- **API Key**：使用 `secret` 字段，保存在 macOS 钥匙串，不写入源文件。
- **模型**：服务支持的 Chat Completions 模型，默认 `gpt-4o-mini`。
- **Emoji 数量上限**：1、2 或 3，默认 3。

仅在可粘贴的文字选区显示。请在生成期间保持原输入框和选区，不要切换窗口或继续输入。
PopClip 没有在这里使用可重新读取实时选区的接口，因此不提供 Raycast 命令的选区变化检查。
无需 Raycast Pro。两端设置独立填写，不共享密钥。

## 行为和隐私

- 模型只生成 emoji，由本地代码拼接原文，保持文字、标点、空格和换行。
- Emoji 插入在末尾空白之前；末尾已有的相同 emoji 不重复添加。
- 无效响应、HTTP 错误或超时不会写回；不显示服务端原始错误正文或密钥。
- 写回为纯文本，不保证保留字体、颜色等富文本格式；粘贴后恢复原剪贴板。
- 每次执行会将选中文字发送到配置的 API，费用和数据规则取决于该服务。
- 远程服务使用 HTTPS，本地服务可用 HTTP；仅支持 Bearer Key + Chat Completions。
- 最多处理 12,000 个 UTF-16 字符，30 秒超时。需要 PopClip 2026.8（6159）或更新版本。

## 更新记录

- 2026-10-15（v2）：改用单色 SF Symbols 笑脸图标 `symbol:face.smiling`。
- 2026-10-15：支持自定义 API、模型、emoji 数量上限，以及保留原文的追加操作。
