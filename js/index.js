$(function(){

    // 获取用户基本信息
    getuserinfo()
})
// // 获取用户基本信息
    function getuserinfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 获取localStorage里的值
            // headers: {
            //     Authorization: localStorage.getItem('token')||''
            // },
           
            
            success: function (res) {
                if(res.status !==0){
                    
                    return layui.layer.msg('请求用户基本信息失败');
                }
                console.log(res);
                // 调用渲染头像的函数
                rederAvater(res.data);
            }
            // 不管调用成功或者失败，都会调用complete函数   
//             complete: function(res){
//                 // 使用res.responseJSON得到调用失败的信息
// console.log(res.responseJSON);
// if(res.responseJSON.status===1 && res.responseJSON.message==="身份认证失败！"){
//     // 清空token
//     localStorage.removeItem('token');
//     // 强制跳转到登录页
//     location.href='/login.html';
// }
//             }
        });
        }





// 渲染头像
function rederAvater(data){
    // 1 获取用户名称
    var name=data.nickname || data.username;
    // 2 设置欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name);
    //3.1 判断用户是否有图片头像
    if(data.user_pic!==null){
$('.layui-nav-img').attr('src',data.user_pic).show();
$('.text-avater').hide();
    }
    //3.2 渲染文本头像
    else{
        $('.layui-nav-img').hide();
        var first=name[0].toUpperCase();
        $('.text-avater').html(first).show;
    }

}
// 给退出按钮绑定点击事件
$('#out').on('click',function(){
    console.log('12');
    layui.layer.confirm('确定退出登录？',
     function(index){
        //do something
        // 清空本地存储中的token
        localStorage.removeItem('token')
        // 重新跳转到登陆页
        location.href='/login.html'
        // 关系confirm询问框
        layui.layer.close(index);
      });
})
