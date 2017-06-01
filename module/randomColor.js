//define(function(require, exports, module) {
//	module.exports = {
//		//获取随机颜色
//		//参数:无
//		//返回值：随机颜色代码
//		randomColor: function() {
//			// 分析：
//			//     1.返回的值以#开头，共七位
//			//     2.后六位是0123456789abcdef随机组合
//			var res = "#";
//			var string = "0123456789abcdef";
//			for(var i = 0; i < 6; i++) {
//				var j = Math.round(Math.random() * 15);
//				res = res + string[j];
//			}
//			return res;
//		}
//	}
//
//})

define(function() {
	//获取随机颜色
	//参数:无
	//返回值：随机颜色代码
	function randomColor() {
		// 分析：
		//     1.返回的值以#开头，共七位
		//     2.后六位是0123456789abcdef随机组合
		var res = "#";
		var string = "0123456789abcdef";
		for(var i = 0; i < 6; i++) {
			var j = Math.round(Math.random() * 15);
			res = res + string[j];
		}
		return res;
	}
	return randomColor;
})