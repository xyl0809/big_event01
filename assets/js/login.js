$(function () {
  // 点击显示与隐藏
  // 点击登录表单跳转到年注册表单
  $('#link-reg').on('click',function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击注册表单跳转到登录表单
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
  var layer=layui.layer
  $('#form-reg').on('submit',function (e) {
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: {
        username:$('.reg-box [name=username]').val(),
        password:$('.reg-box [name=password]').val(),
      },
      success:function (res) {
        if (res.status !== 0) {
          // alert(res.message)
          return layer.msg(res.message)
        }
        // alert(res.message)    
        layer.msg(res.message)
        // 自动点击
        $('#link-login').click()
        // 清空表单
        $('#form-reg')[0].reset()
        
      }
    })
  })

// 登录功能
  $('#login-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/api/login',
      data: $(this).serialize(),
      success:function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        localStorage.setItem('token', res.token);
        location.href='/index.html'
      }
    })
  })

})