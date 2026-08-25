const optionsToParams = (options: {
  [key: string]: string | boolean
}): string => {
  const params = Object.entries(options)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')
  return params
}

const extension: Extension = {
  actions: [
    {
      title: {
        en: 'Generate Image',
        'zh-hans': '生成图片',
        'zh-hant': '生成圖片',
        ja: '画像を生成する',
        ko: '이미지 생성',
        fr: 'Générer une image',
        es: 'Generar imagen',
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
