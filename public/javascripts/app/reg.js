$(function(){
  //登录
  var reg = {
    init: function(){
      //绑定事件
      this.bindEvent();
    },
    bindEvent:function(){
      $('.j_regBtn').on('click', function(){
        //调用注册接口
        $.ajax({
          url:'/reg',
          type:'post',
          dataType:'json',
          data:{
            username : $('#username')[0].value,
            password : $('#password')[0].value,
            password_repeat : $('#password-repeat')[0].value
          },
          success: function(result){
            switch (result.code){
              case '0': {
                //注册成功，请登录
                alert(result.msg);
                
              }break;
              case '1': {
                //用户已注册，请登录
                alert(result.msg);
              }break;
              case '2': {
                //注册失败，请重试
                alert(result.msg);
              }break;
              default:;
            }

          },
          error: function(e){
            alert('调用接口失败 ' + e.msg);
          }
        });
      });
    }
  };

  //注册
  reg.init();
});
