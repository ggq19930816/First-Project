//CMD
//define(function(require) {
//	var authCode = require("../module/authCode");
//	require("jquery");
//	cookie = require("jquery.cookie");
//	cookie();
//	$(function() {
//		//加载页首页尾
//		$('.header').load('common/header.html', function() {
//			$(".header span").html("注册");
//		})
//		$('.footer').load('common/footer.html');
//		//验证码
//		$("#changeCheckNumber").on("click", function() {
//			$('#checkNumber').html(authCode.authCode());
//		})
//
//		//表单验证
//	})
//})

//1.引入插件的方式 define(function(){return function(){}在里面包裹插件代码，因为是异步加载，所以等jquery加载完毕之后再调用cookie就没冲突了
//2.传入参数不要占用$
define(["module/authCode", "module/randomColor", "libs/jquery-1.11.3.js", "libs/jquery.cookie"], function(authCode, color, jq, cookie) {

	$(function() {
		//加载页首页尾
		$('.header').load('common/header.html', function() {
			$(".header span").html("注册");
		})
		$('.footer').load('common/footer.html');
		//验证码
		$('#checkNumber').html(authCode()).css({
			background: color()
		});
		$("#changeCheckNumber").on("click", function() {
			$('#checkNumber').html(authCode()).css({
				background: color()
			});
		});

		//表单验证
		var arr = [false, false, false, false];

		//验证码检验
		$("#imageNumber").on("blur", function() {
			if($(this).val() == "") {
				$(this).nextAll(".pass-tip").html("<i></i>验证码不能为空").children().css({
					'background-position': "-40px -200px"
				})
				arr[0] = false;
			} else if($(this).val() == $("#checkNumber").html()) {
				$(this).nextAll(".pass-tip").html("<i></i>").children().css({
					'background-position': "-0px -200px"
				})
				arr[0] = true;
			} else {
				$(this).nextAll(".pass-tip").html("<i></i>验证码错误").children().css({
					'background-position': "-40px -200px"
				})
				arr[0] = false;
			}
		})

		//手机检验规范
		$("#register-phone").on("blur", function() {

			var regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if($(this).val() == "") {
				$(this).next().html("<i></i>手机号不能为空").children().css({
					'background-position': "-40px -200px"
				})
				arr[1] = false;
			} else if(regPhone.test($(this).val())) {
				$(this).next().html("<i></i>").children().css({
					'background-position': "-0px -200px"
				})
				arr[1] = true;
			} else {
				$(this).next().html("<i></i>手机号不合规范").children().css({
					'background-position': "-40px -200px"
				})
				arr[1] = false;
			}
		})

		//密码检验规范
		//字母、数字和符号及两种以上的组合,6-20个字符
		$("#register-pwd").on("blur", function() {
			var regPass = /^[\w(!@#$%&)]{6,20}$/;
			if($(this).val() == "") {
				$("#register-pwd-again").next().html("<i></i>密码不能为空").children().css({
					'background-position': "-40px -200px"
				})
				arr[2] = false;
			} else if(regPass.test($(this).val())) {
				$("#register-pwd-again").next().html("")
				arr[2] = true;
			} else {
				$("#register-pwd-again").next().html("<i></i>密码不合规范").children().css({
					'background-position': "-40px -200px"
				})
				arr[2] = false;
			}
		})

		//密码确认检验
		$("#register-pwd-again").on("blur", function() {
			if($("#register-pwd").val() == "") {
				arr[3] = false;
			} else if($(this).val() == $("#register-pwd").val()) {
				$("#register-pwd-again").next().html("<i></i>").children().css({
					'background-position': "-0px -200px"
				})
				arr[3] = true;
			} else {
				$("#register-pwd-again").next().html("<i></i>确认密码不一致").children().css({
					'background-position': "-40px -200px"
				})
				arr[3] = false;
			}
		})

		//注册提交表单时校验信息是否都已经正确录入
		$(".register-finish a").on("click", function() {
			var num = 0;
			for(var i = 0; i < arr.length; i++) {
				if(arr[i]) {
					num++;
				} else {
					$('#imageNumber').nextAll(".pass-tip").html("<i></i>请填写注册信息").children().css({
						'background-position': "-40px -200px"
					})
				}
			}
			if(num == 4 && $("#tab1chk").get(0).checked) {
				$.ajax({
					type: "get",
					data: "status=register&userID=" + $("#register-phone").val() + "&password=" +
						$("#register-pwd").val(),
					url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				}).then(function(res) {
					if(res == 1) {
						alert("恭喜您注册成功!");
						location.href = "login.html";
					}
					if(res == 0) {
						alert("用户名已存在!")
					}
					if(res == 2) {
						alert("数据库出现了问题，请稍后再注册!")
					}
				})
			} else {
				return false;

			}

		})

	})

})