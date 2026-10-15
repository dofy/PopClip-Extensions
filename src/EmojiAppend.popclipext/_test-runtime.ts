import extension from './Main'
import {
  appendResponse,
  prepareRequest,
} from './core'

// Run in PopClip's own JavaScript engine. No live API or clipboard writes.
export function testRuntime() {
  const request = prepareRequest('测试', {
    apiBaseUrl: 'https://example.test/v1/',
    apiKey: 'test-only-key',
    model: 'test-model',
    maxEmojis: '3',
  })
  if (request.url !== 'https://example.test/v1/chat/completions')
    throw new Error('URL normalization failed')
  const result = appendResponse(
    '  修好了！\n',
    { choices: [{ message: { content: '👨‍👩‍👧‍👦🇨🇳👍🏽' } }] },
    3,
  )
  if (result !== '  修好了！ 👨‍👩‍👧‍👦🇨🇳👍🏽\n')
    throw new Error('Emoji sequence or whitespace changed')
  const xhr = new XMLHttpRequest()
  xhr.open('POST', request.url)
  xhr.timeout = 30000
  if (extension.actions?.length !== 1) throw new Error('Extension did not load')
  return 'POPCLIP_RUNTIME_PASSED'
}
