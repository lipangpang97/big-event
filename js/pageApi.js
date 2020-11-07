// 每次调用$.get或$.post或$.ajax的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，我们可以拿到给ajax提供的配置对象

$.ajaxPrefilter(function(options){
options.url='http://ajax.frontend.itheima.net'+ options.url;
// url里含有/my/的话，则加请求头Authorization
if(options.url.indexOf('/my/')!==-1){
    options.headers= {
    Authorization: localStorage.getItem('token')||''
};
// 不管调用成功或者失败，都会调用complete函数   
options.complete=function(res){
    // 使用res.responseJSON得到调用失败的信息
// console.log(res.responseJSON);
if(res.responseJSON.status===1 && res.responseJSON.message==="身份认证失败！"){
// 清空token
localStorage.removeItem('token');
// 强制跳转到登录页
location.href='/login.html';
}
}
}
});
 