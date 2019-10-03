$(function() {
  var currentPage = 1;
  var pageSize = 5;
  // 声明一个全局id和idDelete,以便于其他的函数进行获取
  var currentId;
  var isDelete;

  // 1.一进入页面,发送ajax请求先渲染一次
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        // 模板引擎渲染
        var htmlStr = template("tpl", info);
        $('.lt_content tbody').html(htmlStr);
        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total/info.size),
          // size: "small",
          onPageClicked: function(a,b,c,page){
            currentPage = page ;
            render();
          }
        })
      }
    })
  }

  // 2. 给所有启用禁用按钮, 添加点击事件(通过事件委托绑定), 显示模态框
  $('.lt_content tbody').on("click",".btn", function(){
    $('#userModal').modal("show");
    // 点击按钮,获取数对应的id
    currentId = $(this).parent().data('id');
    // console.log("当前用户的id为:" + currentId);

    // 0禁用  1启用
    // 通过类名来将数据传递给后台
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    

  });

  // 3. 点击模态框的确定按钮, 实现启用禁用切换
  $('#submitBtn').on("click", function(){
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success:  function(info) {
        // console.log(info);
        if(info.success){
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  });




});