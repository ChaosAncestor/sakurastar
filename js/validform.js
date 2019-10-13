var validform = {
	// 用户名: 字母开头3-8位字符
	usernameReg:/^[A-Za-z][A-Za-z0-9]{2,7}$/,
	passwordReg:/^[A-Za-z0-9]{6,16}$/,
	nicknameReg:/^[A-Za-z0-9\u4e00-\u9fa5]{3,7}$/,
	isusername:function(val){
		 // var usernameReg = /^[A-Za-z][A-Za-z0-9]{2,7}$/;
		return this.usernameReg.test(val);
	},
	// 匿名 汉字字母数字组合3-8位字符
	// 汉字的范围\u4e00-\u9fa5
	// isnickname:function(val){
	// 	var nicknameReg=/^[A-Za-z0-9\u4e00-\u9fa5]{3,7}$/;
	// 	return this.nicknameReg.test(val);
	// },
	// 密码 6-16位字符
	ispassword:function(val){
		var passwordReg = /^[A-Za-z0-9]{6,16}$/;
		return this.passwordReg.test(val);
	},
	// 两次密码相等
	isrepwd:function(v1,v2){
		return v1 === v2;
	}
}