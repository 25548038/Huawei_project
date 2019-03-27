$('.login-left').on("click",function(){
    $('.login-hiden').hide();
    $('.login-form').show();
    $('.login-left').css("color","red");
    $('.login-right').css("color","black");
})
$('.login-right').on("click",function(){
    $('.login-form').hide();
    $('.login-hiden').show();
    $('.login-right').css("color","red");
    $('.login-left').css("color","black");
})


