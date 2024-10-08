const extension: Extension = {
  actions: [
    {
      title: {
        en: 'Action',
        'zh-Hans': '动作',
      },
      code(input, options, context) {
        popclip.showText(`text: ${input.text}, option: ${options['option-a']}`)
      },
    },
  ],
}

export default extension
