
import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
import api from "../common/api.js"
import store from '../store/index.js';
Vue.use(VueRouter);
const login = () => import('@/views/login.vue');
const index = () => import('@/views/index.vue');
const error404 = () => import('@/views/404.vue');
const userCenterHome = () => import('@/views/userCenter/UserCenterHome.vue');
const userList = () => import('@/views/userCenter/UserList.vue');
const roleList = () => import('@/views/userCenter/RoleList.vue');
const routes = [
	{
		name: 'login',
		path: "/login",
		component: login,
		meta: {
			title: '登录',
			requiresAuth: false//是否登录验证
		}
	},
	{
		name: 'index',
		path: '/index',
		component:index,
		meta: {
			title: '首页',
			requiresAuth: true
		}
	},
	//用户中心模块
	{
		name: 'userCenterHome',
		path: '/userCenterHome',
		component: userCenterHome,
		meta: {
			title: '用户中心主页',
			requiresAuth: true
		}
	},
	{
		name: 'userList',
		path: '/userList',
		component:userList,
		meta: {
			title: '用户管理',
			requiresAuth: true
		}
	},
	{
		name: 'roleList',
		path: '/roleList',
		component:roleList,
		meta: {
			title: '权限管理',
			requiresAuth: true
		}
	},
	{
		path: '/404',
		component: error404
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
