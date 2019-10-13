$(function() {
	
	if(JSON.parse(localStorage.getItem('ures')) == null){
		localStorage.setItem('ures', JSON.stringify(user));
	}
	var login = "void";
	localStorage.setItem('login', JSON.stringify(login));
	
	$("form").submit(function() {
		var  user = JSON.parse(localStorage.getItem('ures'));
		var name = $("#name").val();
		var password =  $("#password").val();
			flag = false;
			for(var i = 0;i<user.length;i++){
					if(name == user[i].name && password == user[i].password){
						login=name;
							localStorage.setItem('login', JSON.stringify(login));
						alert("登录成功");
						flag = true;
					}
			}
			if(flag == false){
				alert("用户名或密码错误");
			}
			return flag;
	})
})
