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
