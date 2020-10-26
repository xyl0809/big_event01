$(function () {
  // 点击显示与隐藏
  $('#link-reg').on('click',function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link-login').on('click',function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 2 自定义密码校验规则
  var form = layui.form;
  form.verify({
    // 密码规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
// 确认密码校验
    repwd: function (value) {
      // value是获取的密码值
      var pwd = $('.reg-box [name=password]').val()
      if (value !==pwd) {
        return'密码不一致,重新输入'
      }
    }
  })

  // 注册功能
  $('#form-reg').on('submit',function (e) {
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data: {
        username:$('.reg-box [name=username]').val(),
        password:$('.reg-box [name=password]').val(),
      },
      success:function (res) {
        if (status !== 0) {
          alert(res.message)
        }
        alert(res.message)        
      }
    })
  })
})