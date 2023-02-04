// identifier: xyz.phpz.popclip.extension.pinyin

const dict = require('pinyin.json')
const zhuyin = require('zhuyin.json')

const type = popclip.options['zhuyin_tone_type']

const chars = dict.number

const diao = ['˙', '', 'ˊ', 'ˇ', 'ˋ']

const pin2zhu = (pin) => {
  let result = pin

  switch (type) {
    case 'alphabet':
      result = pin.replace(/\d*/g, '')
      break;
    case 'mark':
      if (!/\d/.test(pin)) {
        result += '˙'
      } else {
        diao.map((d, i) => {
          result = result.replace(i, d)
        })
      }
      break;
    default:
      break;
  }

  for (const [pin, zhu] of Object.entries(zhuyin)) {
    const regex = new RegExp(pin)
    result = result.replace(regex, zhu)
  }
  return result
}

return popclip.input.text
  .split('')
  .map((char) => (chars[char] ? `${pin2zhu(chars[char])} ` : char))
  .join('');
