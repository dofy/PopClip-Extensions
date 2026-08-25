# PopClip 擴充功能

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

這是一個適用於 macOS 的 PopClip 擴充功能與 snippet 擴充功能集合。儲存庫中的可編輯原始檔位於 `src/`，可在本機建置的安裝套件位於 `dist/`。

## 安裝

開啟 [`dist/`](dist/) 中的 `.popclipextz` 檔案，即可在 PopClip 中安裝擴充功能。Snippet 擴充功能使用 `.popcliptxt` 格式。

## 擴充功能

以下 14 個擴充功能已設定為提交至 [PopClip 擴充功能目錄](https://www.popclip.app/extensions/)：

| 擴充功能 | 說明 | 原始碼 | 安裝套件 |
| --- | --- | --- | --- |
| Comment Switcher | 使用可設定的前綴切換行註解。 | [原始碼](src/CommentSwitcher.popclipext/) | [安裝](dist/CommentSwitcher.popclipextz) |
| DeepL Translator | 使用 DeepL 應用程式或網站翻譯文字。 | [原始碼](src/DeepLTranslator.popclipext/) | [安裝](dist/DeepLTranslator.popclipextz) |
| Format JSON | 使用可設定的縮排格式化選取的 JSON。 | [原始碼](src/FormatJSON.popclipext/) | [安裝](dist/FormatJSON.popclipextz) |
| Password Generator | 在本機產生可設定的隨機密碼。 | [原始碼](src/GeneratePassword.popclipext/) | [安裝](dist/GeneratePassword.popclipextz) |
| Markdown List | 將多行文字轉換為有序或無序 Markdown 清單。 | [原始碼](src/MarkdownList.popclipext/) | [安裝](dist/MarkdownList.popclipextz) |
| Mosaic Text | 使用可設定的馬賽克字元取代文字。 | [原始碼](src/MosaicText.popclipext/) | [安裝](dist/MosaicText.popclipextz) |
| Multi-Line to Array | 將多行文字轉換為 JavaScript 陣列。 | [原始碼](src/MultiLine2Array.popclipext/) | [安裝](dist/MultiLine2Array.popclipextz) |
| Open GitHub Repo | 根據 `AUTHOR/REPO` 文字開啟儲存庫。 | [原始碼](src/OpenGitHubRepo.popclipext/) | [安裝](dist/OpenGitHubRepo.popclipextz) |
| PinYin | 將中文文字轉換為拼音或注音。 | [原始碼](src/PinYin.popclipext/) | [安裝](dist/PinYin.popclipextz) |
| Color Conversion | 轉換 RGB 與十六進位顏色。 | [原始碼](src/RGB_HEX.popclipext/) | [安裝](dist/RGB_HEX.popclipextz) |
| Text Repeater | 使用倍數後綴重複文字。 | [原始碼](src/TextRepeater.popclipext/) | [安裝](dist/TextRepeater.popclipextz) |
| Variable Name Convert | 在 snake case 與 camel case 之間轉換。 | [原始碼](src/VarNameConvert.popclipext/) | [安裝](dist/VarNameConvert.popclipextz) |
| Add to WordClip | 將選取的文字傳送到 WordClip。 | [原始碼](src/WordClipCollect.popclipext/) | [安裝](dist/WordClipCollect.popclipextz) |
| ray.so | 使用 ray.so 產生程式碼圖片。 | [原始碼](src/ray.so.popclipext/) | [安裝](dist/ray.so.popclipextz) |

每個擴充功能套件都有自己的 README，包含使用方式、選項、隱私說明和更新記錄：

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

以下是獨立的 PopClip snippet 擴充功能，不包含在目錄提交的 package glob 中：

- [Search in NPM](src/Search-in-NPM.yaml) · [安裝](dist/Search-in-NPM.popcliptxt)
- [ChatGPT Make PopClip Extension](src/ChatGPTMakePopclipExt.applescript)

  > 將選取的請求傳送到 ChatGPT 對話框，讓 ChatGPT 產生可安裝的 PopClip snippet。需要 ChatGPT macOS 應用程式，以及為 System Events 授予輔助功能權限。
- [Fancy Text](src/FancyText.popcliptxt)

## 建置

`build.sh` 用於建置、安裝、建立與移除 PopClip 擴充功能套件及 snippet。不帶參數執行時會開啟互動式選單，提供以下操作：

- 建置擴充功能套件
- 建置並安裝擴充功能套件
- 建置 snippet
- 建置並安裝 snippet
- 根據範本建立擴充功能套件
- 根據範本建立 snippet
- 確認後移除原始檔與產生檔

```sh
./build.sh
```

直接執行命令時，可以使用：

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

`./build.sh NAME` 是 `./build.sh build NAME` 的簡寫。

`build NAME` 會建置 `src/NAME.popclipext/` 或 `src/` 中的 snippet 原始檔，並將結果寫入 `dist/NAME.popclipextz` 或 `dist/NAME.popcliptxt`。`install NAME` 會先建置目標，再使用 macOS 的 `open` 命令開啟產生檔案，以便在 PopClip 中安裝。

可用的擴充功能套件範本格式有 `plist`、`yaml`、`json` 和 `module`；可用的 snippet 範本格式有 `javascript`、`typescript` 和 `yaml`。Module 擴充功能套件包含 YAML 設定與 TypeScript 原始碼。擴充功能名稱只能包含字母、數字、點號、連字號與底線。

建置擴充功能套件時會檢查：根目錄必須恰好包含一個 `Config` 檔案，檔案總數不超過 100 個，單一檔案不超過 1 MB，總大小不超過 2 MB。`remove NAME` 只有在互動確認後才會刪除對應的原始檔與產生檔。執行 `./build.sh help` 可查看命令參考。

## 提交至目錄

儲存庫透過 [`popclip-directory.yaml`](popclip-directory.yaml) 設定提交範圍。PopClip 目錄會在推送符合條件的新 Git tag 後讀取發生變更的擴充功能目錄，執行 **Submission Check**，並將成功的提交排隊等待人工審核。具體流程請參閱[官方提交指南](https://www.popclip.app/extensions/submit)。

## 參考資料

- [PopClip 擴充功能目錄](https://www.popclip.app/extensions/)
- [PopClip 擴充功能開發文件](https://www.popclip.app/dev/)
- [PopClip Snippets](https://www.popclip.app/dev/snippets)
