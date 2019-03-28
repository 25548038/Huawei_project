var baidu = (function () {
    let $box, $input, $ulbox,$timer;
    return {
        init(ele) {
            $box = document.querySelector(ele);
            $input = $box.firstElementChild;
            $ulbox = $box.querySelector('.show-tips');
            this.event();
        },
        event() {
            var _this = this;
            $input.onfocus = function () {
                _this.show();
            }
            $input.onclick = function(e) {
                e.stopPropagation();
            }
            $input.oninput = function () {
                if (this.value.trim() == '') {
                    _this.hidden();
                } else {
                    clearTimeout($timer);
                    $timer = setTimeout(_ => {
                        _this.getData(this.value);
                        _this.show();
                    }, 500)
                }
            }
            document.onclick = function () {
                _this.hidden();
            }
            $ulbox.onclick = function (e) {
                // console.log(1);
                if(e.target.nodeName === 'LI') {
                    $input.value = e.target.innerHTML;   
                }
            }
        },
        show() {
            if ($input.value.trim() != '')
                $ulbox.style.display = 'block'
        },
        hidden() {
            $ulbox.style.display = 'none'
        },
        getData(val) {
            const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
            const data = {
                wd: val,
                cb: "baidu.insertData"
            }
            sendJsonp(url, data);
        },
        insertData(data) {
            $ulbox.innerHTML = '';
            data.s.forEach(x => {
                const $li = document.createElement('li');
                $li.innerHTML = x;
                $ulbox.appendChild($li);
            })
        }
    }
}())
function sendJsonp(url, data) {
    const $script = document.createElement('script');
    // get请求需要把数据拼接到url中
    for(let attr in data) {
        url += `&${attr}=${data[attr]}`;   
    }
    url += '&_=' + Date.now();
    if(!url.includes('?'))
        url = url.replace('&', '?');
        
    $script.src = url;
    document.body.appendChild($script);
}