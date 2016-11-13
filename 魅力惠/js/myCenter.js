$(function(){
	
	$(".user-name").html(getCookie("myUserName"));
	//order detail
	$(".tabNav span").on("click",changeOrderTab)

	$(".orderRelated").on("click",function(){
		$(".orderTop").show().siblings(".rightBg").hide();
		var $index = $(this).index();
		changeTab($index,".orderRelated","current");
		$(".tabNav span").eq($index).addClass("graybg").siblings().removeClass("graybg");
		$(".orderList").eq($index).show().siblings(".orderList").hide();
	})
	$(".orderList").hover(function(){
		$(this).find(".remove").show();
	},function(){
		$(this).find(".remove").hide();
	})
	$(".remove").on("click",function(){
		$(this).parent().parent().parent().find("table").hide();
		$(this).parent().parent().hide();
		$(this).parent().parent().parent().find(".emptyOrderList").show();
	})
	
	$(".willchangePrice").html("￥"+getCookie("isPrice"));
	$(".willchangeqty").html(getCookie("isQuantity"));
	$(".canchangeTotal").html("￥"+getCookie("isTotalPrice"));
	
	//evaluation
	$(".tabNum2 span").on("click",function(){
		var $index = $(this).index();
		$(".evalute .orderList").eq($index).show().siblings(".notReviewedList").hide();
		$(this).addClass("graybg").siblings().removeClass("graybg");
		$("#left_6").find("a").addClass("current");
		$(".order-detail li").find("a").removeClass("current");
	});
	$("#left_6").on("click",function(){
		$(".evalute").show().siblings(".rightBg").hide();
		$(".left-nav li").find("a").removeClass("current");
		$(".evaluateOrder a").addClass("current");
		
	})
		
	function changeTab($index,$ele,className){
		$($ele).find("a").removeClass(className);
		$(".left-nav li").find("a").removeClass("current");
		$($ele).eq($index).find("a").addClass(className);
	}	
	function changeOrderTab(){
		var $index = $(this).index();
		$(".orderList").eq($index).show().siblings(".orderList").hide();
		$(this).addClass("graybg").siblings().removeClass("graybg");
		changeTab($index,".order-detail li","current");
	}
	
	//点击收藏
	if(getCookie("isCollect") == "1"){
		$(".item").eq(3).show();
//		alert("show");
	}else{
//		alert("hide")
		$(".item").eq(3).hide();
	}
	
	$(".collection-detail li").on("click",function(){
		var $index = $(this).index();
		$(".rightBg").hide();
		$(".collection").show();
		$(".left-nav li").find("a").removeClass("current");
		$(this).find("a").addClass("current");
		$(".myFavorite").hide();
		$(".myFavorite").eq($index).show();
	})
	
	$(".tabNum3 span").on("click",function(){
		var $index = $(this).index();
		$(".tabNum3 span").removeClass("graybg");
		$(this).addClass("graybg");
		$(".myFavorite").hide();
		$(".myFavorite").eq($index).show();
		$(".collection-detail li").find("a").removeClass("current");
		$(".collection-detail li").eq($index).find("a").addClass("current");
	})
	$(".btn-edit").on("click",function(){
		$(this).hide();
		$(".selectAll").show();
		$(".deleteAll").show();
		$(".btn-cancel").show();
		$(".gridCover").show();
	});
	$(".btn-cancel").on("click",function(){
		$(this).hide();
		$(".selectAll").hide();
		$(".deleteAll").hide();
		$(".gridCover").hide();
		$(".btn-edit").show();	
	});
	$(".gridCover").on("click",function(){
		if($(this).find("p").hasClass("hascheck")){
			$(this).find("p").removeClass("hascheck");
		}else{
			$(this).find("p").addClass("hascheck");
		}
	});
	$("#selectAll").on("click",function(){
		console.log($(this).is(":checked"));
		if($(this).is(":checked")){
			$(".gridCover").find("p").addClass("hascheck");
		}else{
			$(".gridCover").find("p").removeClass("hascheck");
		}
	});
	$(".deleteAll").on("click",function(){
		$(".hascheck").parent().parent().hide();
	});
	$(".returnDetail li").on("click",function(){
		$(".left-nav li").find("a").removeClass("current");
		$(this).find("a").addClass("current");
		$(".rightBg").hide();
		$(".returnOrder").show();
	});
	
	//个人信息修改
	$("#nickCurrent").html(getCookie("isNick"));
	$("#birthCurrent").html(getCookie("isBirth"));
	$(".switch_modify").on("click",function(){
		$(".save_area").show();
		$(this).hide();
		$(".user_avatar_mask_box").show();
		$(".modify").show();
		$(".modified").hide();
		$("#nick").blur(function(){
			checkEmpty("#nick","#nickError");
		});
		$("#seYear").blur(function(){
			checkEmpty("#seYear","#dateError");
		});
		$("#seMonth").blur(function(){
			checkEmpty("#seMonth","#dateError");
		});
		$("#seDay").blur(function(){
			checkEmpty("#seDay","#dateError");
		});
		
	});
	$("#cancelMyBase").on("click",function(){
		$(".switch_modify").show();
		$(".save_area").hide();
		$(".modified").show();
		$(".modify").hide();
		$(".user_avatar_mask_box").hide();
	});
	$("#saveMyBase").on("click",function(){
		save();
		$(".switch_modify").show();
		$(".save_area").hide();
		$(".modified").show();
		$(".modify").hide();
		$(".user_avatar_mask_box").hide();
	});
	
	//修改地址
	$(".select_ul li").on("click",function(){
		$(this).parent().parent().parent().parent().parent().find(".selectcontent").html($(this).html());
		$(this).parent().parent().parent().parent().hide();		
	});
	$(".selectlist_top span").on("click",function(){
		$(this).parent().parent().hide();			
	});
	$(".selectbutton").on("click",function(){
		$(this).parent().find(".selectlist").show();
	});
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
//			console.log($(".selectionconditions").attr("index"));
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
	});
	
	
	
	function checkEmpty(inputId,errorId){
		if(!$(inputId).val()){
			$(errorId).show();
			return 0;
		}else{
			$(errorId).hide();
			return 1;
		}
	};
	
	function save(){
		if(checkEmpty("#nick","#nickError")&&checkEmpty("#seYear","#dateError")&&checkEmpty("#seMonth","#dateError")&&checkEmpty("#seDay","#dateError")){
			addCookie("isNick",$("#nick").val(),5);
			addCookie("isBirth",$("#seYear").val()+"."+$("#seMonth").val()+"."+$("#seDay").val(),5);
			addCookie("isSex",$(""))
			$("#nickCurrent").html($("#nick").val());
			$("#birthCurrent").html($("#seYear").val()+"."+$("#seMonth").val()+"."+$("#seDay").val());
		}
	}
	
	//收货地址
	$(".address_recivername").html(getCookie("isReceiver"));
	$(".address_mobile").html(getCookie("isMobile"));
	$(".address_city").html(getCookie("isProvince")+" "+getCookie("isCity")+ " "+getCookie("isArea"));
	$(".address_address").html(getCookie("isAdd"));
	$(".address_zipcode").html(getCookie("isPostCode"));
	
	
	//个人中心
	$(".account-detail li").on("click",function(){
		var $index = $(this).index();
		$(".rightBg").hide();
		$(".myfile").show();
		$(".left-nav li").find("a").removeClass("current");
		$(this).find("a").addClass("current");
		$(".tabNum4 span").removeClass("graybg");
		$(".tabNum4 span").eq($index).addClass("graybg");
		$(".person-file").hide();
		$(".person-file").eq($index).show();		
	});
	$(".tabNum4 span").on("click",function(){
		var $index = $(this).index();
		$(".person-file").hide();
		$(".person-file").eq($index).show();
		$(".account-detail li").find("a").removeClass("current");
		$(".account-detail li").eq($index).find("a").addClass("current");
		$(".tabNum4 span").removeClass("graybg");
		$(this).addClass("graybg");
	});
	$(".btn_area").on("click",function(){
		$(".my_address_item").hide();
		$(".my_address_form_box").show();
	})
	
	$("#recivername").blur(checkReceiver);
	$("#mobile").blur(checkMobile);
	showSelection(".selectbutton1","#selectcontprovince","#stopprovince","#xialaprovince");
	showSelection(".selectbutton2","#selectcontcity","#stopcity","#xialacity");
	showSelection(".selectbutton3","#selectcontarea","#stoparea","#xialaarea");
//	$("#ditailaddress").focus(checkAddress);
	$("#ditailaddress").blur(checkSpecificAdd);
	$("#postalcode").blur(checkPostCode);
	$(".set_form_save_area").on("click",ShipToAdd);
	
	function checkReceiver(){
		if(!$("#recivername").val()){
			$("#reciverValidMsg").show();
			return 0;
		}else{
			$("#reciverValidMsg").hide();
			return 1;
		}
	}
	function checkMobile(){
		var $adMobile = $("#mobile").val();
		if(!$adMobile){
			$("#mobileMsg").show();
			return 0;
		}else{
			$("#mobileMsg").hide();
			if(!(/^1[3|5][0-9]\d{4,8}$/.test($adMobile))){
				$("#mobile1Msg").show();
				return 0;
			}else{
				$("#mobile1Msg").hide();
				
				return 1;
			}
		}
	}
	function showSelection(idName,selectBox,closeBtn,textBox){
		$(idName).on("click",function(){
			$(selectBox).show();
		});
		$(closeBtn).on("click",function(){
			$(selectBox).hide();
		});
		$(selectBox).find("li").on("click",function(){
			$(textBox).html($(this).html());
			$(selectBox).hide();
		});		
	}
//	function checkAddress(){
//		if($("#xialaprovince").html() == "请选择省" && $("#xialacity").html() == "请选择市" && $("#xialaarea").html() == "请选择区县"){
//			$("#ditailValid1Msg").hide();
//			return 0;
//		}else{
//			$("#ditailValid1Msg").show();
//			return 1;
//		}
//	}
	function checkSpecificAdd(){
		if(!$("#ditailaddress").val()){
			$("#ditailValidMsg").show();
			return 0;
		}else{
			$("#ditailValidMsg").hide();
			return 1;
		}
	}
	function checkPostCode(){
		if(!$("#postalcode").val()){
			$("#postalMsg").hide();
			$("#postal1Msg").show();
			return 0;
		}else{
			$("#postalMsg").show();
			$("#postal1Msg").hide();
			return 1;
		}
	}
	function ShipToAdd(){
		console.log(checkReceiver())
		console.log(checkMobile())
		console.log(checkSpecificAdd())
		console.log(checkPostCode())
		if(checkReceiver() && checkMobile() && checkSpecificAdd() && checkPostCode()){
			console.log("成功")
			addCookie("isReceiver",$("#recivername").val(),5);
			addCookie("isMobile",$("#mobile").val(),5);
			addCookie("isProvince",$("#xialaprovince").html(),5);
			addCookie("isCity",$("#xialacity").html(),5);
			addCookie("isArea",$("#xialaarea").html(),5);
			addCookie("isAdd",$("#ditailaddress").val(),5);
			addCookie("isPostCode",$("#postalcode").val(),5);
			$(".my_address_item").show();
			$(".my_address_form_box").hide();
			$(".address_recivername").html($("#recivername").val());
			$(".address_mobile").html($("#mobile").val());
			$(".address_city").html($("#xialaprovince").html()+" "+$("#xialacity").html()+ " "+$("#xialaarea").html());
			$(".address_address").html($("#ditailaddress").val());
			$(".address_zipcode").html($("#postalcode").val());
		}
	}
	
	
	
	
})
