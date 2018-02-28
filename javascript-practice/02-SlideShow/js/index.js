/*
* @Author: 饶婷
* @Date:   2017-11-23 14:47:35
* @Last Modified by:   饶婷
* @Last Modified time: 2017-11-23 16:33:37
*/

'use strict';
window.onload = function () {
	//需求： 点击左右按钮，实现旋转木马
	//步骤：1.鼠标放到轮播图上显示两侧的按钮，移开隐藏
	//2.给页面上所有的li加载样式
	//3.给两侧的按钮绑定事件，只用一个方法，根据传递的值不同，实现不同的功能，值为true，实现next功能，值为false，实现prev功能
	//4.书写函数，操作数组，通过修改数组来修改li的样式（数组中存放的是json串，就是每一个li的目标样式，true，点击next：3的样式要给2,2给1，以此类推，
	//则去掉数组的最后一个元素加到第一个位置；false：点击prev，3的样式给4，以此类推，去电数组的第一个元素加到最后一个元素上。）
	
	//定义数组，获取事件源和相关元素
	var jsonArr = [{
		"width":400,
		"top":70,
		"left":50,
		"opacity":20,
		"zIndex":2},
		{"width":600,
		"top":120,
		"left":0,
		"opacity":80,
		"zIndex":3},
		{"width":800,
		"top":100,
		"left":200,
		"opacity":100,
		"zIndex":4},
		{"width":600,
		"top":120,
		"left":600,
		"opacity":80,
		"zIndex":3},
		{"width":400,
		"top":70,
		"left":750,
		"opacity":20,
		"zIndex":2}];
	var slide = document.getElementsByClassName("slide")[0];
	var ul = slide.children[0];
	var liArr = ul.children;
	var arrow = document.getElementsByClassName("arrow")[0];
	var aArr = arrow.children;

	//1.鼠标放到轮播图上显示两侧的按钮，移开隐藏
	slide.onmouseenter = function () {
		animate(arrow,{"opacity":100});
	}
	slide.onmouseleave = function () {
		animate(arrow,{"opacity":0});
	}
// 	//2.给页面上所有的li加载样
// 	for (var i=0 ; i<liArr.length ; i++) {
// 		animate(liArr[i],jsonArr[i]);
// 	}

// 	//3.给两侧的按钮绑定事件，只用一个方法，根据传递的值不同，实现不同的功能，值为true，实现next功能，值为false，实现prev功能
// 	aArr[0].onclick = function () {
// 		move(false);
// 	}
// 	aArr[1].onclick = function () {
// 		move(true);
// 	}


// 	//4.书写函数，操作数组，通过修改数组来修改li的样式（数组中存放的是json串，就是每一个li的目标样式，true，点击next：3的样式要给2,2给1，以此类推，
// 	//则去掉数组的最后一个元素加到第一个位置；false：点击prev，3的样式给4，以此类推，去电数组的第一个元素加到最后一个元素上。）
// 	function move (bool) {
// 		if(bool) {
// 			jsonArr.unshift(jsonArr.pop());
// 		} else {
// 			jsonArr.push(jsonArr.shift());
// 		}
// 		//再次给所有的li加上样式
// 		for (var i=0 ; i<liArr.length ; i++) {
// 			animate(liArr[i],jsonArr[i]);
// 		}
// 	}
// }


//简化代码，加上只能等一次点击结束之后才能第二次
	//2.给页面上所有的li加载样
	move();
	var flag = true;
	//3.给两侧的按钮绑定事件，只用一个方法，根据传递的值不同，实现不同的功能，值为true，实现next功能，值为false，实现prev功能
	//开闭原则，一次只能执行点击一次,在执行move函数之前先判断是否是true
	aArr[0].onclick = function () {
		if (flag) {
			flag = false;
			move(true);
		}
	}
	aArr[1].onclick = function () {
		if (flag) {
			flag = false;
			move(false);
		}
	}


	//4.书写函数，操作数组，通过修改数组来修改li的样式（数组中存放的是json串，就是每一个li的目标样式，true，点击next：3的样式要给2,2给1，以此类推，
	//则去掉数组的最后一个元素加到第一个位置；false：点击prev，3的样式给4，以此类推，去电数组的第一个元素加到最后一个元素上。）
	function move (bool) {
		//如果没有传值，bool的值是undefined
		if (bool !== undefined) {
			if(bool) {
				jsonArr.unshift(jsonArr.pop());
			} else {
				jsonArr.push(jsonArr.shift());
			}
		}
		//再次给所有的li加上样式
		for (var i=0 ; i<liArr.length ; i++) {
			//在函数执行完毕以后，吧bool的值改为true
			animate(liArr[i],jsonArr[i],function () {
				flag = true;
			});
		}
	}
}