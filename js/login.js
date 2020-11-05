$(function () {
  // 给注册和登录链接绑定click事件切换
  $("#link-reg").click(function () {
    $(".reg").show();
    $(".login").hide();
  })

  $("#link-login").click(function () {
    $(".login").show();
    $(".reg").hide();
  })

  // 给表单加入验证条件
  var form = layui.form
  form.verify({
    // 密码框
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码框输入是否一致
    repwd: function (value) {
      var pwdval = $('.reg [name="password"]').val();
      if (pwdval !== value) {
        return '两次输入的密码不一致！'
      }
    }
  });
  
  // 注册表单提交，发起post请求
    $(".reg").on('submit',function(e){
      // 阻止默认提交行为
e.preventDefault();
var layer=layui.layer
// 把参数对象赋值给data
var data={username:$('#regname').val(),password:$('#regpwd').val()};
$.post('/api/reguser',data,
function(res){
if(res.status!==0){
  // 使用layui弹出层提示框
  return layer.msg('注册失败！');
}layer.msg('注册成功！请登录');
$("#link-login").click();

})
    })

    // 登录表单提交
    $('.login').on('submit',function(e){
       // 阻止默认提交行为
e.preventDefault();
var layer=layui.layer
var data={username:$('#loginname').val(),password:$('#loginpwd').val()};
$.post('/api/login',data,function(res){
  if(res.status!==0){
    // 使用layui弹出层提示框
    return layer.msg('登录失败！');
  }layer.msg('登录成功');
  console.log(res.token);
  // 把res.token存到本地存储
  localStorage.setItem('token',res.token);
  // 跳转到后台主页
  location.href='/index.html';
 
})
    })

})