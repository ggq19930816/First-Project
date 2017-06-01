define(function() {
	//放大镜
	// 参数 
	//     1.显示的盒子
	//     2.移动的小盒子
	//     3.放大的盒子
	//     4.放大盒子的背景
	function Magnifier(box, moveBox, bigBox, bigBoxAll) {
		this.oS_box = document.getElementById(box);
		this.oPosition_box = document.getElementById(moveBox);
		this.oB_box = document.getElementById(bigBox);
		this.oB_box_all = document.getElementById(bigBoxAll);
		var that = this;
		//鼠标移入可视框 小框出现，放大镜图出现
		this.oS_box.onmouseover = function() {
			that.fnOnmouseover();
		}
		this.oS_box.onmouseout = function() {
				that.fnOnmouseout();
			}
			//鼠标移动，小框也移动
		this.oS_box.onmousemove = function(event) {
			that.fnOnmousemove(event);
		}
	}

	Magnifier.prototype.fnOnmouseover = function() {
		this.oPosition_box.style.display = "block";
		this.oB_box.style.display = "block";
	}

	Magnifier.prototype.fnOnmouseout = function() {
		this.oPosition_box.style.display = "none";
		this.oB_box.style.display = "none";
	}

	Magnifier.prototype.fnOnmousemove = function(event) {
		var evt = event || window.event;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var left = evt.clientX - this.oS_box.parentNode.parentNode.offsetLeft - this.oPosition_box.offsetWidth / 2;
		var top = evt.clientY + scrollTop - this.oS_box.parentNode.parentNode.offsetTop - this.oPosition_box.offsetHeight / 2;
		//边界检测
		if(left <= 0) {
			left = 0;
		}
		if(left >= this.oS_box.offsetWidth - this.oPosition_box.offsetWidth) {
			left = this.oS_box.offsetWidth - this.oPosition_box.offsetWidth;
		}
		if(top <= 0) {
			top = 0;
		}
		if(top >= this.oS_box.offsetHeight - this.oPosition_box.offsetHeight) {
			top = this.oS_box.offsetHeight - this.oPosition_box.offsetHeight;
		}

		this.oPosition_box.style.left = left + "px";
		this.oPosition_box.style.top = top + "px";

		//随着小框移动 右边的图片也移动
		var propLeft = left / (this.oS_box.offsetWidth - this.oPosition_box.offsetWidth);
		var propTop = top / (this.oS_box.offsetHeight - this.oPosition_box.offsetHeight);

		this.oB_box_all.style.left = propLeft * (this.oB_box.offsetWidth - this.oB_box_all.offsetWidth) + "px";
		this.oB_box_all.style.top = propTop * (this.oB_box.offsetHeight - this.oB_box_all.offsetHeight) + "px";

	}
	return Magnifier;
})