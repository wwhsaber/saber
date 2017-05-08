//获取样式
function getStyleAttr(obj, attr) {

	//最终样式
	var styleObj = obj.currentStyle || getComputedStyle(obj, null);

	return styleObj[attr];
}


//运动函数
function startMove(obj, attr, target, fn) {


	clearInterval(obj.timer);
	
	obj.timer = setInterval(function() {

		if(attr == 'opacity') {

			var current = Math.round(parseFloat(getStyleAttr(obj, attr)) * 100);

		} else {

			var current = Math.round(parseFloat(getStyleAttr(obj, attr)));

		}

		var speed = (target - current) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		
		if(target == current){
			
			clearInterval(obj.timer);
			//复原timer的值
			obj.timer = 0;
			
			if(fn){
				fn();
			}
			
			return;
		}
		
		
		if(attr == 'opacity'){
			
			obj.style[attr] = ( current + speed ) / 100 ;
			obj.style.filter = 'alpha(' + attr + '=' + (current + speed) + ')';
			
		}else{
			
			obj.style[attr] =  current + speed + 'px' ;
			
			
		}
		

	}, 30)

}