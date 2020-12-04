var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 引入解析cookie的中间件
var logger = require('morgan'); //引入记录日志文件插件


// 引入两个路由文件  routers文件中的
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup 与前端有关 忽略
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use()使用中间件
app.use(logger('dev')); //使用引入的日志文件
app.use(express.json()); //响应post请求json格式
app.use(express.urlencoded({ extended: false })); //响应post请求非josn格式  常用表单结构数据
app.use(cookieParser()); //使用引入的cookiePAarser中间件 解析cookie
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //根路由指向 indexRouter
app.use('/users', usersRouter);//   /users 这个路由指向 usersRouter 下级路由 /users/info等等

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 找不到的路径跳转 404
  next(createError(404));
});

// error handler
// 对程序错误的一些处理，抛出错误信息和对应的状态码
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 根据环境判断，只在本地环境输出错误信息
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
