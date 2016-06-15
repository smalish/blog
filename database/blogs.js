var mongoose = require('./db.js');
var db = mongoose.connection;
var Schema = mongoose.Schema;//创建模型
//定义博客集合的字段和类型
var blogSchema = new Schema({
  name : String,
  blogTitle : String,
  blogContent : String
});

blogSchema.statics = {
  //查找所有数据
  fetch:function(cb){
    return this
    .find()
    .sort()
    .exec(cb);
  },
  //根据用户姓名查找数据库下的博客
  findByName: function(t_name, cb){
    return this
    .find({name: t_name})
    .exec(cb);
  }


};

exports.blog = db.model('blogs', blogSchema);//与blogs集合关联
