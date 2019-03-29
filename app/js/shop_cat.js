define(['jquery'], function ($, public) {
    let $btn_left, $btn_right, $swi_box, $hua, $box, showData,
        $modal,$shul,$addshop,RecommendData;
    return {
        init() {
            
            $box = $('#content');
            this.getCarData();
            $btn_left = $('.left');
            $btn_right = $('.right');
            $swi_box = $('.swiper-list');
            $hua = document.querySelectorAll('.hua');
            $modal = $('.modal-footer');
            $addshop = $('.swiper-list');
            $shul = $('.shul')
            this.event(showData);
            this.shul(showData)
            this.countMoney();
            this.shopData();
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
            $box.on('click', '.hua', function () {
                $(this).toggleClass('checked');
                var index = $(this).index('.hua');
                if ($(this).hasClass('checked')) {
                    showData[index].checked = true;
                } else {
                    showData[index].checked = false;
                }
                _this.addShop();
                _this.countMoney();
                // 判断是否为全选
                let flag = true;
                $('.hua').each(function (x) {
                    if (!showData[x].checked) {
                        flag = false;
                        $('.quan').removeClass('checked');
                        return false;
                    }
                })
                if (flag) $('.input').addClass('checked');
            })
            //全选
            $box.on('click', '.quan', function () {
                $(this).toggleClass('checked');

                for (let i = 0; i < showData.length; i++) {
                    if ($(this).hasClass('checked')) {
                        $('.input').addClass('checked');
                        showData[i].checked = true;
                    } else {
                        $('.input').removeClass('checked');
                        showData[i].checked = false;
                    }
                }
                _this.countMoney();
                _this.addShop();
            })
            //删除选中
            $box.on('click', '.del', function () {
                let index = $(this).index('.del');
                $modal.children('.btn-del').attr('attr-id', index)
            })
            $modal.on('click', '.btn-del', function () {
                var self = $(this),
                    index = self.attr('attr-id');
                    if (index == showData.length) {
                    showData.splice(0, index);
                    _this.addShop();
                    _this.insertData(showData);
                    _this.shul(showData)
                }
                    showData.splice(index, 1);
                    // 更新本地数据
                    _this.addShop();
                    _this.insertData(showData);
                    _this.shul(showData)
            })
            //加商品
            $box.on('click', '.plus', function () {
                var index = $(this).index('.plus');
                showData[index].num++;
                _this.addShop();
                _this.insertData(showData);
                _this.countMoney();
                _this.shul(showData)

            })
            //减商品
            $box.on('click', '.reduce', function () {
                var index = $(this).index('.reduce');
                showData[index].num--;
                _this.insertData(showData);
                _this.addShop();
                _this.countMoney();
                _this.shul(showData)

            })
            //文本框
            $box.on('change', '.number', function () {
                let index = $(this).index('.number'),
                    val = $($('.number')[index]).val();
                showData[index].num = val - 0;
                _this.countMoney();
                _this.insertData(showData);
                _this.shul(showData);
                _this.addShop();
            })
            //加入购物车
            $addshop.on('click', '.addshop', function () {
                let index = $(this).index('.addshop');
                // _this.insertData();
                _this.addShopCat(RecommendData[index])
            })
        },
        //获取数据
        getCarData() {
            var data = localStorage.shopData;
            if (localStorage.length == 0) {
                this.empty();
            } else {
                this.insertData(JSON.parse(data));
            }
        },
        //渲染数据
        insertData(data) {
            let str = '',
            str2 = '',
                bool = $box.children('.table-header').length == 0,
                flag = true;
            if (bool) {
                this.shopTop()
            }
            $box.children('.sc-pro-list').remove();
            showData = data;
            if (data == '') {
                this.empty();
            } else {
                for (var attr in data) {
                    if (data[attr].checked) {
                        str = 'checked';
                    } else {
                        str = '';
                    }
                    if(data[attr].num <=0){
                        str2 = 'cat'
                    }else{
                        str2 = '';
                    }
                    var innerHTML = `
                <div class="sc-pro-list">
            <label class="checkbox">
                <input readonly="readonly" class="hua input ${str}">
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
                            <span>¥&nbsp;${data[attr].money}</span>
                        </li>
                        <li>
                            <div class="p-stock-area">
                                <input type="number" class="number" value="${data[attr].num}" /*readonly="readonly"*/>
                                <b class="plus">+</b>
                                <b class="reduce ${str2}">-</b>
                            </div>
                        </li>
                        <li class="maney">
                            ¥&nbsp;${data[attr].num * data[attr].money}
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
                    $('.sc-total-tool').before(innerHTML);
                }
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].checked) {
                        flag = false;
                        $('.quan').removeClass('checked');
                        return false;
                    }
                }
                if (flag) $('.input').addClass('checked');

            }

        },
        empty() {
            $box.html('');
            let html = `<div class="sc-empty">
                <i></i>
                <p>您的购物车里什么也没有哦~</p>
                <a href="index.html" rel="noopener noreferrer">去逛逛</a>
            </div>`;
            $box.append(html)

        },
        shopTop() {
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
                top = `<div class="table-header clearfix">
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
        },
        addShop() {
            localStorage.shopData = JSON.stringify(showData);
        },
        shopData() {
            let _this = this
            $.ajax({
                url: "./json/shopData.json",
                type: "get",
                async: false,
                dataType: 'json',
                success: function (data) {
                    // _this.addShopCat(data)
                    RecommendData = data
                    _this.Recommend(data)
                    return data;
                }
            })
        },
        addShopCat(data) {
            let shopData = localStorage.shopData || '[]';
            var flge = true;
            shopData = JSON.parse(shopData);
            for (var i = 0; i < shopData.length; i++) {
                if (shopData[i].id == data.id) {
                    shopData[i].num += data.num;
                    flge = false;
                    break;
                }
            }
            if (flge) {
                shopData.push(data);
            }
            localStorage.shopData = JSON.stringify(shopData);
            // alert('加入成功');
        },
        shul(data) {
            console.log(data)
            let shuli = 0,
            flag = true;
            if(data == null){
                flag = false;
            }            
            if(flag){
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i].num)
                    shuli += data[i].num;
                    $shul.html(shuli)
                }
            }
        },
        countMoney() {
            // 判断选中的文本框
            let flag = true;
            if(localStorage.length==0){
                flag = false;
            }  
            if(flag){

                var shopToalCount = 0;
                var shopTotalMoney = 0; 
                            for(let i=0;i<showData.length;i++){
                                if(showData[i].checked){
                                    shopToalCount += showData[i].num;
                                    shopTotalMoney += showData[i].num * showData[i].money;
                                }
                            }
                            
                    
                $('.total').children('i').html(shopToalCount);
                $('.Total').html('&nbsp¥&nbsp;' + shopTotalMoney);
            }
        },
        Recommend(data){
           for(let attr in data){
               let html = `
               <div class="swiper-box">
               <a href="./detail.html">
               <img src="./${data[attr].img}" alt=""></a>
               <p>${data[attr].title}</p>
               <p>¥&nbsp;${data[attr].money}</p>
               <p>
                   <a href="#" class="addshop" data-toggle='modal' data-target='.bs-example-modal-ts'>加入购物车</a>
               </p>
           </div>
               `;
               $addshop.append(html)
           }

          

            
        }

    }
});