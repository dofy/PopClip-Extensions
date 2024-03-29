// identifier: xyz.phpz.popclip.extension.mosaic-text
const mosaicCode = popclip.options['mosaic-code'];
const text = popclip.input.text;

const result = new Array(text.length).fill(mosaicCode).join('');
popclip.showText(`The text "${text}" is copied.`);
popclip.pasteText(result);
popclip.copyText(text);
