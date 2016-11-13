//添加商品到购物车
$(function(){
	var newProduct = '<li class="my_product"><span class="my_product_img"><a href="womenClothingProduct.html"><img title="" alt="" src=""></a></span><a class="my_product_delete" href="javascript:void(0);">删除</a><ul class="newProductData"><li><a href="womenClothingProduct.html"></a></li><li class="newProductSize"></li><li><span class="newProQuan">1</span> x <span class="newProPrice">¥439.00</span></li></ul></li>';

	$(".my_product_container>ul").html('123');
	
	$(".my_product_img img").attr("src",getCookie("isSrc"));
	$(".newProductData li").eq(0).find("a").html(getCookie("isTitle"));
	$(".newProductData li").eq(1).html(getCookie("isSize"));
	$(".newProductData li").eq(2).find("span").eq(0).html(getCookie("isQuantity"));
	$(".newProductData li").eq(2).find("span").eq(1).html(getCookie("isPrice"));
})
