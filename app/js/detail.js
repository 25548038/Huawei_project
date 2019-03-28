var Detailspage=(function(){
    let shopList=[];
    
    return{
        init(){
            this.event();
        },
        event(){
            $('.a_1').on('click',function(){
                $(".change_title").text("(幻夜黑)");
                $('.cleara').css("border-color","#f0f0f0");
                $('.a_1').css("border-color","red")
                $('#adress_img').attr("src","images/01_small.png");
                $('#big_i').attr("src","images/01_big.png");
                $('#big-image').attr("src","images/01_largest.png");
            });
            $('.a_2').on('click',function(){
                $(".change_title").text("(渐变蓝)");
                $('#adress_img').attr("src","images/03_small.png");
                $('#big_i').attr("src","images/03_big.png");
                $('#big-image').attr("src","images/03_largest.png");
                $('.cleara').css("border-color","#f0f0f0");
                $('.a_2').css("border-color","red")
            })
            $('.2a_1').on('click',function(){
                $(".Model").text("4GB+64GB");
                $(".maibuqi").text("1299.00");
                $('.2cleara').css("border-color","#f0f0f0");
                $('.2a_1').css("border-color","red")
            })
            $('.2a_2').on('click',function(){
                $(".Model").text("6GB+64GB");
                $(".maibuqi").text("1699.00");
                $('.2cleara').css("border-color","#f0f0f0");
                $('.2a_2').css("border-color","red")
            })
            let num=1;
            $('#pro-quantity-plus').on('click',function(){
                num++;
                $('#change_num').val(num);
            })
            $('#pro-quantity-minus').on('click',function(){
                num--;
                if(num<=1){
                    $('#change_num').val(1);
                    num=1;
                }else if(num>0){
                   $('#change_num').val(num); 
                }
                
            })
            $('.product-button01').on('click',function(){       
                const tit=$('#bread-pro-name').text();//文本值
                const imgj=$('#adress_img').attr("src");//图片地址
                let id1;
                if(imgj=="images/01_small.png"){
                     id1=1;
                }
                if(imgj=="images/03_small.png"){
                     id1=2
                }
                const _me=$('.maibuqi').text();//价格
                const nu=$('#change_num').val();//数量 
                let shop_li={
                    title:tit,
                    img:imgj,
                    maney:Number(_me),
                    num:Number(nu),
                    id:Number(id1)
                };
                var flag = true;
                for(var i = 0; i < shopList.length; i++){
                    if(shopList[i].title == shop_li.title) {
                        shopList[i].num += shop_li.num;
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    shopList.push(shop_li);
                }
                localStorage.shopData = JSON.stringify(shopList);
                alert("添加成功")
                let numb=0;
                let $localShopd=document.querySelector('.local-shopd');
                let $gwc=document.querySelector('.gwc_1');
                var josn_wj=JSON.parse(localStorage.shopData);
                for(var i = 0; i < josn_wj.length; i++){
                    numb+=josn_wj[i].num;
                }
                $localShopd.innerHTML=numb;
                console.log(josn_wj.length,numb)
            })
        },
    }
}())