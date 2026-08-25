// identifier: 'xyz.phpz.popclip.extension.multi-line-to-array',
const optREL = popclip.options['remove_empty_line'];
const optComma = popclip.options['last_comma'];
const optBrackets = popclip.options['add_brackets'];
const optQuotes = popclip.options['quotes'] === 'single' ? "'" : '"';
const optTrim = popclip.options['trim'];
const optSingleLine = popclip.options['single_line'];
const text = popclip.input.text;

const lines = text.split(optREL ? /\n+/g : /\n/g);

const quoteReg = new RegExp(`(${optQuotes})`, 'g');

let result = ''

if (optBrackets) {
  result += optSingleLine ? '[' : '[\n';
}


lines.map((line, index) => {
  const newLine = optTrim ? line.trim() : line;
  if (optREL && newLine === '') {
    return;
  }
  result += optQuotes + newLine.replace(quoteReg, '\\$1') + optQuotes;
  if (index < lines.length - 1) {
    result += optSingleLine ? `,` : `,\n`;
  } else {
    if (optComma) {
      result += optSingleLine ? `,` : `,\n`;
    } else {
      result += optSingleLine ? `` : `\n`;
    }
  }
  return result;
});

if (optBrackets) {
  result += ']';
}

return result;