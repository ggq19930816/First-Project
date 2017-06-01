define(["module/Magnifier", "libs/jquery-1.11.3.js", "libs/jquery.cookie"], function(Magnifier, jq, cookie) {

	$(function() {
		cookie();
		//加载页首页尾
		$('.goods-header').load('common/shopping_header.html')
		$('.goods-footer').load('common/footer.html');
		$('.footer-service').load('common/footer_service.html')

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
		};

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
								<table class="cart-table">
									<tbody>
										<tr>
											<td class="cart-t-check"><input type="checkbox" checked="checked" comid="c6de5001-34e4-46cd-9846-147549ad0268|1"></td>
											<td class="cart-t-img">
												<a href="javascript:;"><img src="${res[i].bigImg}"></a>
											</td>
											<td class="cart-t-info">
												<a href="javascript:;">${res[i].title}</a>
											</td>
											<td class="cart-t-ub" style="width:75px;"></td>
											<td class="cart-t-price">￥${res[i].price}</td>
											<td class="cart-t-num">
												<div class="quantity-form">
													
													<input type="text" class="itxt" oldnum="1" value="${obj.num}"  disabled="disabled">
													
												</div>
											</td>
											<td class="cart-t-total">￥<span>${obj.price}</span></td>
											<td class="cart-t-spec">6个/份</td>
											<td class="cart-t-opera">
												<a href="javascript:void(0);" class="del" data-id="${obj.id}">删除</a>
											</td>
										</tr>
									</tbody>
								</table>
									`
								}
							}
						})
					}

					$(".cart-list").html(html);
					//删除按钮
					$(".cart-list").on("click", ".del", function() {
						var index = $(this).attr("data-id");
						console.log(index);
						console.log(cookieArr)
						for(var i = 0; i < cookieArr.length; i++) {
							if(cookieArr[i].id == index) {
								//需要删除的商品
								cookieArr.splice(i, 1)
							}
						}
						$(this).parents("table").remove();
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