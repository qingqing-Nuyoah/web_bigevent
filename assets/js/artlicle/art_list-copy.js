$(function() {
    var form = layui.form

    var url = location.href
    console.log(url);
    var num = url.indexOf('?')
    var id = url.substr(num + 1);
    console.log(id);
    artCopy();

    function artCopy() {
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function(res) {
                console.log(res);
                // form.val('form-pub', res.data)
                $('[name=title]').val(res.data.title)
                $('[name=cate_id]').val(res.data.cate_id)
                $('[name=content]').val(res.data.content)
                $('[name=cover_img]').attr("src", res.data.cover_img)

            }
        })
    }

})