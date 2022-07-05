/**
 * @description 测试更多的接口扩展 demos
 * @author 氧化氢
 */

import axios from '../../src'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AxiosError } from '../../src/helpers/error';

// // 跨域携带 cookie ：
// document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res);
// })

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res);
// })

// // xsrf 防御功能：
// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res);
// })


// 验证上传和下载：
// const instance = axios.create()

// function calculcatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }

// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }

//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e);
//       NProgress.set(calculcatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }

//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }

//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgressBar()

// const downloadEl = document.getElementById('download')

// downloadEl!.addEventListener('click', e => {
//   // 输入下载图片的 url
//   instance.get('')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if(fileEl.files) {
//     data.append('file', fileEl.files[0])

//     instance.post('/more/upload', data)
//   }
// })

// http 授权：
// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'James',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res);
// })

// 验证自定义合法授权码：
// axios.get('/more/304').then(res => {
//   console.log(res);
// }).catch((e: AxiosError) => {
//   console.log(e.message);
// })

// axios.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res);
// }).catch((e: AxiosError) => {
//   console.log(e.message);
// })

// 自定义参数序列化：
// import qs from 'qs'

// axios.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res);
// })

// axios.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res);
// })

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })

// instance.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res);
// })

// baseURL：
// let instance = axios.create({
//   baseURL: 'http://localhost:8080'
// })

// instance.post('/more/url', {
//   a: 1,
//   b: 2
// })

// instance.post('http://localhost:8080/more/url', {
//   c: 3,
//   d: 4
// })