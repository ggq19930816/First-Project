define(function() {
	//获取四位数字字母混合验证码
	function CreateDiv(){
	};
	CreateDiv.prototype.show = function(){
		if(this.div){
			this.div.style.display = "block";
		} else {
			this.div = document.createElement("div");
		}
		return this.div;
	}
	return CreateDiv;
})