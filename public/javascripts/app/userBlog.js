$(function(){
  //登录
  var UserBlog = {
    init: function(){
      //绑定事件
      this.bindEvent();
    },
    bindEvent:function(){
      //发表博文按钮
      $('.j_submit_blog').unbind().on('click', function(){
        var _name = $('.j_blog_user').text();
        var _blogTitle = $('.j_blog_title')[0].value;
        var _blogContent = $('.j_blog_content')[0].value;
        $.ajax({
          url:'/userBlog/saveBlog',
          type:'post',
          dataType:'json',
          data:{
            userName : _name,
            blogTitle : _blogTitle,
            blogContent : _blogContent
          },
          success: function(result){
            console.log('result===' + result);
            if(result.code == '0'){
              alert('发表博客成功');
              //不用刷新网页，直接把刚才的博客加入DOM中即可
              var newBlog = "<li><p>111</p><h5>"+ _blogTitle +"</h5><p>"+ _blogContent +"</p></li>";
              $('.j_blogs_ul').append(newBlog);
              //清空输入框的内容
              $('.j_blog_title')[0].value = '';
              $('.j_blog_content')[0].value = '';
            }else{
              alert('发表博客失败，请重试')
            }
          },
          error: function(e){
            alert(e.message);
          }
        })
      });
    }
  };

  //注册
  UserBlog.init();
});
