$(function () {
  var layer = layui.layer
  initArtCaseList()
  // 封装函数 渲染添加数据模板
  function initArtCaseList () {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        var htmlStr = template('tpl-list', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 点击分类出现弹窗
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '270px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    });
  })

  // 渲染分类内容
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res, message)
        }
        initArtCaseList()
        layer.msg(res.message)
        layer.close(indexAdd)
      }
    })
  })

  // 渲染编辑内容
  var indexEdit = null
  var form = layui.form
  // 渲染表格
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '270px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    });
    // 渲染内容
    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  // 修改提交
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res, message)
        }
        layer.close(indexEdit)
        initArtCaseList()
      }
    })
  })
  // 删除
  $('body').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res, message)
          }
          initArtCaseList()
          layer.msg(res, message)
        }
      })
      layer.close(index);
    });
  })
})