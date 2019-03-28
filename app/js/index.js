var user_main=(function(){
    return {
        init(){
            var $cook=document.cookie.split("=");
            if($cook[1]!=""){
                $('.ho-t').text("欢迎你！"+$cook[1]);
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
        }
    }
}())
