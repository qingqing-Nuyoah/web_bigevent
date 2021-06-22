// 注意： 每调用$.get或$.post() 或 $.ajax() 时候
// 会先调用这个函数
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起ajax 之前 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})