const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

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

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))


const router = express.Router()

// 路由：
router.get('/simple/get', function(req, res) {
  res.json({
    msg: 'simple page is ok! hello world Simple Page!'
  })
})
// base 路由
router.get('/base/get', function(req, res) {
  res.json(req.query)
})
// post 路由
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
router.post('/postHeaders/plainObj', function(req, res) {
  res.json(req.body)
})
router.post('/basePromise/jest1', function(req, res) {
  res.json(req.body)
})
router.post('/basePromise/jest2', function(req, res) {
  res.json(req.body)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
})