import axios from 'axios'
/**
 * Leansite Paas平台和用户中心接口api
 */
const interface_s = {
	baseURL: 'http://192.168.2.41:9527/',//非生产环境
	//prodBaseURL:window.configs.API_ROOT,//生产环境
	//登录模块
	login: "login", //登录
	logout:"kickout",//退出系统
	//公共模块
	getThirdApp: 'app/getAll', //获取主页第三方应用菜单
	//用户中心
	userListByNameOrUserName:'user',//用户列表
	deleteUsers:'user',//批量删除用户
	addUsers:'user',//新增用户
	updateUser:'user/updateUser',//修改用户
	roleListByRoleName:'role',//用户列表
	deleteRoles:'role/deleteRoles',//批量删除角色
	addRole:'role/addRole',//新增角色
	//常量对象
	constObj: {
		pageIndex:0,
		pageSize:10,
		requestFilter: [ //拦截器不拦截的请求集合
			'login', //登录
		],
		vueFilter: [ //拦截器不拦截的vue界面集合
		],
        loginInfo:'LEANSITEPAAS-USER',//user信息
        operationAuthority:'LEANSITEPAAS-OPTAUTHORITY',//功能操作权限
        token:"LEANSITEPAAS-TOKEN",//token
        roles:"LEANSITEPAAS-ROLES",//role
	}
}
//配置生产环境和非生产环境之间的切换
if(process.env.NODE_ENV == 'development') { //非生产环境
	interface_s.baseURL = interface_s.baseURL;
}else if(process.env.NODE_ENV == 'production') { //生产环境
	interface_s.baseURL = interface_s.prodBaseURL;
}
export default interface_s;
