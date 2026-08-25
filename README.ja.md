# PopClip 拡張機能

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

macOS 向けの PopClip 拡張機能と snippet 拡張機能のコレクションです。編集可能なソースは `src/` に、ローカルでビルドできるパッケージは `dist/` にあります。

## インストール

[`dist/`](dist/) にある `.popclipextz` ファイルを開くと、PopClip に拡張機能をインストールできます。Snippet 拡張機能には `.popcliptxt` 形式を使用します。

## 拡張機能

以下の 14 個のパッケージは [PopClip 拡張機能ディレクトリ](https://www.popclip.app/extensions/) への提出用に設定されています。

| 拡張機能 | 説明 | ソース | パッケージ |
| --- | --- | --- | --- |
| Comment Switcher | 設定可能なプレフィックスで行コメントを切り替えます。 | [ソース](src/CommentSwitcher.popclipext/) | [インストール](dist/CommentSwitcher.popclipextz) |
| DeepL Translator | DeepL アプリまたはウェブサイトでテキストを翻訳します。 | [ソース](src/DeepLTranslator.popclipext/) | [インストール](dist/DeepLTranslator.popclipextz) |
| Format JSON | 設定可能なインデントで選択した JSON を整形します。 | [ソース](src/FormatJSON.popclipext/) | [インストール](dist/FormatJSON.popclipextz) |
| Password Generator | 設定可能なランダムパスワードをローカルで生成します。 | [ソース](src/GeneratePassword.popclipext/) | [インストール](dist/GeneratePassword.popclipextz) |
| Markdown List | 行を番号付きまたは箇条書きの Markdown リストに変換します。 | [ソース](src/MarkdownList.popclipext/) | [インストール](dist/MarkdownList.popclipextz) |
| Mosaic Text | 設定可能なモザイク文字でテキストを置き換えます。 | [ソース](src/MosaicText.popclipext/) | [インストール](dist/MosaicText.popclipextz) |
| Multi-Line to Array | 複数行のテキストを JavaScript 配列に変換します。 | [ソース](src/MultiLine2Array.popclipext/) | [インストール](dist/MultiLine2Array.popclipextz) |
| Open GitHub Repo | `AUTHOR/REPO` 形式のテキストからリポジトリを開きます。 | [ソース](src/OpenGitHubRepo.popclipext/) | [インストール](dist/OpenGitHubRepo.popclipextz) |
| PinYin | 中国語テキストをピンインまたは注音に変換します。 | [ソース](src/PinYin.popclipext/) | [インストール](dist/PinYin.popclipextz) |
| Color Conversion | RGB と 16 進数カラーを相互変換します。 | [ソース](src/RGB_HEX.popclipext/) | [インストール](dist/RGB_HEX.popclipextz) |
| Text Repeater | 倍率のサフィックスを使ってテキストを繰り返します。 | [ソース](src/TextRepeater.popclipext/) | [インストール](dist/TextRepeater.popclipextz) |
| Variable Name Convert | snake case と camel case を相互変換します。 | [ソース](src/VarNameConvert.popclipext/) | [インストール](dist/VarNameConvert.popclipextz) |
| Add to WordClip | 選択したテキストを WordClip に送ります。 | [ソース](src/WordClipCollect.popclipext/) | [インストール](dist/WordClipCollect.popclipextz) |
| ray.so | ray.so でコード画像を生成します。 | [ソース](src/ray.so.popclipext/) | [インストール](dist/ray.so.popclipextz) |

各パッケージには、使い方、オプション、プライバシーに関する注意事項、変更履歴を記載した README があります。

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

以下は独立した PopClip snippet 拡張機能で、ディレクトリ提出用の package glob には含まれません。

- [Search in NPM](src/Search-in-NPM.yaml) · [インストール](dist/Search-in-NPM.popcliptxt)
- [ChatGPT Make PopClip Extension](src/ChatGPTMakePopclipExt.applescript)

  > 選択したリクエストを ChatGPT のダイアログに送り、インストール可能な PopClip snippet を生成するよう依頼します。ChatGPT macOS アプリと、System Events へのアクセシビリティ権限が必要です。
- [Fancy Text](src/FancyText.popcliptxt)

## ビルド

`build.sh` は PopClip のパッケージと snippet のビルド、インストール、作成、削除を行います。引数なしで実行すると対話式メニューが開き、次の操作を選べます。

- パッケージをビルド
- パッケージをビルドしてインストール
- snippet をビルド
- snippet をビルドしてインストール
- テンプレートからパッケージを作成
- テンプレートから snippet を作成
- 確認後にソースと生成ファイルを削除

```sh
./build.sh
```

直接コマンドを実行する場合は、次のようにします。

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

`./build.sh NAME` は `./build.sh build NAME` の短縮形です。

`build NAME` は `src/NAME.popclipext/` または `src/` 内の snippet ソースをビルドし、結果を `dist/NAME.popclipextz` または `dist/NAME.popcliptxt` に出力します。`install NAME` は対象をビルドした後、macOS の `open` コマンドで生成ファイルを開き、PopClip へのインストールを開始します。

利用できるパッケージテンプレート形式は `plist`、`yaml`、`json`、`module` です。snippet テンプレート形式は `javascript`、`typescript`、`yaml` です。Module パッケージには YAML 設定と TypeScript ソースが含まれます。名前には英字、数字、ドット、ハイフン、アンダースコアを使用できます。

パッケージのビルドでは、ルートに `Config` ファイルが 1 つだけあること、ファイル数が 100 以下であること、1 ファイルが 1 MB 以下であること、合計サイズが 2 MB 以下であることを検証します。`remove NAME` は対話式の確認後に、対応するソースと生成ファイルだけを削除します。コマンド一覧は `./build.sh help` で表示できます。

## ディレクトリへの提出

リポジトリの提出範囲は [`popclip-directory.yaml`](popclip-directory.yaml) で設定されています。PopClip ディレクトリは、条件に一致する新しい Git tag が push されると変更されたパッケージディレクトリを読み込み、**Submission Check** を実行します。成功した提出は手動審査のキューに追加されます。詳しくは[公式提出ガイド](https://www.popclip.app/extensions/submit)を参照してください。

## 参考資料

- [PopClip 拡張機能ディレクトリ](https://www.popclip.app/extensions/)
- [PopClip 拡張機能開発](https://www.popclip.app/dev/)
- [PopClip Snippets](https://www.popclip.app/dev/snippets)
