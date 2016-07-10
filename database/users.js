var mongoose = require('./db.js');
var db = mongoose.connection;
var Schema = mongoose.Schema;//创建模型
//定义用户模型及字段和类型
var userSchema = new Schema({
  name : String,
  password : String
});

userSchema.statics = {
  //查找所有数据
  fetch:function(cb){
    return this
    .find()
    .sort()
    .exec(cb);
  },
  //根据用户名和密码查找
  checkUser: function(userName, userPassword, cb){
    return this
    .find({name: userName, password: userPassword})
    .exec(cb);
  },
  //根据name查找对应用户
  findByName: function(userName, cb){
    return this
    .find({name: userName})
    .exec(cb);
  },
  //插入新用户，用户名和密码
  saveUser: function(userName, userPassword, cb){
    return this
    .save({name: userName, password: userPassword})
    .exec(cb);
  }
};

exports.user = db.model('users', userSchema);//与users集合关联
