var user_main=(function(){
    return {
        init(){
            var $cook=document.cookie.split("=");
            if($cook[1]!=""){
                $('.ho-t').text("欢迎你！"+$cook[1]);
            }
            if($cook[1]==undefined){
                $('.ho-t').text('');
                let htmlmore=`<div class="ho-t">
                您好!&nbsp;请 <a href="login.html">登录&nbsp;</a>/
                <a href="reg.html">&nbsp;注册</a>
            </div>`
            $('.ho-t').append(htmlmore);
            }
            this.event();
        },
        event(){
            $('.grid-return').css("display","none")
            $('.grid-return').on('click',function(){
                $('.show-ul').animate({left: '0px'}, "slow");
                $('.grid-return').css("display","none");
                $('.grid-next').css("display","block");
            });
            $('.grid-next').on('click',function(){
                $('.show-ul').animate({left: '-1200px'}, "slow");
                $('.grid-return').css("display","block");
                $('.grid-next').css("display","none");
            });
            $('#_text').focus(function(){
                $('.recommend').css("display","none");
            })
            $('#_text').blur(function(){
                $('.recommend').css("display","block");
            })
        }
    }
}())
