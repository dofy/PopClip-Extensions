const extension: Extension = {
  actions: ({ text }) => {
    const word = text.trim()

    return [
      {
        title: {
          en: `Add to WordClip: ${word}`,
          ja: `WordClip に追加: ${word}`,
          'zh-hans': `添加到 WordClip: ${word}`,
          'zh-hant': `加入 WordClip: ${word}`,
          ko: `WordClip에 추가: ${word}`,
          fr: `Ajouter à WordClip : ${word}`,
          es: `Añadir a WordClip: ${word}`,
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
