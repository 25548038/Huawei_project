define(['jquery'], function ($, public) {
    let $btn_left, $btn_right, $swi_box, $del, $inpt, $hua,$box,showData,$shopNum,$shop_list,$inptlist,$manoy,$Subtotal,$Selection,num = 0,$modal,Total=0,$addshop,$shul;
    return {
        init() {
            $box = $('#content');
            this.getCarData();
            $btn_left = $('.left');
            $btn_right = $('.right');
            $swi_box = $('.swiper-list');
            $del = $('.btn_del');
            $inpt = $('.quan');
            $inptlist = $('.input')
            $hua = $('.hua');
            $shopNum = $('.p-stock-area');
            $shop_list = $('.sc-pro-list');
            $manoy = $('.number');
            $Subtotal = $('.maney');
            $modal = $('.modal-footer');
            $addshop = $('.addshop');
            $shul = $('.shul')
            this.event(showData);
            this.shul(showData)
        },
        event(showData) {
            let _this = this;
            //推荐左
            $btn_left.on('click', function () {
                $swi_box.css('left', -630)
            })
            //推荐右
            $btn_right.on('click', function () {
                $swi_box.css('left', 35)
            })
            //选中
            for (let i = 0; i < $hua.length; i++) {
                $hua[i].onclick = (function () {
                    let flag;
                    return function () {
                        jiage = $($Subtotal[i]).html().replace(/[^0-9]/ig,'') -0;
                        console.log(Total)
                        flag = $($hua[i]).hasClass('checked');
                        if (!flag) {
                            Total +=jiage
                            $(this).addClass('checked'); 
                            num += showData[i].num ;
                            $('.Total').html('¥&nbsp;'+Total);  
                        } else {
                            // debugger
                            $(this).removeClass('checked');
                            Total -= jiage;
                            num -=showData[i].num
                            $('.Total').html('¥&nbsp;'+Total);
                        }
                        $('.total').children('i').html(num)
                    }
                }())
            }
            //判断是否全选全选
            $hua.click(function () {
                var flag = true;
               $hua.each(function(x){
                if(!$($hua[x]).hasClass('checked')) {
                    $inpt.removeClass('checked')
                    flag = false;
                }
               })
               if(flag) $inpt.addClass('checked');
            })
            //全选
            $inpt.on('click',(function(){
                let flag;       
                return function () {
                    num=0;
                    Total = 0;
                    $hua.each(function(x){
                        // console.log(Total)
                        Total += $($($Subtotal)[x]).html().replace(/[^0-9]/ig,'')-0;
                        flag = $($inpt[x]).hasClass('checked');
                        num += showData[x].num;
                        return;
                    })
                    if (!flag) {
                        $inptlist.addClass('checked');
                        $('.total').children('i').html(num)
                        $('.Total').html('¥&nbsp;'+Total);
                    } else {
                        num = 0;
                        Total = 0;
                        $inptlist.removeClass('checked');
                        $('.total').children('i').html(num)
                        $('.Total').html('¥&nbsp;'+Total);
                    }
                }
            })())
            //删除选中
            $box.on('click','.del',function(){
                let index = $(this).index('.del');
               $modal.children('.btn-del').attr('attr-id',index)
            })
            $modal.on('click', '.btn-del', function(){
                var self = $(this),
                 index = self.attr('attr-id');
                 showData.splice(index, 1);
                 _this.insertData(showData);
                 // 更新本地数据
                 _this.addShop();
                 console.log(showData.length)
                 if(index == showData.length){ 
                    showData.splice(0, index);
                    _this.addShop();
                    _this.insertData(showData);
                    console.log(1234564156)
                 }
                 console.log(index)
            })
            //加商品
            $shopNum.on('click','.plus',function(){
                let index = $(this).index('.plus'),
                val = showData[index].num,
                maney = showData[index].maney;
                Total +=maney;
                val++;
                $($manoy[index]).val(val);
                $($Subtotal[index]).html('¥&nbsp;'+maney*val);
                _this.shul(showData)
               showData[index].num = val ;
            //    _this.insertData(showData)
                _this.addShop();
                if(val > 0){
                    $('.reduce').removeClass('cat')
                }
                    flag = $($hua[index]).hasClass('checked');
                    if(flag){
                        console.log(val,Total)
                        num ++;
                        $('.Total').html('¥&nbsp;'+Total); 
                        $('.total').children('i').html(num);
                        flag = false;
                        return false;
                    }
            //    _this.insertData(showData)
                console.log(maney)

            })
            //减商品
            $shopNum.on('click','.reduce',function(){
                let index = $(this).index('.reduce'),
                val = showData[index].num,
                maney = showData[index].maney;
                Total -=maney;
                val--;
                // console.log($($manoy[index]))
                $($manoy[index]).val(val);
                $($Subtotal[index]).html('¥&nbsp;'+maney*val);
                showData[index].num = val;
                _this.addShop();
                if(val<=0){
                    $(this).addClass('cat')
                }else{
                    $(this).removeClass('cat')
                }
                flag = $($hua[index]).hasClass('checked');
                    if(flag){
                        console.log(val)
                        num --;
                        $('.total').children('i').html(num);
                        $('.Total').html('¥&nbsp;'+Total);
                        flag = false;
                        return false;
                    }
                    _this.shul(showData)
                console.log(index)
            })
            //文本框
            $('.number').on('change',function(){
                let index = $(this).index('.number'),
                val = $($('.number')[index]).val(),
                maney = showData[index].maney,
                arr = [];
                $($('.maney')[index]).html('¥&nbsp;'+maney*val);
                _this.addShop(showData[index]);
                showData[index].num = val - 0;
                flag = $($hua[index]).hasClass('checked');
                    if(flag){
                        num = val - 0;  
                        $('.total').children('i').html(num);
                        console.log(showData[index].num)        
                    }
                    this.shul(showData)
            })
            $addshop.on('click',function(){
                _this.shopData();
                // _this.insertData();
            })
        },
        //获取数据
        getCarData() {
            var data = localStorage.shopData;
            if(localStorage.length == 0){
                this.empty();
            }else{
                this.insertData(JSON.parse(data));
            }
        },
        //渲染数据
        insertData(data){
            $box.html('');
            showData = data;
            if(data == ''){
                this.empty();
            }else{
            for(var attr in data){
                var innerHTML = `
                <div class="sc-pro-list">
            <label class="checkbox">
                <input readonly="readonly" class="hua input">
            </label>
            <div class="sc-pro-area">
                <div class="sc-pro-main">
                    <a href="#">
                        <img src="./${data[attr].img}" alt="">
                    </a>
                    <ul>
                        <li>
                            <a href="#">${data[attr].title}</a>
                        </li>
                        <li>
                            <span>¥&nbsp;${data[attr].maney}</span>
                        </li>
                        <li>
                            <div class="p-stock-area">
                                <input type="number" class="number" value="${data[attr].num}" readonly="readonly">
                                <b class="plus">+</b>
                                <b class="reduce">-</b>
                            </div>
                        </li>
                        <li class="maney">
                            ¥&nbsp;${data[attr].num * data[attr].maney}
                        </li>
                        <li>
                            <b class="del" data-toggle='modal' data-target='.bs-example-modal-sm'>删除</b>
                        </li>
                    </ul>
                </div>
                <div class="sc-pro-parts">
                    <div class="p-service-area">
                        <h2>服务</h2>
                        <ul>
                            <li>
                                <div class="p-service-info">
                                    <div class="p-name">
                                        <i>延长服务宝</i>
                                        可选购延长服务宝
                                    </div>
                                    <a href="#" class="p-service-btn"></a>
                                    <div class="p-list">
                                        <h2>延长保服务</h2>
                                        <ul>
                                            <li>延长服务宝1年 ¥368</li>
                                            <li>延长服务宝半年 ¥198</li>
                                        </ul>
                                    </div>
                            </li>
                            <li>
                                <span>¥&nbsp;399</span>
                            </li>
                            <li>
                                x1
                            </li>
                            <li>
                                ¥&nbsp;399
                            </li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="sc-pro-parts-list">
                        <h2>配</h2>
                        <ul>
                            <li>
                                <img src="./images/img-li.png" alt="">
                                华为全景相机酷玩版（星云蓝） 星云蓝
                            </li>
                            <li></li>
                            <li>
                                x1
                            </li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul>
                            <li>
                                <img src="./images/img-li.png" alt="">
                                华为全景相机酷玩版（星云蓝） 星云蓝
                            </li>
                            <li></li>
                            <li>
                                x1
                            </li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
        $box.append(innerHTML)
            }
            if(!$box.hasClass('sc-total-tool')){
            let txt = `
            <div class="sc-total-tool">
            <label class="checkbox">
                <input  readonly="readonly" class="quan input">全选
            </label>
            <b data-toggle='modal' data-target='.bs-example-modal-sm' class="del">删除</b>
            <button>立即结算</button>
            <div class="sc-total-price">
                <p>
                    <b>总计:</b>
                    <span class="Total">¥&nbsp;0</span>
                </p>
                <div class="total">
                    已选择 <i> 0 </i> 件商品
                </div>
            </div>
        </div>
         `,
        top = `<div class="clearfix">
        <label class="checkbox">
            <input readonly="readonly" class="quan input">全选
        </label>
        <ul class="list-box">
            <li>商品</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
        </ul>
    </div>`;
                $box.prepend(top).append(txt);
            }}
        },
        empty(){
            $box.html('');
                let html = `<div class="sc-empty">
                <i></i>
                <p>您的购物车里什么也没有哦~</p>
                <a href="index.html" rel="noopener noreferrer">去逛逛</a>
            </div>`;
            $box.append(html)

        },
        addShop(){
          
            localStorage.shopData = JSON.stringify(showData);

        },
        shopData(){
            let _this = this
            $.ajax({
                url:"./json/shopData.json",
                type:"get",
                async: false,
                dataType : 'json',
                success: function(data){
                    _this.addShopCat(data.data)
                    console.log(data.data)
                    return data;
                }
            })
        },
        addShopCat(data){
            console.log(data)
            let shopData = localStorage.shopData|| '[]' ;
            var flge = true;
            shopData = JSON.parse(shopData);
            for(var i = 0; i < shopData.length; i++){
                console.log(data[0].id)
                if(shopData[i].id == data[0].id){
                    shopData[i].num += data[0].num;
                    flge = false;
                    break;
                }
            }
            if(flge){
                shopData.push(...data);
            }
            localStorage.shopData = JSON.stringify(shopData);
            // alert('加入成功');

        },
        shul(data){
            let shuli  = 0;
            for(let i =0;i<data.length;i++){
              shuli += data[i].num;
              $shul.html(shuli)
            }
        }
    }
});