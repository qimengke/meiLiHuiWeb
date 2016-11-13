$(function(){
	NothingInBag();
	
	
	//使用优惠券
	$(".orginCoupon").on("click",function(){
		$(this).hide();
		$(".showAvailiable").show();
	});
	$(".scoupon").on("click",function(){
		$(".selectCoupon").show();
		$(".addCouponNum").hide();
		$(this).addClass("changeBg").siblings().removeClass("changeBg");
	});
	$(".acoupon").on("click",function(){
		$(".selectCoupon").hide();
		$(".addCouponNum").show();
		$(this).addClass("changeBg").siblings().removeClass("changeBg");
	});
	$(".button2").on("click",function(){
		$(".showAvailiable").hide();
		$(".orginCoupon").show();
	});
	$(".button1").on("click",function(){
		console.log(!$(".selectCoupon input").eq(1).is(":checked"));	
		if(!$(".selectCoupon input").is(":checked")){
			$(".juli").show();
		}else{
			$(".juli").hide();
			$(".afterUseCoupon").show();
			$(".showAvailiable").hide();
		}
		var judgeCoupon = $("input:radio[name='select-Coupon']:checked").val();
		$(".selectedCoupon").html(judgeCoupon);
		
	});
	
	$("#btn_cancelCoupon").on("click",function(){
		$(".orginCoupon").show();
		$(".afterUseCoupon").hide();
	})
	
	
	
	//添加商品到结算页面
	if(getCookie("isQuantity")){
		var newProduct = '<ul class="list_content_ul"><li class="list_content_left"><p class="list_content_img border_color1"><a target="_blank" href="womenClothingProduct.html"><img src="" title="" alt=""></a></p><p><span class="list_content_name" title="the next"><a target="_blank" href="womenClothingProduct.html" class="sublong" style="width: 250px;"></a></span><span title=""><a target="_blank" href="womenClothingProduct.html" class="sublong" style="width: 250px;"></a></span><span class="list_content_size"></span><span class="list_content_State"></span></p></li><li></li><li><div class="number_choose"><span class="number_reduce_none reduceQuantity">-</span><span class="quantity_number"><input readonly="readonly" class="customQuantity" value=""></span><span class="number_increase increaseQuantity">+</span></div></li><li></li><li></li><li class="li_pop"><div class="pop_up_box box2" style="display:none"><div class="box_top"><div class="top_img"></div></div><div class="box_content"><p class="p1">您确定要删除该商品吗？</p><p class="p2"><span class="button5">确定</span><span class="button2">取消</span></p></div></div><img class="list_content_delete" src="../img/icon_delete.png" /></li><div class="clear"></div></ul>'
		$(".list_content").html(newProduct);
		$(".list_content_img img").attr("src",getCookie("isSrc"));
		$(".list_content_name a").html(getCookie("isBrand"));
		$(".quantity_number input").val(getCookie("isQuantity"));
		$(".list_content_left span").eq(1).html(getCookie("isTitle"));
		$(".list_content_size").html("尺寸： "+getCookie("isSize"));
		$(".list_content_ul li").eq(1).html("￥ "+getCookie("isPrice")+".00");
		$(".list_content_ul li").eq(4).html("￥ "+getCookie("isTotalPrice")+".00");
		$(".totalAmount span").html("￥ "+getCookie("isTotalPrice")+".00");
		
		if(parseInt($(".customQuantity").val())>1){
			$(".reduceQuantity").addClass("number_can_reduce");
		}
		
		//点击订单中的删除按钮
		$(".list_content_delete").on("click",function(){
			$(".box2").show();
		})		
		$(".button2").on("click",function(){
			$(".box2").hide();
			$(".afterUseCoupon").hide();
		});
		$(".button5").on("click",function(){
			
			deleteCookie("isSrc");
			deleteCookie("isTitle");
			deleteCookie("isSize");
			deleteCookie("isQuantity");
			deleteCookie("isPrice");
			deleteCookie("isTotalPrice");
			deleteCookie("isBrand");
			$(".list_content").html("");
			$(".shoppingNothing").show();
			$(".shoppingList").hide();
			$(".messageShadow").hide();
			$(".sc-checkout").hide();
			$(".main-wrap h2").find("span").hide();

		})
		var freeShipping = 688 - parseInt(getCookie("isTotalPrice"));
		if(freeShipping > 0){
			$(".littleMessage p").eq(0).show();
			$(".littleMessage p").eq(1).hide();
			$(".littleMessage span").eq(0).html(freeShipping+"元");
			checkUseCoupon();
		}else{
			$(".littleMessage p").eq(0).hide();
			$(".littleMessage p").eq(1).show();
			checkUseCoupon();
		}
		
		
		$(".increaseQuantity").on("click",function(){
			var $quantity = Number($(".customQuantity").val()) + 1;		
			$(".reduceQuantity").addClass("number_can_reduce");
			$(".customQuantity").prop("value",$quantity);
			updateCookie("isQuantity",$quantity);
			var isTotalPrice = $quantity * parseInt(getCookie("isPrice"));
			updateCookie("isTotalPrice",isTotalPrice);
			$(".list_content_ul li").eq(4).html("￥ "+getCookie("isTotalPrice")+".00");
					$(".totalAmount span").html("￥ "+getCookie("isTotalPrice")+".00");
		});
		$(".reduceQuantity").on("click",function(){
			var $quantity = Number($(".customQuantity").val()) - 1;
			if($quantity == 1){
				$(".customQuantity").prop("value",$quantity);
				$(".reduceQuantity").removeClass("number_can_reduce");
			}else if($(".customQuantity").val() > 1){
				$(".customQuantity").prop("value",$quantity);
				$(".reduceQuantity").addClass("number_can_reduce");		
				
			}
			updateCookie("isQuantity",$quantity);
			var isTotalPrice = $quantity * parseInt(getCookie("isPrice"));
			updateCookie("isTotalPrice",isTotalPrice);
			$(".list_content_ul li").eq(4).html("￥ "+getCookie("isTotalPrice")+".00");
					$(".totalAmount span").html("￥ "+getCookie("isTotalPrice")+".00");
		});
		
		
		
	}
	$(".button4").on("click",function(){
		window.location = "womenClothing.html"
	})
	$(".button3").on("click",function(){
		window.location = "confirmOrder.html";
	})
	function checkUseCoupon(){
		var useCoupon50 = 480 - parseInt(getCookie("isTotalPrice"));
		if(useCoupon50 > 0){
				$(".tab_list_right p").eq(1).html("需再购" + useCoupon50 + ".00元减50.0元")
			}else{
				$(".tab_list_right p").eq(1).html("可使用480.00元减50.0元");
				$(".tab_list input").prop("disabled",false);
			}
	}
	function NothingInBag(){
		if(!getCookie("isSrc")){
			$(".shoppingNothing").show();
			$(".shoppingList").hide();
			$(".messageShadow").hide();
			$(".sc-checkout").hide();
			$(".main-wrap h2").find("span").hide();
		}else{
			$(".shoppingNothing").hide();
			$(".shoppingList").show();
			$(".messageShadow").show();
			$(".sc-checkout").show();
			$(".main-wrap h2").find("span").show();
		}
		
	}
	

})


