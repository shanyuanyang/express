var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 引入解析cookie的中间件
var logger = require('morgan'); //引入记录日志文件插件
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const fs = require('fs')


// 引入两个路由文件  routers文件中的
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
var app = express();

// view engine setup 与前端有关 忽略
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

// app.use()使用中间件
app.use(logger('dev')); //使用引入的日志文件
app.use(express.json()); //响应post请求json格式
app.use(express.urlencoded({
  extended: false
})); //响应post请求非josn格式  常用表单结构数据
app.use(cookieParser()); //使用引入的cookiePAarser中间件 解析cookie
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',   // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))
// app.use('/', indexRouter); //根路由指向 indexRouter
// app.use('/users', usersRouter);//   /users 这个路由指向 usersRouter 下级路由 /users/info等等

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) { // 找不到的路径跳转 404
  next(createError(404));
});

// error handler
// 对程序错误的一些处理，抛出错误信息和对应的状态码
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 根据环境判断，只在本地环境输出错误信息
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;