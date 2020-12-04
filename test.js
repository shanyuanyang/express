// 新开一个文件夹 test.js 只引入 express
const express = require('express')
const app = express()
app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})
app.use((req, res, next) => {
  // 假设在处理 cookie
  req.cookie = {
    userId: 'abc123'
  }
  next()
})
app.use((req, res, next) => {
  // 假设在处理 post data
  // 异步
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})
app.use('/api/blog/list', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})
// 使用 app.get
app.get('/api/blog/list', (req, res, next) => {
  console.log('处理 get /api 路由')
  next()
})
// 使用 app.post
app.post('/api/blog/list', (req, res, next) => {
  console.log('处理 post /api 路由')
  next()
})