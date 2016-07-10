var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
//session
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var partials = require('express-partials');


var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: '12345',
  name: 'name',//这里的name值是cookie的name，cookie的name值默认是connect.sid
  cookie: {maxAge: 600000},//设置maxAge为60000ms,表示cookie和session失效的时间为10min
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({   //创建新的mongodb数据库
          host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
          port: 27017,          //数据库的端口号
          //db: 'blog',      //数据库的名称。
          url: 'mongodb://localhost/blog'//db这个属性报错
    })
}));


app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
// app.use('/', function(req, res, next){
//
//   if(!req.session.user_id){
//
//     console.log('未登录');
//     res.redirect('/login');
//   }else{
//     console.log('已登陆');
//   }
//   console.log(req.session.user_id);
//
// })

app.listen('3000');
console.log('blog start on 3000');

// // //注册
//  app.post('/reg', function(req, res) {
//     //检验用户两次输入的口令是否一致
//     res.send('password === ' + req.body['password']);
// //     // if (req.body['password-repeat'] != req.body['password']) {
// //     //   req.flash('error', '两次输入的口令不一致');
// //     //   return res.redirect('/reg');
// //     // }
//    });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
