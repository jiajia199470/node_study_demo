var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//浏览器上显示的icon
var logger = require('morgan');//日志输出
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');//模板引擎

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();

//解决跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    // if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    // else
      next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));//模板目录
// app.set('view engine', 'jade');//设置jade模板视图引擎
//在nodejs中如使用express框架，她默认的是ejs和jade渲染模板。x如果使用了html模板，需要加上这两句
// app.engine('.html', ejs.__express);app.set('view engine', 'html');
app.engine('.html',ejs.__express);//设置html模板引擎
app.set('view engine','html');//设置视图引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
