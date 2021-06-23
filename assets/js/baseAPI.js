// 注意： 每调用$.get或$.post() 或 $.ajax() 时候
// 会先调用这个函数
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起ajax 之前 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    //统一为有权限的接口，这只headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    };
    //全局统一挂载 compele 回调函数

    options.complete = function(res) {
        ////无论成功还是失败 最终都会调用complete回调函数
        // console.log(res);
        //在compele回调 中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空 token
            localStorage.removeItem('token')
                //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})