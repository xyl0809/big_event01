// 入口函数
$(function () { 


  getUserInfo()
  })
// 封装一个获取用户信息的函数
function getUserInfo () {
  $.ajax({
    url: '/my/userinfo',
    // 设置请求头 拿到用户信息
    // headers: {
    //   Authorization:localStorage.getItem('token')||""
    // },
    success: function (res) {
      if (res.status !== 0) { 
      console.log(res);
        return layui.layer.msg('失败')
      }
      renderAvatar(res.data)
    }
  })
}
function renderAvatar (user) { 
  console.log(user);
// 用户名
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎' + name)
  // 用户头像
  if (user.user_pic !== null) { 
    // 有头像
    $('.layui-nav-img').show().attr('scr', user.user_pic)
    $('.text-avatar').hide()
  }
  else {
    // 没有头像
    console.log(name);
    var text=name[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text-avatar').show().html(text)
  }
}