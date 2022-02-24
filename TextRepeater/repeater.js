const txt = popclip.input.text;
const reg = /^(.*?)(?:\.|\*)(\d+)$/;
const m = txt.match(reg);

return m[1].repeat(Number(m[2]));
