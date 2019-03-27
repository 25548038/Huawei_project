define(['jquery'], function($,public) {
    let $nav,$navlist,$nav_box,$sub_box,$sort,$sortlist,$txt,$btn,$swp,$recommend;
    return{
        init(){
            $nav = $('.nav');
            $navlist = $nav.children('li');
            $nav_box = $('.nav-sub');
            $sub_box = $('.sub-box')
            $sort = $('#sort-type')
            $sortlist = $sort.children('li');
            $txt = $('.txt');
            $btn = $('.btn');
            $swp = $('.swp');
            $recommend = $('.recommend');
            this.event();
            
        },
        event(){
            $navlist.on('mouseenter',function(){
                $nav_box.css('display','block');
                $sub_box.css('display','block');
            });

            $nav_box.on('mouseleave',function(){
                $nav_box.css('display','none')
                $sub_box.css('display','none');
            });

            $sort.on('click', 'li',function(){
                $sortlist.removeClass('act');
                $(this).addClass('act');
            });

            $btn.on('click',function(){
                let val = $txt.val();
                $swp.html('['+ val + ']')
               
            });

            $recommend.on('click', 'a',function(){
                let html = $(this).html();
                $txt.val(html)
                $swp.html('['+ html + ']')
            });

            $(window).keydown(function(event){
                    let val = $txt.val();
                if(event.keyCode == 13 && val != '') {
                $swp.html('['+ val + ']');
                }
              });

        }
    }
    
});