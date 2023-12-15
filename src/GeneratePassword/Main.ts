/// <reference path="/Applications/PopClip.app/Contents/Resources/popclip.d.ts" />

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{};:,./<>?\\|'

const getRandomChar = (chars: string) => {
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

const extension: Extension = {
  actions: [
    {
      title: {
        en: 'Generate Password',
        'zh-Hans': '生成密码',
        'zh-Hant': '生成密碼',
        ja: 'パスワードを生成する',
      },
      requirements: [],
      code(_, { leng, number, symbol }, { canPaste }) {
        const length = parseInt(leng as string, 10) || 16
        let password = ''
        for (let i = 0; i < length; i++) {
          if (number && Math.random() > 0.7) {
            password += getRandomChar(NUMBERS)
          } else if (symbol && Math.random() > 0.85) {
            password += getRandomChar(SYMBOLS)
          } else {
            password += getRandomChar(CHARS)
          }
        }
        if (canPaste) {
          popclip.pasteText(password)
        } else {
          popclip.copyText(password)
        }
      },
    },
  ],
}

export default extension
