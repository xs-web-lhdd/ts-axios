/**
 * @description error 测试用例
 * @author 氧化氢
 */

import axios, { AxiosError } from '../../src/index'

// 现在只能拿到错误的文本信息：
// axios({
//   method: 'get',
//   url: '/error/get1'
// }).then(res => {
//   console.log(res);
// }).catch(e => {
//   console.log(e);
// })

// axios({
//   method: 'get',
//   url: '/error/get'
// }).then(res => {
//   console.log(res);
// }).catch(e => {
//   console.log(e);
// })

// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   }).then(res => {
//     console.log(res);
//   }).catch(e => {
//     console.log(e);
//   })
// }, 5000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// }).then(res => {
//   console.log(res);
// }).catch(e => {
//   console.log(e.message);
// })


// 定义完错误：
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
  console.log(e.code);
  console.log(e.config);
  console.log(e.request);
  console.log(e.isAxiosError);
})