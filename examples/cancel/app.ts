/**
 * @description 测试 cancel 功能的 demos
 * @author 氧化氢
 */

import axios, { Canceler } from '../../src'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if(axios.isCancel(e)) {
    console.log(`Request canceled`, e.messag);
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')
  
  axios.post('/cancel/post', {a: 1}, {
    cancelToken: source.token
  }).catch(function(e) {
    if(axios.isCancel(e)) {
      console.log(e.message);
    }
  })
})

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if(axios.isCancel(e)) {
    console.log('Request canceled'); 
  }
})

setTimeout(() => {
  cancel()
}, 500)