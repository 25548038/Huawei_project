//加载公共头尾
define([
    'jquery'
], function($) {
    'use strict';
    return{
        init(){
            $('.top-header').load('public.html .shortcut');
            $('.foot-box').load('public.html ._maxfoot');
            // $('.hungBar-box').load('public.html .hungBar');
        }
    }
});