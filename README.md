# PopClip Extensions

A collection of PopClip extensions and snippet extensions for macOS. The
repository contains the editable sources in `src/` and locally buildable
packages in `dist/`.

## Install

Open a `.popclipextz` file from [`dist/`](dist/) to install an extension in
PopClip. Snippet extensions use the `.popcliptxt` format.

## Extensions

These 14 packages are configured for submission to the
[PopClip Extensions Directory](https://www.popclip.app/extensions/):

| Extension | Description | Source | Package |
| --- | --- | --- | --- |
| Comment Switcher | Toggle line comments with a configurable prefix. | [Source](src/CommentSwitcher.popclipext/) | [Install](dist/CommentSwitcher.popclipextz) |
| DeepL Translator | Translate with the DeepL app or website. | [Source](src/DeepLTranslator.popclipext/) | [Install](dist/DeepLTranslator.popclipextz) |
| Format JSON | Format selected JSON with configurable indentation. | [Source](src/FormatJSON.popclipext/) | [Install](dist/FormatJSON.popclipextz) |
| Password Generator | Generate configurable random passwords locally. | [Source](src/GeneratePassword.popclipext/) | [Install](dist/GeneratePassword.popclipextz) |
| Markdown List | Convert lines to numbered or bulleted Markdown. | [Source](src/MarkdownList.popclipext/) | [Install](dist/MarkdownList.popclipextz) |
| Mosaic Text | Replace text with a configurable mosaic character. | [Source](src/MosaicText.popclipext/) | [Install](dist/MosaicText.popclipextz) |
| Multi-Line to Array | Convert lines into a JavaScript array. | [Source](src/MultiLine2Array.popclipext/) | [Install](dist/MultiLine2Array.popclipextz) |
| Open GitHub Repo | Open a repository from `AUTHOR/REPO` text. | [Source](src/OpenGitHubRepo.popclipext/) | [Install](dist/OpenGitHubRepo.popclipextz) |
| PinYin | Convert Chinese text to Pinyin or Zhuyin. | [Source](src/PinYin.popclipext/) | [Install](dist/PinYin.popclipextz) |
| Color Conversion | Convert RGB and hexadecimal colors. | [Source](src/RGB_HEX.popclipext/) | [Install](dist/RGB_HEX.popclipextz) |
| Text Repeater | Repeat text using a multiplier suffix. | [Source](src/TextRepeater.popclipext/) | [Install](dist/TextRepeater.popclipextz) |
| Variable Name Convert | Convert between snake case and camel case. | [Source](src/VarNameConvert.popclipext/) | [Install](dist/VarNameConvert.popclipextz) |
| Add to WordClip | Send selected text to WordClip. | [Source](src/WordClipCollect.popclipext/) | [Install](dist/WordClipCollect.popclipextz) |
| ray.so | Generate a code image with ray.so. | [Source](src/ray.so.popclipext/) | [Install](dist/ray.so.popclipextz) |

Each package has its own README with usage, options, privacy notes, and
changelog:

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

## Snippets

These are standalone PopClip snippet extensions and are not included in the
directory package glob:

- [Search in NPM](src/Search-in-NPM.yaml) · [Install](dist/Search-in-NPM.popcliptxt)
- [ChatGPT Make PopClip Extension](src/ChatGPTMakePopclipExt.applescript)
- [Fancy Text](src/FancyText.popcliptxt)

## Build

Build one package with:

```sh
./build.sh PinYin
```

The result is written to `dist/`. Run `./build.sh -h` for package and snippet
templates, installation, and removal options.

## Directory submission

The repository is configured by [`popclip-directory.yaml`](popclip-directory.yaml).
The PopClip Directory reads changed package folders when a new matching Git tag
is pushed, runs the **Submission Check**, and queues successful submissions for
manual review. See the [official submission guide](https://www.popclip.app/extensions/submit)
for the workflow and requirements.

## References

- [PopClip Extensions Directory](https://www.popclip.app/extensions/)
- [PopClip Extension Development](https://www.popclip.app/dev/)
- [PopClip Snippets](https://www.popclip.app/dev/snippets)
