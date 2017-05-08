function getStyle(obj, attr) {

				var style = obj.currentStyle || getComputedStyle(obj, null);

				return style[attr];
			}

			/*
			 * obj表示需要移动的对象
			 * attr表示需要修改的属性
			 * target表示目标像素
			 */
			function startMove(obj, attr, target,fn) {

				//先停止定时器（防止连点）
				clearInterval(obj.timer);
		
			
				obj.timer = setInterval(function() {

					//当前位置
					var current = parseInt(getStyle(obj, attr));
					//0.0000000000000012
					//-0.18-> -1
					
					//左右缓冲移动
					var speed = (target - current) / 8;
					speed = speed > 0?Math.ceil(speed):Math.floor(speed);
					
					
					//末尾的增量是1px，所以可以刚刚好达到target目标像素
					if(target == current){
						if(fn){
							fn()
						}
						
						clearInterval(obj.timer);
						obj.timer=0;
						return;
					}
					
					obj.style[attr] = current + speed + 'px';

				}, 30)

			}