/**
 * @description 测试 extend demos
 * @author 氧化氢
 */

import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'h1'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'h1'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', {msg: 'post'})

axios.put('/extend/put', {msg: 'put'})

axios.patch('/extend/patch', {msg: 'patch'})

// 测试 axios 的两种传参格式:
axios({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: '测试 axios 的传参(config)方式一'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: '测试 axios 的传参(url+config)方式二'
  }
})

// 测试泛型:

interface ResponseData<T = any> {
  code: number,
  result: T,
  message: string
}

interface User {
  name: string,
  age: number
}

function getUser() {
  return axios<ResponseData<User>>('/extend/user')
          .then(res => res.data)
          .catch(e => console.log(e))
}

async function test() {
  const user = await getUser()
  if(user) {
    console.log(user.result.name);
  }
}

test()