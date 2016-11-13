$(function(){
	$(".rUsernameTxt").on("focus",function(){
		$(".rUsernameTxt").hide();
		$(".rUsername").show();
	})
	$(".rUsername").blur(function(){		
		if (!$(".rUsername").val()) {
			console.log($(".rUsername").val());
			$("#usernameIsEmpty").show();
			$("#usernameIsError").hide();
			return false;
		}		
		var $rUsername = $(".rUsername").val();
		var $emailCheck = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if ((/^1[3|5][0-9]\d{4,8}$/.test($rUsername)) || ($emailCheck.test($rUsername))) {
			$("#usernameIsEmpty").hide();
			$("#usernameIsError").hide();
		} else {
			console.log("不是完整的11位手机号或者正确的手机号前七位");
			$("#usernameIsEmpty").hide();
			$("#usernameIsError").show();
		};
	});
	
	$(".rPwd").blur(function(){
		
		if (!$(".rUsername").val()){
			console.log($(".rUsername").val());
			$("#usernameIsEmpty").show();
			$("#Pwd_error").hide();
			return false;
		}else if(!$(".rPwd").val()) {
			$("#Pwd_error").show();
			$("#Pwd_error").css("height","35px");
			return false;
		}else{
			$("#Pwd_error").hide();
		}
	});
	
	
	$(".confirmcode").blur(function(){
		
		if (!$(".rUsername").val()){
			console.log($(".rUsername").val());
			$("#usernameIsEmpty").show();
			$("#Pwd_error").hide();
			return false;
		}else if(!$(".rPwd").val()) {
			$("#Pwd_error").show();
			$("#Pwd_error").css("height","5px");
			return false;
		}else if(!$(".confirmcode").val()){
			$("#Pwd_error").hide();
			$("#CCode_empty").show();
			$("#CCode_empty").css("height","8px");
		}else{
			$("#CCode_empty").hide();
		}
	})
	
	//自动登录切换
	$(".subscription").click(function(){
		if($(".subscription").hasClass("white")){
			$(".subscription").removeClass("white");
		}else{
			$(".subscription").addClass("white");
		}
	})
	
	//会员登录
	var myUserName = "myUserName";
	var myPwd = "myPwd";
	var isLogin = "isLogin";
	$(".rSubmit").on("click",function(){
		var userName = $(".rUsername").val();
		var pwd = $(".rPwd").val();
		if(userName == ""){
			$("#usernameIsEmpty").show();
		}else{
			if(pwd == ""){
				$("#Pwd_error").show();
			}else{
				login(userName,pwd);
			}
		}
	})
	
	function login(userName,pwd){
		var myUserName = "myUserName";
		var myPwd = "myPwd";
		if(getCookie(myUserName) != userName){
			$("#wrongUserOrPwd").show();
		}else{
			if(getCookie(myPwd) != pwd){
				$("#wrongUserOrPwd").show();
			}else{
				$("#wrongUserOrPwd").hide();
				updateCookie(isLogin,"1");
				window.location = "../index.html";
			}
		}
	}
	
	
	
})
