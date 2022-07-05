const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const path = require('path')
const atob = require('atob')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

const router = express.Router()

const {  
  registerBaseRouters,
  registerBasePromiseRouters,
  registerErrorRouters,
  registerExtendRouters,
  registerSimpleRouters,
  registerPostHeadersRouters,
  registerPostNoHeadersRouters,
  registerInterceptorRouters, 
  registerConfigRouters,
  registerCancelRouters,
  registerMoreRouters,
  } = registerRouters()

// 路由：
registerBaseRouters()
registerBasePromiseRouters()
registerErrorRouters()
registerExtendRouters()
registerSimpleRouters()
registerPostHeadersRouters()
registerPostNoHeadersRouters()
registerInterceptorRouters()
registerConfigRouters()
registerCancelRouters()
registerMoreRouters()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
})




/**
 * @description 存放后端路由
 * @author 氧化氢
 */
function registerRouters() {
  function registerMoreRouters() {
    router.get('/more/get', function(req, res) {
      res.json(req.cookies)
    })
    router.post('/more/upload', function(req, res) {
      console.log(req.body, req.files);
      res.end('upload success!')
    })
    router.post('/more/post', function(req, res) {
      const auth = req.headers.authorization
      console.log(auth);
      const [type, credentials] = auth.split(' ')
      console.log(atob(credentials));
      const [username, password] = atob(credentials).split(':')
      if(type === 'Basic' && username === 'James' && password === '123456') {
        res.json(req.body)
      } else {
        res.status(401)
        res.end('UnAuthorization')
      }
    })
    router.get('/more/304', function(req, res) {
      res.status(304)
      res.end()
    })
    router.post('/more/url', function(req, res) {
      res.json(req.body)
    })
  }

  function registerCancelRouters() {
    router.get('/cancel/get', function(req, res) {
      setTimeout(() => {
        res.json('hello')
      }, 1000)
    })

    router.post('/cancel/post', function(req, res) {
      setTimeout(() => {
        res.json(req.body)
      }, 1000)
    })
  }

  function registerConfigRouters() {
    router.post('/config/post', function(req, res) {
      res.json(req.body)
    })
  }

  function registerInterceptorRouters() {
    router.get('/interceptor/get', function(req, res) {
      res.end('hello')
    })
  }

  function registerExtendRouters() {
    router.get('/extend/get', function(req, res) {
     res.json({
       msg: 'hello world'
     })
    })
    router.options('/extend/options', function(req, res) {
      res.end()
    })
    router.delete('/extend/delete', function(req, res) {
      res.end()
    })
    router.head('/extend/head', function(req, res) {
      res.end()
    })
    router.post('/extend/post', function(req, res) {
      res.json(req.body)
    })
    router.put('/extend/put', function(req, res) {
      res.json(req.body)
    })
    router.patch('/extend/patch', function(req, res) {
      res.json(req.body)
    })

    router.get('/extend/user', function(req, res) {
      res.json({
        code: 0,
        message: 'ok',
        result: {
          name: 'James',
          age: 18
        }
      })
    })
  }
  
  function registerErrorRouters() {
    router.get('/error/get', function(req, res) {
      if(Math.random() > 0.5) {
        res.json({
          msg: 'hello world'
        })
      } else {
        res.status(500)
        res.end()
      }
    })
    router.get('/error/timeout', function(req, res) {
      setTimeout(() => {
        res.json({
          msg: 'hello world'
        })
      }, 3000)
    })
  }
  
  function registerBasePromiseRouters() {
    router.post('/basePromise/jest1', function(req, res) {
      res.json(req.body)
    })
    router.post('/basePromise/jest2', function(req, res) {
      res.json(req.body)
    })
  }
  
  function registerPostHeadersRouters() {
    router.post('/postHeaders/plainObj', function(req, res) {
      res.json(req.body)
    })
  }
  
  function registerPostNoHeadersRouters() {
    router.post('/postNoHeaders/plainObj', function(req, res) {
      res.json(req.body)
    })
    router.post('/postNoHeaders/buffer', function(req, res) {
      // 传输 buffer 数据的传输方案
      let msg = []
      req.on('data', (chunk) => {
        if(chunk) msg.push(chunk)
      })
      req.on('end', () => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
      })
    })
  }
  
  function registerBaseRouters() {
    router.get('/base/get', function(req, res) {
      res.json(req.query)
    })
  }
  
  function registerSimpleRouters() {
    router.get('/simple/get', function(req, res) {
      res.json({
        msg: 'simple page is ok! hello world Simple Page!'
      })
    })
  }

  return {
    registerBaseRouters,
    registerBasePromiseRouters,
    registerErrorRouters,
    registerExtendRouters,
    registerSimpleRouters,
    registerPostHeadersRouters,
    registerPostNoHeadersRouters,
    registerInterceptorRouters,
    registerConfigRouters,
    registerCancelRouters,
    registerMoreRouters,
  }
}