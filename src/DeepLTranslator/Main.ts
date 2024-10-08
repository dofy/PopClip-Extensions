const DeepL_URL =
  'https://www.deepl.com/{languageCode}/translator#{sourceLanguage}/{localLanguage}/'

const extension: Extension = {
  actions: [
    {
      title: 'Translate',
      code(
        { text },
        { runMode, sourceLanguage, defaultShortcut, customShortcut }
      ) {
        if (runMode === 'website') {
          const { languageCode, localeIdentifier } = util.localeInfo
          const localLanguage =
            localeIdentifier.split('_')[0].toLowerCase() || 'en'
          popclip.openUrl(
            `${DeepL_URL.replace('{languageCode}', languageCode)
              .replace('{localLanguage}', localLanguage)
              .replace(
                '{sourceLanguage}',
                sourceLanguage.toString() || 'en'
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
