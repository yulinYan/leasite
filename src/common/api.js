import axios from 'axios'
/**
 * Leansite Paas平台和用户中心接口api
 */
const interface_s = {
	baseURL: 'http://192.168.2.41:9527/api/v1/',//非生产环境
	//prodBaseURL:window.configs.leansiteAPI,//生产环境
	//prodBaseURL:"http://192.168.2.59:9527/api/v1/",//生产环境
	prodBaseURL:"http://192.168.2.59:9527/",//生产环境
	//登录模块
	login: "login", //登录
	logout:"logout",//退出系统
	//公共模块
	getThirdApp: 'app/getAll', //获取主页第三方应用菜单
	//用户中心
	userListByNameOrUserName:'user',//用户列表
	deleteUsers:'user',//批量删除用户
	addUsers:'user',//新增用户
    updateUser:'user/update',//修改用户
	roleListByRoleName:'role',//用户列表
	deleteRoles:'role',//批量删除角色
	addRole:'role',//新增角色
	getDeptAndUser:'/dept/getListAndUser',//获取部门和用户
    getMenuByRoleId:"/menu",  //根据roleId获取角色权限
    saveMenuState:"/role/addRoleAndMenu",  //保存角色权限
	getDepts:'/dept',//获取所有部门
	addDept:'/dept',//新增部门
    getUserByDeptId:'/dept/getUserByDeptId',//根据部门id获取用户
    addDeptUsers: '/dept/addUser',//新增部门人员
    notGroupUser: '/dept/notGroupUser',//没有部门人员
    delDeptUser: '/dept/deleteUser',//删除部门人员
    getSysApp: '/app/getSysApp',//获取系统应用
    checkPhoneOrEmail:'/user/phoneAndEmailEnable',//验证手机号或邮箱
	//常量对象
	constObj: {
		pageIndex:1,
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
        loginUser:"LEANSITEPAAS-LOGINUSER",//登录信息,
	}
}
//配置生产环境和非生产环境之间的切换
if(process.env.NODE_ENV == 'development') { //非生产环境
	interface_s.baseURL = interface_s.baseURL;
}else if(process.env.NODE_ENV == 'production') { //生产环境
	interface_s.baseURL = interface_s.prodBaseURL;
}
export default interface_s;
