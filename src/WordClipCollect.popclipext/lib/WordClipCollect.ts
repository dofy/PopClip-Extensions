const extension: Extension = {
  actions: ({ text }) => {
    const word = text.trim()

    return [
      {
        title: {
          en: `Add to WordClip: ${word}`,
          ja: `WordClip に追加: ${word}`,
          'zh-Hans': `添加到 WordClip: ${word}`,
          'zh-Hant': `加入 WordClip: ${word}`,
        },
        icon: 'assets/wordclip.svg',
        code() {
          popclip.openUrl(`wordclip://collect?word=${encodeURIComponent(word)}`)
        },
      },
    ]
  },
}

export default extension
