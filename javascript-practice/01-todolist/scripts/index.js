/*
* @Author: 饶婷
* @Date:   2017-12-12 11:09:55
* @Last Modified by:   饶婷
* @Last Modified time: 2017-12-12 22:36:47
*/
/*
* @Author: 饶婷
* @Date:   2017-12-12 11:09:55
* @Last Modified by:   饶婷
* @Last Modified time: 2017-12-12 16:57:59
*/

'use strict';

$(function () {
	//点击输入框，输入文字的时候下面的任务清单部分显示，按下回车输入的文字添加到ul列表中
	$(".put input").on("keyup",function (e) {
		// 任务清单显示
		$(".todolist").show();
		//按下回车将输入框里的文字添加到ul中
		if(e.keyCode === 13) {
			var text = $(this).val();
			//判断，输入了值再新建，没有输入显示警告框
			if(text) {
				var newLi = $("<li><input type='checkbox'>"+text+"<span>删除</span></li>");
			} else {
				alert("请输入未完成的任务！");
			}
			$(newLi).on("mouseenter",function () {
				$(this).find("span").show();
			});
			$(newLi).on("mouseleave",function () {
				$(this).find("span").hide();
			});
			//给删除添加事件，点击删除该li
			$(newLi).find("span").on("click",function () {
				$(this).parent().remove();
				getLength();
			});
			$(this).val("");
			$("#list").append(newLi);
			//bug：新添加的li点击无效，添加函数
			clickLi(newLi);
		}
			//获取当前已经被选中的复选框，下面的已完成项目显示
		$("#list").find("input").on("click",function () {
			if ($("#list input:checked").length > 1) {
				$(".finish").show();
				$(".finish").text($("#list input:checked").length+"个项目已完成");
			} else {
				$(".finish").hide();
			}
		});
		//获取当前ul的长度，添加到下面的span中
		getLength();
	});
});


$(function () {
	//鼠标经过li的时候删除部分显示
	$("#list li").on("mouseenter",function () {
		$(this).find("span").show();
	});
	$("#list li").on("mouseleave",function () {
		$(this).find("span").hide();
	});
	$("#list li").find("span").on("click",function () {
		$(this).parent().remove();
	});
	// 点击全部选中按钮下面的全部被选中(未完成)
	$(".todolist>input").on("click",function () {
		$("#list").find("input").prop("checked",$(this).prop("checked"));
		//如果当前为全选状态：显示下面的文本框
		if ($(this).prop("checked")) {
			$(".finish").show();
			$(".finish").text($("#list input:checked").length+"个项目已完成");
		} else {
			$(".finish").hide();
		}
	});
	finishPro();
	clickLi("#list li");
});

/**
 * 下面文本框的函数
 * @return {[type]} [description]
 */
function finishPro () {
	//获取当前已经被选中的复选框，下面的已完成项目显示
	$("#list").find("input").on("click",function () {
		if ($("#list input:checked").length > 1) {
			$(".finish").show();
			$(".finish").text($("#list input:checked").length+"个项目已完成");
		} else {
			$(".finish").hide();
		}
	});
	//点击已完成项目，删除已选中的列表
	$(".finish").on("click",function () {
		$("#list input:checked").parent().remove();
		$(this).hide();
		getLength();
	});
	
	
}

/**
 * 获取当前ul的长度，添加到几个项目中
 * @return {[type]} [description]
 */
function getLength () {
	var listAll = $("#list li").length;
	$(".num").html(listAll+"个项目");
}
/**
 * 功能:将点击li显示输入框封装成一个函数
 * @return {[type]} [description]
 */
function clickLi (ele) {
	//点击li的时候，li中的内容变成输入框，可以修改内容
	$(ele).on("click",function (e) {
		//bug:点击删除的时候，也会触发该事件，解决：判断事件源，如果不是span，在执行
		if (e.target.tagName !== "SPAN" && e.target.tagName !== "INPUT") {
			// li中的文本内容
			var text = $(this).text();
			//记录当前的checkbox中的值
			var check = $(this).find("input:checkbox").prop("checked");
			var text = text.slice(0,text.length-2);
			$(this).html("<input type='text' value='"+text+"'/>");
			//获取焦点的时候里面的文字等于value值，可以更改值
			$(this).find("input:text").on("click",function (e) {
				$(this).text(text);
				e.stopPropagation();
			});
			//失去焦点的时候更改li里面的内容
			$(this).find("input:text").on("blur",function () {
				//获取当前input中的内容
				text = $(this).val();
				$(this).parent().html("<input type='checkbox'>"+text+"<span>删除</span>");
				$(this).parent().find("input:checkbox").prop("checked",check);
				//bug修改以后的删除键失灵
				$(ele).find("span").on("click",function () {
					$(this).parent().remove();
					getLength();
				});
				finishPro();
			});
			$(this).find("input:text").on("keyup",function (e) {
				//如果按下回车键，和失去焦点的效果一样
				if (e.keyCode === 13) {
					text = $(this).val();
					$(this).parent().html("<input type='checkbox'>"+text+"<span>删除</span>");
					//设置不上。。。
					$(this).parent().find("input").prop("checked",check);
					console.log($(this).parent().find("input"));
					console.log(check);
					//bug修改以后的删除键失灵，原本的下面的已完成项目也无效
					$(ele).find("span").on("click",function () {
						$(this).parent().remove();
						getLength();
					});
					finishPro();
				}
			});
		}
	});
}