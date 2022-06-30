/**
 * @desciption 配置合并文件
 * @author 氧化氢
 */

import { isPlainObject, deepMerge } from '../helpers/util'
import { AxiosRquestConfig } from '../types'

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 对待 url 这种属性，默认值没有，所以合并时需要存外面用户配置的而不是默认的所以用该函数：
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

// 给 url params data 这三个 key 做一个函数映射，这三种key调用 fromVal2Strat 函数，其他是 defaultStrat 函数
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRquestConfig,
  config2?: AxiosRquestConfig
): AxiosRquestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) mergeField(key)
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
