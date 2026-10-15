# PopClip Extensions

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

A collection of PopClip extensions and snippet extensions for macOS. The
repository contains the editable sources in `src/` and locally buildable
packages in `dist/`.

## Install

Open a `.popclipextz` file from [`dist/`](dist/) to install an extension in
PopClip. Snippet extensions use the `.popcliptxt` format.

PopClip deletes a `.popclipextz` file after installation ([official documentation](https://www.popclip.app/dev/packages)). Download or copy packages before opening them to keep the repository copy. `./build.sh install NAME` opens a temporary copy and retains the built file in `dist/`. Unsigned JavaScript extensions with network permissions, including Emoji Append, show an installation warning.

## Extensions

These 16 packages are configured for submission to the
[PopClip Extensions Directory](https://www.popclip.app/extensions/):

| Extension | Description | Source | Package |
| --- | --- | --- | --- |
| Comment Switcher | Toggle line comments with a configurable prefix. | [Source](src/CommentSwitcher.popclipext/) | [Install](dist/CommentSwitcher.popclipextz) |
| DeepL Translator | Translate with the DeepL app or website. | [Source](src/DeepLTranslator.popclipext/) | [Install](dist/DeepLTranslator.popclipextz) |
| Emoji Append | Append 1–3 contextual emojis with a configurable API; preserve the original text. | [Source](src/EmojiAppend.popclipext/) | [Install](dist/EmojiAppend.popclipextz) |
| LinguaDock Translate | Translate selected text with the LinguaDock app. | [Source](src/LinguaDock.popclipext/) | [Install](dist/LinguaDock.popclipextz) |
| Format JSON | Format selected JSON with configurable indentation. | [Source](src/FormatJSON.popclipext/) | [Install](dist/FormatJSON.popclipextz) |
| Password Generator | Generate configurable random passwords locally. | [Source](src/GeneratePassword.popclipext/) | [Install](dist/GeneratePassword.popclipextz) |
| Markdown List | Convert lines to numbered or bulleted Markdown. | [Source](src/MarkdownList.popclipext/) | [Install](dist/MarkdownList.popclipextz) |
| Mosaic Text | Replace text with a configurable mosaic character. | [Source](src/MosaicText.popclipext/) | [Install](dist/MosaicText.popclipextz) |
| Multi-Line to Array | Convert lines into a JavaScript array. | [Source](src/MultiLine2Array.popclipext/) | [Install](dist/MultiLine2Array.popclipextz) |
| Open GitHub Repo | Open a repository from `AUTHOR/REPO` or scoped npm package text. | [Source](src/OpenGitHubRepo.popclipext/) | [Install](dist/OpenGitHubRepo.popclipextz) |
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

## Snippets

These are standalone PopClip snippet extensions and are not included in the
directory package glob:

- [Search in NPM](src/Search-in-NPM.yaml) · [Install](dist/Search-in-NPM.popcliptxt)
- [ChatGPT Make PopClip Extension](src/ChatGPTMakePopclipExt.applescript) · [Install](dist/ChatGPTMakePopclipExt.popcliptxt)

  > Send the selected request to the ChatGPT Chat Bar and ask it to generate
  > an installable PopClip snippet. The ChatGPT macOS app and Accessibility
  > permission for System Events are required.
- [Fancy Text](src/FancyText.popcliptxt) · [Install](dist/FancyText.popcliptxt)

## Raycast command

[Emoji Append for Raycast](https://github.com/dofy/reaycast-extensions/tree/main/emoji-append) provides a regular hotkey command: select text, run **Append Contextual Emoji**, and paste back the original text with contextual emojis. Configure the API Base URL, API key, model and emoji limit independently in each extension. It uses an OpenAI-compatible Chat Completions API and does not require Raycast AI Commands or Pro. Run `pnpm install --frozen-lockfile && pnpm dev` in `/Users/seven/Documents/raycast-extensions/emoji-append/` to add the command locally.

## Build

Rebuild all 16 packages and 3 snippets, replacing same-name files in `dist/`:

```sh
for package in src/*.popclipext; do
  ./build.sh build "$(basename "$package" .popclipext)"
done
for snippet in ChatGPTMakePopclipExt FancyText Search-in-NPM; do
  ./build.sh build "$snippet"
done
```

`build.sh` builds, installs, creates, and removes PopClip packages and snippets.
Run it without arguments to open the interactive menu, which provides these
actions:

- Build a package
- Build and install a package
- Build a snippet
- Build and install a snippet
- Create a package from a template
- Create a snippet from a template
- Remove source and generated files after confirmation

```sh
./build.sh
```

For direct commands, use the following:

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

`./build.sh NAME` is shorthand for `./build.sh build NAME`.

`build NAME` builds either `src/NAME.popclipext/` or a snippet source in `src/`
and writes the result to `dist/NAME.popclipextz` or
`dist/NAME.popcliptxt`. `install NAME` builds the target and opens the
a temporary copy with macOS `open` for installation in PopClip, retaining the
original generated file in `dist/`.

The available package template formats are `plist`, `yaml`, `json`, and
`module`. The available snippet template formats are `javascript`,
`typescript`, and `yaml`. A module package contains a YAML configuration and
TypeScript source. Package names may contain letters, numbers, dots, hyphens,
and underscores.

Package builds validate that the package contains exactly one root `Config`
file and no more than 100 files, 1 MB per file, or 2 MB in total. `remove NAME`
deletes the matching source and generated files only after an interactive
confirmation. Run `./build.sh help` to print the command reference.

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
