// 测试URL
var baseURL = 'http://ajax.frontend.itheima.net'
// ajaxPrefilter在调用ajax之前会被调用
$.ajaxPrefilter(function (options) {

  options.url = baseURL + options.url
// 配置请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers={
      Authorization:localStorage.getItem('token')||""
    }
  }
  // 拦截所有响应,进行身份验证 
  options.complete=function (res) {
    console.log(res.responseJSON);
    var obj=res.responseJSON
    if (obj.status == 1 && obj.message == '身份认证失败！') { 
      localStorage.removeItem('token')
      location.href='/login.html'
    }
  }
})