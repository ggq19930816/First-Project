define(["module/Magnifier", "libs/jquery-1.11.3.js", "libs/jquery.cookie"], function(Magnifier, jq, cookie) {

	$(function() {
		cookie();
		//加载页首页尾
		$('.goods-header').load('common/shopping_header.html')
		$('.goods-footer').load('common/footer.html');
		$('.footer-service').load('common/footer_service.html');

		//商品列表选项卡
		$('.goods-nav-list').on("mouseenter", ".item", function() {
			$(this).children().eq(1).css({
				'display': 'block'
			})
			$(this).addClass("flow");
		})

		$('.goods-nav-list').on("mouseleave", ".item", function() {
			$(this).children().eq(1).css({
				'display': 'none'
			})
			$(this).removeClass("flow");
		});

		//悬浮框
		window.onscroll = function() {
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(scrollTop > 10) {
				$(".common-header").addClass("header_fixed");
			} else {
				$(".common-header").removeClass("header_fixed");
			}

		};

		//获取页面数据
		$.ajax({
				url: "http://10.9.168.61:8888/project/yiguo/data/goodsDetails.php",
				dataType: "jsonp"
			})
			.then(function(res) {
				var a = $.cookie("id") - 1;
				var html = `
				<div class="details-pic">
					<div class="pic-big" id="pic-big">
						<img class="j_product_img"  src="${res[a].smallImg1}" style = "display:block">
						<img class="j_product_img"  src="${res[a].smallImg2}" style = "display:none">
						<img class="j_product_img"  src="${res[a].smallImg3}" style = "display:none">
						<p class="move-box" id="move-box"></p>
					</div>
					<div class="b_box" id="b_box">		
						<div class="b_box_all" id="b_box_all">
							<img src="${res[a].smallImg1}">
						</div>		
					</div>
					
					<div class="pic-thumb">
						<div class="picList">
							<ul>
								<li data-id = "0"><img width="85" height="85" src="${res[a].bigImg}"></li>
								<li class="on" data-id = "1"><img width="85" height="85" src="${res[a].smallImg2}" ></li>
								<li class="" data-id = "2"><img width="85" height="85" src="${res[a].smallImg3}"></li>
							
							</ul>
						</div>
					</div>
					<div class="icon"><img src="http://static01.yiguo.com/www/images/ICON06.png" width="46" height="46"></div>
				</div>
				<!--商品加入购物车-->
				<div class="details-info">
					<div class="goods-name">
						<h1>${res[a].title}</h1>
						<p>${res[a].show}</p>
					</div>
					<div class="goods-price clearfix">
						<div class="pro-price">
							<div>
								<span>价格：</span>
								<span><em>¥</em><strong id="product-price">${res[a].price}</strong></span>
							</div>
						</div>
						<div class="pro-review">
							<p>总体满意度</p>
							<p><b>5.0</b> 分</p>
							<p>
								<a href="#comment" id="pllabel"><span>(评论数111)</span></a>
							</p>
						</div>
					</div>

					<div class="goods-other clearfix">
						<div class="left">
							<div class="pro-promo clearfix"></div>
							<div class="choose clearfix">
								<div class="dt">规格：</div>
								<div class="dd">
									<ul>
										<li class="">
											<a href="javascript:;">
												<span>￥118.00</span>
												<span>20个/份</span>
												<i></i>
											</a>
										</li>
										<li class="selected">
											<a href="javascript:;">
												<span>￥${res[a].price}</span>
												<span>6个/份</span>
												<i></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="pro-service">满百包邮，<b>20:00</b> 前完成订单 预计明日<b>(5月31日)</b>送达</div>
							<div class="pro-service"><i class="mr5"><img src="http://static01.yiguo.com/www/images/icon1.png"></i>不支持7天无理由退货</div>
							<div class="pro-amount clearfix">
								<div class="dt">数量：</div>
								<div class="dd">
									<div class="spinner value" maxlength="2">
										<button class="decrease">-</button>
										<input type="text" class="spinner value" id="p_number" maxlength="2" value="1">
										<button class="increase">+</button>
									</div>
									<div class="addcart">
										<a class="btn-gn" href="javascript:;"><i></i>加入购物车</a>
									</div>
								</div>
							</div>

						</div>
						<div class="right">
							<table width="100%" cellspacing="0" cellpadding="0" border="0" class="zx">
								<tbody>
									<tr>
										<th>原产地：</th>
										<td>美国</td>
									</tr>
									<tr>
										<th>商品编号：</th>
										<td>1274549</td>
									</tr>
									<tr>
										<th>品牌：</th>
										<td>新奇士</td>
									</tr>
									<tr>
										<th>发货地：</th>
										<td>北京</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>`;

				$(".content").eq(2).html(html);

				//小图随着大图动
				$(".picList ul").on("mouseenter", "li", function() {

					$.each($(".pic-big").children(), function(index, obj) {
						obj.style.display = "none";
					});
					$(".pic-big").children().eq($(this).attr('data-id')).get(0).style.display = "block";

					var b = 'smallImg' + (Number($(this).attr('data-id')) + 1);
					$('.b_box_all img').attr("src", res[a][b]);
					new Magnifier("pic-big", "move-box", "b_box", "b_box_all")
				})

				$.each($(".pic-big").children(), function(index, obj) {
					if(obj.style.display == "block") {
						var b = 'smallImg' + (index + 1);

						$('.b_box_all img').attr("src", res[a][b]);

					}
				});
				new Magnifier("pic-big", "move-box", "b_box", "b_box_all");

				//加减号购物数量
				var goodsNum = 1;
				$(".decrease").on("click", function() {
					if(goodsNum > 1) {
						goodsNum--;
					}
					$("#p_number").val(goodsNum)
				})
				$(".increase").on("click", function() {
					if(goodsNum < 100) {
						goodsNum++;
					}
					$("#p_number").val(goodsNum)
				})

				//点击按钮加入购物车
				$(".addcart").on("click", function() {
					var price = parseFloat($("#product-price").html()) * goodsNum;

					//操作cookie;
					//区分是否为第一次添加商品;
					if(!$.cookie("shopCar")) {
						//第一次加入购物车;
						console.log(goodsNum);
						$.cookie("shopCar", '[{"id":' + $.cookie("id") + ',"num":' + goodsNum + ',"price":' + price + '}]');
					} else {
						console.log(goodsNum);
						//不是第一次购物车;
						var cookieStr = $.cookie("shopCar");
						var cookieArr = JSON.parse(cookieStr);
						var isSame = false; //是否有一样的(标识变量);

						for(var i = 0; i < cookieArr.length; i++) {
							if(cookieArr[i].id == $.cookie("id")) {
								//商品存在;
								cookieArr[i].num += goodsNum;
								cookieArr[i].price += price;
								isSame = true;
								break;
							}
						}
						if(!isSame) { //没有一样的添加一个cookie;
							cookieArr.push({
								id: $.cookie("id"),
								num: goodsNum,
								price: price
							});
						}
						var cookie = JSON.stringify(cookieArr);
						$.cookie("shopCar", cookie)
					}
					shopCarNum();
					shopCarGet();
				})
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
				console.log(XMLHttpRequest.readyState);
				console.log(textStatus);
			})

		//购物车获取cookie中的价格和数量信息
		function shopCarNum() {
			if(!$.cookie("shopCar")) {
				return 0;
			}
			var cookieStr = $.cookie("shopCar");
			var cookieArr = JSON.parse(cookieStr);
			var resNum = 0;
			var resPrice = 0;
			for(var i = 0; i < cookieArr.length; i++) {
				resNum += parseFloat(cookieArr[i].num);
				resPrice += parseFloat(cookieArr[i].price)
			}

			$("#goodsNum b").html(resNum);
			$("#goodsPrice").html(resPrice.toFixed(2));
			$(".totleNum b").html(resNum);
			$(".totlePrice").html('¥' + resPrice.toFixed(2));
		}

		function shopCarGet() {
			//拼接购物车
			$.ajax({
					url: "http://10.9.168.61:8888/project/yiguo/data/goodsDetails.php",
					dataType: "jsonp"
				})
				.then(function(res) {
					var cookieArr = JSON.parse($.cookie("shopCar"));
					var html = "";
					if(cookieArr) {
						$.each(cookieArr, function(index, obj) {
							for(var i = 0; i < res.length; i++) {
								if(res[i].id == obj.id) {
									html += `	
										<li>
											<div class="l">
												<a href="javascript:;"><img src="${res[i].bigImg}" width="42" height="42" id="${res[i].id}"></a>
											</div>
											<div class="c">
												<a href="javascript:;">${res[i].title}</a>
											</div>
											<div class="r"><b>¥${res[i].price}</b> * ${obj.num}
												<a href="javascript:;" class="del" data-id="${res[i].id}">删除</a>
											</div>
										</li>
									`
								}
							}
						})
					}

					$(".goods ul").html(html);
					//删除按钮
					$(".goods ul").on("click", ".del", function() {
						var index = $(this).attr("data-id");
						for(var i = 0; i < cookieArr.length; i++) {
							if(cookieArr[i].id == index) {
								//需要删除的商品
								cookieArr.splice(i, 1)
							}
						}
						$(this).parents("li").remove();
						var cookie = JSON.stringify(cookieArr);
						$.cookie("shopCar", cookie);
						shopCarNum();
					})

				})
		}
		shopCarGet();
		setTimeout(function() {
			shopCarNum();
		}, 100)

	})

})