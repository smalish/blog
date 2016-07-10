var mongoose = require('./db.js');
var bcrypt = require('bcrypt-nodejs');
var db = mongoose.connection;
var Schema = mongoose.Schema;//创建模型
//定义用户模型及字段和类型
var userSchema = new Schema({
  name : {
    type: String,
    unique: true//索引
  },
  password : String
});

//实例函数，只有实例才能调用
userSchema.methods = {
  comparePassword: function(_password, cb){
    bcrypt.compare(_password, this.password, function(err, isMatch){
      if(err) return cd(err);
      cb(null, isMatch);
    });
  }
};

//静态函数，只要引用了该模型就能调用静态方法
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
