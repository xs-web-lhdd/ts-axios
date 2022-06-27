/**
 * @description 测试 post(没有headers) 请求以及携带参数
 * @author 氧化氢
 */

import axios from '../../src';

axios({
  url: '/postNoHeaders/plainObj',
  method: 'post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  url: '/postNoHeaders/buffer',
  method: 'post',
  data: arr
})