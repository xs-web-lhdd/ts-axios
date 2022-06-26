import { AxiosRquestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRquestConfig): void {
  xhr(config)
}

export default axios
