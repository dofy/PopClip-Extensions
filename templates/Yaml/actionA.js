/**
 * ==========================================
 * JavaScript Action
 * DOCS: https://www.popclip.app/dev/packages
 * ==========================================
 */

// identifier: 'your.domain.popclip.extension.template_yaml',
const optionA = Boolean(popclip.options['option-a'])
const text = popclip.input.text
return `input: ${text}\noption A: ${optionA ? 'enabled' : 'disabled'}`
