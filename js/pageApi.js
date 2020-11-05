// 每次调用$.get或$.post或$.ajax的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，我们可以拿到给ajax提供的配置对象

$.ajaxPrefilter(function(options){
options.url='http://ajax.frontend.itheima.net'+options.url;

});
 