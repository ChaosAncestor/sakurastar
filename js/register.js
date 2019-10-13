 // var  usernameReg = /^[A-Za-z][A-Za-z0-9]{2,7}$/;
 // var str = "a1234";
 // if(usernameReg.test(str)){
	//  alert("ss");
 // }else{
	// alert("tt"); 
 // }

$(function(){
	// 封装判断正则方法
	function valid(t,fn,v1,v2){
		if(!validform[fn](v1,v2)){
			$(t).addClass("is-invalid");
		}else{
			$(t).removeClass("is-invalid");
		}
	}
	
	$('#username').on('focusout',function(){
		var username = $(this).val();
		// if(!validform.isusername(username)){
		// 	$(this).addClass("is-invalid");
		// }else{
		// 	$(this).removeClass("is-invalid");
		// }
		valid(this,'isusername',username);
	});
	$('#pwd').on('focusout',function(){
		var pwd = $(this).val();
		// if(!validform.ispassword(pwd)){
		// 	$(this).addClass("is-invalid");
		// }else{
		// 	$(this).removeClass("is-invalid");
		// }
		valid(this,'ispassword',pwd);
	})
	$('#repwd').on('focusout',function(){
		var pwd = $('#pwd').val();
		var repwd = $(this).val();
		// if(!validform.isrepwd(pwd,repwd)){
		// 	$(this).addClass("is-invalid");
		// }else{
		// 	$(this).removeClass("is-invalid");
		// }
		valid(this,'isrepwd',pwd,repwd);
	})
	
	// 	$("form").submit(function() {
	// 	var  user = JSON.parse(localStorage.getItem('ures'));
	// 	var prod =JSON.parse(localStorage.getItem('prod'));
	// 	var name = $("#name").val();
	// 	var password =  $("#password").val();
	// 	if(name == "" || password  == ""){
	// 		alert("内容不能为空");
	// 		return false;
	// 	}else{
	// 		
	// 			flag = true;
	// 			for(var i = 0;i<user.length;i++){
	// 					if(name == user[i].name){
	// 						alert("用户已经存在");
	// 						flag = false;
	// 						break;
	// 					}
	// 			}
	// 			if(flag == true){
	// 				var lishi = {
	// 					name,
	// 					password
	// 				}
	// 				user.unshift(lishi);
	// 				localStorage.setItem('ures', JSON.stringify(user));
	// 				prod[name] = {
	// 					nametype: {
	// 						
	// 					}
	// 				}
	// 				localStorage.setItem('prod',JSON.stringify(prod));
	// 				alert("注册成功");
	// 			}
	// 			return flag;
	// 	}
	// 	
	// })
})