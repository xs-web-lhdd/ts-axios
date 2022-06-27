import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRquestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRquestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRquestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRquestConfig): string {
  const { url, params } = config

  return buildURL(url, params)
}

function transformRequestData(config: AxiosRquestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRquestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
