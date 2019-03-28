$('.reg-phone').on("click",function(){
    $('.reg-em').hide();
    $('.reg-ph').show();
})
$('.reg-email').on("click",function(){
    $('.reg-ph').hide();
    $('.reg-em').show();
})
var check = {
    email(val) {
        const reg = /^\w+@\w+\.\w+$/;
        return reg.test(val);
    },
    username(val) {
        const reg = /^\w{6,13}$/;
        return reg.test(val);
    },
    age(val){
        const reg = /^\d/;
        return reg.test(val);
    },
    password(val) {
        const reg = /^\w{6,18}$/;
        return reg.test(val);
    },
    phone(val) {
        const reg = /^1[35789]\d{9}$/;
        return reg.test(val);

    }
}
var checkInput = (function () {
    let $inputAll,
        $form,
        $btn;
    return {
        init() {
            $form = document.querySelector('.form-box');
            $inputAll = document.querySelectorAll('.text-zz');
            $btn = document.querySelector('.btn');
            this.event();
            
        },
        event() {
            const self = this;
            for(let i = 0; i < $inputAll.length - 1; i++) {
                $inputAll[i].onblur = function() {
                    self.tips(this)
                }
            }
            $form['repassword'].onblur = function () {
                // 获取文本内容
                let text = this.value;
                const $p = this.nextElementSibling;
                const $box = $p.parentNode;
                if (text == $inputAll[3].value) {
                    // 验证成功
                    $p.innerHTML =' ';
                    $p.className = ' ';
                    $box.className = 'bg-succ';
                } else {
                    // 验证失败
                    $p.innerHTML = '两次密码输入不一致';
                    $p.className = 'bg-dan';
                }
            }
            $btn.onclick = function () {
                for (let i = 0; i < $inputAll.length; i++) {
                    const $input = $inputAll[i];
                    const $p = $input.nextElementSibling;
                    const $box = $p.parentNode;
                    if ($box.className != 'bg-succ') {
                        $input.focus();
                        return;
                    }
                }
            }
           
        },
        tips($input) {
            // 根据不同的表单， 使用不同的正则表达式
            const name = $input.name; //username
            const text = $input.value;
            const $p = $input.nextElementSibling;
            const $box = $p.parentNode;
            if (check[name](text)) {
                // 验证成功
                // $p.innerHTML = '验证成功';
                $p.innerHTML =' ';
                $p.className = ' ';
                $box.className = 'bg-succ';
            } else {
                // 验证失败
                $p.innerHTML = $input.getAttribute('data-error');
                $p.className = 'bg-dan';
            }
        }
    }
}())
// 初始化项目
checkInput.init();

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




