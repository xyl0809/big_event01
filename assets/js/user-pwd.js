$(function () {
  var form = layui.form
  // 1 密码校验
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 2新旧密码确认
    samePwd: function (value) {
      if (value == $('[name=oldPwd]').val()) {
        return '新旧密码相同'
      }
    },
    // 3 确认密码与新密码确认
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致'
      }
    }
  })

  // 提交密码修改
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg(res.message)
        $('.layui-form')[0].reset()
      }
    })
  })

})