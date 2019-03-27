define(['jquery'], function ($, public) {
    let $btn_left, $btn_right, $swi_box, $del, $inpt, $hua,$box,showData,$shopNum,num,$shop_list,$inptlist;
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
            $shop_list = $('.sc-pro-list')
            num = 0;
            this.event(showData);
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
                        flag = $($hua[i]).hasClass('checked');
                        console.log(flag)
                        if (!flag) {
                            $(this).addClass('checked');      
                        } else {
                            $(this).removeClass('checked');
                        }
                    }
                }())
            }
            //判断是否全选全选
            $hua.click(function () {
                var flag = true;
               $hua.each(function(x){
                if(!$($hua[x]).hasClass('checked')) {
                    console.log(1)
                    $inpt.removeClass('checked')
                    flag = false;
                }
               })
               if(flag) $inpt.addClass('checked')
            })
            //全选
            $inpt.on('click',(function(){
                let flag;       
                return function () {
                    $inpt.each(function(x){
                    flag = $($inpt[x]).hasClass('checked');
                    })
                    console.log(flag)
                    if (!flag) {
                        $inptlist.addClass('checked');
                    } else {
                        $inptlist.removeClass('checked');
                    }
                }
            })())
            //删除选中
            $box.on('click', '.btn_del', function(){
                var self = $(this),
                 index = self.index('.btn_del'),
                 datalist = $shop_list;
                //  datalist[index].remove();
                //  datalist.splice(index,1);
                 if(index == datalist.length){
                     console.log(1)
                 }
                console.log(index)
                console.log(datalist)
            })
            //加商品
            $shopNum.on('click','.plus',function(){
                let index = $(this).index('.plus'),
                val = showData[index].num,
                maney = showData[index].maney;
                val++;
                $('.number').val(val);
                $('.maney').html('¥&nbsp;'+maney*val);
               showData[index].num = val ;
                _this.addShop();
                // _this.insertData(showData);
                console.log(maney)

            })
            //减商品
            $shopNum.on('click','.reduce',function(){
                let index = $(this).index('.reduce'),
                val = showData[index].num,
                maney = showData[index].maney;
                val--;
                $('.number').val(val);
                $('.maney').html('¥&nbsp;'+maney*val);
                showData[index].num = val;
                _this.addShop();
                if(val<=0){
                    $(this).css('pointer-events','none')
                    // e.stopPropatation || e.cancelBubble = true;
                    console.log($(this))
                }
                console.log(index)
            })
            //文本框
            $('.number').on('change',function(){
                let index = $(this).index('.number'),
                val = $('.number').val(),
                maney = showData[index].maney;
                $('.maney').html('¥&nbsp;'+maney*val);
                showData[index].num = val;
                _this.addShop();
                console.log(index,maney,val)
            })
        },
        //获取数据
        getCarData() {
            var data = localStorage.shopData;
            console.log(localStorage.length == 0,data)
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
            for(var attr in data){
                var innerHTML = `
                <div class="sc-pro-list">
            <label class="checkbox">
                <input readonly="readonly" class="hua input">
            </label>
            <div class="sc-pro-area">
                <div class="sc-pro-main">
                    <a href="#">
                        <img src="./images/${data[attr].img}" alt="">
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
                                <input type="number" class="number" value="${data[attr].num}">
                                <p class="plus">+</p>
                                <p class="reduce">-</p>
                            </div>
                        </li>
                        <li class="maney">
                            ¥&nbsp;${data[attr].num * data[attr].maney}
                        </li>
                        <li>
                            <b class="btn_del">删除</b>
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
            }
            if(!$box.hasClass('sc-total-tool')){
            let txt = `
            <div class="sc-total-tool">
            <label class="checkbox">
                <input  readonly="readonly" class="quan input">全选
            </label>
            <b class="btn_del">删除</b>
            <button>立即结算</button>
            <div class="sc-total-price">
                <p>
                    <b>总计:</b>
                    <span>¥&nbsp;3999</span>
                </p>
                <div class="total">
                    已选择 <i> 0 </i> 件商品
                </div>
            </div>
        </div>
        <h2>推荐搭配</h2>
        <div class="shop-box">
            <div class="swiper">
                <div class="swiper-list">
                    <div class="swiper-box">
                        <img src="./images/5.png" alt="">
                        <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                        <p>¥&nbsp;299</p>
                        <p>
                            <a href="#">加入购物车</a>
                        </p>
                    </div>
                    <div class="swiper-box">
                        <img src="./images/6.png" alt="">
                        <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                        <p>¥&nbsp;299</p>
                        <p>
                            <a href="#">加入购物车</a>
                        </p>
                    </div>
                    <div class="swiper-box">
                        <img src="./images/4.png" alt="">
                        <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                        <p>¥&nbsp;299</p>
                        <p>
                            <a href="#">加入购物车</a>
                        </p>
                    </div>
                    <div class="swiper-box">
                        <img src="./images/2.png" alt="">
                        <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                        <p>¥&nbsp;299</p>
                        <p>
                            <a href="#">加入购物车</a>
                        </p>
                    </div>
                    <div class="swiper-box">
                            <img src="./images/8.png" alt="">
                            <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                            <p>¥&nbsp;299</p>
                            <p>
                                <a href="#">加入购物车</a>
                            </p>
                        </div>
                        <div class="swiper-box">
                                <img src="./images/2.png" alt="">
                                <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                                <p>¥&nbsp;299</p>
                                <p>
                                    <a href="#">加入购物车</a>
                                </p>
                            </div>
                            <div class="swiper-box">
                                <img src="./images/2.png" alt="">
                                <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                                <p>¥&nbsp;299</p>
                                <p>
                                    <a href="#">加入购物车</a>
                                </p>
                            </div>
                            <div class="swiper-box">
                                <img src="./images/2.png" alt="">
                                <p>HUAWEI M-Pen （HUAWEI Mate 20 X专用）</p>
                                <p>¥&nbsp;299</p>
                                <p>
                                    <a href="#">加入购物车</a>
                                </p>
                            </div>

                </div>
                <span class="left"></span>
                <span class="right"></span>
            </div>
        </div> `,
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
                $box.append(top).append(innerHTML).append(txt);
            }
        },
        empty(){
            $box.html('');
                let html = `<div class="sc-empty">
                <i></i>
                <p>您的购物车里什么也没有哦~</p>
                <a href="#" target="_blank" rel="noopener noreferrer">去逛逛</a>
            </div>`;
            $box.append(html)

            }
            
        ,
        addShop(){
            localStorage.shopData = JSON.stringify(showData);

        }
    }
});