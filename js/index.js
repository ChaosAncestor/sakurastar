$(function() {
	// 本地数据加载
	// 获取数据
	if(JSON.parse(localStorage.getItem('prod')) == null){
		localStorage.setItem('prod',JSON.stringify(products));
	}
	// 获取登录数据
	var name = JSON.parse(localStorage.getItem('login'));
	if (name == "void") {
		$(".message").empty();
		$(".message").append('<a href="login.html" >去登录</a>')
	} else {
		$(".message").empty();
		$(".message").append('<p>欢迎登录</p><p><span>用户：</span><a id="user"></a></p><p><a href="login.html">退出登录</a></p>')
		$("#user").text(name);


		// 获取数据
		var prod = JSON.parse(localStorage.getItem('prod'));

		// 给列表添加type	
		$.each(prod[name].nametype, function(i, item) {
			var addstr = `<li class="text-primary" data-type ="${i}">${item}</li>`;
			$(".add").append(addstr);
			$(".showdata").append(addstr);
		});
		// console.log(prod[name].jujia[0].img);	


		// 添加商品类型
		$(".tianjia").on('click', function() {
			$('#type-md').modal(); //显示模态框
		})
		$("#type-save").on('click', function() {
			var pj = $(".type-pj").val();
			var types = $(".type-type").val();
			prod[name].nametype[pj] = types;
			console.log(pj, types);
			prod[name][pj] = [];
			localStorage.setItem('prod', JSON.stringify(prod));
			// 保存数据
			$('#type-md').modal('hide');
			location.reload();
		})


		// table内容的展示{}
		// 获取当前的商品类型表格数据
		var type = $(".pro-active").data("type");
		// 按照获取到的商品类型(type)，从数据库(prod)中获取数据
		var typeData = prod[name][type];

		// 调用initTypeData把typeData作为参数传入
		initTypeData(typeData);

		// table显示封装方法
		function initTypeData(data) {
			// 修改标题名字
			$(".pt-title").text($(".pro-active").html());

			// 遍历获取到数据 $.each('对象名(需要遍历的变量名)'function(i(参数1:下标),item(参数2:数组里每一个对象)){})是jQuery的遍历方法
			$.each(data, function(i, item) {
				// 创建tr标签以及内容 把遍历的内容输入
				var Str = $(
					`<tr data-id="${item.id}"><td>${i+1}</td><td><div class="pro-img"><img class="d-block w-100" src="${item.img}" ></div></td><td><div class="pro-title">${item.title}</div></td><td><div class="pro-price">￥${item.price}</div></td><td class="pro-operating"><button type="button" class="btn btn-info btn-sm btn-edit">修改</button><button type="button" class="btn btn-danger btn-sm btn-remove">删除</button></td></tr>`
				);
				// 把tr存入tbody里面
				$('.tbody').append(Str);
			});

			// 编辑按钮的实现
			$(".btn-edit").on("click", function() {
				$('#edit-md').modal(); //显示模态框
				// 获取类型
				var type = $(".pro-active").data("type");

				// 给添加框的类型定值
				$("#edit-type").data("type", type).val($(".pro-active").html());

				// 清空内容
				$(".pro-void").val("");
				// 获取商品id
				var id = $(this).parent().parent().data("id");
				// 添加id到编辑模态框
				$("#edit-md").data('id', id);
				// 
				for (var i = 0; i < prod[name][type].length; i++) {
					if (id == prod[name][type][i].id) {
						//添加编辑模态框商品数据
						$("[data-edit='title']").val(prod[name][type][i].title);
						$("[data-edit='price']").val(prod[name][type][i].price);
						$("[data-edit='img']").val(prod[name][type][i].img);
					}
				}


			});
			// 保存按钮
			$("#edit-save").on("click", function() {
				// 获取添加类型
				var type = $("#edit-type").data('type');
				// 获取id
				var id = $("#edit-md").data('id');

				// 查找修改商品
				for (var i = 0; i < prod[name][type].length; i++) {
					if (id == prod[name][type][i].id) {

						//修改商品数据
						$(".edit-void").each(function() {
							var key = $(this).data('edit');
							prod[name][type][i][key] = $(this).val();
						});

						// 写入本地存储的数据库中
						localStorage.setItem('prod', JSON.stringify(prod));
						location.reload();
					}
				}



				// 获取所有数据
				// var o = {
				// 	id,
				// 	subtag: '',
				// 	isSubtag: false,
				// 	isPlus: false,
				// 	plusPrice: '0.00'
				// };
				// var $(".edit-void").each(function(){
				// 	var key = $(this).data('edit');
				// 	o[key] = $(this).val();
				// });

				$('#edit-md').modal('hide');
			});
			// 删除按钮的实现
			$(".btn-remove").on("click", function() {
				// 获取当前商品类型
				var type = $(".pro-active").data("type");
				// 获取商品id
				var id = $(this).parent().parent().data("id");
				// 遍历类型数据
				for (var i = 0; i < prod[name][type].length; i++) {
					if (prod[name][type][i].id == id) {
						// 删除当前匹配id的商品
						prod[name][type].splice(i, 1);
						// 写入本地存储的数据库中
						localStorage.setItem('prod', JSON.stringify(prod));
						// 删除页面的当前数据
						$(this).parents("tr").remove();
						// 遍历顺序位置
						$("tbody>tr").each(function(k) {
							$(this).find('td').eq(0).text(k + 1);

						})
						location.reload();
						break;
					}
				}

			});
		}

		// 商品记录的列表操作
		$(".showdata>li").on("click", function() {
			// 判断li是否含有"pro-active" 有则不在执行
			if ($(this).hasClass("pro-active")) {
				return;
			}
			// 切换li中的pro-active标签名
			$(this).addClass("pro-active").siblings().removeClass("pro-active");


			// 获取当前的商品类型表格数据类型
			var type = $(".pro-active").data("type");

			// 按照获取到的商品类型(type)，从数据库(prod)中获取数据
			var typeData = prod[name][type];

			// 清空tbody里面的内容 empty()是jQuery里的方法 删除标签里的所以子元素
			// $(".tbody").html("");
			$(".tbody").empty();

			// 调用initTypeData把typeData作为参数传入
			initTypeData(typeData);

		})
		// console.log(typeData);

		// 添加商品
		$(".add>li").on("click", function() {
			// 显示添加框
			$('#add-md').modal();

			// 获取类型
			var type = $(this).data("type");

			// 给添加框的类型定值
			$("#pros-type").data("type", type).val($(this).html());

			// 清空内容
			$(".pro-void").val("");
		})
		$("#save").on("click", function() {
			// 获取添加类型
			var type = $("#pros-type").data('type');
			// 创建商品id
			var id = new Date().getTime() + parseInt(Math.random() * 1000);

			// 获取添加数据
			var title = $("#pros-name").val();
			var price = $("#pros-price").val();
			var img = $("#pros-url").val();

			// 创建一个临时对象
			var lishi = {
				id,
				title,
				img,
				price,
			};
			// 把数据添加到prod数组中
			prod[name][type].unshift(lishi);
			// 写入本地存储的数据库中
			localStorage.setItem('prod', JSON.stringify(prod));
			// 遍历顺序位置
			$("tbody>tr").each(function(k) {
				$(this).find('td').eq(0).text(k + 1);

			})
			// 保存数据
			$('#add-md').modal('hide');
			location.reload();
		})

	}


})
