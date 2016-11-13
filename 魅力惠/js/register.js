$(function() {
	//用户名验证
	$(".rUsernameTxt").focus(function() {
		$(this).hide();
		$(".rUsername").show();

	});
	$(".rUsername").blur(checkUsername);

	function checkUsername() {
		if (!$(".rUsername").val()) {
			$(".rUsernameTxt").show();
			$(".rUsername").hide();
		}
		//验证用户名之手机号
		var $rUsername = $(".rUsername").val();
		var $emailCheck = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if ((/^1[3|5][0-9]\d{4,8}$/.test($rUsername)) || ($emailCheck.test($rUsername))) {
			$("#username_empty").hide();
			$(this).parent().css("margin-bottom", "10px");
		} else {
			console.log("不是完整的11位手机号或者正确的手机号前七位");
			$("#username_empty").show();
			$(this).parent().css("margin-bottom", "10px");
			return false;
		}
		return true;
	}
	//密码验证
	$(".rPwdTxt").focus(function() {
		$(this).hide();
		$(".rPwd").show();
	});
	//键盘摁下事件
	$(".rPwd").keyup(function(event) {		
		CheckIntensity($(this).val());
		$(this).parent().css("margin-bottom", "20px");	
		
	})
	$(".rPwd").blur(checkPwd);
	function checkPwd() {		
		$('#Pwd_error').hide();
		if($(".rWholePassword").height() <= 30){
			$(".login_safety").hide();
			$(this).parent().css("margin-bottom", "10px");	
		}
	}
	function CheckIntensity(pwd) {
			var Mcolor, Wcolor, Scolor, Color_Html;
			var m = 0;
			var Modes = 0;
			if (pwd === '') {
				$('#Pwd_less').hide();
				$('#Pwd_error').show();
				$('#lowPwd').hide();
				$('#lowMHight').hide();
				return;
			}
			//console.log(pwd.length);
			for (i = 0; i < pwd.length; i++) {
				var charType = 0;
				var t = pwd.charCodeAt(i);
				//0-9
				if (t >= 48 && t <= 57) {
					charType = 1;
				}
				//大写字母
				else if (t >= 65 && t <= 90) {
					charType = 2;
				}
				//小写字母
				else if (t >= 97 && t <= 122) {
					charType = 4;
				} else {
					charType = 4;
				}
				Modes |= charType;
			}
			for (i = 0; i < 4; i++) {
				//条件为true，Modes是1
				if (Modes & 1) {
					m++;
				}
				//向右位移一位
				Modes >>>= 1;
			}
			if (pwd.length <= 5) {
				m = 1;
			}
			if (pwd.length <= 0) {
				m = 0;
			}
			
			switch (m) {
				case 1:
					$("#low").css("background","#000");
					$("#middle").css("background","#929292");
					$("#height").css("background","#929292");
					if(pwd.length < 6){
						$("Pwd_error").css("display","none");
						$("#Pwd_less").css("display","block");
						$("#lowPwd").css("display","none");
					}else if(pwd.length >= 6){
						$("Pwd_error").css("display","none");
						$("#Pwd_less").css("display","none");
						$("#lowPwd").css("display","block");
					}
					break;
				case 2:
					$("#low").css("background","#000");
					$("#middle").css("background","#000");
					$("#height").css("background","#929292");
					$("#Pwd_less").css("display","none");
					$("#lowPwd").css("display","none");
					break;
				case 3:
					$("#low").css("background","#000");
					$("#middle").css("background","#000");
					$("#height").css("background","#000");
					$("#lowPwd").css("display","none");
					break;
				default:
					$("#low").css("background","#929292");
					$("#middle").css("background","#929292");
					$("#height").css("background","#929292");
					break;
			}
			$('#Pwd_error').hide();
			$("#lowMHight").show();
		}
	
		
		
	//确认密码
	$(".rConfirmPwd").keyup(function(){
		var $confirmPwd = $(".rConfirmPwd").val();
//		console.log($confirmPwd);
//		console.log($(".rPwd").val());
		if(!$confirmPwd){
			$("#RPwd_error").hide();
			$("#rewritePwd").show();
			$(this).parent().css("margin-bottom", "20px");
		}else if($confirmPwd != $(".rPwd").val()){
			$("#RPwd_error").show();
			$("#rewritePwd").hide();
			$(this).parent().css("margin-bottom", "20px");
		}else{
			$("#RPwd_error").hide();
			$(this).parent().css("margin-bottom", "10px");
		}
	})
		
	
	//验证码
	$(".verifycode").on("click",function(){
		$(".verifycode").find("img").attr("src","../img/getRandom.jpg");
	});
	$(".confirmcode").blur(checkCode);
	function checkCode(){
		console.log(!$(".confirmcode").val());
		if(!$(".confirmcode").val()){
			$("#CCode_empty").show();
			$(".rWholeconfirmcode").css("margin-bottom","0px");
			return false;
		}else {
			$("#CCode_empty").hide();
			$(".rWholeconfirmcode").css("margin-bottom","10px");
		}
	}
	
	$(".messageGet").on("click",function(){
		$(this).hide();
		$(".messageGetAgain").show();
		if(!checkUsername()){
			return false;
		}else if(!$(".rPwd").val()){
			$("#Pwd_error").show();
			return false;
		}else if(!$(".rConfirmPwd").val()){
			$("#rewritePwd").show();
			$("#RPwd_error").hide();
			$(".rWholeConPassword").css("margin-bottom","20px");
			return false;
		}else if(!checkCode()){
			return false;
		}
	})
	$(".messageGetAgain").on("click",function(){
		$(this).hide();
		$(".messageGet").show();
	})
	
	
	//注册按钮
	var myUserName = "myUserName";
	var myPwd = "myPwd";
	var isLogin = "isLogin";
	$(".rSubmit").on("click",function(){
		var userName = $(".rUsername").val();
		var pwd = $(".rPwd").val();
		if($(".registerContent div").height <30 && $(".rUsername").val() ||$(".rPwd").val() ||$(".rConfirmPwd").val() ||$(".confirmcode").val() ||$(".message").val()){
			register(userName,pwd);
			window.location = "../index.html";
		}
	});
	
	function register(userName,pwd){	
		if(getCookie(myUserName) == userName){
			$("#hasThisUser").show();
		}else{
			$("#hasThisUser").hide();
			addCookie(myUserName,userName,5);
			addCookie(myPwd,pwd,5);
			addCookie(isLogin,"0",5);
		}
	}
	
	//勾选订阅框
	$(".subscription").on("click",function(){
		if($(".subscription").hasClass("black")){
			$(".subscription").removeClass("black");
		}else{
			$(".subscription").addClass("black");
		}
	})
})