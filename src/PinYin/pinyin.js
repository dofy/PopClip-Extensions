// identifier: xyz.phpz.popclip.extension.pinyin

const dict = require('pinyin.json')

const type = popclip.options['pinyin_tone_type']

const isAlphabet = type === 'alphabet'

let chars = isAlphabet ? dict.number : dict[type]

return popclip.input.text
  .split('')
  .map((char) => (chars[char] ? (isAlphabet ? `${chars[char].replace(/\d*/g, '')} ` : `${chars[char]} `) : char))
  .join('');
