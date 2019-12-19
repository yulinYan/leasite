<template>
    <div class="userList">
        <el-header>
            <el-row>
			  <el-col :span="8" class="leftHeader">
			  	<span>用户管理</span>
			  </el-col>
			  <el-col :span="16" class="rightHeader">
			  	<el-button type="text" icon="el-icon-plus" class="addUser" @click="handleAddUser">新增用户</el-button><el-button type="text" icon="el-icon-delete" class="batchDel" @click="datchDel">批量删除</el-button><el-input
			  		style="width:200px;"
				   placeholder="输入姓名或用户名搜索"
				   suffix-icon="el-icon-search"
				   v-model="searchText"
				   @keyup.enter.native="searchEnterFun">
				</el-input>
			  </el-col>
			</el-row>
        </el-header>
        <div class="container">
            <el-table stripe :data="tableData" class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="员工姓名" align="center" width="120"></el-table-column>
                <el-table-column prop="username" label="用户" align="center" width="120"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center" width="150"></el-table-column>
                <el-table-column prop="phone" label="电话"  align="center" width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center" min-width="200"></el-table-column>
                <el-table-column prop="lastLoginTime" label="最后登录时间" align="center" min-width="180" ></el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
        </div>
        <el-dialog class="outDialog" key="userDialog"  :title='dialogTitle' :visible.sync="userDialogVisible" v-if="userDialogVisible" width="580px" height="430px" append-to-body  :close-on-click-modal="false" :show-close="false">
       		<!-- 新增/编辑弹出框 -->
       		<UserListAddAndEdit :userObj="userObj" @UserCallBack="UserCallBack" ></UserListAddAndEdit>
       	</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import UserListAddAndEdit from '../../views/userCenter/UserListAddAndEdit.vue';
    export default {
        name: 'UserList',
        components: {
			Pagination, //分页组件
			UserListAddAndEdit//用户新增和编辑组件
		},
        data() {
            return {
                tableData: [],
                multipleSelection: [],//选中项
                pageObj: {
					pageIndex: this.API.leansite.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.leansite.constObj.pageSize, //页大小
				},
				userDialogVisible:false,//是否显示用户信息弹框
				searchText:'',//搜索字段
				userObj:{},//添加和编辑时的用户信息
				dialogTitle:'添加用户'
            }
        },

        created() {
            this.getData();
        },
        methods: {
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @page_obj {Object} 分页信息
			 * page_obj.page_index 当前页下标
			 * page_obj.page_size 页大小
			 */
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
	        /*
	         * 用户信息组件回调方法--子组件回调数据的方法
	         * @param {Boolean} isRefresh是否需要刷新数据 true=刷新；false=不刷新
	         */
	        UserCallBack(isRefresh){
	            this.userDialogVisible = false;
				if(isRefresh){
			   		this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
					this.getData();
				}
			},
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
					method: 'get',
					url: this.API.userListByNameOrUserName,
					params: {
						'param':this.searchText,
						'pageNum': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询失败，请刷新重试！'
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
			 * 按回车键搜索
			 */
            searchEnterFun(e){
			   var keyCode = window.event? e.keyCode:e.which;
			   if(keyCode == 13){
			   		this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
					this.getData();
			   }
			},
            /**
             * 批量删除用户
             */
            datchDel(){
        		if(this.multipleSelection.length <= 0){
            		this.$message({
						type: 'warning',
						message: '请先选择需要删除的用户！'
					});
					return;
            	}
            	this.$confirm('确定删除选中的用户', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {

	            	let delUsers = [];
	            	this.multipleSelection.forEach(function(item,index){
	            		delUsers.push(item.id);
	            	});
		          this.deleteRequest(delUsers.toString());//批量删除请求
		        }).catch(() => {});
            },
            handleAddUser() {
            	this.dialogTitle = "添加用户";
            	this.userObj = {};
                this.userDialogVisible = true;
            },
            /**
             * 用户编辑
             */
            handleEdit(index, row) {
            	this.dialogTitle = "编辑用户";
				this.userObj = this.tableData[index];
                this.userDialogVisible = true;
            },
            /**
             * 删除单个用户
             */
            handleDelete(index, row) {
                this.idx = index;
            	this.$confirm('确定删除该用户', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.deleteRequest(row.id);//批量删除请求
		        }).catch(() => {});
            },
            /**
             * 批量删除请求
             */
            deleteRequest(delUserText){
				this.$axios({
					method: 'delete',
					url: this.API.deleteUsers,
					params: {
						'userIds':delUserText
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == 200) {
						this.multipleSelection = [];
						this.$message({
							type: 'success',
							message: '删除成功！'
						});
				   		this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
						this.getData();
					} else {
						this.$message({
							type: 'error',
							message: '删除失败！'
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
             * 多选
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }

</script>

<style lang="scss" scoped type="text/css">
    .userList {
	    height: 100%;
	    .el-header {
	        height: 60px;
	        line-height: 60px;
	        background-color: #ffffff;
	        border-bottom: 1px solid #d9e3f3;
    		padding: 0 40px;
    		.leftHeader{
    			span{
    				font-size: 16px;
    				color: #424956;
    			}
    		}
	        .el-col.rightHeader{
	        	text-align: right !important;
	        	.addUser{
	        		margin-right: 23px;
	        		font-size: 16px;
	        		color: #2c5ac2;
	        	}
	        	.batchDel{
	        		font-size: 16px;
	        		color: #ed5151;
	        	}
	        	.el-input{
	        		margin-left: 23px;
	        		width: 200px;
	        		.el-icon-search{
	        			color: #68c161;
	        		}
	        	}
	        }
	    }
	    .container {
	    	background-color: #FFFFFF;
	        height: 100%;
	        padding: 27px 40px 0;
	    }
	    .el-main {
	        padding: 30px;
	    }
	     .el-dialog{
	    	background-color: #ffffff;
			box-shadow: 0px 1px 20px 0px 
				rgba(0, 0, 0, 0.2);
			border-radius: 16px;
			 /deep/ .el-dialog__header{
				padding: 12px 40px;
				border-bottom: 1px solid #d9e3f3;
			}
	    }
	}
</style>
