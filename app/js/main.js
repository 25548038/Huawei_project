require.config({
    paths: {
        'jquery': 'https://cdn.staticfile.org/jquery/3.3.1/jquery'
    }
})
require(['jquery', 'shop_cat'], function($, swiper) {
    swiper.init()
})