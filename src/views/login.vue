<template>
    <div class="login-container">
        <div class="ms-login">
        	<img src="../assets/img/logo.png" alt="logo" />
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<el-form-item label="" prop="usersName" >
					<el-input prefix-icon="iconfont leansite-user" v-model="ruleForm.usersName" id="name" placeholder="用户名/邮箱"></el-input>
				</el-form-item>
				<el-form-item label="" prop="loginPassword">
					<el-input prefix-icon="iconfont leansite-mima" v-model="ruleForm.loginPassword" type="password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item label="" prop="type">
					<el-checkbox v-model="ruleForm.autoLogin">自动登录</el-checkbox>
				</el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
          	</el-form>
        </div>
    </div>
</template>

<script>
	import bus from '../common/bus.js';
    export default {
    	name:"login",//登录
    	components: {
		},
        data: function(){
        	let self = this;
            return {
                ruleForm: {
                    'usersName': '',//登录账户
					'loginPassword': '',//密码
					'autoLogin':false
                },
                rules: {
                    usersName: [
                       { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    loginPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
					],
                }
            }
        },
        created(){
        	this.autoLogin();
        	this.keyupEnter();
        },
        methods: {
        	/**
        	  * 登录 
        	  */
        	 submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } 
                    let oLogin={
                    	sUsername:this.ruleForm.usersName.trim(),
                    	sPassword:this.ruleForm.loginPassword.trim()
                    };
                    this.login(oLogin);
                });
           },
            /**
             * 回车--登录
             */
			keyupEnter(){
                document.onkeydown = e =>{
                    let body = document.getElementsByTagName('body')[0];
                    if (e.keyCode === 13) {
                        this.submitForm("ruleForm");
                    }
                }
            },
            /**
             * 判断是否自动登录
             */
            autoLogin(isAutoLogin){
            	let userObj = this.$store.state.loginUser;
            	if(userObj != ''){
            		this.ruleForm.autoLogin = true;
            		let oLogin={
                    	sUsername:userObj.user,
                    	sPassword:this.commonFun.uncompileStr(userObj.psw)
                    };
                    setTimeout(()=>{
                    	this.login(oLogin);	
                    },2000);
            	}
            },
            /**
             * 登录请求
             */
            login(loginObj){
            	let self = this;
				this.$axios.leansite({
					url: this.API.leansite.login,//不需要再添加ip和端口
					method: 'post',//提交方式：get和post，同 params 和 data配合使用
					data: {
						'username': loginObj.sUsername,
						'password': loginObj.sPassword
					}
				}).then((res) => {
					var resData = res.data;
					let resCode = parseInt(resData.status);
					if(resCode == 200){
						if(self.ruleForm.autoLogin){
							this.$store.commit('saveStoreByNameLocal',{name:this.API.leansite.constObj.loginUser,storeName:'user',storeInfo:{'user':loginObj.sUsername,'psw':self.commonFun.compileStr(loginObj.sPassword)}});	
						}else{
							this.$store.commit('removeStoreByNameLocal',{name:this.API.leansite.constObj.loginUser,storeName:'loginUser'});
						}
						this.$store.commit('saveStoreByName',{name:this.API.leansite.constObj.loginInfo,storeName:'user',storeInfo:resData.data.user});
						this.$store.commit('saveStoreByName',{name:this.API.leansite.constObj.token,storeName:'token',storeInfo:resData.data.token});
						this.$store.commit('saveStoreByName',{name:this.API.leansite.constObj.operationAuthority,storeName:'operationAuthority',storeInfo:resData.data.permissions});
						this.$store.commit('saveStoreByName',{name:this.API.leansite.constObj.roles,storeName:'roles',storeInfo:resData.data.roles});
						if (self.$route.query.redirect) {
						  	self.$router.push(self.$route.query.redirect);  // 登录过期重新登录
						} else {
						  	self.$router.push({name:'index'});  // 正常登录
						}
					}else{
						self.$alert(resData.message);	
					}	
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
	.login-container{
		display: -ms-flexbox;
	    display: flex;
	    -ms-flex-direction: column;
	    flex-direction: column;
	    min-height: 100%;
	    background-image: url('../assets/img/login_bg.png');
	    background-repeat: no-repeat;
	    background-position: top;
	    background-size: cover;
        .ms-login{
	        width: 470px;
		    height: 450px;
		    background-color: hsla(0,0%,100%,.9);
		    color: #303030;
		    -webkit-box-shadow: 0 1px 20px 0 rgba(0,0,0,.18);
		    box-shadow: 0 1px 20px 0 rgba(0,0,0,.18);
		    position: absolute;
		    top: 56%;
		    right: 100px;
		    -webkit-transform: translateY(-50%);
		    transform: translateY(-50%);
		    padding: 20px;
		    -webkit-box-sizing: border-box;
		    box-sizing: border-box;
		    text-align:center;
		    img{
		    	margin:20px auto 15px;
		    }
	        .el-form{
	        	width: 368px;
	        	font-size: 16px !important;
	        	margin: 0 auto;
	        	text-align: left;
	        	.el-form-item{
	        		margin-bottom: 25px;
	        	}
	        	.login-btn{
				    width: 100%;
				    color: #C0C4CC;
				    text-align: center;
				    .el-button{
				    	width: 100%;
				    }
		        }
	        }
        }
    }
</style>