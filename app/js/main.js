require.config({
    paths: {
        'jquery': 'https://cdn.staticfile.org/jquery/3.3.1/jquery',
        'loading' : './loading'    
    }
})

require(['jquery', 'loading', 'public-1'], function($,loading,public){
    loading.init();
    public.init();
})

require(['jquery', 'shop_cat'], function ($, swiper) {
    swiper.init()
})
require(['jquery', 'search'], function ($, search) {
    search.init()
})
require(['jquery','fy'],function($){
	$("#pager").zPager({
		url:'../json/pagedata.json',
		htmlBox: $('.pro-list'),
        btnShow: true,
        pageData: 10
	});
})

require(['jquery', 'api'],function($,ajax){
	ajax.init();
})
