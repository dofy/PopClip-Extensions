// identifier: xyz.phpz.popclip.extension.mosaic-text
const mosaicCode = popclip.options['mosaic-code'];
const text = popclip.input.text;

const result = new Array(text.length).fill(mosaicCode).join('');
// Paste the mosaic, but leave the original text on the clipboard for recovery.
popclip.pasteText(result);
popclip.copyText(text);
popclip.showText(`Mosaic pasted. Original text kept on clipboard.`);
