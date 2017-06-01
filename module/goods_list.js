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
		$.ajax({
				url: "http://10.9.168.61:8888/project/yiguo/data/goodsDetails.php",
				dataType: "jsonp"
			})
			.then(function(res) {
				var html = "";
				for(var i = 0; i < res.length; i++) {
					html += `
					<li class="product_item j_product">
						<div class="p_img clearfix">
							<a href="goods_details.html">
								<img src="${res[i].bigImg}" width="290" height="290" data-id="${res[i].id}">
							</a>
						</div>
						<div class="p_info clearfix">
							<div class="p_name">
								<a href="javascript:;">
									${res[i].title}</a>
							</div>
							<div class="p_price">
								<span class="price"><strong>¥${res[i].price}</strong></span>
							</div>
						</div>

						<div class="p-buy">
							<span>${res[i].show}</span>
							<a class="btn-buy" href="javascript:;" id="${res[i].id}">加入购物车</a>
						</div>
					</li>`
				}
				$(".goods_list ul").html(html);
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
				console.log(XMLHttpRequest.readyState);
				console.log(textStatus);
			})

		$(".goods_list ul").on("click", ".p_img", function() {
				$.cookie("id", $(this).children().children().attr("data-id"))
			})
			//点击按钮加入购物车
		$(".goods_list ul").on("click", ".btn-buy", function() {
			var price = parseFloat($(this).parent().prev().find("strong").html().substr(1))
				//操作cookie;
				//区分是否为第一次添加商品;
			if(!$.cookie("shopCar")) {
				//第一次加入购物车;
				$.cookie("shopCar", '[{"id":' + this.id + ',"num":"1","price":' + price + '}]');
			} else {
				//不是第一次购物车;
				var cookieStr = $.cookie("shopCar");
				var cookieArr = JSON.parse(cookieStr);
				var isSame = false; //是否有一样的(标识变量);

				for(var i = 0; i < cookieArr.length; i++) {
					if(cookieArr[i].id == this.id) {
						//商品存在;
						cookieArr[i].num++;
						cookieArr[i].price += price;
						isSame = true;
						break;
					}
				}
				if(!isSame) { //没有一样的添加一个cookie;
					cookieArr.push({
						id: this.id,
						num: 1,
						price: price
					});
				}
				var cookie = JSON.stringify(cookieArr);
				$.cookie("shopCar", cookie)

			}
			shopCarNum();
			shopCarGet();

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
					$.each(cookieArr, function(index, obj) {
						for(var i = 0; i < res.length; i++) {
							if(res[i].id == obj.id) {
								html += `	
										<li>
											<div class="l">
												<a href="javascript:;"><img src="${res[i].bigImg}" width="42" height="42"></a>
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
					$(".goods ul").html(html);
					//删除按钮
					$(".goods ul").on("click", ".del", function() {
						var index = $(this).attr("data-id");
						console.log(index);
						console.log(cookieArr)
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