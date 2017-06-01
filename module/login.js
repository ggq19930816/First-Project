define(["module/authCode", "module/randomColor", "module/createDiv", "libs/jquery-1.11.3.js", "libs/jquery.cookie"], function(authCode, color, CreateDiv, jq, cookie) {

	$(function() {
		cookie();
		//加载页首页尾
		$('.header').load('common/header.html', function() {
			$(".header span").html("注册");
		})
		$('.footer').load('common/footer.html');

		//记住账号信息功能
		$("#userName").val($.cookie('user'));
		$("#pwd").val($.cookie('pwd'));

		//验证码
		$('#checkNumber').html(authCode()).css({
			background: color()
		});
		$("#changeNumber").on("click", function() {
			$('#checkNumber').html(authCode()).css({
				background: color()
			});
		});

		var createDiv = new CreateDiv;
		//登录信息验证
		$("#btnLogin").on("click", function() {
			//单例提示框
			box = createDiv.show();
			$(box).addClass('login-message');
			$("#welcomeLogin").after(box);
			if($('#VerifyCode').val() == "" || $('#VerifyCode').val() != $('#checkNumber').html()) {
				$('.login-message').html('请输入正确的验证码');
			} else if($('#userName').val() == "") {
				$('.login-message').html('登录名不能为空');
			} else if($('#pwd').val() == "") {
				$('.login-message').html('密码不能为空');
			} else {
				if($('#userRemeber').get(0).checked) {
					$.cookie('user', $("#userName").val(), {
						expires: 15
					});
					$.cookie('pwd', $("#pwd").val(), {
						expires: 15
					})
				}
				$.ajax({
					type: "get",
					data: "status=login&userID=" + $("#userName").val() + "&password=" +
						$("#pwd").val(),
					url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				}).then(function(res) {
					if(res == 0) {
						$('.login-message').html('用户名不存在');
					} else if(res == 2) {
						$('.login-message').html('用户名密码不符');
					} else {
						$('.login-message').html('已经登录成功').css({
							'background': 'white none repeat scroll 0 0',
							'border': '1px solid green',
							'color': 'greens'
						});
						location.href = "index.html";
					}

				})
			}

		})

	})

})