$(function() {
    // 点击注册账号链接
    $('#link-reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击去登录的链接
    $('#link-login').on('click ', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 从layui 中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    //通过from.verigy()函数自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框的内容
                //还需要拿到密码框中的内容 然进行一次等于判断
                // 如果失败，则return一个 消息即可
                var pwd = $('.reg-box [name=password]').val();
                if (pwd != value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        //1.阻止默认提交行为
        e.preventDefault();
        //2.  发起ajax的post请求
        $.post('/api/reguser', {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功.请登录');
            // 模拟人的点击行为
            $('#link-login').click();

        })
    })
    $('#from_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！');
                // console.log(res.token);
                //  将登录成功的token 字符串 保存到 localStorage
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'


            }
        })
    })
})