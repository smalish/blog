var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var http = require('http');

var app = express();

var User = require('../database/db').user;//获取mongodb中的users集合

/* GET home page. */
//主页------------------------------------------------------------------------
router.get('/', function(req, res, next) {


  res.render('index', {
    c_user: req.session.c_user == undefined ? '': req.session.c_user, //当前用户名
    userMap: req.session.userMap, //已注册用户
    title: '主页',
    layout: 'layout'
  });


});

//登录------------------------------------------------------------------------
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '登录',
    c_user: req.session.c_user == undefined ? '': req.session.c_user, //当前用户名
    layout: 'layout'
  });
});

router.post('/login', function(req, res, next) {

  var name = req.body['username'];
  var psd = req.body['password'];

  User.findUser(name, psd, function(err,docs){
    if(!err){
      if(docs){
        console.log(docs);
        console.log('登陆成功');
      }else{
        console.log('用户名或密码错误')
      }
    }else{
      console.log(err);
    }

  });

  // var name = req.body['username'];
  // console.log('login ===' + name);
  // var psd = userMap[name];
  // //用户名是否存在
  // if (psd) {
  //   //用户名存在，校验密码
  //   if (psd == req.body['password']) {
  //     //密码正确,跳转到首页
  //     //当前用户名
  //     req.session.c_user = name;
  //     return res.redirect('/');
  //   } else {
  //     //密码错误，提示密码错误，重新输入
  //     alert('用户名或密码错误');
  //
  //   }
  //
  // } else {
  //   //用户名不存在，提示请先注册
  //   alert('该用户名还未注册，请先注册')
  //
  // }
});

//注册-------------------------------------------------------------------------
router.get('/reg', function(req, res, next) {

  res.render('reg', {
    title: '注册',
    userMap: req.session.userMap, //注册用户map
    layout: 'layout'
  });
});

router.post('/reg', function(req, res) {

  if (req.body['password-repeat'] != req.body['password']) {
    res.send('error', '两次输入的口令不一致');
    return res.redirect('/reg');
  }

  var name = req.body['username'];
  var psw = req.body['password'];

  //检查用户名是否已经存在
  if (userMap[name]) {
    //用户名已存在
    alert('该用户已注册，请登录');
  } else {
    //用户名不存在
    userMap[name] = psw;
    req.session.userMap = userMap;
    console.log('注册成功');
    return res.redirect('/');
  }

});

//我的博客页面
router.get('/userBlog/:username', function(req, res, next) {

  res.render('userBlog', {
    title: '我的博客',
    username: '',
    layout: 'layout'
  });
});




module.exports = router;
