<template>
    <div class="login-container">
        <div class="ms-login">
        	<img src="../assets/img/logo.png" alt="logo" />
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<el-form-item label="" prop="usersName" >
					<el-input v-model="ruleForm.usersName" id="name" placeholder="用户名/邮箱"></el-input>
				</el-form-item>
				<el-form-item label="" prop="password">
					<el-input v-model="ruleForm.password" type="password" placeholder="密码"></el-input>
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
                    'usersName': 'ykzhang',//登录账户
					'password': '1234qwer',//密码
					'autoLogin':true
                },
                rules: {
                    usersName: [
                       { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
					],
                }
            }
        },
        created(){
        	this.keyupEnter();
        },
        methods: {
        	 submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } 
                    this.login();
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
             * 登录
             */
            login(){
            	let self = this;
            	this.$axios({
					url: this.API.login,//不需要再添加ip和端口
					method: 'post',//提交方式：get和post，同 params 和 data配合使用
					data: {
						username: this.ruleForm.usersName.trim(),
						password: this.ruleForm.password.trim()
					}
				}).then((res) => {
					var resData = res.data;
					let resCode = parseInt(resData.status);
					if(resCode == 200){
						this.$store.commit('saveStoreByName',{name:this.API.constObj.loginInfo,storeName:'user',storeInfo:resData.data.user});
						this.$store.commit('saveStoreByName',{name:this.API.constObj.token,storeName:'token',storeInfo:resData.data.token});
						this.$store.commit('saveStoreByName',{name:this.API.constObj.operationAuthority,storeName:'operationAuthority',storeInfo:resData.data.permissions});
						this.$store.commit('saveStoreByName',{name:this.API.constObj.roles,storeName:'roles',storeInfo:resData.data.roles});
						if (self.$route.query.redirect) {
						  	self.$router.push(self.$route.query.redirect);  // 登录过期重新登录
						} else {
						  	self.$router.push('/index');  // 正常登录
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