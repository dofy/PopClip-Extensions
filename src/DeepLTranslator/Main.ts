const DeepL_URL =
  'https://www.deepl.com/{languageCode}/translator#{secondLanguage}/{localLanguage}/'

const extension: Extension = {
  actions: [
    {
      title: 'Translate',
      code(
        { text },
        { runMode, secondLanguage, defaultShortcut, customShortcut }
      ) {
        if (runMode === 'website') {
          const { languageCode, localeIdentifier } = util.localeInfo
          const optionIsHeld = popclip.modifiers.option
          const localLanguage =
            localeIdentifier.split('_')[0].toLowerCase() || 'en'
          popclip.openUrl(
            `${DeepL_URL.replace('{languageCode}', languageCode)
              .replace(
                '{secondLanguage}',
                optionIsHeld ? languageCode : (secondLanguage as string)
              )
              .replace(
                '{localLanguage}',
                optionIsHeld ? (secondLanguage as string) : localLanguage
              )}${encodeURIComponent(text)}`
          )
        } else {
          if (defaultShortcut) {
            popclip.pressKey('cmd c')
            popclip.pressKey('cmd c')
          } else {
            print(customShortcut)
            if (customShortcut !== '') {
              popclip.pressKey(customShortcut as string)
            } else {
              popclip.showText('Please set a custom shortcut in settings.')
            }
          }
        }
      },
    },
  ],
}

export default extension
