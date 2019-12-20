import axios from 'axios'
/**
 * 物联网平台接口api
 */
const interface_s = {
	baseURL: 'http://192.168.2.31:8070/',//非生产环境
	//prodBaseURL:window.configs.internetAPI,//生产环境
	//登录模块
	login: "api/auth/login", //登录
	//常量对象
	constObj: {
		pageIndex:0,
		pageSize:10,
		requestFilter: [ //拦截器不拦截的请求集合
			"api/auth/login"
		],
		vueFilter: [ //拦截器不拦截的vue界面集合
		],
        internetToken:"LEANSITEPAAS-INTERNETTOKEN",//物联网中心token
	}
}
//配置生产环境和非生产环境之间的切换
if(process.env.NODE_ENV == 'development') { //非生产环境
	interface_s.baseURL = interface_s.baseURL;
}else if(process.env.NODE_ENV == 'production') { //生产环境
	interface_s.baseURL = interface_s.prodBaseURL;
}
export default interface_s;
