<template>
	<div class="box">
		<div class="RoleListEdit">
			<!-- 表头-->
			<div class="model">
				<div style="width: 157px">模块1</div>
				<div style="width: 174px">模块2</div>
				<div style="width: calc(100% - 310px)">模块3</div>
			</div>
			<!--表身-->
			<div v-for="(item,index) in menuList" :key="index" class="models">
				<!--   模块1-->
				<div class="model_1" style="width: 154px;" @click="oneAllCheck(item)">
					<el-checkbox class="model1_checkbox"  v-model="item.checked">{{item.title}}</el-checkbox>
				</div>
				<!-- 右边模块2 和模块3-->
				<div v-if="item.children && item.children.length > 0">
					<div class="model_2" v-for="(item2,index2) in item.children" :key="index2">
						<!--   模块2-->
						<div class="model_2_2" style="width: 175px" @click="TwoAllCheck(item,item2)">
							<el-checkbox class="model2_checkbox" @change="model_2_selectAll(item,item2)" v-model="item2.checked">{{item2.title}}</el-checkbox>
						</div>
						<!--  模块3-->
						<div class="model_2_3" style="width: calc(100% - 154px)" v-if="item2.children && item2.children.length > 0">
							<el-checkbox class="model3_checkbox" @change="model_3_select(item,item2,item3)" v-model="item3.checked" v-for="(item3,index3) in item2.children" :key="index3">{{item3.title}}</el-checkbox>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--按钮-->
		<div class="btn">
			<el-button class="cancelBtn" @click="cancelOpt">取消</el-button>
			<el-button type="primary" @click="save">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RoleListEdit", //分配角色权限
		props: {
			roleObj: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				"menuList": [],
				"ApplicationEntry": [],
				"centerDialogVisible": true,
				"menuIds": [],
				"appParentId": '' //获取应用入口列表的id
			}
		},
		beforeMount() {
			this.getAuthData();
		},
		methods: {
			/**
			 * 二级全选
			 */
			model_2_selectAll(item, item2) {
				if(item2.checked) {
					if(!item.checked) {
						item.checked = true;
					}
				}
			},
			/**
			 * 三级单选改变状态
			 */
			model_3_select(item, item2, item3) {
				if(item3.checked) {
					if(!item2.checked) {
						item2.checked = true;
					}
					if(!item.checked) {
						item.checked = true;
					}
				}
			},
			/**
			 *点击一级模块 后面都被选中 
			 */
			oneAllCheck(item){
				
					if(item.children){
					item.children.forEach((twoChildren)=>{
						twoChildren.checked=!item.checked;
						if(twoChildren.children){
							twoChildren.children.forEach((threeChildren)=>{
								threeChildren.checked=twoChildren.checked
							})
						}
					})
				}
			},
			/**
			 *点击二级目录三级被全选 
			 */
			TwoAllCheck(item,item2){
				
				if(item2.children){
					item2.children.forEach((threeChildren)=>{
						threeChildren.checked=!item2.checked;
					})
				}
				
			},
			/**
			 * 获取角色权限列表数据
			 */
			getAuthData() {
				this.$axios.leansite({
					method: 'get',
					url: this.API.leansite.getMenuByRoleId,
					params: {
						'roleId': this.roleObj.roleId * 1
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.menuList = resData.data.rows.children;
					} else {
						this.$message({
							type: 'error',
							message: '获取权限信息失败，请退出重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 保存所选状态
			 */
			save() {
				this.menuIds = [];
				this.ApplicationEntry = [];
				this.appParentId = '';
				this.foreachMenu(this.menuList);
				this.$axios.leansite({
					method: 'POST',
					url: this.API.leansite.saveMenuState,
					params: {
						'roleId': this.roleObj.roleId * 1,
						'menuIds': this.menuIds.toString(),
						'appIds': this.ApplicationEntry.toString()
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.$message({
							type: 'success',
							message: '分配权限成功！'
						});
					} else {
						this.$message({
							type: 'error',
							message: '分配权限失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})

				this.$emit("RoleAuthCallBack", false);
			},
			/**
			 * 获取所有被选中的权限的id
			 */
			foreachMenu(childMenu) {
				let self = this;
				childMenu.forEach(function(item, index) {
					if(item.title == "获取应用入口列表") {
						if(item.checked) {
							self.menuIds.push(item.id);
						}
						self.appParentId = item.id;
					} else if(self.appParentId == item.parentId && item.checked) {
						self.ApplicationEntry.push(item.id);
					} else if(item.title != "获取应用入口列表" && item.checked) {
						self.menuIds.push(item.id);
					}
					if(item.children && item.children.length > 0) {
						self.foreachMenu(item.children);
					}
				})
			},
			/**
			 * 取消
			 */
			cancelOpt() {
				// //调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("RoleAuthCallBack", false);
			},
		}
	};
</script>
<style lang="scss" scoped type="text/css">
	.box {
		background-color: #ffffff;
		border-radius: 8px!important;
		margin-top: -30px;
		padding: 0;
		overflow: hidden;
		.RoleListEdit {
			background-color: #ffffff;
			margin: 16px auto;
			border: solid 1px #d2d5dc;
			border-radius: 8px!important;
			overflow: hidden;
			& :last-child {
				border-bottom: none!important;
			}
			.model {
				display: flex;
				align-items: center;
				& :last-child {
					border-bottom: 1px solid #d2d5dc!important;
					border-right: none;
				}
				div {
					text-align: center;
					border-right: 1px solid #d2d5dc;
					border-bottom: 1px solid #d2d5dc;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					color: #101010;
				}
			}
			.models {
				height: 100%;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #d2d5dc;
				div {
					text-align: center;
					width: calc(100% - 154px);
				}
				.model_1 {
					border-right: none!important;
					.el-checkbox {
						padding: 10px;
					}
				}
				.model_2 {
					display: flex;
					align-items: center;
					border-bottom: 1px solid #d2d5dc;
					border-left: 1px solid #d2d5dc;
					width: 100%;
					.el-checkbox {
						margin: 10px 30px 10px;
					}
				}
				.model_2_2 {
					display: flex;
					justify-content: left;
				}
				.model_2_3 {
					display: flex;
					flex-wrap: wrap;
					justify-content: left;
					text-align: center;
					border-left: 1px solid #d2d5dc;
					.el-checkbox {
						margin: 10px 30px 0;
						padding: 0 0 10px;
						.el-checkbox__label {
							margin-top: 10px;
							margin: 0;
							padding: 0;
							float: right;
						}
						.el-checkbox__inner {
							float: left;
							margin: 0;
							padding: 0;
						}
					}
					.el-checkbox__label {
						margin-top: 10px;
						text-align: left;
					}
				}
				.el-checkbox__inner {
					float: left;
				}
				/deep/ .el-checkbox__label {
					max-width: 85px;
					white-space: nowrap;
					float: right;
					font-size: 14px;
					color: #303030;
					margin-top: -1px;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.btn {
			width: 200px;
			margin: 0 auto;
			text-align: center;
			.cancelBtn {
				background-color: #c4d4e7!important;
			}
		}
	}
</style>