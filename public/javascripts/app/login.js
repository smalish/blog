$(function(){
  //登录
  var login = {
    init: function(){
      //绑定事件
      this.bindEvent();
    },
    bindEvent:function(){
      $('.loginSubmit').on('click', function(){
        //传入参数
        var param = {
          name:$('#username')[0].value,
          password:$('#password')[0].value
        }
        //ajax调用登录接口
        $.ajax({
          url:'/login',
          type:'post',
          data:param,
          dataType:'json',
          success:function(result){
            console.log('result === ' + result);
          },
          error:function(xhr, errorType, error){
            console.log(error);
          }
        });
      });
    }
  };

  //登录
  login.init();
});
