const extension: Extension = {
  actions: [
    {
      title: {
        en: 'Action',
        'zh-hans': '动作',
        'zh-hant': '動作',
        ja: 'アクション',
        ko: '동작',
        fr: 'Action',
        es: 'Acción',
      },
      icon: 'square filled M',
      after: 'show-result',
      code({ text }, options) {
        return `text: ${text}\noption A: ${options['option-a'] ? 'enabled' : 'disabled'}`
      },
    },
  ],
}

export default extension
