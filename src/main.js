import Vue from 'vue'
import App from './App'
import vuescroll from 'vuescroll';  //自定义滚动条
import 'vuescroll/dist/vuescroll.css';
import axios from './common/axios';//http 请求拦截
import axiosInternet from './common/axiosInternet';//http 请求拦截
import qs from 'qs';
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css';   //全局样式
import router from "./router/router.js" // 引入全局的路由
import api from "./common/api.js" //引入接口
import apiInternet from "./common/apiInternet.js" //引入接口
import commonFun from "./common/commonFun.js" //引入接口
import ZkTable from 'vue-table-with-tree-grid'
import TreeTable from 'tree-table-vue'
import moment from "moment";


import md5 from './plugins/md5';
import echarts from 'echarts'
import 'echarts/map/js/china'
import "echarts/map/js/province/anhui.js"


Vue.prototype.$echarts = echarts;
Vue.use(ZkTable);
Vue.use(TreeTable);
//TODO mock单元测试
//import UserCenter from './mock/user.js' //用户信息模块
//UserCenter.bootstrap();

Vue.use(vuescroll); // install the vuescroll first
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'medium'
});
Vue.use(md5);
Vue.prototype.API = {
	leansite:api,//Leansite Paas平台
	internet:apiInternet//物联网平台
};
Vue.prototype.qs = qs
Vue.prototype.commonFun = commonFun;
Vue.prototype.$store = store
Vue.prototype.$axios = {
	leansite:axios, //Leansite Paas axios
	internet:axiosInternet //物联网 axios
};

Vue.prototype.$moment = moment; //时间插件
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function (el) {
		// 聚焦元素
		el.focus()
	}
})

Vue.filter('momentDate', (e) => {
    return moment(e).format('YYYY-MM-DD HH:mm:ss')
})

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods:{
  	created(){
  		//console.log("Vue.prototype.API"+Vue.prototype.API.URL);
  	}
  }

})
export default vm;

