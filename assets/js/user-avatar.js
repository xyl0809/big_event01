$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 图片上传
  $('#btnChooseImage').click(function () {
    $('#file').click()
  })
  var layer = layui.layer
  $('#file').on('change', function (e) {
    // 拿到用户选择的文件
    var file = this.files[0]
    if (file === undefined) {
      return layer.msg('请选择图片')
    }
    // 根据选择的文件，创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(file)
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $('#image')
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  $('#btnUpload').on('click', function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        window.parent.getUserInfo()
      }
    })
  })




})