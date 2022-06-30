import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { AxiosPromise, AxiosResponse, AxiosRquestConfig } from '../types'
import xhr from './xhr'
import transform from './transform'

export default function dispatchRequest(config: AxiosRquestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRquestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRquestConfig): string {
  const { url, params } = config

  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)

  return res
}
