
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
		name: 'baseForm',
		path: '/baseForm',
		component: resolve => require(['../views/BaseForm.vue'], resolve),
		meta: {
			title: '用户中心'
		}
	},
	{
		name: 'home',
		path: '/home',
		component: resolve => require(['../views/home.vue'], resolve),
		children: [
//			{
//				name: 'index',
//				path: '/index',
//				component: resolve => require(['../views/index.vue'], resolve),
//				meta: {
//					title: '首页'
//				}
//			},
		]
	},
	{
		path: '*',
		redirect: {
			path: '/403'
		}
	},
	//用户中心模块
//	{
//		name: 'chioceAreaOrg',
//		path: '/chioceAreaOrg',
//		component: resolve => require(['../views/archivalBorrowing/ChioceAreaOrg.vue'], resolve),
//		meta: {
//			title: '用户中心'
//		}
//	}
]
// 实例化
let router = new VueRouter({
	mode:'hash',//hash模式
	routes // （缩写）相当于 routes: routes
});
// 路由拦截
/* router.beforeEach((to,from,next)=>{
    let vueFilter = api.constObj.vueFilter;
	let aDelStorage = [api.constObj.loginInfo,api.constObj.menuInfo,api.constObj.mainInfo,api.constObj.applyInfo,api.constObj.areaOrgInfo];
    //页面拦截
    if(vueFilter && vueFilter.length > 0){
    	for(let i=0;i<vueFilter.length;i++){
    		if(vueFilter[i] == to.fullPath){
    			next();
    			return;
    		}
    	}
    }
    let loginData = JSON.parse(sessionStorage.getItem(api.constObj.loginInfo));
	if(to.path === '/403'){
		store.commit("removeInfoByArray",aDelStorage);
	    router.push({path:'/login'});
	    next();
	}else if(to.path === '/login'){
		store.commit("removeInfoByArray",aDelStorage);
		next();
	}
	else if(!loginData || !loginData.id){
		if(to.path === '/' || to.matched.length <= 0 || to.fullPath == "/index"){
	        router.push({path:'/applyMain'});
	    }else{
	    	next();
	    }
    }
	else{
	    if((!loginData || !loginData.id) && to.name !== "login"){
			store.commit("removeInfoByArray",aDelStorage);
	        router.push({path:'/login'});
	    }else{
	    	//菜单权限验证
	    	let menuInfo = JSON.parse(sessionStorage.getItem(api.constObj.mainInfo));
	    	if(menuInfo && menuInfo.myUserMenus && menuInfo.myUserMenus.length > 0){
		    	for(let i=0;i<menuInfo.myUserMenus.length;i++){
		    		if(menuInfo.myUserMenus[i].url == to.fullPath || to.fullPath == "/login" || to.fullPath == "/index"){
		    			next();
		    			return;
		    		}
		    	}
				store.commit("removeInfoByArray",aDelStorage);
		    	router.push({path:'/login'});
		    	next();
	    	}else{
	    		next();
	    	}
	    }
    }
}); */


export default router
