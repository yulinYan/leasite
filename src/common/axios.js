/**
 * http请求拦截处理
 */
import axios from 'axios'
const instance = axios.create();
instance.defaults.headers = {
	'Content-Type':'application/x-www-form-urlencoded'
};
instance.interceptors.request.use(config => {
    config.baseURL = window.vm.API.leansite.baseURL;
	if(config.method.toUpperCase() =="POST"){//post方式时，提交的参数转成string类型
		config.data = window.vm.qs.stringify(config.data);
	}
	//过滤拦截路径
	if(window.vm.API.leansite.constObj.requestFilter.indexOf(config.url) === -1){//拦截的请求
		let stateObj = window.vm.$store.state;
		if(stateObj.token && stateObj.token.length >0 ) {//token验证
			let submitToken = stateObj.token;
			config.headers.Authentication = encodeURIComponent(submitToken);
			return config;
	    }else{
	      	//清除登录信息并跳转到登录页面
	        window.vm.commonFun.againLogin();
	        return;
	    }
	}else{
		return config;
	}
}, error => {
	Message.error({
		message: '加载超时'
	})
	return Promise.reject(error);
});
// http响应拦截器
instance.interceptors.response.use(response => {
	if (response.data.status) {
        switch (response.data.message) {
            case "token已经过期"://token过期
                window.vm.$message({
		            type: 'error',
		            message: '登录信息过期，请重新登录!'
	          	});
	           //清除token信息并跳转到登录页面
	           window.vm.commonFun.againLogin();
	        break;
        }
    }
	return response;
}, error => {
	Message.error({
		message: '加载失败'
	})
	return Promise.reject(error);
})
export default instance;