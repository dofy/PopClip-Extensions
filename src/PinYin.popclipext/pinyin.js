// identifier: xyz.phpz.popclip.extension.pinyin

const dict = require('pinyin.json')

const type = popclip.options['pinyin_tone_type']

const isAlphabet = type === 'alphabet'

let chars = isAlphabet ? dict.number : dict[type]

const result = popclip.input.text
  .split('')
  .map((char) => (chars[char] ? (isAlphabet ? `${chars[char].replace(/\d*/g, '')} ` : `${chars[char]} `) : char))
  .join('');

const outputMode = popclip.options['output_mode'] || 'show-copy';

if (outputMode === 'show') {
  popclip.showText(result);
} else if (outputMode === 'copy') {
  await popclip.copyText(result);
} else {
  await popclip.copyText(result, { notify: false });
  popclip.showText(result);
}
