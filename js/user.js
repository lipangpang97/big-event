$(function(){
    // 表单验证
    var form=layui.form;
    form.verify({
        nickname: function(value){
          if(value.length>6){
              return '昵称长度必须在1~6个字符之间！'
          }
        }
    })

    getUserInfo();


})

// 初始化用户信息
function getUserInfo(){
    var form=layui.form;
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
    
        
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败！')

            }console.log(res);
            form.val('userInfo', res.data);
        }
    });
}
$('#btnreset').on('click',function(e){
e.preventDefault();
getUserInfo();
})

// 监听表单提交事件
$('.layui-form').on('submit',function(e){
    e.preventDefault();
// 发起ajax请求
$.ajax({
    method: "POST",
    url: "/my/userinfo",
    data: $(this).serialize(),
    success: function(res){
        if(res.status!==0){
            return layui.layer.msg('提交用户信息失败！')
        }
        layui.layer.msg('更新用户信息成功')
        console.log( res);
        // 调用父页面index中的方法，来重新渲染用户的头像和信息
        window.parent. getuserinfo();

    }
})

})
