<template>
    <div class="userList">
        <el-header>
            <el-row>
			  <el-col :span="8" class="leftHeader">
			  	<span>用户管理</span>
			  </el-col>
			  <el-col :span="16" class="rightHeader">
			  	<el-button type="text" icon="el-icon-plus" class="addUser" @click="handleAddUser">新增用户</el-button>
			  	<el-button type="text" icon="el-icon-delete" class="batchDel" @click="datchDel">批量删除</el-button>
			  	<el-input
			  		style="width:200px;"
				   placeholder="输入用户名搜索"

				   v-model="searchText"
				   @keyup.enter.native="searchEnterFun">

				</el-input>
                  <img @click="searchImgClick" class="search" src='../../assets/img/internetPlatform/sousuo.png' alt="">
			  </el-col>
			</el-row>
        </el-header>
        <div class="container">
            <el-table stripe :data="tableData" :row-class-name="tableRowClassName"   class="table" ref="multipleTable" @selection-change="handleSelectionChange" :cell-style="cellStyle" :header-cell-style="{background:'#f2f4f6',color:'#101010'}" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="nickname"  label="员工姓名" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="username" label="用户" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mobile" label="电话"  align="center" width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lastLoginTime" label="最后登录时间" align="center" min-width="180"  show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  class="edit" @click="handleEdit(scope.$index, scope.row)">
                            <img src='../../assets/img/internetPlatform/bianji.png' class="edit-img" alt="">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-error" class="red delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
        </div>
        <el-dialog class="outDialog" custom-class = "dialogstyle" key="userDialog"  :title='dialogTitle' :visible.sync="userDialogVisible" v-if="userDialogVisible"  width="580px" height="430px" append-to-body  :close-on-click-modal="false" :show-close="false">
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
                self:this,
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
            UserCallBack(isRefresh) {
                this.userDialogVisible = false;
                if (isRefresh) {
                    this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
                    this.getData();
                }
            },
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios.leansite({
                    method: 'get',
                    url: this.API.leansite.userListByNameOrUserName,
                    params: {
                        'param': this.searchText.trim(),
                        'pageNum': this.pageObj.pageIndex,
                        'pageSize': this.pageObj.pageSize
                    }
                }).then((res) => {
                    var resData = res.data;
                    if (resData.status == 200) {
                        this.tableData = resData.data.rows;
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
             * 点击搜索
             */
            searchImgClick(){
                this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
                this.getData();
            },
            /**
             * 按回车键搜索
             */
            searchEnterFun(e) {
                var keyCode = window.event ? e.keyCode : e.which;
                if (keyCode == 13) {
                    this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
                    this.getData();
                }
            },
            /**
             * 批量删除用户
             */
            datchDel() {
                let self = this;
                if (this.multipleSelection.length <= 0) {
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
                    self.multipleSelection.forEach(function (item, index) {
                        delUsers.push(item.userId);
                    });
                    self.deleteRequest(delUsers.toString());//批量删除请求
                }).catch(() => {
                });
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
                    this.deleteRequest(row.userId);//批量删除请求
                }).catch(() => {
                });
            },
            /**
             * 批量删除请求
             */
            deleteRequest(delUserText) {
                this.$axios.leansite({
                    method: 'delete',
                    url: this.API.leansite.deleteUsers + '/' + delUserText,
                }).then((res) => {
                    var resData = res.data;
                    if (resData.status == 200) {
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
            },
            /**
             * 改变隔行变色 颜色
             */
            // tableRowClassName(row, rowIndex) {
            //     let index = rowIndex + 1;
            // 		if(index %2 == 1){
            // 		    return 'warning-row'
            // 		}
            //
            //       },
            /**
             * 改变隔行变色 颜色
             */

            cellStyle({row, column, rowIndex, columnIndex}) {
                let style = {
                    'text-align': 'center',
                    'font-size': '14px',
                    // 'height': '70px',
                    'background-color': '#ffffff',
                    'color': '#303030',

                }
                if (rowIndex % 2 != 0) {
                    style['background-color'] = '#f2f4f6';
                }
                return style;
            }
        }


    }

</script>

<style lang="scss" scoped type="text/css">
    .userList {
	    height: 100%;
        border-radius: 16px;
        overflow:hidden;
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
	        		outline: none;
	        		color: #6ecd8b;
	        		.el-icon-search{
	        			color: #6ecd8b;
	        			outline: none;
	        		}
	        	}
                .search{
                    position: relative;
                    left: -30px;
                    top: -2px;
                }
	        }
	    }
	    .container {
	    	background-color: #FFFFFF;
	        height: 100%;
	        padding: 27px 40px 0;
	    .el-table{
	    	color: #303030;
	    	font-size: 14px;
	    	.warning-row{
	    		background: #f2f4f6;
	    	}

	    .edit{
	    	border: solid 1px #68c161;
	    	color: #6ecd8b;
	    	font-size: 14px;
			padding: 9px 7px;
			width: 80px;
			height: 30px;
			padding-top: 8px;
            .edit-img{
                margin-right: 6px;
            }
	    	}
    		.delete{
    			border-radius: 4px;
				border: solid 1px #ec5555;
				color: #ed5151;
				font-size: 14px;
				padding: 9px 7px;
				width: 80px;
				height: 30px;
				padding-top: 8px;
    		}
	    	}
	    }

	    .el-main {
	        padding: 30px;
	    }

	}
    /deep/ .el-dialog{
        background-color: #ffffff;
        box-shadow: 0px 1px 20px 0px
        rgba(0, 0, 0, 0.2);
        border-radius:16px;

    /deep/ .el-dialog__header{

        padding: 12px 40px;
        border-bottom: 1px solid #d9e3f3;
    }
    }
</style>
