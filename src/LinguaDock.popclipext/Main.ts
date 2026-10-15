const extension: Extension = {
  actions: [
    {
      title: {
        en: 'Translate with LinguaDock',
        'zh-hans': '用 LinguaDock 翻译',
        'zh-hant': '用 LinguaDock 翻譯',
        ja: 'LinguaDock で翻訳',
      },
      code({ text }) {
        const selectedText = text.trim()
        if (!selectedText) return

        popclip.openUrl(
          `linguadock://translate?text=${encodeURIComponent(selectedText)}`
        )
      },
    },
  ],
}

export default extension
