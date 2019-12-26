
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
const testView = () => import('@/views/testView.vue');
const userCenterHome = () => import('@/views/userCenter/UserCenterHome.vue');
const userList = () => import('@/views/userCenter/UserList.vue');
const roleList = () => import('@/views/userCenter/RoleList.vue');
const deptList = () => import('@/views/userCenter/DeptList.vue');
const roleListEdit = () => import('@/views/userCenter/RoleListEdit.vue');
const internetPlatform = () => import('@/views/internetPlatform/internetPlatform.vue');
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
		path: '/',
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
    //物联网模块
    {
        name: 'internetPlatform',
        path: '/internetPlatform',
        component: internetPlatform,
        meta: {
            title: '物联网主页',
			requiresAuth: true
        },
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
		name: 'deptList',
		path: '/deptList',
		component:deptList,
		meta: {
			title: '权限管理',
			requiresAuth: true
		}
	},
	
    //权限管理路由
    {
        name: 'roleListEdit',
        path: '/roleListEdit',
        component:roleListEdit,
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
		path: '/testView',
		component: testView
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
// 路由拦截
router.beforeEach((to,from,next)=>{
	if(to.name === 'index' && from.name ==="login"){
	    next();
	}
	else{
	    next();
    }
});


export default router
