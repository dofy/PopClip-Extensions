// identifier: xyz.phpz.popclip.extension.comment-switcher

const commentPrifix = popclip.options['comment_prefix']
const originalInputText = popclip.input.text

const regPrefix = new RegExp(`^${commentPrifix}`)

const isCommented = originalInputText.split('\n').every((line) => regPrefix.test(line.trim()))

return isCommented
  ? originalInputText.split('\n').map(
    (line) => line.replace(
      new RegExp(`^([ ]*)${commentPrifix}[ ]?`),
      '$1')
  ).join('\n')
  : originalInputText.replace(/^([ ]*)/gm, `$1${commentPrifix} `)
