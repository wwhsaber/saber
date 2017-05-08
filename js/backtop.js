function Backtop(obj){
	
	this.getMove(obj);
	
	
}


Backtop.prototype.getMove=function(obj){
	
	
	var self=this;
	obj.onclick=function(){
		var timer = setInterval(function(){
						
						var current =  document.documentElement.scrollTop || document.body.scrollTop;
						var windowHeight=document.documentElement.clientHeight||document.body.clientHeight;
						
						
						
						//设定一个速度值
						var speed = Math.floor( (0 - current) / 5 );
						
						if(current == 0){
							
							//停止定时器
							clearInterval(timer);
							return;
						}
						
						//修改scrollTop的值
						document.documentElement.scrollTop = document.body.scrollTop = current + speed;
						
					},30);

		
		
	}
	obj.onmouseover=function(){
		console.log("1")
		obj.style.opacity="1"
		obj.children[0].style.display="block"
		
	}
	obj.onmouseout=function(){
		console.log("1")
		obj.style.opacity="0.3"
		obj.children[0].style.display="none"
		
	}
	
	
	
}
