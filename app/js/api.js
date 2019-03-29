define(['jquery',], function($) {
    'use strict';
    return{
        init(){
            // this.shopData();
            
            
        },
        shopData(){
            let _this = this
            $.ajax({
                url:"../json/shopData.json",
                type:"get",
                async: false,
                dataType : 'json',
                success: function(data){
                    _this.addShop(data.data)
                    return data;
                }
            })
        },
        addShop(data){
            let shopData = localStorage.shopData|| '[]' ;
            var flge = true;
            shopData = JSON.parse(shopData);
            for(var i = 0; i < shopData.length; i++){
                if(shopData[i].id == data[i].id){
                    shopData[i].num += data[i].num;
                    flge = false;
                    break;
                }
            }
            if(flge){
                shopData.push(...data);
            }
            localStorage.shopData = JSON.stringify(shopData);
            // alert('加入成功');

        }
    }
});
   