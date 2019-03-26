define(['jquery', 'loading'], (function($, public) {
    var $friend_l,
        $friend_2,
        $btn_l,
        $btn_r,
        $back_top,
        width_1,
        num_1 = 0;
    return {
        init(){
            $friend_l = $('#friend-1');
            $friend_2 = $('#friend-2');
            $btn_l = $('._btn-l');
            $btn_r = $('._btn-r');
            $back_top = $('#back_top');
            width_1 = $friend_2.clientWidth;
            this.event();
            console.log($friend_2)
        },
        event(){

            $btn_l.onclick = function () {
                if (num_1 < 0) {
                    num_1 += width_1;
                    $friend_l.style.left = num_1 + 'px';
                }
            }
            $btn_r.onclick = function () {
                num_1 -= width_1;
                $friend_l.style.left = num_1 + 'px';
                if (num_1 <= -width_1 * 3) {
                    num_1 = 0;
                    $friend_l.style.left = 0 + 'px';
                }

            }
            window.onscroll = function () {
                var scrollTop = document.documentElement.scrollTop;
                if (scrollTop >= 500) {
                    $back_top.css('display','block')
                } else if (scrollTop < 500) {
                    $back_top.css('display','none');
                }
            }
        }
    }

}));