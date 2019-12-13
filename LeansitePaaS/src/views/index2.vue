<template>
	<div class="index">
		<!--桌面-->
		<div class="main-block">
			<div class="block-item" @click="openDialog">
			    <img src="../assets/img/light.png"/>
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/OEE.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
			<div class="block-item">
			    <img src="../assets/img/light.png" />
			    <span class="demonstration">智慧照明</span>
			</div>
		</div>
		<!--状态栏-->
		<div class="status-bar">
			<img class="menuLogo" src="../assets/img/logo_icon.png" alt="菜单图标"/>
			<el-input
			    placeholder="在此处搜索应用"
			    prefix-icon="el-icon-search"
			    v-model="searchApp">
			</el-input>
			<el-tag
			  key="标签一"
			  effect="light"
			  size="medium"
			  type="">
			  <img src="../assets/img/light.png" />
			</el-tag>
		</div>
		<el-dialog 
			ref="xhzqDialog"
		    class="xhzqDialog"
		    :title="title"
		    :fullscreen="isfullscreen"
		    :visible.sync="dialogVisible"
		    :append-to-body="true"
		    :close-on-click-modal="false"
		    :show-close="false"
		    :width="width"
		    :class="isminimize? 'isminimize': ''"
		    center>
			<div v-show="!isminimize" slot="title" class="medium">
		      <div></div>
		      <div class="centers"><span>{{title}}</span></div>
		      <div class="icons">
		        <i class="iconfont icon-minus" style="font-size: 24px" @click="minimize"></i>
		        <i :class="isfullscreen? 'iconfont icon-full-screen-exit' : 'iconfont icon-full-screen' " style="font-size: 24px" @click="IsFullscreen"></i>
		        <i class="iconfont icon-close" style="font-size: 24px" @click="closeDialog"></i>
		      </div>
		    </div>
		    <div v-show="isminimize" slot="title"  class="horn">
		      <div class="lefts"><span>{{title}}</span></div>
		      <div class="centers"><i class="iconfont icon-full-screen" style="font-size: 24px" @click="minimize"></i></div>
		      <div class="rights"><i class="iconfont icon-close" style="font-size: 24px" @click="closeDialog"></i></div>
		    </div>
		    <div v-show="!isminimize" class="dialogBody">
		      <iframe src="http://www.baidu.com" id="mobsf" scrolling="no" frameborder="0" style="width: 100%;height: 100%;"></iframe>
		    </div>

			
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import bus from '../common/bus.js';

	
	export default {
		name: 'index',
		components: {

		},
		data() {
			return {
				isMount:false,//是否挂载组件
				searchApp:"",//搜索应用
				dialogVisible:false,
				isfullscreen: false, // 全屏
        		isminimize: false, // 最小化
				tags: [
		          { name: '标签一', type: '' },
		          { name: '标签二', type: 'success' },
		          { name: '标签三', type: 'info' },
		          { name: '标签四', type: 'warning' },
		          { name: '标签五', type: 'danger' }
		        ]
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

		      
		      this.changeMobsfIframe()
		 
		      window.onresize = function(){
		        this.changeMobsfIframe()
		      }
		},
		methods: {
			/**
			 * 首页工作台配置 
			 */
			openDialog(){
			　　	this.dialogVisible = true;
			},
			changeMobsfIframe(){
		        const mobsf = document.getElementById('mobsf');
		        const deviceWidth = document.body.clientWidth;
		        const deviceHeight = document.body.clientHeight;
		        mobsf.style.width = (Number(deviceWidth)-120) + 'px'; //数字是页面布局宽度差值
		        mobsf.style.height = (Number(deviceHeight)-80) + 'px'; //数字是页面布局高度差
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
			img.menuLogo{
				width: 30px;
				height: 30px;
				margin: auto 15px;
				cursor: pointer;
			}
			.el-input{
				width:276px;
				height: 36px;
				line-height: 36px;
				background-color: #eeeeee;
				border-radius: 4px;
				margin-right: 10px;
			}
			.el-tag{
				cursor: pointer;
				padding: 0 5px;
				background-color: rgba(255,255,255,0);
			    height: 40px;
			    line-height: 38px;
			    border-radius: 0;
			    border: none;
			    border-bottom: 2px solid #a0a9b5;
				img{
					width: 40px;
				}
				
			}
		}
	}
	::-webkit-scrollbar{  
		width: 1px;
    	background-color: transparent;  
}  
</style>