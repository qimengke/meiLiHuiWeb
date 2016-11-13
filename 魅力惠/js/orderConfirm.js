$(function() {

	//判断是否已经有默认地址
	showAdd();

	//输入新地址的验证
	$("#receiver").blur(checkReceiver);
	$("#mobile").blur(checkMobile);
	showSelection("#provinceBtn", "#provinceSelect", "#provinceClose", "#provinceText");
	showSelection("#cityBtn", "#citySelect", "#cityClose", "#cityText");
	showSelection("#areaBtn", "#areaSelect", "#areaClose", "#areaText");
	$("#ditailaddr").focus(checkAddress);
	$("#ditailaddr").blur(checkSpecificAdd);
	$("#postal_code").blur(checkPostCode);
	$("#button3").on("click", ShipToAdd);

	//选择地址编辑按钮
	$(".edit").on("click", editAdd);
	$(".delete").on("click", deleteAdd);
	//滚动条滚动效果
	$(".scrollY").on("click", function(event) {
		var ulIndex = $(this).index();
		var $top = event.pageY - $(this).offset().top - parseInt($(this).find(".scrollbar").css("height")) / 2;
		var $moveArea = parseInt($(this).css("height")) - parseInt($(this).find(".scrollbar").css("height"));
		var $liHeight = $(".menu").eq(ulIndex).find("li").length;
		var $height = parseInt($(".menu li").css("height")) * $liHeight;
		var $ratio = $height / parseInt($(this).css("height"));
		//console.log($ratio);
		if ($top <= 0) {
			$(this).find(".scrollbar").css("top", "0px");
		} else if ($top > $moveArea) {
			$(this).find(".scrollbar").css("top", $moveArea + "px");
		} else {
			$(this).find(".scrollbar").css("top", $top);
			$(this).parent().parent().find(".select_ul").css("top", -$top * $ratio);
		};
		return false;
	})
	$(".scrollbar").on("mousedown", function(event) {
		var ulIndex = $(this).attr("index");
		$(document).on("mousemove.scroll", function(event) {
			var $div = $(".selectionconditions").eq(ulIndex);
			var $top = event.pageY - $div.find(".scrollY").offset().top - parseInt($div.find(".scrollbar").css("height")) / 2;
			var $moveArea = parseInt($div.find(".scrollY").css("height")) - parseInt($div.find(".scrollbar").css("height"));
			var $liHeight = $div.find(".menu li").length;
			var $height = parseInt($(".menu li").css("height")) * $liHeight;
			var $ratio = $height / parseInt($div.find(".scrollY").css("height"));
			if ($top <= 0) {
				$div.find(".scrollbar").css("top", "0px");
			} else if ($top > $moveArea) {
				$div.find(".scrollbar").css("top", $moveArea + "px");
			} else {
				$div.find(".scrollbar").css("top", $top);
				$div.find(".select_ul").css("top", -$top * $ratio);
			};
			return false;
		});

		$(document).on("mouseup.scroll",function(){
			$(document).off(".scroll");
		});
	})
	
	//支付方式
	changeTab();

	//得到订单
	getOrder();

	//提交订单按钮
	$(".button6").on("click", submitOrder);


	function checkReceiver() {
		if (!$("#receiver").val()) {
			$("#ndprompt").show();
			return 0;
		} else {
			$("#ndprompt").hide();
			return 1;
		}
	}

	function checkMobile() {
		var $adMobile = $("#mobile").val();
		if (!$adMobile) {
			$("#ndmobile").show();
			return 0;
		} else {
			$("#ndmobile").hide();
			if (!(/^1[3|5][0-9]\d{4,8}$/.test($adMobile))) {
				$("#wdmobile").show();
				return 0;
			} else {
				$("#wdmobile").hide();

				return 1;
			}
		}
	}

	function showSelection(idName, selectBox, closeBtn, textBox) {
		$(idName).on("click", function() {
			$(selectBox).show();
		});
		$(closeBtn).on("click", function() {
			$(selectBox).hide();
		});
		$(selectBox).find("li").on("click", function() {
			$(textBox).html($(this).html());
			$(selectBox).hide();
		});
	}

	function checkAddress() {
		if ($("#provinceText").html() == "请选择省" && $("#cityText").html() == "请选择市" && $("#areaText").html() == "请选择区县") {
			$("#nataddresstitle").show();
			return 0;
		} else {
			$("#nataddresstitle").hide();
			return 1;
		}
	}

	function checkSpecificAdd() {
		if (!$("#ditailaddr").val()) {
			$("#ndditailaddr").show();
			return 0;
		} else {
			$("#ndditailaddr").hide();
			return 1;
		}
	}

	function checkPostCode() {
		if (!$("#postal_code").val()) {
			$("#ndpostal_code").hide();
			$("#edpostal_code").show();
			return 0;
		} else {
			$("#ndpostal_code").show();
			$("#edpostal_code").hide();
			return 1;
		}
	}

	function ShipToAdd() {
		if (checkReceiver() && checkMobile() && checkAddress() && checkSpecificAdd() && checkPostCode()) {
			addCookie("isReceiver", $("#receiver").val(), 5);
			addCookie("isMobile", $("#mobile").val(), 5);
			addCookie("isProvince", $("#provinceText").html(), 5);
			addCookie("isCity", $("#cityText").html(), 5);
			addCookie("isArea", $("#areaText").html(), 5);
			addCookie("isAdd", $("#ditailaddr").val(), 5);
			addCookie("isPostCode", $("#postal_code").val(), 5);
			$(".newAddresss").hide();
			$(".select_address").show();
			$(".the_address_bottom li").eq(0).html($("#receiver").val() + " " + $("#mobile").val())
			$(".the_address_bottom li").eq(1).html($("#provinceText").html() + " " + $("#cityText").html() + " " + $("#areaText").html() + $("#ditailaddr").val());
			$(".the_address_bottom li").eq(2).html($("#postal_code").val())
		}
	}

	function showAdd() {
		if (getCookie("isArea")) {
			$(".newAddresss").hide();
			$(".select_address").show();
			$(".the_address_bottom li").eq(0).html(getCookie("isReceiver") + " " + getCookie("isMobile"))
			$(".the_address_bottom li").eq(1).html(getCookie("isProvince") + " " + getCookie("isCity") + " " + getCookie("isArea") + getCookie("isAdd"));
			$(".the_address_bottom li").eq(2).html(getCookie("isPostCode"))
		} else {
			$(".newAddresss").show();
			$(".select_address").hide();
		}
	}

	function editAdd() {
		$(".newAddresss").show();
		$(".select_address").hide();
		$("#receiver").val(getCookie("isReceiver"));
		$("#mobile").val(getCookie("isMobile"));
		$("#provinceText").html(getCookie("isProvince"));
		$("#cityText").html(getCookie("isCity"));
		$("#areaText").html(getCookie("isArea"));
		$("#ditailaddr").val(getCookie("isAdd"));
		$("#postal_code").val(getCookie("isPostCode"));
	}

	function deleteAdd() {
		$("#deleteAdd").show();
		$(".button7").on("click", function() {
			$("#deleteAdd").hide();
			$(".select_address").hide();
			$(".newAddresss").show();
			deleteCookie("isReceiver");
			deleteCookie("isMobile");
			deleteCookie("isProvince");
			deleteCookie("isCity");
			deleteCookie("isArea");
			deleteCookie("isAdd");
			deleteCookie("isPostCode");
			$("#receiver").prop("value", "");
			$("#mobile").prop("value", "");
			$("#provinceText").html("请选择省");
			$("#cityText").html("请选择市");
			$("#areaText").html("请选择区县");
			$("#ditailaddr").prop("value", "");
			$("#postal_code").prop("value", "");
		});
		$(".button8").on("click", function() {
			$("#deleteAdd").hide();
		});
	}

	function changeTab() {
		$(".tab_nav span").on("click", function() {
			$(this).addClass("tab_button_checked").siblings().removeClass("tab_button_checked");
			var $index = $(this).index();
			$(".tab_div").eq($index).show().siblings(".tab_div").hide();
		});
		$("#spanMoreBank").on("click", function() {
			$("#spanMoreBank").hide();
			$("#moreBank").show();
		});
		$(".border_color2").on("click", function() {
			var imgSrc = $(this).attr("name");
			$(".methods_payment_p").hide();
			$(".tab1").hide();
			$(".methods_payment_p1").show();
			$("#pay_img").prop("src", imgSrc);
			$(".open").show();
			$(".close").hide();
		});
		$(".open").on("click", function() {
			$(this).hide();
			$(".close").show();
			$(".methods_payment_p").show();
			$(".tab1").show();
		});
		$(".close").on("click", function() {
			$(this).hide();
			$(".open").show();
			$(".methods_payment_p").hide();
			$(".tab1").hide();
		});
	}

	function getOrder() {
		$(".list_content_img img").attr("src", getCookie("isSrc"));
		$(".list_content_name a").html(getCookie("isBrand"));
		$(".list_content_title a").html(getCookie("isTitle"));
		$(".list_content_size").html("尺寸： " + getCookie("isSize"));
		$(".list_content_ul li").eq(1).html(getCookie("isPrice"));
		$(".quantity_number").html(getCookie("isQuantity"));
		$(".list_content_ul li").eq(4).html(getCookie("isTotalPrice"));
		$(".settlement_main_right div").eq(0).html("商品小计：￥" + getCookie("isTotalPrice") + ".00");
		if (parseInt(getCookie("isTotalPrice")) < 480) {
			$("#freight_amt").html("11.00");
		} else {
			$("#freight_amt").html("0.00");
		}
		var shouldpay = parseInt(getCookie("isTotalPrice")) + parseInt($("#freight_amt").html());
		//console.log(shouldpay);
		$("#should_pay_amount").html(shouldpay + ".00");
		addCookie("shouldpay", $("#should_pay_amount").html(), 5)
	}

	function submitOrder() {
		console.log($("#pay_img").attr("src"));
		if ($(".the_address_bottom li").eq(2).html() && $("#pay_img").attr("src")) {
			$(".submitOrderWarn").hide();
			window.location = "alipay.html";
		} else {
			$(".submitOrderWarn").show();
		}
	}

	function scrollbarHeight(ulIndex) {
		var $liHeight = $(".menu").eq(ulIndex).find("li").length;
		var $height = parseInt($(".menu li").css("height")) * $liHeight;
		var $divHeight = parseInt($(".selectlist_bottom").eq(ulIndex).css("height"));


	}
	scrollbarHeight(0);
	scrollbarHeight(1);
	scrollbarHeight(2);
})