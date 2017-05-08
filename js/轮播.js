onload = function() {
	var leftNode = document.getElementById("left");
	var rightNode = document.getElementById("right");
	var imglistNode = document.getElementById("imglist");
	var tagNode = document.getElementById("tag");
	var tagList = tagNode.getElementsByTagName("li");
	var boxNode = document.getElementById("box")
	var count = 1;
	var imgwidth = 640;
	
	
	
	
	//点击选择
	for(i = 0; i < tagList.length; i++) {
		tagList[i].index = i + 1
		tagList[i].onclick = function() {

			count = this.index;
			startMove(imglistNode, "left", -1 * imgwidth * count)
			selectIndex(count)

		}

	}

	//下标选择

	function selectIndex(index) {
		for(var i = 0; i < tagList.length; i++) {
			if(i == index - 1) {

				tagList[i].className = "active"

			} else {
				tagList[i].className = ""

			}

		}

	}





	//定时器事件

	var timer = setInterval(move, 1000)

	function move() {
		if(!imglistNode.timer) {
			count++;
			//			console.log(count)
			startMove(imglistNode, "left", -1 * count * imgwidth, function() {
				if(count == 10) {

					count = 1;
					imglistNode.style.left = -1 * count * imgwidth + "px"
				}

			})
			selectIndex(count)
		}

	}
	boxNode.onmousemove = function() {

		clearInterval(timer);

	}
	boxNode.onmouseout = function() {

		timer = setInterval(move, 1000);

	}
	
	//浏览器关闭
window.onfocus =function(){
					
					timer = setInterval(move,2000);
					
				}
				
				//浏览器窗口失去焦点
				window.onblur = function(){
					
					clearInterval(timer);
				}
	

	//按键事件
	rightNode.onclick = function() {
		if(!imglistNode.timer) {
			count++;
			console.log(count)
			startMove(imglistNode, "left", -1 * count * imgwidth, function() {
				if(count == 10) {

					count = 1;
					imglistNode.style.left = -1 * count * imgwidth + "px"
				}

			})
			selectIndex(count)
		}
	}
	leftNode.onclick = function() {
		if(!imglistNode.timer) {
			count--;
			console.log(count)
			startMove(imglistNode, "left", -1 * count * imgwidth, function() {
				if(count == 0) {

					count = 9;
					imglistNode.style.left = -1 * count * imgwidth + "px"
				}

			})
			selectIndex(count)
		}
	}

	//按钮变色
	leftNode.onmousemove = function() {

		this.style.opacity = "0.9";
		this.style.filter = "alpha(opacity=90)"

	}
	leftNode.onmouseout = function() {

		this.style.opacity = "0.3";
		this.style.filter = "alpha(opacity=30)"

	}
	rightNode.onmousemove = function() {

		this.style.opacity = "0.9";
		this.style.filter = "alpha(opacity=90)"

	}
	rightNode.onmouseout = function() {

		this.style.opacity = "0.3";
		this.style.filter = "alpha(opacity=30)"

	}

	//弹性运动
	var navNode = document.getElementById("bg");
	var navListArr = navNode.getElementsByTagName("li");
	var lineNode = document.getElementById("line")

	for(i = 0; i < navListArr.length; i++) {
		navListArr[i].onmousemove = function() {

			lineMove(lineNode, this.offsetLeft);

		}

	}

	function lineMove(obj, target) {
		clearInterval(obj.timer)
		var speed = 0;
		obj.timer = setInterval(function() {
			var current = obj.offsetLeft;

			speed += (target - current) / 8;
			speed *= 0.8;
			if(Math.abs(target - current) < 1) {

				obj.style.left = target + "px"

				clearInterval(obj.timer);
				return;

			}

			obj.style.left = current + speed + "px"

		}, 30)
	}


//回到顶部
	var backtopNode=document.getElementById("backtop");
	
	
	var backTop=new Backtop(backtopNode);



//图片变大


var imgbig=new Imgbig()






}