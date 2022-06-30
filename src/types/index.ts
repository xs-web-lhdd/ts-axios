export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRquestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  [propNames: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRquestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRquestConfig
  code?: number | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRquestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRquestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRquestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRquestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRquestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRquestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRquestConfig): AxiosPromise<T>
  post<T = any>(urL: string, data?: any, config?: AxiosRquestConfig): AxiosPromise<T>
  put<T = any>(urL: string, data?: any, config?: AxiosRquestConfig): AxiosPromise<T>
  patch<T = any>(urL: string, data?: any, config?: AxiosRquestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRquestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRquestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRquestConfig): AxiosInstance
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
