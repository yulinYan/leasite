<template>
    <div class="wrapper" @click="handleGlobalClick">
        <v-head v-if=isMount></v-head>
        <v-sidebar  v-if=isMount></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <Shortcuts></Shortcuts>
            <div class="content">
            	<Breadcrumb class="breadcrumb"></Breadcrumb>
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
        <WelcomeDialog></WelcomeDialog>
        <IntelligentRobot ></IntelligentRobot>
    </div>
</template>

<script>
    import vHead from '../components/Header.vue';
    import vSidebar from '../components/Sidebar.vue';
    import vTags from '../components/Tags.vue';
    import bus from '../common/bus.js';
    import Breadcrumb from '../components/Breadcrumb.vue'
    import Shortcuts from './indexModular/Shortcuts.vue';
    import WelcomeDialog from './indexModular/WelcomeDialog.vue';
    import IntelligentRobot from './indexModular/IntelligentRobot.vue';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                isMount:false,//是否挂载组件
                isShowWelcome:true,//是否显示欢迎动画
                isShowRobot:false,//是否显示机器
                intervalTimer: undefined,
                initTime:new Date().getTime()
            }
        },
        components:{
            vHead, vSidebar,Breadcrumb,Shortcuts,WelcomeDialog,IntelligentRobot
        },
        created(){
        	//this.startTimer();
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
			
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
		mounted(){
        	if(this.$store.state.user && !this.$store.state.user.token){
        		this.isMount = false;
        		this.commonFun.againLogin(true);
        		return;
        	}else{
        		this.isMount = true;
        	}
		},
		destroyed(){
			if(this.intervalTimer){
				this.intervalTimer = clearInterval(this.intervalTimer);	
			}
			console.log("销毁了that.intervalTimer="+this.intervalTimer);
		},
		methods:{
			/**
			 * 监听点击事件
			 */
			handleGlobalClick(){
				this.initTime = new Date().getTime();
				console.log(this.initTime+"  我点击了");
			},
			/**
			 * heade组件调用timer
			 * 页面固定时间无操作时返回登录
			 */
		    startTimer() {
		      	let that = this;
		      	let timer =this.API.constObj.autoLogoutTime;//无操作自动退出时间 默认10分钟
		      	let storeData = that.$store.state.settingsList;
		      	if(storeData.length > 0){
		      		for(let i=0;i<storeData.length;i++){
		      			if(storeData[i].code == that.API.constObj.systemConfig[8].code){
		      				timer = storeData[i].value*1;
		      				break;
		      			}
		      		}
		      	} 
		      	this.intervalTimer = setInterval(()=> {
		        	let currTime = new Date().getTime();
		        	if((currTime - that.initTime) >= timer*60*1000 && that.intervalTimer){
		        		let msgText = "您已"+timer+"分钟没有任何操作，遵循安全保密原则系统已自动退出!";
		        		that.intervalTimer = clearInterval(that.intervalTimer);
			        	that.commonFun.againLogin();
				        that.$message({
				          message: msgText,
				          type: 'warning',
				          duration:10000
				        });
		        	}
		        },timer*60*1000);
		    }
		}
    }
</script>
<style lang="scss" scoped>
	.wrapper{
		.v-head{
			height: 40px;
			font-size: 16px;		
		}
		.content-box{
			.content{
				width: 100%;
				/*height: auto;*/
				overflow-x: auto;
				padding: 10px;
				overflow-y: hidden;
				.el-container{
					min-width: 1126px;
				
					/*min-height: 698px;*/
				}
				.container{
					padding: 10px 30px 0;
				}
				.app-breadcrumb.el-breadcrumb{
					display: block;
					background-color: #fff;
					font-size: 17px;
				    height: 46px;
				    line-height: 46px;
				    padding: 0 0 0 20px;
				    margin-left: 0;
				    border-radius: 5px 5px 0 0;
				}
				.app-breadcrumb.el-breadcrumb .no-redirect{
				    font-weight: bold;
				}
			}
		}
	}
	/deep/ .el-dialog__body{
		padding: 20px 0 20px !important;
	}
</style>