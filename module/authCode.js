//CMD
//define(function(require, exports, module) {
//	module.exports = {
//		//获取四位数字字母混合验证码
//		authCode: function() {
//			var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
//			var str = "";
//			for(var i = 0; i < 4; i++) {
//				var randomNum = Math.round(Math.random() * 35);
//				str = str + arr[randomNum];
//			}
//			return str;
//		}
//	}
//})

define(function() {
	//获取四位数字字母混合验证码
	function authCode() {
		var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		var str = "";
		for(var i = 0; i < 4; i++) {
			var randomNum = Math.round(Math.random() * 35);
			str = str + arr[randomNum];
		}
		return str;
	}
	return authCode;
})