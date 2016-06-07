var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blog');//连接本地数据库blog
var Schema = mongoose.Schema;//创建模型
//定义用户模型及字段和类型
var userSchema = new Schema({
  name : String,
  name : String
});

userSchema.statics = {
  //查找所有数据
  fetch:function(cb){
    return this
    .find()
    .sort()
    .exec(cb);
  }
};

exports.user = db.model('users', userSchema);//与users集合关联
