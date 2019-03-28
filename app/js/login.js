$('.login-left').on("click",function(){
    $('.login-hiden').hide();
    $('.login-form').show();
    $('.login-left').css("color","red");
    $('.login-right').css("color","black");
})
$('.login-right').on("click",function(){
    $('.login-form').hide();
    $('.login-hiden').show();
    $('.login-right').css("color","red");
    $('.login-left').css("color","black");
})

var cookie = {
    set(key, value, day) {
        // 添加/修改cookie
        document.cookie = `${key}=${value}; max-age=${day*24*3600}; path=/`;
    },
    get(key) {
        // 获取cookie
        var str = document.cookie;
        // d=20; age=20; data=111
        var arr = str.split('; ');
        // ['d=20', 'age=20', 'data=111']
        var obj = {};
        arr.forEach(x => {
            var _arr = x.split('=');
            // ['d', 20]
            obj[_arr[0]] = _arr[1];
        })
        return obj[key];
    },
    delete(key) {
        // 删除cookie
        this.set(key, '', -1);
    }
}

$('.btn').on('click',function(){
    cookie.delete('phone');
    cookie.set('phone',$('#phone').val(),1);
})



// $('#phone').change(function() {
//     $.post("server/login1.php");
// })

