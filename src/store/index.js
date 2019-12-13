import Vue from 'vue'
import Vuex from 'vuex'
import api from "../common/api.js" //引入接口
Vue.use(Vuex)
let store = new Vuex.Store({
	state: {
		user:JSON.parse(sessionStorage.getItem(api.constObj.loginInfo))?JSON.parse(sessionStorage.getItem(api.constObj.loginInfo)):{},//存储用户信息
		token:sessionStorage.getItem('token'), //登录的依据
	},
	//操作数据。注意mutations只能进行同步操作。
	mutations: {
		/**
		 * 移除所有存储的信息--谨慎使用
		 */
		removeAllInfo() {
			sessionStorage.clear();
		},
		/**
		 * 批量移除存储的信息--推荐使用
		 * @param {Object} state 存储器对象
		 * params {Array} delArray 需要删除的信息名称数组
		 */
		removeInfoByArray(state,delArray) {
			let enableDelete = true;//是否允许存储
			if(delArray && delArray.constructor == Array && delArray.length > 0){
				delArray.forEach((item,index)=>{
					switch (item){
						case api.constObj.loginInfo:
							state.user = {};
							break;
						default:
							enableDelete = false;
						    console.log("存储的信息未定义，无法删除");
							break;
					}
					if(enableDelete){
						sessionStorage.removeItem(item);
					}
				});
			}
		},
		/**
		 * 添加指定存储信息--推荐使用
		 * @param {Object} state 存储器对象
		 * @param {Object} storeObj 存储的对象信息
		 * @param {String} storeObj.name 存储信息的名称
		 * @param {Array || Object || String} storeObj.storeInfo 需要存储的信息
		 */
		saveStoreByName(state,storeObj) {
			let enableStore = true;//是否允许存储
			if(!storeObj.name || storeObj.name.length == 0){
				alert("name参数不能为空，无法存储该信息!");
				return;
			}
			switch (storeObj.name){
				case api.constObj.loginInfo:
					state.user = storeObj.storeInfo;
					break;
				default:
					enableStore = false;
				    alert("存储的信息未定义，无法进行存储!");
					break;
			}
			if(enableStore){
				sessionStorage.setItem(storeObj.name, JSON.stringify(storeObj.storeInfo));
			}
		},
		/**
		 * 移除指定存储信息--推荐使用
		 * @param {Object} state 存储器对象
		 * @param {Object} name 存储的信息的名称
		 */
		removeStoreByName(state,name) {
			let enableDelete = true;//是否允许删除
			if(!name || name.length == 0){
				alert("name参数不能为空，无法删除存储的信息!");
				return;
			}
			switch (name){
				case api.constObj.loginInfo:
					state.user = {};
					break;
				default:
					enableDelete = false;
				    alert("存储的信息未定义，无法删除");
					break;
			}
			if(enableDelete){
				sessionStorage.removeItem(name);
			}
		}
	}
});
export default store
