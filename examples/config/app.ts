/**
 * @description 测试合并 config 的 demos
 * @author 氧化氢
 */

import axios, { AxiosTransformer } from '../../src'
import qs from 'qs'

// 测试 config 中 headers 的合并
axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data);
})


// 测试 transform：
axios({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {      
      if(typeof data === 'object') data.b = 2

      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    c: 100
  }
}).then(res => {
  console.log(res.data);
})

// 测试 axios.create
let instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {      
      if(typeof data === 'object') data.b = 2

      return data
    }
  ]
})
instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data);
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    c: 1
  }
}).then(res => {
  console.log(res.data);
})