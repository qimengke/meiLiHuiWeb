$(function(){
	$("body").animate({
		"scrollTop":"0px"
	},10);
	
	//click "more" button
	$(".moreBrand").click(function(){
//		console.log($(".moreBrand").hasClass("getMoreBrand"));
		if($(".moreBrand").hasClass("getMoreBrand")){
			$(this).addClass("getLessBrand");
			$(this).removeClass("getMoreBrand");
			$(this).html("收起");
			$(".wcblist").css("height","100%");
		}else{
			$(this).addClass("getMoreBrand");
			$(this).removeClass("getLessBrand");
			$(this).html("更多");
			$(".wcblist").css("height","48px");
		}
	});

	$(".wcbul li").click(function(){

		if($(this).find("span").hasClass("not_selected")){			
			$(this).find("span").addClass("hasChecked");
			$(this).find("span").removeClass("not_selected");
			$(this).find("span").html("品牌：")
//			console.log($(this).html("品牌："))
//			console.log($(this).parent().html());
			$(".attrs").append("<li class='newli'>"+$(this).html()+"</li>");
			$(".hasSelected").show();
			
			$(".attrs li").click(function(event){
				event.stopPropagation();
				$(this).remove();
				$(this).find("span").addClass("not_selected");
				$(this).find("span").removeClass("hasChecked");
				console.log($(".attrs li").length);
				if(!$(".attrs li").length){
					$(".hasSelected").hide();
					$(".wcbul li span").removeClass("hasChecked");
					$(".wcbul li span").addClass("not_selected");
				}
			});
		}else{
			$(this).addClass("not_selected");
			$(this).removeClass("hasChecked");
		}
		
	});

	
	//吸顶效果
	$(window).scroll(function(){
		if($("body").scrollTop()>400){
			$("#OrderBox").addClass("fixedTop");
		}else{
			$("#OrderBox").removeClass("fixedTop");
		}
	});
	
	//click "价格"button
	$(".priceSortChange").on("click",function(){
		$(".defaultSort").css("background","#fff");
		if(!$(this).hasClass("highPrice")){
			$(this).addClass("highPrice");
			$(this).removeClass("lowPrice");
		}else{
			$(this).addClass("lowPrice");
			$(this).removeClass("highPrice");
		}
	});
	
	//click "默认排序"button
	
	$(".defaultSort").on("click",function(){
		$(".defaultSort").css("background","#e7e7e7");
		if($(".priceSortChange").hasClass("highPrice") || $(".priceSortChange").hasClass("lowPrice")){
			$(".priceSortChange").removeClass("highPrice");
			$(".priceSortChange").removeClass("lowPrice");
		}
	})
	
	
	$(".productImg").on("mouseenter",function(){
		$(this).parent().find(".coverProductDetail").show();
	});
	$(".productSingle").on("mouseleave",function(){
		$(".coverProductDetail").hide();
	});
	//商品尺码划过事件
	$(".clothSizeli").hover(function(){
		$(this).find(".popupBox").stop().show();
	},function(){
		$(this).find(".popupBox").stop().hide();
	});
	//商品划过图片
	$(".threelittleImg li").on({
		"mouseenter":function(){
			var $thisSrc = $(this).find("img").attr("src");
			$(this).parent().parent().parent().parent().parent().find(".productImgPhoto img").prop("src",$thisSrc);
			$(this).addClass("blackborder");
			$(this).removeClass("grayborder");
		},
		"mouseleave":function(){
			$(this).removeClass("blackborder");
			$(this).addClass("grayborder");
		}
	});
	//收藏点击事件
	$(".collection").on("click",function(){
		$(this).hide();
		$(".cancelCollection").show();
		if(parseInt(getCookie("isCollect"))){
			addCookie("isCollect",0,5);
		}
		console.log("quxiaoshoucang")
	});
	$(".cancelCollection").on("click",function(){
		$(this).hide();
		$(".collection").show();
//		console.log(getCookie("isCollect"));
		if(!parseInt(getCookie("isCollect"))){
			addCookie("isCollect",1,5);
		}
//		console.log(getCookie("isCollect"));
	});
	
})
