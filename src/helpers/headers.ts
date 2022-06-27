/**
 * @description 对请求中的 headers 进行处理
 * @author 氧化氢
 */

import { isPlainObject } from './util'

function normalzeHeaderName(headers: any, normalzeHeaderName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalzeHeaderName && name.toUpperCase() === normalzeHeaderName.toUpperCase()) {
      headers[normalzeHeaderName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalzeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
