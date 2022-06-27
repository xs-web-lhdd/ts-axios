/**
 * @description 测试 post(有headers) 请求以及携带参数
 * @author 氧化氢
 */

import axios from '../../src';

axios({
  method: 'post',
  url: '/postHeaders/plainObj',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/postHeaders/plainObj',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/postHeaders/plainObj',
  data: searchParams
})