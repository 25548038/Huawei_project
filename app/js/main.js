require.config({
    paths: {
        'jquery': 'https://cdn.staticfile.org/jquery/3.3.1/jquery',
        'loading' : './loading'    
    }
})

require(['jquery', 'loading', 'public'], function($,loading,public){
    loading.init();
    public.init();
})

require(['jquery', 'shop_cat'], function ($, swiper) {
    swiper.init()
})
require(['jquery', 'search'], function ($, search) {
    search.init()
})
// require(['jquery','public'], function ($,public) {
//     public.init()
// })
require(['jquery','fy'],function($){
	$("#pager").zPager({
		url:'../json/pagedata.json',
		htmlBox: $('.pro-list'),
		btnShow: false
	});
		
	
})

require(['jquery', 'api'],function($,ajax){
	ajax.init();
})