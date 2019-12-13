<template>
	<div class="index">
		<!--桌面-->
		<div class="main-block" >
			<div class="block-item" v-for="app in appList" @click="openDialog(app)">
			    <img v-bind:src="app.icon"/>
			    <span class="demonstration">{{app.name}}</span>
			</div>
		</div>
		<!--状态栏-->
		<div class="status-bar">
			<!--状态栏系统菜单-->
			<SystemMenu v-if="systemMenuVisible" @openCallBack="statusBarData" @closeCallBack="closeParentDialog"></SystemMenu>
			<img class="menuLogo" @click="clickSystemMenu" src="../assets/img/logo_icon.png" alt="菜单图标" title="打开系统菜单"/>
			<el-input
			    placeholder="在此处搜索应用"
			    prefix-icon="el-icon-search"
			    v-model="searchApp">
			</el-input>
			<!--显示活动的app图标-->
			<el-tooltip v-if="activeApps.length > 0" v-for="app in activeApps" :content="`${app.name}`" placement="top" visible-arrow="false" :key="`${app.name}`" @click.native="clickMinimizedApp(app)">
  				<img  v-bind:src="app.icon" />
			</el-tooltip>
		</div>
		<DialogUrl  v-for="(app,index) in activeApps" v-if="app.isShowDialog" width="70%" @callBackFun="closeParentDialog" :appObj=app :key="`${app.name}`" :ref="'dialogUrl'+index"></DialogUrl>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import DialogUrl from '../components/DialogUrl.vue';//弹框打开第三方应用
	import SystemMenu from '../components/SystemMenu.vue';//系统菜单
	export default {
		name: 'index',
		components: {
			DialogUrl,
			SystemMenu
		},
		data() {
			return {
				isMount:false,//是否挂载组件
				searchApp:"",//搜索应用
				dialogVisible:false,
				systemMenuVisible:false,
				appList:[
					{ name:'智慧照明',icon:require("../assets/img/light.png"),isActive:true,webUrl:"http://www.baidu.com" },
					{ name:'能源管理',icon:require("../assets/img/light.png"),isActive:true,webUrl:"http://192.168.2.41:8080/passport/login" },
					{ name:'智慧空调',icon:require("../assets/img/light.png"),isActive:true,webUrl:"http://www.baidu.com" },
					{ name:'设备OEE',icon:require("../assets/img/OEE.png"),isActive:true,webUrl:"http://www.baidu.com" },
					{ name:'巡检管理',icon:require("../assets/img/light.png"),isActive:true,webUrl:"http://www.baidu.com" },
				],
				activeApps: [],//点击打开的app数组			
			}
		},
		created() {
			
		},
		mounted(){
        	if(this.$store.state.user && !this.$store.state.user.token){
        		this.isMount = false;
        		this.$router.push('/login');  // 正常登录
        		return;
        	}else{
        		this.isMount = true;
        	}
		},
		methods: {
			/**
			 * 打开桌面的第三方app 
			 */
			openDialog(appObj){
				let searchIndex = -1;
				if(this.activeApps.length > 0){
					searchIndex = this.activeApps.findIndex((value)=>value.name==appObj.name);
				}
				if(searchIndex ==-1){
					if(this.activeApps.length >= 20){
			            this.$message({
			              type: 'info',
			              message: '最多只能同是打开20个应用/功能'
			            });
			            return;
					}
					let chioceApp = {};
					for(let i=0;i<this.appList.length;i++){
						if(this.appList[i].name == appObj.name){
							chioceApp = this.appList[i];
							break;
						}
					}	
					let appObject = {
						name:appObj.name,//APP名称
						icon:chioceApp.icon,//app图标
						webSource:2,//打开的网页来源  1=本项目；2=第三方项目
						webUrl:chioceApp.webUrl,
						isActive:true,//状态栏中显示的app是否处于活动状态
						isShowDialog:true,//是否显示弹框
						isMinimize:false//是否缩小弹框
					};
					let pushIndex = this.activeApps.length>0?this.activeApps.length:0;
					this.$set(this.activeApps,pushIndex,appObject);
				}
			},
			/**
			 * 新增状态栏数据处理
			 * SystemMenu组件回调
			 */
			statusBarData(appObj){
				let searchIndex = -1;
				if(this.activeApps.length > 0){
					searchIndex = this.activeApps.findIndex((value)=>value.name==appObj.name);
				}
				if(searchIndex ==-1){
					if(this.activeApps.length >= 20){
			            this.$message({
			              type: 'info',
			              message: '最多只能同是打开20个应用/功能'
			            });
			            return;
					}
					let appObject = {
						name:appObj.name,//APP名称
						icon:appObj.icon,//app图标
						webSource:1,//打开的网页来源  1=本项目；2=第三方项目
						webUrl:appObj.path,
						isActive:true,//状态栏中显示的app是否处于活动状态
						isShowDialog:true,//是否显示弹框
						isMinimize:false//是否缩小弹框
					};
					let pushIndex = this.activeApps.length>0?this.activeApps.length:0;
					this.$set(this.activeApps,pushIndex,appObject);
				}
				this.systemMenuVisible = false;
			},
			/**
			 * 关闭桌面的第三方app
			 */
			closeParentDialog(appObj){
				let searchIndex = -1;
				if(this.activeApps.length > 0){
					searchIndex = this.activeApps.findIndex((value)=>value.name==appObj.name);
				}
				if(searchIndex !=-1){
					this.$delete(this.activeApps, searchIndex);
				}
			},
			/**
			 * 点击底部状态栏中缩小的app图标
			 */
			clickMinimizedApp(appObj){
				if(this.activeApps.length > 0){
					let searchIndex = -1;
					for(let i=0;i<this.activeApps.length;i++){
						if(this.activeApps[i].name == appObj.name){
							searchIndex = i;
							break;
						}
					}	
					if(searchIndex != -1){
						let editApp = this.activeApps[searchIndex];
						editApp.isMinimize = true;
						this.$refs['dialogUrl'+searchIndex][0].isminimize= false;   
						this.$refs['dialogUrl'+searchIndex][0].dialogVisible= true;   
					}
				}
			},
			/**
			 * 点击系统菜单logo
			 */
			clickSystemMenu(){
				this.systemMenuVisible = !this.systemMenuVisible;
			}
			
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.index{
		height: 100vh;
		width: 100vw;
		overflow-y: auto;
		overflow-x: auto;
		.main-block{
			width: 100vw;
			height: 95vh;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			align-items:center;
			justify-content: flex-start;
			align-content:flex-start;
			background:#FFFFFF url(../assets/img/index_bg.png) no-repeat center;
			background-size: cover;
			.block-item{
				display: flex;
				justify-content: center;	
				align-items: center;
				flex-direction: column;
				width:10vh;
				cursor: pointer;
				margin-top: 3.5vh;
				margin-left: 2vw;
				img{
					width: 80px;
    				height: 80px;
    				margin-bottom:10px;
				}
			}
		}
		.status-bar{
			width: 100%;
		    height: 5vh;
		    line-height: 5vh;
		    background-color: #31353f;
		    position: fixed;
		    z-index: 9999;
			img.menuLogo{
				width: 30px;
			    height: 30px;
			    padding: 10px 15px;
			    cursor: pointer;
			}
			img.menuLogo:hover{
				background-color: #202020;
			}
			.el-input{
				width:276px;
				height: 36px;
				line-height: 36px;
				background-color: #eeeeee;
				border-radius: 4px;
				margin-right: 10px;
			}
			.el-tooltip{
				cursor: pointer;
				margin: 0 5px;
				height: 40px;
				border: none;
				border-bottom: 2px solid #a0a9b5;
				img{
					cursor: pointer;
					width: 40px;
					height: 40px;
				}
			}
		}
	}
	::-webkit-scrollbar{  
		width: 1px;
    	background-color: transparent;  
}  
</style>