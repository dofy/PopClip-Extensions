// identifier: 'xyz.phpz.popclip.extension.multi-line-to-array',
const optComma = popclip.options['last_line_comma'];
const optBrackets = popclip.options['add_brackets'];
const optQuotes = popclip.options['quotes'];
const optTrim = popclip.options['trim'];
const optSingleLine = popclip.options['single_line'];
const text = popclip.input.text;

const lines = text.split(/\r/g);

let result = ''

if (optBrackets) {
  result += '[';
}

result += optQuotes;

lines.map((line, index) => {
  result += optTrim ? line.trim() : line;
  if (index < lines.length - 1) {
    result += optSingleLine ? ' ' : ',';
  }
});

if (optBrackets) {
  result += ']';
}

return result;