$(function() {
    //调用用户信息
    getUserInfo();
    var layer = layui.layer
        //点击按钮退出功能
    $('#btn-logout').on('click', function() {

        // 提示用户是否退出

        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储的 token
            localStorage.removeItem('token');
            ////2.重新跳转到登录页
            location.href = '/login.html'
                //关闭退出登录框

            layer.close(index);
        });
    })
});
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {

            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            renderAvatar(res.data)

        },


    })

}
//渲染用户头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src'.user.user_pic).show()
        $('.text-avater').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show();

    }

}