<template>
    <div class="roleList">
        <el-header>
            <el-row>
			  <el-col :span="8" class="leftHeader">
			  	<span>角色管理</span>
			  </el-col>
			  <el-col :span="16" class="rightHeader">
			  	<el-button type="text" v-if="hasPermission('role:add')" icon="el-icon-plus" class="addRole" @click="handleAddRole">新增角色</el-button>
			  	<el-button type="text" v-if="hasPermission('role:delete')" icon="el-icon-delete" class="batchDel" @click="datchDel">批量删除</el-button>
			  	<el-input
			  		style="width:200px;"
				   placeholder="输入角色名搜索"
				   v-model="searchText"
				   @keyup.enter.native="searchEnterFun">
				</el-input>
                  <img @click="searchImgClick" class="search" src='../../assets/img/internetPlatform/sousuo.png' alt="搜索">
			  </el-col>
			</el-row>
        </el-header>
        <div class="container">
            <el-table stripe :data="tableData" class="table" ref="multipleTable" @selection-change="handleSelectionChange" :cell-style="cellStyle"  :header-cell-style="{background:'#f2f4f6',color:'#101010'}">
                <el-table-column type="selection"  width="55" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center" min-width="200"></el-table-column>
                <el-table-column prop="remark" label="角色描述"  header-align="center" align="left" min-width="300"></el-table-column>
                <el-table-column prop="userId" label="用户列表" header-align="center" align="center" min-width="300" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" slot="reference" v-if="hasPermission('role:addRoleAndMenu')" class="edit" @click="handleEdit(scope.$index, scope.row)" >
                        	<img src='../../assets/img/internetPlatform/bianji.png' class="edit-img" alt="">分配权限
                        </el-button>
                        <el-button  type="text" v-if="hasPermission('role:delete')" icon="el-icon-error" class="red delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
        </div>
        <el-dialog class="outDialog" key="roleDialog"  :title='dialogTitle' :visible.sync="roleDialogVisible" v-if="roleDialogVisible" width="580px" height="430px" append-to-body  :close-on-click-modal="false" :show-close="false">
       		<!-- 新增/编辑弹出框 -->
            <RoleListAdd :roleObj="roleObj" @RoleCallBack="RoleCallBack" ></RoleListAdd>
       	</el-dialog>
        <el-dialog class="outRoleAuthDialog" key="roleAuthDialog" :title='dialogAuthTitle'  v-if="roleAuthDialogVisible" :visible.sync="roleAuthDialogVisible"  width="85%" height="730px" append-to-body  :close-on-click-modal="false" :show-close="false">
            <!--分配权限-->
            <RoleListEdit :roleObj="roleObj"  @RoleAuthCallBack="RoleAuthCallBack"></RoleListEdit>
        </el-dialog>

    </div>
</template>

<script>
	import Bus from '../../common/bus.js';
	import Pagination from '../../components/Pagination.vue';
	import RoleListAdd from '../../views/userCenter/RoleListAdd.vue';
	import RoleListEdit from "./RoleListEdit";
    export default {
        name: 'RoleList',//角色列表
        components: {
			Pagination, //分页组件
			RoleListAdd,//新增角色
            RoleListEdit, //分配权限
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
				roleDialogVisible:false,//是否显示角色信息弹框
                roleAuthDialogVisible:false,//是否显示角色权限信息弹框
				searchText:'',//搜索字段
				roleObj:{},//添加和编辑时的角色信息
				dialogTitle:'添加角色',
                dialogAuthTitle:'权限编辑',

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
	         * 角色信息组件回调方法--子组件回调数据的方法
	         * @param {Boolean} isRefresh是否需要刷新数据 true=刷新；false=不刷新
	         */
	        RoleCallBack(isRefresh){
	            this.roleDialogVisible = false;
				if(isRefresh){
			   		this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
					this.getData();
				}
			},
			/**
			 * 分配权限完成回调函数
			 */
            RoleAuthCallBack(isRefresh){
                this.roleAuthDialogVisible = false;
                Bus.$emit('reloadData');
                if(isRefresh){
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
					url: this.API.leansite.roleListByRoleName,
					params: {
						'roleName':this.searchText.trim(),
						'pageNum': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
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
            searchEnterFun(e){
			   var keyCode = window.event? e.keyCode:e.which;
			   if(keyCode == 13){
			   		this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
					this.getData();
			   }
			},
            /**
             * 批量删除角色
             */
            datchDel(){
        		if(this.multipleSelection.length <= 0){
            		this.$message({
						type: 'warning',
						message: '请先选择需要删除的角色！'
					});
					return;
            	}
        		let searchIndex = this.multipleSelection.findIndex((item, index, arr)=>{
        			return item.roleName == 'root';
        		});
        		if(searchIndex != -1){
        			this.$message({
						type: 'warning',
						message: 'root角色不能删除,请重新选择!'
					});
					return;
            	}
            	this.$confirm('确定删除选中的角色', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	            	let delRoles = [];
	            	this.multipleSelection.forEach(function(item,index){
	            		delRoles.push(item.roleId);
	            	});
		          this.deleteRequest(delRoles.toString());//批量删除请求
		        }).catch(() => {});
            },
            handleAddRole() {
            	this.dialogTitle = "添加角色";
            	this.roleObj = {};
                this.roleDialogVisible = true;
            },
            /**
             * 角色编辑
             */
            handleEdit(index, row) {
            	if(row.roleName == 'root'){
	            	let aUserRoles = this.$store.state.roles;
            		let nIndex = aUserRoles.findIndex((val)=>{
            			return val == "root";
            		});
            		if(nIndex < 0){
            			this.$message({
							type: 'warning',
							message: 'root角色不能编辑!'
						});
						return;
            		}
            	}
				this.roleObj = this.tableData[index];
                this.roleAuthDialogVisible = true;
            },
            /**
             * 删除单个角色
             */
            handleDelete(index, row) {
            	if(row.roleName == 'root'){
        			this.$message({
						type: 'warning',
						message: 'root角色不能删除'
					});
					return;
            	}
                this.idx = index;
            	this.$confirm('确定删除该角色', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.deleteRequest(row.roleId);//批量删除请求
		        }).catch(() => {});
            },
            /**
             * 批量删除请求
             */
            deleteRequest(delRoleText){
				this.$axios.leansite({
					method: 'delete',
					url: this.API.leansite.deleteRoles+"/"+delRoleText,
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
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
    .roleList {
	    height: 100%;
        border-radius: 16px;
        overflow:hidden;
	    .el-header{
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
	        	.addRole{
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
		    .edit{
		    	border: solid 1px #68c161;
		    	color: #6ecd8b;
		    	font-size: 14px;
				padding: 9px 7px;
				/*width: 80px;*/
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
				width: 80px;
				height: 30px;
				padding-top: 8px;
    		}
	    	}
	    }
	    .el-main {
	        padding: 30px;
	    }
        .roleAuthDialogVisible{

           /*margin-top: -700px;*/
        }
	}
    /deep/ .el-dialog{
        background-color: #ffffff;
        box-shadow: 0px 1px 20px 0px
        rgba(0, 0, 0, 0.2);
        border-radius:16px;

    .el-dialog__header{
        padding: 12px 40px;
        border-bottom: 1px solid #d9e3f3;
    }

    }

    /deep/ .outRoleAuthDialog{
        /*width: 88% !important;*/
        /*min-width: 70%;*/
        /*!*height: 80%;*!*/
        /*min-height: 60%;*/
        border-radius: 8px;
        margin: 0 auto;
        overflow: hidden;
        overflow-x: auto;
        overflow-y: auto;
        /deep/ .el-dialog__body{
            padding: 0 20px!important;

        }
    }
/deep/ .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 50px!important;
}
</style>
