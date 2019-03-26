define(['jquery'], function($, public) {
    return {
        init(){
            this.event();

        },
        event(){
            // $('.p-service-info').on('mouseenter',function(){
            //     $('.p-list').css("display","block");
            //     $('.p-service-info').css("background","#FFF");
            //     $('.p-service-info').children('a').addClass('p-service-hov')

            // })
            // $('.p-service-info').on('mouseleave',function(){
            //     $('.p-list').css("display","none")
            //     $('.p-service-info').css("background","none")
            //     $('.p-service-info').children('a').removeClass('p-service-hov')

            // })
            $('.left').on('click',function(){
                $('.swiper-list').css('left',-200)
            })
            $('.right').on('click',function(){
                $('.swiper-list').css('left',35)
            })
            $('.input').on('click',function(){
                let flag = true,
                input = $('.sc-pro-list').find('.input');
                input.each(function(){
                  if(input.hasClass('checked')){
                    flag = false;
                    return false;
                  }
               })
            //    if(flag)  $('.input').addClass('checked');
             console.log(input[0])
            })
        }
    }
});