$(function(){
	
	$.get("data/onepiece.json",function(res){
		
		var $tr;
		$.each(res, function(index,obj) {
//			console.log(res)

			
			
			
			
			
			var a="<h5>top<span>"+this.id+"</span></h5>"
			var b="<div class=box2><img src="+this.img1+"></div>"
			var c="<p>"+this.title+"</p>"
			var all="<a href=onepiece.html?"+this.id+">"+a+b+c+"</a>"
			
		
			
			
				$(".box").append(all)
			
			
			
			
			
			
		});
		
		
		
		
	})
	
	
	
	
	
	
	
	
})
