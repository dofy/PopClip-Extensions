import { appendResponse, prepareRequest, SettingsError } from './core'
import type { Settings } from './core'
import { requestAPI } from './api'

const extension: Extension<Settings> = {
  actions: [
    {
      title: { en: 'Append Emoji', 'zh-hans': '添加应景 Emoji' },
      requirements: ['text', 'paste'],
      async code({ text }, settings) {
        try {
          const request = prepareRequest(text, settings)
          const data = await requestAPI(request)
          const result = appendResponse(text, data, request.maxEmojis)
          if (result !== text)
            await popclip.pasteText(result, { restore: true })
        } catch (error) {
          if (error instanceof SettingsError)
            throw new Error(`Settings error: ${error.message}`)
          throw error
        }
      },
    },
  ],
}

export default extension
