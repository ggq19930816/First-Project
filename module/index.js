define(["libs/jquery-1.11.3.js", "libs/jquery.cookie"], function(jq, cookie) {

	$(function() {
		cookie();
		//加载页首页尾
		$('.index-header').load('common/shopping_header.html')
		$('.index-footer').load('common/footer.html');
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
		//轮播图
		var index = 0;
		var z = 10;
		move();
		//右按钮轮播
		$(".next").on("click", function() {
			index++;
			move();
		})

		//左按钮轮播
		$(".prev").on("click", function() {
			index--;
			move();
		})

		//随着index变动轮播
		function move() {
			if(index < 0) {
				index = $(".banner-images").children().size() - 1;
			}
			if(index > $(".banner-images").children().size() - 1) {
				index = 0;
			}
			//图片跟随运动
			$.each($(".banner-images").children(), function(inde, value) {
				value.className = "";
			});
			$(".banner-images").children().eq(index).css({
				'z-index': z
			}).addClass("change-banner");
			z++;
			//小圆点跟随运动
			if(index >= $(".banner-images").children().size()) {
				for(var i = 0; i < $(".b-dot ul li").size(); i++) {
					$(".b-dot ul li").eq(i).get(0).className = "";
				}
				$(".b-dot ul li").eq(0).get(0).className = "on";
			} else if(index < 0) {
				for(var i = 0; i < $(".b-dot ul li").size(); i++) {
					$(".b-dot ul li").eq(i).get(0).className = "";
				}
				$(".b-dot ul li").eq($(".banner-images").children().size() - 1).get(0).className = "on";
				index = $(".banner-images").children().size() - 1;
			} else {
				for(var i = 0; i < $(".b-dot ul li").size(); i++) {
					$(".b-dot ul li").eq(i).get(0).className = "";
				}
				$(".b-dot ul li").eq(index).get(0).className = "on";
			}
		}

		//自动轮播
		var timer = null;
		timer = setInterval(function() {
			index++;
			move();
		}, 1000);

		//划入轮播区域停止自动轮播,显示左右按钮
		$(".banner").on("mouseenter", function() {
			clearInterval(timer);
			$('.prev').css({
				'opacity': 0.3
			})
			$('.next').css({
				'opacity': 0.3
			})
		})

		//划出轮播区域继续自动轮播,隐藏左右按钮
		$(".banner").on("mouseleave", function() {
			clearInterval(timer);
			timer = setInterval(function() {
				index++;
				move();
			}, 1000)
			$('.prev').css({
				'opacity': 0
			})
			$('.next').css({
				'opacity': 0
			})
		})

		//小圆点划上效果
		$(".b-dot ul").on("mouseenter", "li", function() {
			index = $(this).html() - 1;
			move();
		})

		//获取商场cookie
		$.ajax({
				url: "http://10.9.168.61:8888/project/yiguo/data/goodList.php",
				dataType: "jsonp"
			})
			.then(function(res) {

				var html = `
				<div class="market-side"  data-id =${res[0].id}>
					<a href="goods_list.html" target="_blank"><img src="${res[0].src}"></a>
				</div>
				<div class="market-main">
					<ul>
						<li  data-id =${res[1].id}>
							<a href="goods_details.html" target="_blank"><img src="${res[1].src}" data-id =${res[1].id}></a>
						</li>
						<li  data-id =${res[2].id}>
							<a href="goods_details.html" target="_blank"><img src="${res[2].src}" data-id =${res[2].id}></a>
						</li>
						<li class="wide"  data-id =${res[3].id}>
							<a href="goods_details.html" target="_blank"><img src="${res[3].src}" data-id =${res[3].id}></a>
						</li>
						<li class="wide"  data-id =${res[4].id}>
							<a href="goods_details.html" target="_blank"><img src="${res[4].src}" data-id =${res[4].id}></a>
						</li>
						<li  data-id =${res[5].id}>
							<a href="goods_details.html" target="_blank"><img src="${res[5].src}" data-id =${res[5].id}></a>
						</li>
						<li  data-id =${res[6].id}>
							<a href="goods_details.html" target="_blank"><img src="${res[6].src}" data-id =${res[6].id}></a>
						</li>
					</ul>
				</div>`;
				for(var i = 0; i < 10; i++) {
					$(".market").eq(i).find(".market-content").html(html);
				}

				$.each($(".market"), function(index, value) {
					$(value).find('ul').on("click", "li", function() {
						$.cookie("id", $(this).attr("data-id"));
					})
				});

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
		//拼接购物车
		function shopCarGet() {
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
					//点击删除按钮删除cookie里的商品信息
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