<template>
	<div class="userListAddAndEdit">
		<el-form :model="userForm" label-position="left" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="员工姓名" prop="nickname">
						<el-input v-model.trim="userForm.nickname"  placeholder="请输入员工姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="用户名" prop="username">
						<el-input v-model.trim="userForm.username"  placeholder="请输入用户名" :readonly="userNameReadOnly"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="角色名称" prop="roleId">
						<el-select v-model="userForm.roleId" value-key="roleId" placeholder="请选择角色状态" @change="handleRoleChange">
						    <el-option
						      v-for="item in roleList"
						      :key="item.roleId"
						      :label="item.roleName"
						      :value="item.roleId">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="23" v-if="pageType=='add'">
					<el-form-item label="密码" :prop="'password'">
						<el-input v-model="userForm.password" show-password placeholder="请输入密码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23" v-else>
					<el-form-item label="密码" :prop="'passwordEdit'">
						<el-input v-model="userForm.passwordEdit" show-password placeholder="请输入密码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="电话" prop="mobile">
						<el-input v-model="userForm.mobile" placeholder="请输入手机号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button class="cancel" @click="cancelOpt">取 消</el-button>
			<el-button v-if="pageType == 'add'" type="primary" @click="addUser('userForm')">保存</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editUser('userForm')">保存</el-button>
		</div>
	</div>
</template>

<script>
	import baseValidator from "../../common/baseValidator.js"
	export default {
		name: 'UserListAddAndEdit', //用户新增和编辑
		props:{
			userObj:{//userObj用户信息
				type: Object,
				required:true
			}
		},
		data() {
			return {
				userForm: {
					userId:'',//用户id  编辑提交时使用
					nickname:'',//员工姓名
					username: '', //用户名
					roleId: '', //角色id
					password:'',//密码
					passwordEdit:'',//编辑密码
					roleName:'',//角色名
					email:'',//邮箱
					mobile:'',//手机号
					ssex:'',//性别
					status:'1',//账号状态，默认为1  0锁定  1是正常
				},
				userNameReadOnly:false,//用户名是否只读
				roleList:[],//角色列表
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					nickname: [
						{
							required: true,
							message: '请输入员工姓名',
							trigger: 'blur'
						},
						{
							validator:baseValidator.validateName,
							trigger: 'blur'
						}
					],
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							validator:baseValidator.validateUserName,
							trigger: 'blur'
						}
					],
					roleId: [{
							required: true,
							message: '请选择角色',
							trigger: 'change'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							validator:baseValidator.validatePassword,
							trigger: 'blur'
						}
					],
					passwordEdit: [{
							required: false,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							validator:baseValidator.validateEditPassword,
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator:async (rule,value,callback)=>{//async 同步执行axios
								let newValue = value.trim();
						        if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(newValue) == false){
						            callback(new Error("邮箱无效!"));
						        }else{
						            let oReq = {
						            	name:'email',
						            	value:newValue
						            };
						            let oRes = await this.checkEmailAndPhone(oReq);//await 同步执行axios
						            if(oRes.data.status == 200 && oRes.data.data == true){
						            	callback(new Error("邮箱重复，请重新输入!"));
						            }else{
						            	callback();
						            }
						        }
						    },
					    	trigger: 'blur'
					    }
					],
					mobile: [
						{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator:async (rule,value,callback)=>{//async 同步执行axios
								let newValue = value.trim();
						        if(/^1[3456789]\d{9}$/.test(newValue) == false){
						            callback(new Error("手机号无效!"));
						        }else{
						            let oReq = {
						            	name:'mobile',
						            	value:newValue
						            };
						            let oRes = await this.checkEmailAndPhone(oReq);//await 同步执行axios
						            if(oRes.data.status == 200 && oRes.data.data == true){
						            	callback(new Error("手机号重复，请重新输入!"));
						            }else{
						            	callback();
						            }
						        }
						    },
					    	trigger: 'blur'
					    }
					]
				}
			}
		},
		created() {

		},
		mounted() {
			this.getRoleList();
			if(this.userObj.userId){
				this.pageType = 'edit';
				this.userNameReadOnly = true;
				this.setFormData();//表单赋值

			}else{
				this.userNameReadOnly = false;
				this.pageType ='add';

			}
		},
		computed: {

		},
		methods: {
			/**
			 * 验证 手机号或邮箱的唯一性
			 */
			checkEmailAndPhone(oCheckObj){
				return new Promise((resolve, reject) => {
					this.$axios.leansite({
	            		method:'get',
	                	url:this.API.leansite.checkPhoneOrEmail,
	                	params:{
	                		userId:this.userObj.userId,
							name:oCheckObj.name,//mobile/email
							value:oCheckObj.value, //对应的值
	                	}
	              	}).then(res => {
			            resolve(res);
			       	});
              	});
			},
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.userForm.userId=this.userObj.userId;
				this.userForm.nickname=this.userObj.nickname;
				this.userForm.username=this.userObj.username;
				if(this.userObj.roleId*1 != 0){
					this.userForm.roleId=this.userObj.roleId*1;
				}
				this.userForm.roleName=this.userObj.roleName;
				this.userForm.email=this.userObj.email;
				this.userForm.mobile=this.userObj.mobile;
				this.userForm.status=this.userObj.status;
			},
			/**
			 * 角色改变时
			 */
			handleRoleChange(value){
				let filtedList = this.roleList.filter(function(currentValue, index,arr){
					return currentValue.roleId == value;
				});
				this.userForm.roleName = filtedList[0].roleName;
			},
			/**
			 * 添加用户
			 * @param formName {Object} form表单名称
			 */
			addUser(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios.leansite({
		            		method:'post',
		                	url:self.API.leansite.addUsers,
		                	data:{
								nickname:self.userForm.nickname.trim(),//员工姓名
								username:self.userForm.username.trim(), //用户名
								roleId: self.userForm.roleId, //角色id
								password:self.userForm.password.trim(),//密码
								roleName:self.userForm.roleName.trim(),//角色名
								email:self.userForm.email.trim(),//邮箱
								mobile:self.userForm.mobile.trim(),//手机号
								ssex:self.userForm.ssex.trim(),//性别
								status:self.userForm.status.trim(),//账号状态，默认为1  0锁定  1是正常
		                	}
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.status == "200"){
		                    	self.$message({
						            type: 'success',
						            message: '添加用户成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("UserCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '添加用户失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
							if(err.response.data.status == 500){
		                    	self.$message({
						            type: 'error',
						            message: '添加用户失败，'+err.response.data.message
					          	});
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '请求异常，请检查网络！'
						        });
		                    }
		                })
					} else {
						return false;
					}
				});
			},
			/**
			 * 修改用户组信息
			 * @param formName {Object} form表单名称
			 */
			editUser(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios.leansite({
		            		method:'post',
		                	url:self.API.leansite.updateUser,
		                	data:{
		                		userId:self.userForm.userId,//用户id
		                		nickname:self.userForm.nickname.trim(),//员工姓名
								username:self.userForm.username.trim(), //用户名
								roleId: self.userForm.roleId, //角色id
								password:self.userForm.passwordEdit.trim(),//密码
								roleName:self.userForm.roleName.trim(),//角色名
								email:self.userForm.email.trim(),//邮箱
								mobile:self.userForm.mobile.trim(),//手机号
								ssex:self.userForm.ssex.trim(),//性别
								status:self.userForm.status.trim(),//账号状态，默认为1  0锁定  1是正常
		                	}
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.status =="200"){
		                    	self.$message({
						            type: 'success',
						            message: '修改用户信息成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("UserCallBack",true);
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '修改用户信息失败，请退出重试！'
					          	});
		                    }
		                }).catch((err) => {
							if(err.response.data.status == 500){
		                    	self.$message({
						            type: 'error',
						            message: '修改用户失败，'+err.response.data.message
					          	});
		                    }else{
					          	self.$message({
						            type: 'error',
						            message: '请求异常，请检查网络！'
						        });
		                    }
		                })
					} else {
						return false;
					}
				});
			},
			/*
			 * 取消
			 */
			cancelOpt(){
				this.resetForm();//重置表单
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("UserCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.userForm={
					userId:'',//用户id  编辑提交时使用
					nickname:'',//员工姓名
					username: '', //用户名
					roleId: '', //角色id
					password:'',//密码
					roleName:'',//角色名
					email:'',//邮箱
					mobile:'',//手机号
					ssex:'',//性别
					status:'1',//账号状态，默认为1  0锁定  1是正常
				};
			},
			getRoleList() {
			    this.$axios.leansite({
			     method: 'get',
			     url: this.API.leansite.roleListByRoleName,
			     params: {
			      'roleName':'',
			      'pageNum': 0,
			      'pageSize': 1000
			     }
			    }).then((res) => {
			     var resData = res.data;
			     if(resData.status == 200) {
			      this.roleList = resData.data.rows;
			     } else {
			      this.$message({
			       type: 'error',
			       message: '获取角色列表失败，请退出重新打开！'
			      });
			     }
			    }).catch((err) => {
			     console.log('请求异常，请检查网络!');
			    });
			},
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.userListAddAndEdit {
        border-radius: 16px;
        overflow:hidden;
		/deep/ .el-form{
			padding:0 48px 0;
			border-radius: 16px;
            overflow: hidden;
		}
		.dialog-footer{
			margin-top:15px;
			text-align: center;

			.el-button{
				width: 130px;
			}
			.el-button:first-child{
				margin-right: 70px;
				color: #FFFFFF;
                background-color: #c4d4e7;
			}
		}
		.el-select{
			width:100%;
		}
	}
</style>
