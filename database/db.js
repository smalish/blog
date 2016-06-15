var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blog');//连接本地数据库blog

module.exports = mongoose;//提供集合使用
