var user_main=(function(){
    return {
        init(){
            var $cook=document.cookie.split("=");
            if($cook[1]!=""){
                $('.ho-t').text("欢迎你！"+$cook[1]);
            }
        }
    }
}())
