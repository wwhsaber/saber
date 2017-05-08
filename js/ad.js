onscroll = onresize = function() {

	var adNode = document.getElementById("ad");
	var ad2Node=document.getElementById("ad2");
	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
//	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

	var adHeight = adNode.offsetHeight;
	var target = Math.round((windowHeight - adHeight) / 2);
	startMove(adNode, "top", target);
	startMove(ad2Node, "top", target);
	
	adNode.onmouseover=function(){
		
		startMove(ad2Node, "left", adNode.offsetWidth);
	}
	ad2Node.onmousemove=function(){
		console.log("1")
		ad2Node.style.left=100+"px";
		
	}
	adNode.onclick=function(){
		startMove(ad2Node, "left", -200);
	}
	
	ad2Node.onmouseout=function(){
		
		startMove(ad2Node, "left", -200);
		
	}
	
	
	
	var backtopNode=document.getElementById("backtop");
		var current =  document.documentElement.scrollTop || document.body.scrollTop;
						var windowHeight=document.documentElement.clientHeight||document.body.clientHeight;
						if(current>windowHeight){
							console.log("1")
							backtopNode.style.display="block"
							
							
						}else{
							backtopNode.style.display="none"
						}
}