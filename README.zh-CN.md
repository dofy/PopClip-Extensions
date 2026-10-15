# PopClip 扩展

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

这是一个面向 macOS 的 PopClip 扩展和 snippet 扩展集合。仓库中的可编辑源文件位于 `src/`，可本地构建的安装包位于 `dist/`。

## 安装

打开 [`dist/`](dist/) 中的 `.popclipextz` 文件，即可在 PopClip 中安装扩展。Snippet 扩展使用 `.popcliptxt` 格式。

PopClip 安装 `.popclipextz` 后会删除原安装包（[官方说明](https://www.popclip.app/dev/packages)）。直接打开前，请先下载或复制一份，保留仓库中的包。`./build.sh install NAME` 会打开临时副本，保留 `dist/` 中的安装包。Emoji Append 等声明联网权限的未签名 JavaScript 扩展会显示安装警告。

## 扩展

以下 16 个扩展已配置为提交到 [PopClip 扩展目录](https://www.popclip.app/extensions/)：

| 扩展 | 说明 | 源码 | 安装包 |
| --- | --- | --- | --- |
| Comment Switcher | 使用可配置的前缀切换行注释。 | [源码](src/CommentSwitcher.popclipext/) | [安装](dist/CommentSwitcher.popclipextz) |
| DeepL Translator | 使用 DeepL 应用或网站翻译文本。 | [源码](src/DeepLTranslator.popclipext/) | [安装](dist/DeepLTranslator.popclipextz) |
| Emoji Append | 使用自定义 API，在原文末尾追加 1～3 个应景 emoji。 | [源码](src/EmojiAppend.popclipext/) | [安装](dist/EmojiAppend.popclipextz) |
| LinguaDock Translate | 使用 LinguaDock 应用翻译选中的文本。 | [源码](src/LinguaDock.popclipext/) | [安装](dist/LinguaDock.popclipextz) |
| Format JSON | 使用可配置的缩进格式化选中的 JSON。 | [源码](src/FormatJSON.popclipext/) | [安装](dist/FormatJSON.popclipextz) |
| Password Generator | 在本地生成可配置的随机密码。 | [源码](src/GeneratePassword.popclipext/) | [安装](dist/GeneratePassword.popclipextz) |
| Markdown List | 将多行文本转换为有序或无序 Markdown 列表。 | [源码](src/MarkdownList.popclipext/) | [安装](dist/MarkdownList.popclipextz) |
| Mosaic Text | 使用可配置的马赛克字符替换文本。 | [源码](src/MosaicText.popclipext/) | [安装](dist/MosaicText.popclipextz) |
| Multi-Line to Array | 将多行文本转换为 JavaScript 数组。 | [源码](src/MultiLine2Array.popclipext/) | [安装](dist/MultiLine2Array.popclipextz) |
| Open GitHub Repo | 根据 `AUTHOR/REPO` 或 scoped npm 包文本打开仓库。 | [源码](src/OpenGitHubRepo.popclipext/) | [安装](dist/OpenGitHubRepo.popclipextz) |
| PinYin | 将中文文本转换为拼音或注音。 | [源码](src/PinYin.popclipext/) | [安装](dist/PinYin.popclipextz) |
| Color Conversion | 转换 RGB 和十六进制颜色。 | [源码](src/RGB_HEX.popclipext/) | [安装](dist/RGB_HEX.popclipextz) |
| Text Repeater | 使用倍数后缀重复文本。 | [源码](src/TextRepeater.popclipext/) | [安装](dist/TextRepeater.popclipextz) |
| Variable Name Convert | 在 snake case 和 camel case 之间转换。 | [源码](src/VarNameConvert.popclipext/) | [安装](dist/VarNameConvert.popclipextz) |
| Add to WordClip | 将选中的文本发送到 WordClip。 | [源码](src/WordClipCollect.popclipext/) | [安装](dist/WordClipCollect.popclipextz) |
| ray.so | 使用 ray.so 生成代码图片。 | [源码](src/ray.so.popclipext/) | [安装](dist/ray.so.popclipextz) |

每个扩展包都有自己的 README，包含用法、选项、隐私说明和更新记录：

- [Comment Switcher](src/CommentSwitcher.popclipext/README.md)
- [DeepL Translator](src/DeepLTranslator.popclipext/README.md)
- [Emoji Append](src/EmojiAppend.popclipext/README.md)
- [LinguaDock Translate](src/LinguaDock.popclipext/README.md)
- [Format JSON](src/FormatJSON.popclipext/README.md)
- [Password Generator](src/GeneratePassword.popclipext/README.md)
- [Markdown List](src/MarkdownList.popclipext/README.md)
- [Mosaic Text](src/MosaicText.popclipext/README.md)
- [Multi-Line to Array](src/MultiLine2Array.popclipext/README.md)
- [Open GitHub Repo](src/OpenGitHubRepo.popclipext/README.md)
- [PinYin](src/PinYin.popclipext/README.md)
- [Color Conversion](src/RGB_HEX.popclipext/README.md)
- [Text Repeater](src/TextRepeater.popclipext/README.md)
- [Variable Name Convert](src/VarNameConvert.popclipext/README.md)
- [Add to WordClip](src/WordClipCollect.popclipext/README.md)
- [ray.so](src/ray.so.popclipext/README.md)

## Snippet

以下是独立的 PopClip snippet 扩展，不包含在目录提交的 package glob 中：

- [Search in NPM](src/Search-in-NPM.yaml) · [安装](dist/Search-in-NPM.popcliptxt)
- [ChatGPT Make PopClip Extension](src/ChatGPTMakePopclipExt.applescript) · [安装](dist/ChatGPTMakePopclipExt.popcliptxt)

  > 将选中的请求发送到 ChatGPT 对话框，让 ChatGPT 生成可安装的 PopClip snippet。需要 ChatGPT macOS 应用，以及为 System Events 授予辅助功能权限。
- [Fancy Text](src/FancyText.popcliptxt) · [安装](dist/FancyText.popcliptxt)

## Raycast 普通命令

[Emoji Append for Raycast](Raycast/README.md) 支持快捷键：选中文字，执行 **Append Contextual Emoji**，自动在原文末尾添加应景 emoji 并写回。两端分别配置 API Base URL、API Key、模型和 emoji 数量上限；使用 OpenAI-compatible Chat Completions API，不依赖 Raycast AI Command 或 Pro。在 `Raycast/` 中执行 `pnpm install --frozen-lockfile && pnpm dev` 即可添加本地命令。

## 构建

批量重建全部 16 个插件包和 3 个 snippet，覆盖 `dist/` 中的同名文件：

```sh
for package in src/*.popclipext; do
  ./build.sh build "$(basename "$package" .popclipext)"
done
for snippet in ChatGPTMakePopclipExt FancyText Search-in-NPM; do
  ./build.sh build "$snippet"
done
```

`build.sh` 用于构建、安装、创建和删除 PopClip 扩展包及 snippet。不带参数运行时会打开交互式菜单，提供以下操作：

- 构建扩展包
- 构建并安装扩展包
- 构建 snippet
- 构建并安装 snippet
- 根据模板创建扩展包
- 根据模板创建 snippet
- 确认后删除源文件和生成文件

```sh
./build.sh
```

直接执行命令时，可以使用：

```sh
./build.sh PinYin
./build.sh build PinYin
./build.sh install PinYin
./build.sh build FancyText
./build.sh create-package yaml NewExtension
./build.sh create-snippet javascript NewSnippet
./build.sh remove NewExtension
./build.sh help
```

`./build.sh NAME` 是 `./build.sh build NAME` 的简写。

`build NAME` 会构建 `src/NAME.popclipext/` 或 `src/` 中的 snippet 源文件，并将结果写入 `dist/NAME.popclipextz` 或 `dist/NAME.popcliptxt`。`install NAME` 会先构建目标，然后使用 macOS 的 `open` 命令打开临时副本，以便在 PopClip 中安装，并保留 `dist/` 中的原安装包。

可用的扩展包模板格式有 `plist`、`yaml`、`json` 和 `module`；可用的 snippet 模板格式有 `javascript`、`typescript` 和 `yaml`。Module 扩展包包含 YAML 配置和 TypeScript 源码。扩展名称只能包含字母、数字、点号、连字符和下划线。

构建扩展包时会检查：根目录必须恰好包含一个 `Config` 文件，文件总数不超过 100 个，单个文件不超过 1 MB，总大小不超过 2 MB。`remove NAME` 只有在交互确认后才会删除对应的源文件和生成文件。运行 `./build.sh help` 可查看命令参考。

## 提交到目录

仓库通过 [`popclip-directory.yaml`](popclip-directory.yaml) 配置提交范围。PopClip 目录会在推送符合条件的新 Git tag 后读取发生变化的扩展目录，运行 **Submission Check**，并将成功的提交排队等待人工审核。具体流程请参阅[官方提交指南](https://www.popclip.app/extensions/submit)。

## 参考资料

- [PopClip 扩展目录](https://www.popclip.app/extensions/)
- [PopClip 扩展开发文档](https://www.popclip.app/dev/)
- [PopClip Snippets](https://www.popclip.app/dev/snippets)
