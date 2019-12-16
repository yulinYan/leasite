<template>
	<div class="header">
		<div class="logo">
			<!--<img v-if="logoImageUrl.length > 0" :src="logoImageUrl" alt="系统logo">-->
			<!--<img v-else src="../assets/img/logo-bg-transparent.png" alt="系统logo">-->
			<img  src="../assets/img/logo-bg-transparent.png" alt="系统logo">
			<span class="systemName">Leansite Paas 2.0</span>
		</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<!-- 大数据 -->
				<!--<div class="btn-bigdata" @click="bigdataFuc">
					<el-tooltip effect="dark" content="大数据" placement="bottom">
						<i class="el-icon-tickets"></i>
					</el-tooltip>
				</div>-->
				<!-- 消息中心 -->
				<div v-if='ShowNews' class="btn-bell" @click="newsFuc">
					<el-tooltip effect="dark" :content="message?`您有${message}条未读消息`:`消息中心`" placement="bottom">
						<i class="el-icon-bell"></i>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message > 0"></span>
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link" style="font-family:'microsoft yahei';color: #D7E7FC;">
                        {{username}} 
                        <i class="el-icon-caret-bottom"></i>
                    </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
						<el-dropdown-item divided command="personalMenu">个人菜单</el-dropdown-item>
						<el-dropdown-item divided command="pictureUpload">头像上传</el-dropdown-item>
						<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- 用户头像 -->
				<div class="user-avator">
					<img v-if="imgUrl.length > 0" :src="imgUrl" alt="头像">
					<img v-else src="../assets/img/main-logo.png" alt="头像">
				</div>
			</div>
		</div>
		
		<!-- 修改密码弹出框 -->
		<el-dialog title="修改密码" v-dialogDrag width="550px" :visible.sync="changePsw" class="xgmm">
			<el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm" size="small"> 
				<el-row :gutter="15">
					<el-col :span="23">
						<el-form-item label="原密码" prop="oldPassword">
							<el-input placeholder="请输入原密码" type="password" v-model="userForm.oldPassword"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="23">
						<el-form-item label="新密码" prop="newPassword">
							<el-input placeholder="请输入新密码（如：A12345678b 或  @ABCDEFG12）" minLength="10" maxLength="18" type="password" v-model="userForm.newPassword"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="23">
						<el-form-item label="确认新密码" prop="confirmPassword">
							<el-input placeholder="请再次输入新密码" type="password" minLength="10" maxLength="18" v-model="userForm.confirmPassword"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" align="center">
				<el-button type="primary" @click="save">保存</el-button>
				<el-button @click="cancelSubmit">取消</el-button>
			</div>
		</el-dialog>
		
		<!--消息弹窗-->
		<el-dialog title="消息列表" v-dialogDrag width="60%" :visible.sync="news_show" v-if='news_show' :close-on-click-modal="false" append-to-body>
			<News @newsCall='newsCall'></News>
		</el-dialog>
		
		<!--个人菜单弹框-->
		<el-dialog title="个人菜单" v-dialogDrag width="685px" :visible.sync="myMenu" v-if='myMenu' :close-on-click-modal="false" append-to-body>
			<MyMenu></MyMenu>
		</el-dialog>
		
		<!--头像上传弹框-->
		<el-dialog title="头像上传" v-dialogDrag width="450px" height='400px' :visible.sync="picUpload" v-if='picUpload' :close-on-click-modal="false" append-to-body>
			<picUpload @picUploadCall='picUploadCall'></picUpload>
		</el-dialog>
	</div>
</template>
<script>
	import bus from '../common/bus.js';
	import News from '../views/news/News.vue'; //消息
	import MyMenu from '../views/indexModular/myMenu.vue'; //个人菜单
	import picUpload from '../views/indexModular/picUpload.vue'; //头像上传
	export default {
		name: 'Header', //头部组件
		components: {
			News,//消息
			MyMenu,//个人菜单
			picUpload,//头像上传
		},
		data() {
			var regex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{10,18}$');
			var checkOldPass = (rule, value, callback) => {
				if(value.trim().length == 0) {
					callback(new Error('请输入原密码'));
				}else {
					callback();
				}
			};
			var checkNewPass = (rule, value, callback) => {
				if(value.trim().length == 0) {
					callback(new Error('请输入新密码'));
				} else if(!regex.test(value.trim())) {
					callback(new Error('密码必须是数字、大、小写字母、特殊字符四选三组成的10~18位字符'));
				} else {
					callback();
				}
			};
			var validateCheckPass = (rule, value, callback) => {
				if(value.length == 0) {
					callback(new Error('请再次输入新密码'));
				} else if(!regex.test(value.trim())) {
					callback(new Error('密码必须是数字、大、小写字母、特殊字符四选三组成的10~18位字符'));
				} else if(value !== this.userForm.newPassword) {
					callback(new Error('两次输入的新密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ShowNews:true,//是否展示消息图标
				intervalTimer:'',//消息定时器
				news_show: false, //消息弹框是否显示
				userForm: {
					oldPassword: '', //原密码
					newPassword: '', //新密码
					confirmPassword: '', //确认新密码
				},
				collapse: true,
				fullscreen: false,
				name: '默认用户名',
				message: 0,
				userInfo: {}, //用户
				changePsw: false, //修改密码显示框
				myMenu:false,//个人菜单显示框
				picUpload:false,//头像上传显示框
				showRedDot:false,//是否显示红点
				rules: {
					oldPassword: [{
							required: true,
							validator: checkOldPass,
							trigger: 'blur'
						}
					],
					newPassword: [{
							required: true,
							validator: checkNewPass,
							trigger: 'blur'
						}
					],
					confirmPassword: [{
						required: true,
						validator: validateCheckPass,
						trigger: 'blur'
					}]
				},
				imgUrl:'',//头像路径
				logoImageUrl:'',//logo路径
				// bigdata: false, //大数据
			}
		},
		created(){
			this.getLogo();
			this.getHeader();
			this.isReloadLogo();
			this.findSystemSettingsList();
			this.getToDoList();
			this.intervalTimer=setInterval(()=>{
				this.getToDoList();
			}, this.API.constObj.newsTimer)
			this.isShowNews();
			this.monitorNewsShow();
		},
		computed: {
			username() {
				this.userInfo = this.$store.state.user;
				if(this.userInfo) {
					return this.userInfo.cn ? this.userInfo.cn : this.name;
				} else {
					this.$router.push({
						path: '/login'
					});
					return "";
				}
			}
		},
		methods: {
			/**
			 * SystemLogoSetting界面触发该方法，重新获取logo
			 */
			isReloadLogo(){
				bus.$on('header-reload-logo', () => { 
					this.getLogo();
				});
			},
			/**
			 * 监听消息框是否显示
			 */
			monitorNewsShow(){
				bus.$on('header-reload-news', () => { 
					this.news_show = true;
				});
			},
			/**
			 * SystemLogoSetting界面触发该方法，重新获取logo
			 */
			isShowNews(){
				bus.$on('news-show', () => { 
					this.ShowNews=false;
					//清除消息计时
					clearInterval(this.intervalTimer);

				});
			},
			 
            /**
             * 获取logo
             */
            getLogo(){
                this.$axios({
                    loading:{
                        isShow:false,
                    },
                    method: 'get',
                    url: this.API.getSystemLogo
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1" && resData.data.imagefile) {
                        this.logoImageUrl = resData.data.imagefile;
                    }
                }).catch(function(err) {
                    console.log("连接错误" + err);
                })
			},	
			// 请求参数配置列表
			findSystemSettingsList(){//系统参数配置列表
				let self= this;
				self.$axios({
					 loading:{
              		 	isShow:true//是否显示loading遮罩层
					 },
					method: 'get',
					url: self.API.findSystemSettingsList,
					params: {
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let aAllData = resData.data;
						let storeObject = {
							name:self.API.constObj.settingsList,
							storeInfo:aAllData
            			};
						this.$store.commit('saveStoreByName',storeObject);
						this.$parent.startTimer();//调用home界面startTimer
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},		
			getHeader(){//获取头像
				this.$axios({
					loading:{
            			isShow:false,
            		},
					method: 'get',
					url: this.API.lookHeadPortrait
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(resData.data.pic && resData.data.pic.length > 0){
							this.imgUrl=resData.data.pic;	
						}
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			newsFuc() { //消息
				this.news_show = true;
				
			},
			newsCall(total,count){//消息回调
				this.message=count;
			},
			getToDoList() {//消息
				this.$axios({
					loading:{
            			isShow:false,
            		},
					method: 'get',
					url: this.API.findmessageReminderPage,
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.message= resData.data.total;
						if(resData.data.list.length > 0 && !resData.data.list[0].isread){
							bus.$emit('robotNews-tips');
							let count = 0;
							resData.data.list.forEach(item => {
								if(item.isread != true){
									count++;
								}
							})
							this.message=count;
						}
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			// 用户名下拉菜单选择事件
			handleCommand(command) {
				if(command == 'loginout') {
					this.existLogin();
				} else if(command == 'changePassword') {
					this.changePsw = true;
				} else if(command == 'personalMenu'){
					this.myMenu = true;
				} else if(command == 'pictureUpload'){
					this.picUpload=true;
				}
			},
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse;
				bus.$emit('collapse', this.collapse);
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if(this.fullscreen) {
					if(document.exitFullscreen) {
						document.exitFullscreen();
					} else if(document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if(document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if(document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			},
			/**
			 * 点击 修改密码
			 */
			save() {
				this.$refs["userForm"].validate((valid) => {
					if(valid) {
						this.changePswFromNet();
					} else {
						return false;
					}
				});
			},
			/**
			 * 取消 
			 */
			cancelSubmit() {
				this.$refs["userForm"].resetFields();
				this.changePsw = false;
			},
			/**
			 *请求服务器修改密码 
			 */
			changePswFromNet() {
				this.$axios({
               		loading:{
            			isShow:false,
            			target:'.xgmm'
            		},
					method: 'post',
					url: this.API.updatePassWord,
					data: {
						'password': this.$md5(this.userForm.oldPassword),
						'passwordNew': this.$md5(this.userForm.newPassword)
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '修改密码成功，请重新登录!'
						});
						this.cancelSubmit();
						//清除消息计时
						clearInterval(this.intervalTimer);
						//清除token信息并跳转到登录页面
						this.commonFun.againLogin(false);
						
					} else if(resData.code == "6") {
						this.$message({
							type: 'error',
							message: '原密码错误，请检查！'
						});
					} else {
						this.$message({
							type: 'error',
							message: '修改密码失败，请检查密码！'
						});
					}
				}).catch((err) => {
					console.log("连接错误" + err);
				})
			},
			/**
			 * 退出登录 
			 */
			existLogin() {
				this.$axios({
					loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.loginOut
				}).then((res) => {
					//清除token信息并跳转到登录页面
					this.commonFun.againLogin(false);
				});
				//清除消息计时
				clearInterval(this.intervalTimer);
			},
			picUploadCall(isRefresh){//头像上传回调
				if(isRefresh){
						this.picUpload=false;
						this.getHeader();
				}
			},
			// 大数据
			bigdataFuc(){
            	this.$router.push({
					path: '/headerBigData'
				});
            },
				
		},
		mounted() {
			if(document.body.clientWidth < 1500) {
				this.collapseChage();
			}
		},
		destroyed(){
			//清除消息计时
			clearInterval(this.intervalTimer);
		}
	}
</script>
<style lang="scss" type="text/css" scoped>
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
		background-color: #4488E4;
		background-image: url('../assets/img/header_bg.png');
		background-size: cover;
		.el-dialog {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: 0 !important;
			transform: translate(-50%, -50%);
			max-height: calc(100% - 30px);
			max-width: calc(100% - 30px);
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.el-dialog__body {
				overflow: auto;
			}
		}
		.xgmm .el-dialog__body {
			padding: 15px 20px 5px 20px;
		}
		.xgmm .el-input--prefix {
			margin-bottom: 16px;
		}
		.xgmm .el-input__prefix {
			line-height: 40px;
		}
		.xgmm .el-input__prefix i {
			font-size: 18px;
		}
		.collapse-btn {
			float: left;
			padding: 0 21px;
			cursor: pointer;
			line-height: 70px;
		}
		.logo {
			float: left;
			max-width: 50%;
			min-width: 310px;
			overflow: hidden;
			height: 70px;
			line-height: 70px;
			img {
				margin-left: 18px;
				max-width: 410px;
				min-width: 45px;
				height: 45px;
				width: auto;
			}
			.systemName{
				font-family:PingFang-SC-Bold;
				font-size:22px;
				color: #FFFFFF;
				margin-left: 8px;
				font-weight: bold;
				vertical-align: middle;
			}
		}
		.header-right {
			float: right;
			padding-right: 50px;
			.header-user-con {
				display: flex;
				height: 70px;
				align-items: center;
				.btn-fullscreen {
					transform: rotate(45deg);
					margin-right: 5px;
					font-size: 24px;
					position: relative;
					width: 30px;
					height: 30px;
					text-align: center;
					border-radius: 15px;
					cursor: pointer;
				}
				.btn-bigdata {
					margin-right: 5px;
					font-size: 24px;
					position: relative;
					width: 30px;
					height: 30px;
					text-align: center;
					border-radius: 15px;
					cursor: pointer;
				}
				.btn-bell {
					position: relative;
					width: 30px;
					height: 30px;
					text-align: center;
					border-radius: 15px;
					cursor: pointer;
					font-size: 24px;
					.el-icon-bell {
						color: #fff;
					}
					.btn-bell-badge {
						position: absolute;
						right: 0;
						top: -2px;
						width: 8px;
						height: 8px;
						border-radius: 4px;
						background: #f56c6c;
						color: #fff;
					}
				}
				 .btn-bigdata{
				 	position: relative;
				 	width: 30px;
				 	height: 30px;
				 	text-align: center;
				 	border-radius: 15px;
				 	cursor: pointer;
				 	.el-icon-tickets{
				 		font-size: 20px;
				 	}
				 }
				.user-avator {
					margin-left: 20px;
					img {
						display: block;
						width: 40px;
						height: 40px;
						border-radius: 50%;
						border: 1px solid #fff;
					}
				}
				.user-name {
					margin-left: 10px;
					.el-dropdown-link {
						color: #fff;
						cursor: pointer;
					}
					.el-dropdown-menu__item {
						text-align: center;
					}
				}
			}
		}
	}
	/deep/ .el-dialog__body{
		padding: 20px 0 20px !important;
	}
</style>