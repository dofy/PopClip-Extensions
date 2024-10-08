/**
 * DOCS: https://www.popclip.app/dev/snippets
 */

// #popclip
// name: Name of the extension
// language: typescript
// module: true
const getIcon = (filled: boolean = false) => {
  return `square ${filled ? 'filled' : ''} ${String(
    Math.floor(Math.random() * 100)
  )}`
}
const extension: Extension = {
  icon: getIcon(),
  options: [
    {
      identifier: 'option1',
      label: 'Option 1',
      type: 'boolean',
    },
  ],
  actions: [
    {
      title: 'Action 1',
      icon: getIcon(true),
      after: 'show-result',
      code: (input) => {
        return 'Hi from the action. Your text is: ' + input.text
      },
    },
    {
      title: 'Action 2',
      icon: getIcon(),
      after: 'show-result',
      code: (input, { option1 }) => {
        popclip.openUrl(`https://www.google.com/search?q=${input.text}`)
        return `Option 1 is ${option1 ? 'enabled' : 'disabled'}`
      },
    },
  ],
}
export default extension
