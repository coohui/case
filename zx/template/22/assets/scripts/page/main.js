/* 
 *  轻App程序入口
 * ----------------------------------
 *  作者：Charles
 *  时间：2014-04-26
 *  准则：CMD 规范
 *  联系：16295853（qq）
 ************************************************************/

define(function(require, exports, module){

	//初始化App模块
	var app = require('modules/app/main');		//App模块
	//显示页面
	app.showPage('.page-index');

	//初始化各页面级模块
	require('modules/index/main').init();		//首页模块
	require('modules/teletext/main').init();	//图文模块
	require('modules/link/main').init();		//链接模块
	require('modules/video/main').init();		//视频模块
	require('modules/map/main').init();			//地图模块
	require('modules/form/main').init();		//表单模块

	//输出提示
	console.log('\n运行成功！');
	$('.app-footer').after($('input[data-weixin-callback]'));
});