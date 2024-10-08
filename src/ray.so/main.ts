const optionsToParams = (options: {
  [key: string]: string | boolean
}): string => {
  const params = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return params
}

const extension: Extension = {
  actions: [
    {
      title: {
        en: 'Generate Image',
        ja: '画像を生成する',
        'zh-Hans': '生成图片',
        'zh-Hant': '生成圖片',
      },
      code({ text }, options) {
        const code = util.base64Encode(text, { urlSafe: true })
        const params = optionsToParams(options)
        popclip.openUrl(`https://ray.so/#code=${code}&${params}`)
      },
    },
  ],
}
export default extension
