$(function(){
    var form=layui.form;
    form.verify({
       pwd :[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
         samePwd:function(value){
            if(value==$('#oldPwd').val()){
                return '新密码不能和原密码相同'
            }
         } ,
        rePwd:function(value){
          if(value!==$('#newPwd').val()){
            return '两次输入密码不相同'
          }
        } 

    })

   
    // 绑定提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            
            success: function (res) {
               if(res.status!==0){
return layui.layer.msg('修改密码失败！')
               } layui.layer.msg('修改密码成功！')
               console.log(res);
            //    重置表单
            $('.layui-form')[0].reset();
            }
        });
    })
})