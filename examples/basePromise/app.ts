/**
 * @description 测试 promise 的基本实现
 * @author 氧化氢
 */

import axios from '../../src/index'

axios({
  method: 'post',
  url: '/basePromise/jest1',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
})

axios({
  method: 'post',
  url: '/basePromise/jest2',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res);
})