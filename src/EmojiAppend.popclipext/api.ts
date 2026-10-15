import { httpError } from './core'
import type { prepareRequest } from './core'

export function requestAPI(
  request: ReturnType<typeof prepareRequest>,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', request.url)
    xhr.timeout = 30000
    for (const [key, value] of Object.entries(request.headers))
      xhr.setRequestHeader(key, value)
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300)
        return reject(httpError(xhr.status))
      try {
        resolve(JSON.parse(xhr.responseText))
      } catch {
        reject(new Error('API 返回的不是有效 JSON，请检查 API 地址。'))
      }
    }
    xhr.onerror = () =>
      reject(new Error('无法连接 API，请检查网络和 API 地址。'))
    xhr.ontimeout = () =>
      reject(new Error('API 请求超时，原文未修改，请重试。'))
    xhr.send(JSON.stringify(request.body))
  })
}
