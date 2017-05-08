$(function() {
	var gIndex = location.search.replace("?", "");

	console.log(gIndex)
	$.get("data/onepiece.json", function(res) {
		$.each(res, function() {
			if(this.id == gIndex) {
				//				$(".ifont10").eq(0).next("a").append(this.brand)
				//				$(".mini_nav").find("h1").append(this.title)
				//				$(".bigimg").append("<img src=" + this.img + ">")
				//				$(".smallimg").append("<img src=" + this.img + ">")
				//				$(".title").find("h2").append(this.title)
				//				$(".title").find("span").append("<a>" + this.brand + "</a>")
				//				$(".price_del").append("<b>" + this.oldprice + "</b>")
				//				$(".price_sale").append(this.price)
				//				$("title").html(this.title)
				$(".id").append(this.id);
				$(".title").append(this.title);
				var all = "";
				if(this.img1) {

					all += "<div class=swiper-slide style=background-image:url(" + this.img1 + ")></div>"
					if(this.img2) {
						all += "<div class=swiper-slide style=background-image:url(" + this.img2 + ")></div>"
						if(this.img3) {
							all += "<div class=swiper-slide style=background-image:url(" + this.img3 + ")></div>"
							if(this.img4) {
								all += "<div class=swiper-slide style=background-image:url(" + this.img4 + ")></div>"
								if(this.img5) {
									all += "<div class=swiper-slide style=background-image:url(" + this.img5 + ")></div>"
									if(this.img6) {
										all += "<div class=swiper-slide style=background-image:url(" + this.img6 + ")></div>"
										if(this.img7) {
											all += "<div class=swiper-slide style=background-image:url(" + this.img7 + ")></div>"
											if(this.img8) {
											all += "<div class=swiper-slide style=background-image:url(" + this.img8 + ")></div>"

										}
										}
									}
								}
							}
						}
					}
				}
				$(".bigbox").append(all)

				var text = "";
				if(this.p1) {

					text += "<p class=p1>" + this.p1 + "</p>"
					if(this.p2) {
						text += "<p class=p2>" + this.p2 + "</p>"
						if(this.p3) {
							text += "<p class=p3>" + this.p3 + "</p>"
							if(this.p4) {
								text += "<p class=p4>" + this.p4 + "</p>"
								if(this.p5) {
									text += "<p class=p5>" + this.p5 + "</p>"
											if(this.p6) {
									text += "<p class=p5>" + this.p6 + "</p>"

								}
								}
							}
						}
					}
				}
				$(".text").append(text)

			}
		});
		get()
	})

	function get() {
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true
			}

		});
	}

})