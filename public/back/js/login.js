$(function () {

  // 1.进行表单校验
  $("#form").bootstrapValidator({
    
     //设置小图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    // 指定校验字段
    fields: {
      username: {
        // 校验的规则
        validators: {
          // 不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度为2到6位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度为6到12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  // 2.进行登录请求
  $('#form').on("success.form.bv", function (e) {
    // 阻止表单提交
    e.preventDefault();

    $.ajax({
      type: "post",
      data: $('#form').serialize(),
      url: "/employee/employeeLogin",
      dataType: "json",
      success: function(info){
        // console.log(info);
        if(info.success){
          location.href="index.html";
        }
        // 用户名不存在
        if(info.error === 1000 ){
          // NOT_VALIDATED, VALIDATING, INVALID or VALID
          $('#form').data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }
        // 密码错误
        if(info.error === 1001 ) {
          $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }

      }
    });
  });

  // 3.进行表单重置
  $('[type="reset"]').on("click", function () {
    $('#form').data('bootstrapValidator').resetForm();
  });


});