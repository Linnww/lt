$(function () {
  $("#form").bootstrapValidator({
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
          }
        }
      }
    }
  })
});