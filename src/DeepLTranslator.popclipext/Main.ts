const DeepL_URL =
  'https://www.deepl.com/{languageCode}/translator#{secondLanguage}/{localLanguage}/'

const extension: Extension = {
  actions: [
    {
      title: 'Translate',
      async code(
        { text },
        {
          runMode,
          secondLanguage,
          defaultShortcut,
          customCommand,
          customControl,
          customShift,
          customOption,
          customKey,
        }
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
            // DeepL desktop opens on a double ⌘C. PopClip removed its automatic
            // 100ms post-keypress delay (2023.9), so pace the two presses
            // ourselves or DeepL merges them into a single copy.
            popclip.pressKey('cmd c')
            await sleep(150)
            popclip.pressKey('cmd c')
          } else {
            const key = String(customKey ?? '').trim().toLowerCase()
            if (Array.from(key).length !== 1) {
              popclip.showText('Please enter one character for the custom shortcut.')
              return
            }

            const modifiers: string[] = []
            if (customControl) modifiers.push('ctrl')
            if (customCommand) modifiers.push('cmd')
            if (customShift) modifiers.push('shift')
            if (customOption) modifiers.push('opt')
            popclip.pressKey([...modifiers, key].join(' '))
          }
        }
      },
    },
  ],
}

export default extension
