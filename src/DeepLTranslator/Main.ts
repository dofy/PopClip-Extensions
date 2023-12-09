/// <reference path="/Applications/PopClip.app/Contents/Resources/popclip.d.ts" />

const DeepL_URL = 'https://www.deepl.com/translator#//'

const extension: Extension = {
  actions: [
    {
      title: 'Translate',
      code({ text }, { runMode, defaultShortcut, customShortcut }) {
        if (runMode === 'website') {
          popclip.openUrl(`${DeepL_URL}${text}`)
        } else {
          if (defaultShortcut) {
            popclip.pressKey('cmd c')
            popclip.pressKey('cmd c')
          } else {
            print(customShortcut)
            if (customShortcut !== '') {
              popclip.pressKey(customShortcut as string)
            } else {
              popclip.showText(
                'Please set a custom shortcut in settings.'
              )
            }
          }
        }
      },
    },
  ],
}

export default extension
