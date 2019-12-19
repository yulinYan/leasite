<template>
	<div class="roleListAdd">
		<el-form :model="roleForm" label-position="left" :rules="rules" ref="roleForm" label-width="100px" class="demo-roleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="23">
					<el-form-item label="角色名称" prop="roleName">
						<el-input v-model="roleForm.roleName" minLength="2" maxLength="50" placeholder="请输入角色名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="角色描述" prop="remark">
						<el-input v-model="roleForm.remark" minLength="2" maxLength="50" placeholder="请输入角色描述"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancelOpt">取 消</el-button>
			<el-button v-if="pageType == 'add'" type="primary" @click="addRole('roleForm')">保存</el-button>
			<el-button v-else-if="pageType == 'edit'" type="primary" @click="editRole('roleForm')">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RoleListAdd', //新增角色
		props:{
			roleObj:{//roleObj用户信息
				type: Object,
				required:true
			}
		},
		data() {
			return {
				roleForm: {
					id:'',//角色id  编辑提交时使用
					remark: '', //角色id
					roleName:'',//角色名
					userIds:'张三,里斯,王五',//用户id 以逗号分隔
				},
				pageType:'add',//页面类型 pageType=add 新增/pageType=edit 修改
				rules: {
					rolename: [{
							required: true,
							message: '请输入角色名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 50,
							message: '用户名 3-50 个字符',
							trigger: 'blur'
						}
					],
					remark: [{
							required: true,
							message: '请输入请输入角色描述',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {

		},
		mounted() {
			if(this.roleObj.id){
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
				this.roleForm.id=this.roleObj.id;
				this.roleForm.roleName=this.roleObj.roleName;
				this.roleForm.remark=this.roleObj.remark;
				this.roleForm.userIds=this.roleObj.userIds;
			},
			/**
			 * 添加用户
			 * @param formName {Object} form表单名称
			 */
			addRole(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		            		method:'post',
		                	url:self.API.addRole, 
		                	data:self.roleForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.status == "200"){
		                    	self.$message({
						            type: 'success',
						            message: '添加用户成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("RoleCallBack",true);
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
			editRole(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
		                self.$axios({
		            		method:'post',
		                	url:self.API.updateRoles, 
		                	data:self.roleForm
		                }).then((res) => {
		                    var resData = res.data;
		                    if(resData.status =="200"){
		                    	self.$message({
						            type: 'success',
						            message: '修改用户信息成功!'
						        });
						        self.resetForm();//重置表单
						        //调用父组件方法--isRefresh=true需要刷新父组件的数据
								self.$emit("RoleCallBack",true);
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
				this.$emit("RoleCallBack",false);
			},
			/*
			 * 重置表单
			 */
			resetForm(){
				this.pageType ='add';
				this.$refs['roleForm'].resetFields();
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.roleListAdd {
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
