$(function(){
	$(".phoneBarcode").hover(function(){
		$(".barcode").slideDown();
	},function(){
		$(".barcode").slideUp();
	});
	
	$(".navsCenterLeft li").hover(function(){
		$(this).find(".nCLeftSecondList").show();
		$(this).find(".navsLink").css("color","#FF0000");
	},function(){
		$(this).find(".nCLeftSecondList").hide();
		$(this).find(".navsLink").css("color","#FFFFFF");
	});
	
	$(".navsCenterRight").hover(function(){
		$(".shoppingDetail").stop().slideDown();		
	},function(){		
			$(".shoppingDetail").stop().slideUp();		
	});
	
	var $navTop = $("#navs").offset().top;
	$(window).scroll(function(){
		var $top = $("body").scrollTop();
//		console.log($top);
//		console.log($navTop);
		if($top > $navTop){
			$("#navs").css({
				"position":"fixed",
				"top":"0px"
			});			
		}else if($top <= $navTop){
			console.log("a");
			$("#navs").css({
				"position":"absolute",
				"top":$navTop
			});
		}
	});
	
	//判断用户是否登录
	var myUserName = "myUserName";
	var myPwd = "myPwd"
	var isLogin = "isLogin";
	
	if(getCookie(isLogin) == 1){
			var userName = getCookie(myUserName);
			$("#topHeaderBeforeLogin").hide();
			$("#topHeaderAfterLogin").show();
		}else{
			$("#topHeaderBeforeLogin").show();
			$("#topHeaderAfterLogin").hide();
		}
		
	$(".exit").on("click",function(){
		if(getCookie(isLogin) == 1){
			updateCookie(isLogin,"0");
			window.location = "index.html"
		}
	})	
		
	if(getCookie("isSrc")){			
		$(".shoppingDetail>span").hide();
		$(".inner_have").show();
		var newProduct = '<li class="my_product"><span class="my_product_img"><a href="womenClothingProduct.html"><img title="" alt="" src=""></a></span><a class="my_product_delete" href="javascript:void(0);">删除</a><ul class="nProductData"><li><a href="womenClothingProduct.html"></a></li><li class="newProductSize"></li><li><span class="newProQuan">1</span> x <span class="newProPrice">¥439.00</span></li></ul></li>';
		$(".my_product_container>ul").html(newProduct);
		$(".my_product_img img").attr("src",getCookie("isSrc"));
		$(".nProductData li").eq(0).find("a").html(getCookie("isTitle"));
		$(".nProductData li").eq(1).html(getCookie("isSize"));
		$(".nProductData li").eq(2).find("span").eq(0).html(getCookie("isQuantity"));
		$(".nProductData li").eq(2).find("span").eq(1).html(getCookie("isPrice"));	
		$(".subtotal>span").html("￥"+getCookie("isTotalPrice"));
		$(".shoppingbag").html(getCookie("isQuantity"));
		$(".shoppingAmount").html("￥"+getCookie("isTotalPrice"));
	}else{
		$(".shoppingDetail>span").show();
		$(".inner_have").hide();
	};
	
	
})
