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