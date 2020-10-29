$(function () {
  //定义校验规则
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '长度在1~6位之间'
      }
    },
  })

  initUserinfo()

  // 获取用户信息 封装函数
  var layer = layui.layer
  function initUserinfo () {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(res);
        // 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }
  // 表单重置
  $('#btnReset').on('submitm', function (e) {
    // 阻止默认重置行为
    e.preventDefault()
    // 调用获取用户信息函数 重新渲染
    initUserinfo()
  })

  // 提交修改
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 调用父页面的 getUserInfo()函数
        window.parent.getUserInfo()
      }
    })
  })


})
