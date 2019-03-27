    var index=(function(){
        return{
            init(){
                this.enter();
            },
            enter(){
                $('.grid-return').click(function(){
                    $('.show-ul').animate({left: '0px'}, "slow");
                    $('.grid-return').css("display","none");
                    $('.grid-next').css("display","block");
                });
                $('.grid-next').click(function(){
                    $('.show-ul').animate({left: '-1200px'}, "slow");
                    $('.grid-return').css("display","block");
                    $('.grid-next').css("display","none");
                });
                $('#_text').focus(function(){
                    $('.recommend').css("display","none");
                });
                $('#_text').blur(function(){
                    $('.recommend').css("display","block");
                });
            },
        }
       
    }())