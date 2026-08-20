const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{};:,./<>?\\|'

// Cryptographically secure pick: util.randomUniform gives a uniform int in
// [0, max] with no modulo bias, backed by a CSPRNG.
const pick = (chars: string) => chars.charAt(util.randomUniform(chars.length - 1))

// Fisher-Yates shuffle using the same secure source.
const shuffle = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = util.randomUniform(i)
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
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

        // Build the character pool and guarantee at least one char of each
        // enabled class, so an enabled option is never silently absent.
        let pool = LETTERS
        const chars: string[] = []
        if (number) {
          pool += NUMBERS
          chars.push(pick(NUMBERS))
        }
        if (symbol) {
          pool += SYMBOLS
          chars.push(pick(SYMBOLS))
        }
        while (chars.length < length) {
          chars.push(pick(pool))
        }

        const password = shuffle(chars).slice(0, length).join('')

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
