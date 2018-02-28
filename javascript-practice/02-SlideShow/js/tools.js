/*
* @Author: 饶婷
* @Date:   2017-11-22 10:47:28
* @Last Modified by:   饶婷
* @Last Modified time: 2017-11-23 16:10:18
*/

'use strict';
/**
 * 功能：获取浏览器可视区域的宽高
 * @return {[type]} [description]返回的是json串
 */
function client () {
	if (window.innerHeight != undefined) {
		return {
			"width": window.innerWidth,
			"height": window.innerHeight
		}
	} else if (document.compatMode === "CSS1Compat") {
		return {
			"width": document.documentElement.clientWidth,
			"height": document.documentElement.clientHeight
		}
	} else {
		return {
			"width": document.body.clientWidth,
			"height": document.body.clientHeight
		}
	}
}

/**
 * 功能：显示元素
 * @param  要显示的元素
 * @return 
 */
function show (ele) {
	ele.style.display = "block";
}

/**
 * 功能：隐藏元素
 * @param  要隐藏的元素
 * @return {[type]}     [description]
 */
function hide (ele) {
	ele.style.display = "none";
}

/**
 * 功能：兼容方法获取元素样式（内嵌和外链）
 * @param  {[type]} ele  元素
 * @param  {[type]} attr 想要获取的属性
 * @return {[type]}      值
 */
function getStyle (ele,attr) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele,null)[attr];
	}
	return ele.currentStyle[attr];
}

/**
 * 功能：具有回调功能的缓动框架
 * @param  {[type]}   ele  可以只传递两个参数
 * @param  {[type]}   json [description]
 * @param  {Function} fn   [description]
 * @return {[type]}        [description]
 */
// function animate (ele,json,fn) {
// 	clearInterval(ele.timer);
// 	ele.timer = setInterval(function () {
// 		//使用开闭原则，否则只要有一个属性到达指定位置就会清楚定时器
// 		var bool = true;
// 		//在json串中，键是属性，键值就是属性目标值，遍历json，给每一个属性缓动
// 		for (var k in json) {
// 			//四步1.获取步长
// 			var leader = parseInt(getStyle(ele,k));
// 			var step = (json[k] - leader)/10;
// 			//2.二次定义步长
// 			step = step>0 ? Math.ceil(step) : Math.floor(step);
// 			//3.赋值
// 			ele.style[k] = leader + step + "px";
// 			//4.只有有一个没有到达指定位置，就是false，可以不考虑小数
// 			if (leader !== json[k]) {
// 				bool = false;
// 			}
// 		}
// 		//遍历完毕之后，检测bool的值是否是true，如果是，就说明所有的属性都到了指定位置，则可以清除定时器
// 		if (bool) {
// 			clearInterval(ele.timer);
// 			//执行完函数之后，就可以执行回调函数了
// 			if (fn) {
// 				fn();
// 			}
// 		}
// 	},25);
// }

/**
 * 特殊处理opacity和zindex的函数
 * @param  {[type]}   ele  [description]
 * @param  {[type]}   json [description]
 * @param  {Function} fn   [description]
 * @return {[type]}        [description]
 */
function animate (ele,json,fn) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function () {
		//使用开闭原则，否则只要有一个属性到达指定位置就会清楚定时器
		var bool = true;
		//在json串中，键是属性，键值就是属性目标值，遍历json，给每一个属性缓动
		for (var k in json) {
			//四步1.获取步长
			var leader;
			if (k === "opacity") {
				leader = getStyle(ele,k)*100;
			} else {
				leader = parseInt(getStyle(ele,k));
			}
			var step = (json[k] - leader)/10;
			//2.二次定义步长
			step = step>0 ? Math.ceil(step) : Math.floor(step);
			//3.赋值
			//特殊情况特殊处理
			leader = leader+ step;
			if (k === "opacity") {
				ele.style[k] = (leader)/100;
				//兼容ie678
				ele.style.filter = "alpha(opacity="+(leader)+")";
			} else if (k === "zIndex") {
				ele.style[k] = json[k];
			} else {
				ele.style[k] = leader + "px";
			}
			//4.只有有一个没有到达指定位置，就是false，可以不考虑小数
			// if (Math.abs(leader - json[k]) > Math.abs(step)) {
			// 	bool = false;
			// }
			if (json[k] !== leader) {
				bool = false;
			}
		}
		//遍历完毕之后，检测bool的值是否是true，如果是，就说明所有的属性都到了指定位置，则可以清除定时器
		if (bool) {
			clearInterval(ele.timer);
			//执行完函数之后，就可以执行回调函数了
			if (fn) {
				fn();
			}
		}
	},25);
}
