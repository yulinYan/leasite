<template>
	<div class="userListAddAndEdit">
		<el-form :model="userForm" label-position="left" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="userForm.username" minLength="3" maxLength="50" placeholder="请输入用户名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="角色名称" prop="roleId">
						<el-select v-model="userForm.roleId" placeholder="请选择角色状态" @change="handleRoleChange">
						    <el-option
						      v-for="item in roleList"
						      :key="item.value"
						      :label="item.roleName"
						      :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="密码" prop="password">
						<el-input v-model="userForm.password" minLength="6" maxLength="15" placeholder="请输入密码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="userForm.email" minLength="3" maxLength="50" placeholder="请输入邮箱"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="电话" prop="phone">
						<el-input v-model="userForm.phone" minLength="11" maxLength="11" placeholder="请输入手机号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancelOpt">取 消</el-button>
			<el-button v-if="pageType == 'add'" type="primary" @click="addUser('userForm')">保存</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editUser('userForm')">保存</el-button>
		</div>
	</div>
</template>

<script>
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
					id:'',//用户id  编辑提交时使用
					username: '', //用户名
					roleId: '', //角色id
					password:'',//密码
					roleName:'',//角色名
					email:'',//邮箱
					phone:'',//手机号
				},
				roleList:[//用户组状态
					{id:"1010",roleName:"超级管理员"},
					{id:"1011",roleName:"主管"},
					{id:"1012",roleName:"普通用户"},
				],
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 50,
							message: '用户名 3-50 个字符',
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
							min: 6,
							max: 15,
							message: '密码 6-15 个字符',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 50,
							message: '邮箱3-50 个字符',
							trigger: 'blur'
						}
					],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '手机号3-50 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {

		},
		mounted() {
			if(this.userObj.id){
				this.pageType = 'edit';
				this.setFormData();//表单赋值
				
			}else{
				this.pageType ='add';
				
			}
		},
		computed: {
			
		},
		methods: {
			/**
			 * 表单赋值
			 */
			setFormData(){
				this.userForm.id=this.userObj.id;
				this.userForm.username=this.userObj.username;
				this.userForm.password=this.userObj.password;
				this.userForm.roleId=this.userObj.roleId;
				this.userForm.roleName=this.userObj.roleName;
				this.userForm.email=this.userObj.email;
				this.userForm.phone=this.userObj.phone;
			},
			/**
			 * 角色改变时 
			 */
			handleRoleChange(value){
				let filtedList = this.roleList.filter(function(currentValue, index,arr){
					return currentValue.id == value;
				});
				this.userForm.roleName = filtedList[0].roleName;
				console.log(filtedList);
			},
			/**
			 * 添加用户
			 * @param formName {Object} form表单名称
			 */
			addUser(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		            		method:'post',
		                	url:self.API.addUsers, 
		                	data:self.userForm
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
		                	self.$message({
					            type: 'error',
					            message: '请求异常，请检查网络！'
					        });  
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
		                self.$axios({
		            		method:'post',
		                	url:self.API.updateUsers, 
		                	data:self.userForm
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
		                	self.$message({
					            type: 'error',
					            message: '请求异常，请检查网络！'
					        });  
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
				this.$refs['userForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.userListAddAndEdit {
		.el-form{
			padding:0 48px 0;
		}
		.dialog-footer{
			margin-top:15px;
			text-align: center;
			.el-button{
				width: 130px;
			}
			.el-button:first-child{
				margin-right: 70px;
			}
		}
		.el-select{
			width:100%;
		}
	}
</style>
