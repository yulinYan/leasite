
import Vue from 'vue'
import VueRouter from 'vue-router'
import api from "../common/api.js"
import store from '../store/index.js';
Vue.use(VueRouter)

const routes = [
	{
		name: 'login',
		path: "/login",
		component: resolve => require(['../views/login.vue'], resolve),
	},
	{
		name: 'index',
		path: '/index',
		component: resolve => require(['../views/index.vue'], resolve),
		meta: {
			title: '首页'
		}
	},
	//用户中心模块
	{
		name: 'userCenterHome',
		path: '/userCenterHome',
		component: resolve => require(['../views/userCenter/Home.vue'], resolve),
		meta: {
			title: '用户中心主页'
		},
		children:[
			{
				name: 'userList',
				path: 'userList',
				component:resolve => require(['../views/userCenter/UserList.vue'], resolve),

				meta: {
					title: '用户管理'
				}
			},
		]
	},
	{
		name: 'baseForm',
		path: '/baseForm',
		component: resolve => require(['../views/BaseForm.vue'], resolve),
		meta: {
			title: '用户中心首页'
		}
	},
	{
		name: 'home',
		path: '/home',
		component: resolve => require(['../views/home.vue'], resolve),
	},
	{
		path: '*',
		redirect: {
			path: '/403'
		}
	},
]
// 实例化
let router = new VueRouter({
	mode:'hash',//hash模式
	routes // （缩写）相当于 routes: routes
});



export default router
