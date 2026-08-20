const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{};:,./<>?\\|'
const AMBIGUOUS = new Set(['0', 'O', '1', 'l', 'I', '|'])

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

const clean = (chars: string, excludeAmbiguous: boolean) =>
  excludeAmbiguous
    ? [...chars].filter((c) => !AMBIGUOUS.has(c)).join('')
    : chars

const clampLength = (raw: unknown) => {
  const n = parseInt(String(raw ?? ''), 10)
  if (!Number.isFinite(n)) return 16
  return Math.max(4, Math.min(256, n))
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
      code(_, opts, { canPaste }) {
        const {
          leng,
          lowercase,
          uppercase,
          number,
          symbol,
          customSymbols,
          excludeAmbiguous,
          noRepeat,
          outputMode,
        } = opts as Record<string, unknown>

        const length = clampLength(leng)
        const excl = Boolean(excludeAmbiguous)

        const classes: string[] = []
        if (lowercase) classes.push(clean(LOWER, excl))
        if (uppercase) classes.push(clean(UPPER, excl))
        if (number) classes.push(clean(NUMBERS, excl))
        if (symbol) {
          const custom = String(customSymbols ?? '').trim()
          classes.push(clean(custom.length > 0 ? custom : SYMBOLS, excl))
        }

        // Fallback: all classes disabled → lowercase, so we never produce empty.
        const usable = classes.filter((c) => c.length > 0)
        if (usable.length === 0) usable.push(LOWER)

        const pool = usable.join('')

        // noRepeat is only satisfiable when the pool has ≥2 distinct chars.
        const forbidRepeat = Boolean(noRepeat) && new Set(pool).size > 1

        const pickNext = (prev: string | undefined, source: string) => {
          if (!forbidRepeat || prev === undefined) return pick(source)
          // Retry a bounded number of times, then fall back to any non-prev char.
          for (let i = 0; i < 8; i++) {
            const c = pick(source)
            if (c !== prev) return c
          }
          const alt = [...source].filter((c) => c !== prev)
          return alt.length > 0 ? alt[util.randomUniform(alt.length - 1)] : pick(source)
        }

        // Seed with one char from each enabled class so no enabled class is
        // silently absent, respecting noRepeat against the running tail.
        const chars: string[] = []
        for (const cls of usable) {
          chars.push(pickNext(chars[chars.length - 1], cls))
        }
        while (chars.length < length) {
          chars.push(pickNext(chars[chars.length - 1], pool))
        }

        // Shuffle the seeded chars so the guaranteed picks are not clustered at
        // the head, then re-check adjacency if noRepeat is on.
        let password = shuffle(chars).slice(0, length).join('')
        if (forbidRepeat) {
          const buf = [...password]
          for (let i = 1; i < buf.length; i++) {
            if (buf[i] === buf[i - 1]) buf[i] = pickNext(buf[i - 1], pool)
          }
          password = buf.join('')
        }

        const mode = String(outputMode ?? 'auto')
        if (mode === 'show') {
          popclip.showText(password, { preview: true })
          return
        }
        if (mode === 'copy' || (mode === 'auto' && !canPaste)) {
          popclip.copyText(password)
          return
        }
        popclip.pasteText(password)
      },
    },
  ],
}

export default extension
