$(function(){
	
	//倒计时效果
	var timer = setInterval(function(){showCountDown(2016,3,15,".restTime")},1000);
	
	function showCountDown(year,month,day,eleName){
		var now = new Date();
		var endDate = new Date(year,month-1,day);
		var leftTime = endDate.getTime() - now.getTime();
		var leftsecond = parseInt(leftTime/1000);
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		var $eleName = $(eleName); 
		$eleName.html(day1+"天"+hour+"时"+minute+"分"+second+"秒"); 
	}

	//放大镜效果
	$(".wcp-topImg").on({
		"mouseenter":function(event){
			//console.log($(".smallmagnifier").width());
			var mX = event.pageX - $(".wcp-topImg").offset().left - 85;
			var mY = event.pageY - $(".wcp-topImg").offset().top - 110;
			//console.log(mX);			
			if(mX > 230){
				mX = 230;
			}else if(mX < -5){
				mX = -5;
			}
			if(mY > 310){
				mY = 310;
			}else if(mY < -5){
				mY = -5;
			}
			$(".smallmagnifier").show();
			$(".smallmagnifier").animate({
				"top":mY,
				"left":mX
			},10);
			$(".magnifier").show();
			
		},
		"mouseleave":function(){
			$(".smallmagnifier").hide();
			$(".magnifier").hide();
		}
	});
		
	$(".smallmagnifier").on("mousemove",function(event){
		var mouseX = event.pageX - $(".wcp-topImg").offset().left - $(".smallmagnifier").width()/2;
		var mouseY = event.pageY - $(".wcp-topImg").offset().top - $(".smallmagnifier").height()/2;
//		console.log(mouseX);
//		console.log(mouseY);
		if(mouseX > 230){
				mouseX = 230;
			}else if(mouseX < 0){
				mouseX = 0;
			}
			if(mouseY > 310){
				mouseY = 310;
			}else if(mouseY < 0){
				mouseY = 0;
			}
		$(this).css({
				"top": mouseY + "px",
				"left": mouseX + "px"
			});
			$(".trueBigImg").css({
				"top": -2*mouseY + "px",
				"left": -2*mouseX + "px"
			})
		
	});
	
	//鼠标划过小图片
	$(".main-smallImg li a").on("mouseenter",function(){
		var topImg = $(this).find("img").attr("src");
		$(".wcp-topImg img").prop("src",topImg);
		$(".magnifier img").prop("src",topImg);
		$(".wcp-sImg ul li a").removeClass("blackborder");
		$(this).addClass("blackborder");
	});
	
	//小图片切换功能
	$(".prevPage").on("click",function(){
		$(".pageRight").addClass("hasRightArrow");
		
		var $liWidth = $(".main-smallImg li").outerWidth(true);
		var maxLeft = $liWidth * ($(".main-smallImg li").length - 3);
		var moveDis = parseInt($(".main-smallImg").css("left")) + $liWidth;

		if(parseInt($(".main-smallImg").css("left")) < (-maxLeft)){
			$(".main-smallImg").animate({
				"left": moveDis + "px"
			},10);	
			console.log($(".main-smallImg").css("left"));
		}else if(parseInt($(".main-smallImg").css("left")) == (-maxLeft)){
			$(".main-smallImg").animate({
				"left": moveDis + "px"
			},10);
			$(".pageLeft").removeClass("hasLeftArrow");
		}
		
	});
	$(".nextPage").on("click",function(){
		$(".pageLeft").addClass("hasLeftArrow");
		var $liWidth = $(".wcp-sImg ul li").outerWidth(true);
		var maxLeft = $liWidth * ($(".main-smallImg li").length - 4);
		var moveDis = parseInt($(".wcp-sImg ul").css("left")) + $liWidth;
		if(parseInt($(".wcp-sImg ul").css("left")) > -(maxLeft)){
			$(".wcp-sImg ul").css({
				"left": -moveDis + "px"
			});
		} else if(parseInt($(".wcp-sImg ul").css("left")) <= -(maxLeft)){
			$(".wcp-sImg ul").css({
				"left": -moveDis + "px"
			});	
			$(".pageRight").removeClass("hasRightArrow");
		}
		
	});
	
	//商品尺码划过事件
	$(".clothSizeli").hover(function(){
		$(this).find(".popupBox").stop().show();
	},function(){
		$(this).find(".popupBox").stop().hide();
	});
	//商品尺码点击事件
	$(".clothSizeli").on("click",function(){
		if($(".clothSizeli").hasClass("blackbg") && !$(this).hasClass("blackbg")){
			$(".clothSizeli").removeClass("blackbg");
			$(this).addClass("blackbg");
		}else if(!$(".clothSizeli").hasClass("blackbg") && !$(this).hasClass("blackbg")){
			$(this).addClass("blackbg");
		}
	});
	
	//商品数量增加事件
	$(".increaseQuantity").on("click",function(){
		var $quantity = Number($(".customQuantity input").val()) + 1;		
		$(".reduceQuantity").addClass("canReduceQuantity");
		$(".reduceQuantity").removeClass("noneReduceQuantity");
		$(".customQuantity input").prop("value",$quantity);
	});
	$(".reduceQuantity").on("click",function(){
		var $quantity = Number($(".customQuantity input").val()) - 1;
		if($quantity == 1){
			$(".customQuantity input").prop("value",$quantity);
			$(".reduceQuantity").removeClass("canReduceQuantity");
			$(".reduceQuantity").addClass("noneReduceQuantity");
		}else if($(".customQuantity input").val() > 1){
			$(".customQuantity input").prop("value",$quantity);
		}
	});
	
	//锚点事件
	$(".productInfo").on("click",function(){
		var pItop = $(".wcp-mdltitle1").offset().top -43;
		$("body").animate({
			"scrollTop":pItop + "px"
		});
		$(".slideLine").animate({
			"left":"0px"
		},500)
	});
	$(".brandStory").on("click",function(){
		var pItop = $(".wcp-mdltitle2").offset().top - 43;
		$("body").animate({
			"scrollTop":pItop + "px"
		});
		$(".slideLine").animate({
			"left":"100px"
		},500)
	});
	
	//显示悬浮框
	$(window).scroll(function(){
		if($("body").scrollTop() > 880){
			$(".floatnav").show();
		}else{
			$(".floatnav").hide();
		}
	});
	
	//点击尺寸测量
	$(".measureIcon").on("click",function(){
		var showMeasure = $(".measureTable").offset().top - 50;
		$("body").animate({
			"scrollTop":showMeasure +"px"
		},1000)
	});
	
	
//	//点击查看大图
	$(".showBigImg").on("click",function(){
		$(".maxcover").show();
		$(".showMaxPicWrap").show();
	});
	$(".closeCover").on("click",function(){
		$(".maxcover").hide();
		$(".showMaxPicWrap").hide();
	});
	$(".maxcover").on("click",function(){
		$(".maxcover").hide();
		$(".showMaxPicWrap").hide();
		$(".measureCloth").hide();
	});
	//点击查看大图下的小图标右箭头点击事件
	$(".rightPage").on("click",function(){			
		$(".coverSImg li").eq(0).insertAfter($(".coverSImg li").eq(3));
	});
	//点击查看大图下的小图标左箭头点击事件
	$(".leftPage").on("click",function(){			
		$(".coverSImg li").eq(3).insertBefore($(".coverSImg li").eq(0));
	});
	//点击查看大图下的大图标左箭头点击事件
	$(".pageLeftBig").on("click",function(){
		$(".secret").hide();
		$(".coverBImg li").eq(3).insertBefore($(".coverBImg li").eq(0));
	})
	//点击查看大图下的大图标右箭头点击事件	
	$(".pageRightBig").on("click",function(){
		$(".secret").hide();
		$(".coverBImg li").eq(0).insertAfter($(".coverBImg li").eq(3));
	});
	//鼠标划过小图片
	$(".coverSImg li a").on({
		"mouseenter":function(){
			var topImg = $(this).find("img").attr("src");
			$(".secret").show();
			$(".secret img").prop("src",topImg);
			$(".coverSImg li a").removeClass("blackborder");
			$(this).addClass("blackborder");
		}
	});
	//尺码指南
	$(".measureTop a").on("click",function(){
		$(".maxcover").show();
		$(".measureCloth").show();
	})
	
	//加入购物袋
	$(".addShoppingCart a").on("click",function(){
		if(!$(".clothSizeli").hasClass("blackbg")){
			$(".chooseSizeTxt span").show();
		}else{
			$(".chooseSizeTxt span").hide();
			if(getCookie("isLogin") == 1){
				var isSrc = "../img/NX1-102-004301a.jpg";
				var isSrcIndex = "img/NX1-102-004301a.jpg";
				var isTitle = $(".topClothName").html();
				var isSize = $(".blackbg .theSize").html();
				var isQuantity = $(".customQuantity input").val();
				var isPrice = $(".currentPrice").html();
				var isTotalPrice = isQuantity * isPrice;
				var isBrand = $(".topClothBrand span").html();
				console.log(isSrc);
				console.log(isTitle);
				console.log(isSize);
				console.log(isQuantity);
				console.log(isPrice);
				console.log(isTotalPrice);
				console.log(isBrand);
				addCookie("isSrc",isSrc,5);
				addCookie("isTitle",isTitle,5);
				addCookie("isSize",isSize,5);
				addCookie("isQuantity",isQuantity,5);
				addCookie("isPrice",isPrice,5);
				addCookie("isTotalPrice",isTotalPrice,5);
				addCookie("isBrand",isBrand,5);
				addCookie("isSrcIndex",isSrcIndex,5);
				//window.location = "shoppingcart.html";
					
				shoppingcartShow();

			}else{
				window.location = "login.html";
			}
		}
	});
})

