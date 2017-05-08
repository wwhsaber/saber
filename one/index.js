$(function() {

	$('#header').load('common/hearder1.html',function(){
		//登录信息(写在此处是因为只有导入头部以后这段代码才起作用)
		var loginCookie = $.cookie('login');
					
		if(loginCookie){
			console.log('in')
			var  loginCookie = JSON.parse(loginCookie);
			var nameStr = loginCookie.data.username;
			console.log(loginCookie)
			console.log(nameStr)
			if(loginCookie.is == true){
				console.log('in')
				$('.header_up .up_left').css({
					display:'none'
				})
				$('.header_up .up_left_login').css({
					display:'block'
				})
				$('.up_left_login .up_personal').html(nameStr)
			}
		}else{
			
	//		console.log('in')
			$('.header_up .up_left').css({
				display:'block'
			})
			$('.header_up .up_left_login').css({
				display:'none'
			})
		}
	})
	$('#nav').load('common/nav.html')
	$('#footer').load('common/footer.html')

	//------------------------------------banner轮播图特效---------------------------------
	var $bannerImgList = $('#banner_img');
	var $bannerImgLi = $('#banner_img li');
	var $bannerIndexLi = $('#banner_index li');

	var bannerImgIndex = 0; //显示当前图片的下标

	var bannerImgTimer = '';

	function bannerStart() {

		bannerImgTimer = setInterval(function() {
			bannerImgIndex++;

			if(bannerImgIndex == $bannerImgLi.length) {
				bannerImgIndex = 0;
			}

			bannerImgMove();
		}, 3000)

	}

	function bannerImgMove() {
		//大图片的动画
		$bannerImgLi.eq(bannerImgIndex).addClass('banner_img_change').stop().animate({
			"opacity": 1
		}).siblings().removeClass('banner_img_change').stop().animate({
			"opacity": 0
		})

		//$li.eq(index).stop().slideDown(500).siblings().stop().slideUp(500);

		//对数字小图进行处理
		$bannerIndexLi.eq(bannerImgIndex).addClass('banner_index_active').siblings().removeClass('banner_index_active');

	}
	bannerStart();

	$bannerIndexLi.hover(function(){
		//enter
		clearInterval(bannerImgTimer);
		bannerImgIndex = $(this).index();
		bannerImgMove();
	}, function() {
		//leave
		bannerStart();
	})
	$bannerImgList.hover(function(){
		//enter
		clearInterval(bannerImgTimer);
		var $thisImg = $(this).find('.banner_img_change');
		bannerImgIndex = $thisImg.index();
		$thisImg.find('img').stop().animate({
			"width":"2112px",
			"height":"550px",
			"top":"-=25px",
			"left":"-=96px"
		},3000)
	}, function() {
		//leave
		var $thisImg = $(this).find('.banner_img_change');
		$thisImg.find('img').stop().animate({
			"width":"1920px",
			"height":"500px",
			"top":"50%",
			"left":"50%"
		},bannerStart())
	})
	
	
/*-------------------------------------------------banner下方（紧挨着）促销活动动画--------------------------------------------------*/
	/*----左半部分----*/
	$('.lucky_pic span').click(function(){
		
		$(this).toggleClass('change_img');
		$(this).siblings().toggleClass('show_img');
		if($(this).hasClass('change_img')){
			$(this).parent().siblings('.event').css({
				display:'none'
			});
		}else{
			$(this).parent().siblings('.event').css({
				display:'block'
			});
		}
		
	})
	
	var $eventSpan = $('.event_ad_top span');
	var $eventUl = $('.event_ad ul');
	$eventSpan.mouseenter(function(){
		$(this).addClass('event_ad_on').siblings().removeClass('event_ad_on');
		$eventUl.eq($(this).index()).addClass('event_ul_show').siblings().removeClass('event_ul_show');
	})
	
	/*----右半部分----*/
//	/*-----获取json数据------*/
	$.get("../data/index/index_louti.json",function(res){
		//检查获取的数据
//		console.log(res);
//		console.log(typeof res);
		
		var $ul;
		$.each(res,function(index,obj){
			
			//当个数为5的倍数时，创建并添加ul.(ul加入页面在下方)
			//index=0 时，会创建并添加一个ul,0-4共五个li会添加进去
			//index=5 时，会创建并添加一个ul,5-9共五个li会添加进去...
			if(index%5==0){
			 	$ul = $('<ul/>')
			}

			var $li = $('<li/>')
			var $dl = $('<dl/>')
			
			var $dt = $('<dt/>')
			
			$dt.append("<a href=goodDetail.html?" + this.id + " class='goods_img'><img src=" + this.img +"/></a>");
			
			$dl.append($dt);
			
			var $dd1 = $('<dd/>').addClass('goods_contain');
			
			var $aName = $('<a/>').addClass('goods_info').attr('href','goodDetail.html?' + this.id);
			
			$aName.html(this.name)
			
			$dd1.append($aName);
			
			var $pPrice = $('<p/>').addClass('goods_price');
			
			$pPrice.append("<span>￥</span><b>" +　this.price + "</b>");
			
			$dd1.append($pPrice);
			
			$dl.append($dd1);
			
			var $dd2 = $('<dd/>').addClass('goods_sum');
			
			$dd2.append("<span>售出<b class=sold_sum>" + this.sum + "</b></span>")
		
			$dl.append($dd2);
			
			$li.append($dl);
			
			$ul.append($li);
			
			//ul加入页面
			if(index%5 == 0){
				
				$('.section_top .hot_goodslist').append($ul);
				
			}

			
		})
	})
	
	
	var $hotadsLi = $('.hot_ads li');
	var $hotgoodlist = $('.hot_goodslist');
	$hotadsLi.mouseenter(function(){
		var num = $(this).index();
		var listTop = num * -315 + 'px';
		$(this).addClass('hot_ads_active').siblings().removeClass('hot_ads_active');
		$hotgoodlist.stop().animate({
			top:listTop
		},500)
		
	})
	
	/*-------------------------------------------------好评过的和购买过的动画--------------------------------------------------*/
	/*----左半部分轮播图----*/
	var $judgedgoodlist = $('.judged_goodslist');
	var $judgedImgLi = $('.judged_goodslist li');
	var $judgedIndexLi = $('.judged_goodsindex li');

	var judgedImgIndex = 0; //显示当前图片的下标

	var judgedImgTimer = '';
	
	var judgedNum = 0;

	function judgedStart() {

		judgedImgTimer = setInterval(function() {
			
			judgedNum++;//使其先向右轮播在向左轮播
			if(judgedNum == 5){
				judgedNum = 1;
			}
			
			if(judgedNum == 1) {
				judgedImgIndex = 1;
			}
			if(judgedNum == 2) {
				judgedImgIndex = 2;
			}
			if(judgedNum == 3) {
				judgedImgIndex = 1;
			}
			if(judgedNum == 4) {
				judgedImgIndex = 0;
			}

			judgedImgMove();
		}, 1000)

	}

	function judgedImgMove(fn) {
		//大图片的动画
		
		var left = judgedImgIndex * -588 + 'px'
		$judgedgoodlist.stop().animate({
			left: left
		},function(){
			if(fn){
				fn();
			}
		})

		//对数字小图进行处理
		$judgedIndexLi.eq(judgedImgIndex).addClass('judged_goodsindex_active').siblings().removeClass('judged_goodsindex_active');

	}
	judgedStart();

	$judgedIndexLi.mouseenter(function(){
		//enter
		clearInterval(judgedImgTimer);
		judgedImgIndex = $(this).index();
		if(judgedNum > judgedImgIndex && judgedNum - judgedImgIndex != 1 && judgedNum - judgedImgIndex != 3){
			judgedNum = judgedImgIndex;
		}
		judgedImgMove(judgedStart);
	})
	
	/*----右半部份移入动画----*/
	var $discountSpan = $('.right_good1discount span');
	$discountSpan.hover(function(){
		$(this).parent().siblings('.right_hiddeninfo').css({
			display:'block'
		})
	},function(){
		$(this).parent().siblings('.right_hiddeninfo').css({
			display:'none'
		})
	})
	
	/*-------------------------------------------------品牌汇的动画--------------------------------------------------*/
	/*----上半部分手风琴动画----*/
	$('.content_ad .ad_up li').mouseenter(function(){
		
		$(this).stop().animate({
			width:'450px'
		}).siblings('li').stop().animate({
			width:'150px'
		})
	});
	/*----下半部分移入动画----*/
	$('.content_ad .ad_down li img').hover(function(){
		
		$(this).stop().animate({
			left:'-100px'
		})
	},function(){
		$(this).stop().animate({
			left:'0'
		})
	});
	
	
	/*-------------------------------------------------酒友品鉴的动画--------------------------------------------------*/
	/*----点击轮播动画----*/
	var $friendSpanLeft = $('.content_friends .pagechange span').eq(0);
	var $friendSpanRight = $('.content_friends .pagechange span').eq(1);	
	var $friendImgList = $('.content_friends .left_goodslist ul');//需移动的ul
	var $friendImgLi = $('.content_friends .left_goodslist li');//li的集合
	var $friendIndex = $('.content_friends .pagechange .pagenum');//改变的页面数
	
	var friendClickNum = 0;
	
	var friendMaxIndex = $friendImgLi.length / 3;
	
	$friendSpanLeft.click(function(){
		friendClickNum--;
		if(friendClickNum <= 0){
			friendClickNum = 0;
		}
		friendSpanJudge();
		friendImgMove();
	})
	$friendSpanRight.click(function(){
		friendClickNum++;
		if(friendClickNum >= friendMaxIndex - 1){
			friendClickNum = friendMaxIndex - 1;
		}
		friendSpanJudge();
		friendImgMove();
	})
	
	function friendSpanJudge(){
		if(friendClickNum <= 0){
			$friendSpanLeft.attr('class','pagechange_disabled');
		}else{
			$friendSpanLeft.attr('class','pageleft');
		}
		if(friendClickNum >= friendMaxIndex - 1){
			$friendSpanRight.attr('class','pagechange_disabled');
		}else{
			$friendSpanRight.attr('class','pageright');
		}
	}
	
	function friendImgMove(){
		
		var left = -317 * 3 *friendClickNum + 'px';
		
		$friendImgList.stop().animate({
			left:left
		},function(){
			$friendIndex.html(friendClickNum + 1);
		})
		
	}
	
	/*-------------------------------------------------洋酒、烈酒的动画--------------------------------------------------*/
	/*----轮播动画----*/
	var $yangjiugoodlist = $('.yangjiu_imglist');
	var $yangjiuImgLi = $('.yangjiu_imglist li');
	var $yangjiuIndexLi = $('.yangjiu_imgindex li');

	var yangjiuImgIndex = 0; //显示当前图片的下标

	var yangjiuImgTimer = '';
	
	var yangjiuNum = 0;

	function yangjiuStart() {

		yangjiuImgTimer = setInterval(function() {
			
			yangjiuNum++;//使其先向右轮播再向左轮播
			if(yangjiuNum == 7){
				yangjiuNum = 1;
			}
			
			if(yangjiuNum == 1) {
				yangjiuImgIndex = 1;
			}
			if(yangjiuNum == 2) {
				yangjiuImgIndex = 2;
			}
			if(yangjiuNum == 3) {
				yangjiuImgIndex = 3;
			}
			if(yangjiuNum == 4) {
				yangjiuImgIndex = 2;
			}
			if(yangjiuNum == 5) {
				yangjiuImgIndex = 1;
			}
			if(yangjiuNum == 6) {
				yangjiuImgIndex = 0;
			}

			yangjiuImgMove();
		}, 1000)

	}

	function yangjiuImgMove(fn) {
		//大图片的动画
		
		var left = yangjiuImgIndex * -760 + 'px'
		$yangjiugoodlist.stop().animate({
			left: left
		},function(){
			if(fn){
				fn();
			}
		})

		//对数字小图进行处理
		$yangjiuIndexLi.eq(yangjiuImgIndex).addClass('yangjiu_index_active').siblings().removeClass('yangjiu_index_active');

	}
	yangjiuStart();

	$yangjiuIndexLi.mouseenter(function(){
		//enter
		clearInterval(yangjiuImgTimer);
		yangjiuImgIndex = $(this).index();
		if(yangjiuNum > yangjiuImgIndex && yangjiuNum - yangjiuImgIndex != 0 && yangjiuNum - yangjiuImgIndex != 1 && yangjiuNum - yangjiuImgIndex != 3 && yangjiuNum - yangjiuImgIndex != 5){
			yangjiuNum = yangjiuImgIndex;
		}
		yangjiuImgMove(yangjiuStart);
	})
	
	
	/*----移入显示动画----*/
	$('.content_yangjiu .main_right li').mouseenter(function(){
		
		$('.content_yangjiu .main_right .right_index').each(function(){
			$(this).attr('id','')
		})
		$('.content_yangjiu .main_right .right_name').each(function(){
			$(this).attr('id','')
		})
		$('.content_yangjiu .main_right .right_info').each(function(){
			$(this).attr('id','')
		})
		
		$(this).find('div').eq(0).attr('id','yangjiu_right_index')//右侧d数字标记改变类名
		
		$(this).find('div').eq(1).attr('id','yangjiu_right_name')//lin内的第一个div消失
		
		$(this).find('div').eq(2).attr('id','yangjiu_right_info')//lin内的大div出现
		
	})

})


