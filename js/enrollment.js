$(function() {
	if(JSON.parse(localStorage.getItem('ures')) == null){
		localStorage.setItem('ures', JSON.stringify(user));
	}
	if(JSON.parse(localStorage.getItem('prod')) == null){
		localStorage.setItem('prod',JSON.stringify(products));
	}

	
	$("form").submit(function() {
		var  user = JSON.parse(localStorage.getItem('ures'));
		var prod =JSON.parse(localStorage.getItem('prod'));
		var name = $("#name").val();
		var password =  $("#password").val();
		if(name == "" || password  == ""){
			alert("内容不能为空");
			return false;
		}else{
			
				flag = true;
				for(var i = 0;i<user.length;i++){
						if(name == user[i].name){
							alert("用户已经存在");
							flag = false;
							break;
						}
				}
				if(flag == true){
					var lishi = {
						name,
						password
					}
					user.unshift(lishi);
					localStorage.setItem('ures', JSON.stringify(user));
					prod[name] = {
						nametype: {
							
						}
					}
					localStorage.setItem('prod',JSON.stringify(prod));
					alert("注册成功");
				}
				return flag;
		}
		
	})
})
