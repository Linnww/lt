// 设置进度条
// ajaxStart在第一个ajax发送时调用
$(document).ajaxStart(function() {
  NProgress.start();
});
$(document).ajaxStop(function() {
  setInterval(function() {
    NProgress.done();
  },500);
});


// 登录拦截功能, 登录页面不需要校验, 不用登录就能访问
// 前后分离了, 前端是不知道该用户是否登录了, 但是后台知道,
// 发送 ajax请求, 查询用户状态即可
// (1) 用户已登录, 啥都不用做, 让用户继续访问
// (2) 用户未登录, 拦截到登录页
if( location.href.indexOf("login.html") === -1){
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      dataType: "json",
      success: function(info) {
        console.log(info);
        if(info.success){
          console.log("用户已登录");
        }
        if(info.error === 400){
          location.href = "login.html";
        }
      }
  })
}


$(function() {
  // 1.分类管理的切换
  $('.nav .category').on("click",function(){
    $('.nav .child').slideToggle();
  });

  // 2.左侧侧边栏切换
  $('.icon_menu').on("click", function() {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  });

  // 3. 点击topbar退出按钮, 弹出模态框
  $('.icon_logout').click(function() {
    // 显示模态框, 显示模态框 modal("show");
    $('#logoutModal').modal("show");
  })

  $('#logoutBtn').click(function() {
    // 发送 ajax 请求, 进行退出
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功, 跳转到登录页了
          location.href = "login.html";
        }
      }
    })
  })
});