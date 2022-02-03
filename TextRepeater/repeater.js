const txt = popclip.input.text;
const reg = /^(.*?)(?:\.|\*)(\d+)$/;
const m = txt.match(reg);

return new Array(Number(m[2])).fill(m[1]).join('');
