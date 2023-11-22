/**
 * ==========================================
 * JavaScript Action
 * DOCS: https://www.popclip.app/dev/packages
 * ==========================================
 */

const main = (async) => {
  // identifier: 'your.domain.popclip.extension.template_json',
  const optA = popclip.options["option-a"];
  const text = popclip.input.text;

  return `input:${text} option:${optA}`;
};
