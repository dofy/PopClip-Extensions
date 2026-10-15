# LinguaDock Translate

Translate selected text with the LinguaDock macOS app.

## Usage

1. Install and configure LinguaDock.
2. Select text in any app.
3. Choose **Translate with LinguaDock** in PopClip.

The extension sends the selected text to the installed app through the
`linguadock://translate` URL scheme. LinguaDock uses its current provider,
model, API key, and target language settings to perform the translation.

## Privacy

The extension does not call a translation service directly. Selected text is
passed only to LinguaDock on this Mac. LinguaDock then sends it to the API URL
configured in the app.

## Changelog

- 2026-09-18: Initial release.
