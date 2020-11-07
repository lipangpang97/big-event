$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options)

    //   给上传按钮添加点击事件
    $('#upload').on('click', function () {
        $('#file').click();
    })

    // 给选择文件的input绑定change事件,当选择文件后就会触发
    $('#file').on('change', function (e) {
        console.log(e);
        var fileChoosen = e.target.files;
        if (fileChoosen.length == 0) {
            layui.layer.msg('请选择照片！')
        }
        // 1拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3. 先 销毁 旧的裁剪区域，再 重新设置图片路径 ，之后再 创建新的裁剪区域 ：

        // 销毁旧的裁剪区域 
        $image.cropper('destroy')
            // 重新设置图片路径 
            .attr('src', newImgURL)
            // 重新初始化裁剪区域
            .cropper(options)

    })

    // 给确定按钮绑定点击事件
    $('#uploadsure').on('click',function(){
        // 1：拿到用户裁剪之后的头像
        var dataURL = $image .cropper('getCroppedCanvas', { 
            // 创建一个 Canvas 画布 
            width: 100, 
            height: 100 })
            .toDataURL('image/png') 
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

            // 调用ajax请求，把头像上传到服务器
            $.ajax({
                method: "POST",
                url: "/my/update/avatar",
                data: {
                    avatar:dataURL
                },
               
                success: function (res) {
                    if(res.status!==0){
                        return  layui.layer.msg('更换头像失败！')
                    }console.log(res);
                    layui.layer.msg('更换头像成功！')
                    // 重新获取用户信息，渲染头像
                    window.parent. getuserinfo();
                }
            });
    })

})