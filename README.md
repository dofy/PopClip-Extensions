# My PopClip Extensions

## `build.sh` Usage

```
Create / Build / Remove the PopClip extension

Usage:
  ./build.sh <EXT_NAME>
  ./build.sh <OPTIONS> <EXT_NAME>
  ./build.sh -h

Options:
  -p  Create extension from `plist` template.
  -y  Create extension from `yaml` template.
  -j  Create extension from `json` template.
  -m  Create extension from `module` template (`Yaml` & `TypeScript`).
  -J  Create snippet extension from `JavaScript` snippet template.
  -T  Create snippet extension from `TypeScript` snippet template.
  -Y  Create snippet extension from `yaml` snippet template.
  -i  Build and install.
  -r  Remove extension and source!!!
  -h  Show help.
```

## Extensions Index

- [Open GitHub Repo][ext1]

  > You can open this GitHub Repo in your browser when you check text in the
  > format `AUTHOR/REPO`. If `AUTHOR` is not the GitHub `USERNAME` you set up, a
  > new button will be added to open `USERNAME/REPO`.

- [PinYin][ext2]

  > Get `PinYin` or `ZhuYin` of Chinese characters with the selected text.

- [TextRepeater][ext3]

  > Repeat `TEXT` by `N` times if the content format is `TEXT*N` or `TEXT.N`.

- [RGB_HEX][ext4]

  > Convert `RGB` to `Hex` or `Hex` to `RGB` with the selected text like
  > `#FFFFFF` or `255,255,255`.

- [Variable Name Convert][ext5]

  > Convert variable name to `CamelCase` or `snake_case`.

- [Markdown List][ext6]

  > Convert multi-line text to markdown list format.

- [Format JSON][ext7]

  > Format JSON with indent.

- [Comment Switcher][ext8]

  > Comment / uncomment a bunch of lines of code.

- [Mosaic Text][ext9]

  > Mosaic text with custom characters which can be changed in the extension
  > settings, you can use it to hide sensitive information. (The selected text
  > will be copied to the clipboard first.)

- [Multi-line to Array][ext10]

  > Convert multi-line text to javascript array format.

- [Search in NPM][ext11]

  > Search in npmjs.com

- [Generate `ray.so` Image][ext12]

  > Send selected text to [ray.so](https://ray.so) to get a beautiful image of
  > your code.

- [DeepL Translator][ext13]

  > Translate selected text via DeepL App or Website.

- [Generate Password][ext14]

  > Generate password with custom length and characters.

## References

- [PopClip Extensions][popext-website]
- [PopClip Extensions on GitHub][popext-github]
- [PopClip Extension Docs][docs]

[ext1]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/OpenGitHubRepo.popclipextz
[ext2]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/PinYin.popclipextz
[ext3]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/TextRepeater.popclipextz
[ext4]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/RGB_HEX.popclipextz
[ext5]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/VarNameConvert.popclipextz
[ext6]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/MarkdownList.popclipextz
[ext7]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/FormatJSON.popclipextz
[ext8]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/CommentSwitcher.popclipextz
[ext9]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/MosaicText.popclipextz
[ext10]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/MultiLine2Array.popclipextz
[ext11]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/Search-in-NPM.popcliptxt
[ext12]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/ray.so.popclipextz
[ext13]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/DeepLTranslator.popclipextz
[ext14]: https://github.com/dofy/PopClip-Extensions/raw/master/dist/GeneratePassword.popclipextz
[popext-website]: https://www.popclip.app/extensions/
[popext-github]: https://github.com/pilotmoon/PopClip-Extensions
[docs]: https://www.popclip.app/dev/
