/**
 * @description 对请求中的 headers 进行处理
 * @author 氧化氢
 */

import { Method } from '../types'
import { deepMerge, isPlainObject } from './util'

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
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    const val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}

// 把 headers 这个对象拍成一级，就把 common 和对应 method 里面的内容取出来，返回一个新的 headers
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['get', 'delete', 'options', 'head', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
