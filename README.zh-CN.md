# PopClip 扩展

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

这是一个面向 macOS 的 PopClip 扩展和 snippet 扩展集合。仓库中的可编辑源文件位于 `src/`，可本地构建的安装包位于 `dist/`。

## 安装

打开 [`dist/`](dist/) 中的 `.popclipextz` 文件，即可在 PopClip 中安装扩展。Snippet 扩展使用 `.popcliptxt` 格式。

## 扩展

以下 14 个扩展已配置为提交到 [PopClip 扩展目录](https://www.popclip.app/extensions/)：

| 扩展 | 说明 | 源码 | 安装包 |
| --- | --- | --- | --- |
| Comment Switcher | 使用可配置的前缀切换行注释。 | [源码](src/CommentSwitcher.popclipext/) | [安装](dist/CommentSwitcher.popclipextz) |
| DeepL Translator | 使用 DeepL 应用或网站翻译文本。 | [源码](src/DeepLTranslator.popclipext/) | [安装](dist/DeepLTranslator.popclipextz) |
| Format JSON | 使用可配置的缩进格式化选中的 JSON。 | [源码](src/FormatJSON.popclipext/) | [安装](dist/FormatJSON.popclipextz) |
| Password Generator | 在本地生成可配置的随机密码。 | [源码](src/GeneratePassword.popclipext/) | [安装](dist/GeneratePassword.popclipextz) |
| Markdown List | 将多行文本转换为有序或无序 Markdown 列表。 | [源码](src/MarkdownList.popclipext/) | [安装](dist/MarkdownList.popclipextz) |
| Mosaic Text | 使用可配置的马赛克字符替换文本。 | [源码](src/MosaicText.popclipext/) | [安装](dist/MosaicText.popclipextz) |
| Multi-Line to Array | 将多行文本转换为 JavaScript 数组。 | [源码](src/MultiLine2Array.popclipext/) | [安装](dist/MultiLine2Array.popclipextz) |
| Open GitHub Repo | 根据 `AUTHOR/REPO` 文本打开仓库。 | [源码](src/OpenGitHubRepo.popclipext/) | [安装](dist/OpenGitHubRepo.popclipextz) |
| PinYin | 将中文文本转换为拼音或注音。 | [源码](src/PinYin.popclipext/) | [安装](dist/PinYin.popclipextz) |
| Color Conversion | 转换 RGB 和十六进制颜色。 | [源码](src/RGB_HEX.popclipext/) | [安装](dist/RGB_HEX.popclipextz) |
| Text Repeater | 使用倍数后缀重复文本。 | [源码](src/TextRepeater.popclipext/) | [安装](dist/TextRepeater.popclipextz) |
| Variable Name Convert | 在 snake case 和 camel case 之间转换。 | [源码](src/VarNameConvert.popclipext/) | [安装](dist/VarNameConvert.popclipextz) |
| Add to WordClip | 将选中的文本发送到 WordClip。 | [源码](src/WordClipCollect.popclipext/) | [安装](dist/WordClipCollect.popclipextz) |
| ray.so | 使用 ray.so 生成代码图片。 | [源码](src/ray.so.popclipext/) | [安装](dist/ray.so.popclipextz) |

每个扩展包都有自己的 README，包含用法、选项、隐私说明和更新记录：

- [Comment Switcher](src/CommentSwitcher.popclipext/README.md)
- [DeepL Translator](src/DeepLTranslator.popclipext/README.md)
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
- [ChatGPT Make PopClip Extension](src/ChatGPTMakePopclipExt.applescript)

  > 将选中的请求发送到 ChatGPT 对话框，让 ChatGPT 生成可安装的 PopClip snippet。需要 ChatGPT macOS 应用，以及为 System Events 授予辅助功能权限。
- [Fancy Text](src/FancyText.popcliptxt)

## 构建

不带参数运行即可打开交互式构建菜单：

```sh
./build.sh
```

菜单可以构建或安装扩展和 snippet、根据模板创建源文件，并在确认后移除源文件。自动化构建单个扩展或 snippet：

```sh
./build.sh PinYin
./build.sh build PinYin
./build.sh install PinYin
./build.sh build FancyText
```

结果会写入 `dist/`。旧版参数（例如 `./build.sh -i PinYin`）仍然支持。运行 `./build.sh -h` 查看所有命令和模板格式。

## 提交到目录

仓库通过 [`popclip-directory.yaml`](popclip-directory.yaml) 配置提交范围。PopClip 目录会在推送符合条件的新 Git tag 后读取发生变化的扩展目录，运行 **Submission Check**，并将成功的提交排队等待人工审核。具体流程请参阅[官方提交指南](https://www.popclip.app/extensions/submit)。

## 参考资料

- [PopClip 扩展目录](https://www.popclip.app/extensions/)
- [PopClip 扩展开发文档](https://www.popclip.app/dev/)
- [PopClip Snippets](https://www.popclip.app/dev/snippets)
