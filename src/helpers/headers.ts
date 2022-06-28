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

// 将字符串形式的 headers 换成对象类型
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })

  return parsed
}
