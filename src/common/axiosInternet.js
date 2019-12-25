/**
 * http请求拦截处理
 */
import axios from 'axios'
import {
    Message
} from 'element-ui'
const instanceInternet = axios.create();
instanceInternet.defaults.headers = {
    'Content-Type': 'application/json'
};
instanceInternet.interceptors.request.use(config => {
    // config.baseURL = window.vm.API.internet.baseURL;
    // //过滤拦截路径
    let aaa = false;
    window.vm.API.internet.constObj.requestFilter.forEach((v, i) => {
        if (config.url.includes(v)) {
            aaa = true;
        }
    })
    if (aaa) { //拦截的请求
        let stateObj = window.vm.$store.state;
        let submitToken = stateObj.internetToken;
        config.headers['X-Authorization'] = submitToken;
        return config;
    } else {
        //清除登录信息并跳转到登录页面
        window.vm.commonFun.againLogin();
        return;
    }
}, error => {
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error);
});
// http响应拦截器
instanceInternet.interceptors.response.use(response => {
    //	if (response.data.status) {
    //      switch (response.data.status) {
    //          case 300://token过期
    //              window.vm.$message({
    //		            type: 'error',
    //		            message: '登录信息过期，请重新登录!'
    //	          	});
    //	           //清除token信息并跳转到登录页面
    //	           window.vm.commonFun.againLogin();
    //	        break;
    //      }
    //  }
    return response;
}, error => {
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error);
})
export default instanceInternet;
