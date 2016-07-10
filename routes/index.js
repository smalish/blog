var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var http = require('http');

var app = express();

var User = require('../database/users').user;//获取mongodb中的users集合
var Blog = require('../database/blogs').blog;//获取mongodb中的blogs集合

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

  var name = req.body.name;
  var psd = req.body.password;
  //验证用户名和密码是否正确
  User.checkUser(name, psd, function(err,docs){
    if(!err){
      if(docs.length > 0){
        console.log(docs);
        console.log('登陆成功');
        res.send({
          code:'0',
          msg:'登录成功',
          data:{
            name: docs[0].name
          }
        });
        res.end();//如果不执行end()，则前端一直等待response状态

      }else{
        console.log('用户名或密码错误')

        res.send({
          code:'1',
          msg:'用户名或密码错误'
        });
        res.end();
      }
    }else{
      console.log(err);
    }

  });

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

  var userName = req.body['username'];
  var psw = req.body['password'];
  var rePsw = req.body['password-repeat'];

  if (psw != rePsw) {
    res.send('error', '两次输入的口令不一致');
    return res.redirect('/reg');
  }

  //检查用户名是否已经存在
    User.findByName(userName, function(err, docs){
      if(!err){
        if(docs.length > 0){
          console.log('该用户已注册，请登录');

        }else{
          console.log('是新用户');
          //新建一个用户文档
          var c_user = new User({
            "name":userName,
            "password":psw
          });
          //保存注册用户信息到数据库
          c_user.save(function(err, docs){
            if(!err){
              if(docs){
                console.log(docs);
                console.log('注册成功，请登录');
              }
            }else{
              console.log(err);
            }
          });

        }
      }else{
        console.log(err);
      }
    });


});

//我的博客页面-----------------------------------------------------------

router.get('/userBlog/:name', function(req, res, next) {

  // //用户姓名
  var t_name = req.params.name;

  //通过name查询用户的所有博客
  Blog.findByName(t_name, function(err, docs){
    if(!err){
      if(docs.length > 0){
        //将查找的blog渲染到页面
        res.render('userBlog', {
          title: '我的博客',
          username: t_name,
          myblogs: docs,
          layout: 'layout'
        });
      }else{
        console.log('未查找到blog')
      }
    }else{
      console.log(err);
    }
  });

  router.post('/userBlog/saveBlog', function(req, res, next){
    //获取ajax传入信息
    var userName = req.body.userName;
    var title = req.body.blogTitle;
    var content = req.body.blogContent;
    //新建Blog对象
    var myblog = new Blog({
      name : userName,
      blogTitle : title,
      blogContent : content
    });
    //保存到数据库
    myblog.save(function(err, docs){
      if(!err){
        if(docs){
          console.log(docs);
          res.send({
            code:'0',
            msg:'发表博客成功'
          });
          res.end();
        }
      }else{
        console.log(err);
        res.send({
          code:'1',
          msg:'发表博客失败'
        });
        res.end();
      }
    });

  });

});




module.exports = router;
