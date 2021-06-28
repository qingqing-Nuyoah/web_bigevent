$(function() {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;

    //定义美化事件的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)


        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())


        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n

    }

    //定义一个查询的参数的对象，将来请求数据的时候
    //需要将请求的参数对象提交带服务器

    var q = {
        pagenum: 1, //页码值，默认请求第一页
        pagesize: 2, //每页显示几条数据，默认每页显示2条
        cate_id: '', //文章分类的 Id
        state: '' //文章的发布状态'
    };
    initTable()
    initCate()
        //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('获取数据信息失败')
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                //调用渲染分页
                renderPage(res.total)
            }

        })
    }


    //初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据分类失败')
                }
                //调用模板引起定义分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)


                //通过layui 重新渲染表单区域的ui 结构
                form.render()
            }
        })
    }


    //为筛选表单 绑定 submit事件
    $('#form_search').on('submit', function(e) {
        e.preventDefault();

        //获取表单中选项的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val()

        //为查询参数对象的 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state

        //根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })


    //定义渲染分页的方法
    function renderPage(total) {
        //调用laypage.render 方法来渲染分页的结构
        laypage.render({
            elem: 'pagBox', //分页容器
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, //设置默被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发JUMP回调
            //触发 jump 的方式有两种
            // 1.点击页码的时候，触发 jump 回调
            // 2.只要调用了laypage.render()方法，就会触发 jump 回调
            jump: function(obj, first) {



                //把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr


                //把最新的条目数，赋值到 q 这个查询参数对象中
                q.pagesize = obj.limit

                //根据最新的 Q  获取对应的数据列表 并渲染表格
                if (!first) {
                    initTable()
                }

            }
        });
    }
    //为删除按钮添加点击事件
    $('tbody').on('click', '.btn-delete', function() {
        //获取删除的个数
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')
            //询问用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功！')


                    //当数据删除完成后，需要判断 这一页中，是否还
                    // 有剩余数据， 如果没有剩余， 则让页码值 - 1
                    // 在重新调用数
                    if (len === 1) {
                        // 如果len等于1，证明删除完毕，页面上就没有任何数据了
                        //页码最小必须是1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()

                }

            })

            layer.close(index);
        });

    })

    $('body').on('click', '.btn-edit', function() {

        var id = $(this).attr('data-id')
        console.log(id);
        location.href = '/artlicle/art_list-copy.html?' + id;


    })

})