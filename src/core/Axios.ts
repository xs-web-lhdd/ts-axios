import {
  AxiosPromise,
  AxiosResponse,
  AxiosRquestConfig,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRquestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosResponse) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRquestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRquestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRquestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
  get(url: string, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRquestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRquestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRquestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        data,
        method,
        url
      })
    )
  }
}
