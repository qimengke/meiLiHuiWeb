$(function(){
	//遮盖层
	var isFirst = "isFirst";
	if(!getCookie(isFirst)){
		showCoverUp();
		updateCookie(isFirst,"1");
	};
		
	function showCoverUp(){
		var bodyHeight = $("html,body").height();
		$(".coverup").show();
		$("html,body").css({"height":"100%","overflow":"hidden"});
		
		$(".close span").on("click",function(){
			$(".coverup").hide();
			$("html,body").css({"height":bodyHeight,"overflow":"none"});
		});
	}
	
	//主体中出现的轮播图	
	var timer = setInterval(imgMove,3000);
	
	function imgMove(){
		$(".listImg").animate({
			"left":"-=320px"
		},1000,function(){
//			console.log(parseInt($(".listImg").css("left")))
			if(parseInt($(".listImg").css("left")) < -640){
				$(".listImg").css("left","-320px");
			}
		});
		var roundIndex = (Math.abs(parseInt($(".listImg").css("left"))) / 320)%2;
//		console.log(roundIndex);
		$(".main1banner span").removeClass("red");
		$(".main1banner span").eq(roundIndex).addClass("red");
	}
	
	$(".rightArrow").on("click",function(){
		clearInterval(timer);
		
		$(".listImg").animate({
			"left":"-=320px"
		},1000,function(){
//			console.log(parseInt($(".listImg").css("left")))
			if(parseInt($(".listImg").css("left")) < -640){
				$(".listImg").css("left","-320px");
			}
			timer = setInterval(imgMove,3000)
		});
		var roundIndex = Math.floor((Math.abs(parseInt($(".listImg").css("left"))) / 320)%2);
//		console.log("right"+roundIndex);
		$(".main1banner span").removeClass("red");
		$(".main1banner span").eq(roundIndex).addClass("red");
	});
	
	
	$(".leftArrow").on("click",function(){
		clearInterval(timer);
		$(".listImg").animate({
			"left":"+=320px"
		},1000,function(){
//			console.log(parseInt($(".bannerImg").css("left")))
			if(parseInt($(".listImg").css("left")) > -320){
				$(".listImg").css("left","-640px");
			}
			timer = setInterval(imgMove,3000)
		});
		var roundIndex = ((Math.abs(parseInt($(".listImg").css("left"))) / 320))%2;
		console.log("left"+roundIndex);
		$(".main1banner span").removeClass("red");
		$(".main1banner span").eq(roundIndex).addClass("red");
	})
	
	$(".bannerPoint li").on("click",function(){
		var $index = $(this).index() + 1;
		var $leftMove = $index * (-320);
//		console.log($index);
//		console.log($leftMove);
		$(".bannerImg").animate({
			"left":$leftMove + "px"
		},1000);
	})
	
	
	
	//主体部分遮盖层显示效果
	$(".lbimg").hover(function(){
		$(this).find(".covering").show();
		$(this).find("img").stop().animate({
			"width":"338px",
			"height":"211px"
		},1000);
	},function(){
		$(this).find(".covering").hide();
		$(this).find("img").stop().animate({
			"width":"318px",
			"height":"191px"
		},1000);
	});
	
	//显示返回顶部按钮
	var $bodyTop;
	$(window).scroll(function(){
		//console.log($("body").scrollTop());
		$bodyTop = $("body").scrollTop();
		if($bodyTop > 800){
			$(".b2tBtn").css("display","block");
		}else{
			$(".b2tBtn").css("display","none");
		}
	});
	
	//返回顶部按钮点击事件
	$(".b2tBtn").on("click",function(){
		$("body").animate({
			"scrollTop":"0px"
		},1000);
	});
	
	//底部上新点击事件
	$(".main7list li").on("click",function(){
		$(".main7list li a").css("border","0px");
		$(this).find("a").css("border-bottom","4px solid #000");
		var $index = $(this).index();
//		console.log($index);
		$(".update>div").hide();
		$(".update>div").eq($index).show();
	});
	
	//底部上新划过事件
	$(".m7d1main").hover(function(){
		$(this).find(".main7cover").show();
	},function(){
		$(this).find(".main7cover").hide();
	})
})
