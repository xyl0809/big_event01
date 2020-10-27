// 测试URL
var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
  options.url=baseURL+options.url
})