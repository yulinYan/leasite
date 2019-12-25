<template>
    <el-container class="deptList">
	  	<el-aside class="outAside" width="auto" style="padding-right: 10px;">
	  		<el-button type="text" v-if="hasPermission('dept:add')" icon="el-icon-plus" @click="addDept">新增集团</el-button>
	  		<el-tree
		      :data="aDeptDatas.children"
		      node-key="id"
		      :props="defaultProps"
		      default-expand-all
		      highlight-current
		      current-node-key="0"
		      :indent="10"
		      @node-click="treeClick"
		      :expand-on-click-node="false"
		      :render-content="renderContent">
		    </el-tree>
	  	</el-aside>
	  	<el-container>
	        <el-header>
	            <el-row>
				  <div class="leftHeader" :title="showDeptName">
				  	{{showDeptName}}
				  </div>
				  <div class="rightHeader">
				  	<el-button type="text" v-if="hasPermission('/dept/addUser')" icon="el-icon-plus" class="addUser" @click="handleAddUser">新增人员</el-button><el-button type="text" icon="el-icon-delete" class="batchDel" @click="datchDel">批量删除</el-button><el-input
				  		style="width:200px;"
				  		v-if="hasPermission('/dept/deleteUser')"
					   placeholder="输入姓名搜索"
					   suffix-icon="el-icon-search"
					   v-model="searchText"
					   @keyup.enter.native="searchEnterFun">
					</el-input>
				  </div>
				</el-row>
	        </el-header>
	        <div class="container">
	            <el-table stripe :data="tableData" class="table" ref="multipleTable" @selection-change="handleSelectionChange">
	                <el-table-column type="selection" width="55" align="center"></el-table-column>
	                <el-table-column prop="nickname" label="员工姓名" align="center" width="120"></el-table-column>
	                <el-table-column prop="username" label="用户" align="center" width="120"></el-table-column>
	                <el-table-column prop="roleName" label="角色名称" align="center" width="150"></el-table-column>
	                <el-table-column prop="mobile" label="电话"  align="center" width="120"></el-table-column>
	                <el-table-column prop="email" label="邮箱" align="center" min-width="200"></el-table-column>
	                <el-table-column label="操作" width="160" align="center">
	                    <template slot-scope="scope">
	                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
	                        <el-button type="text" v-if="hasPermission('/dept/deleteUser')" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </template>
	                </el-table-column>
	            </el-table>
	            <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
	        </div>
	    </el-container>
	    <el-dialog class="outDialog" key="userDialog"  :title='dialogTitle' :visible.sync="userDialogVisible" v-if="userDialogVisible" width="580px" height="430px" append-to-body  :close-on-click-modal="false" :show-close="false">
	   		<!-- 新增/编辑弹出框 -->
	   		<DeptListAddAndEdit :userObj="userObj" :deptId="deptId" @UserCallBack="UserCallBack" ></DeptListAddAndEdit>
	   	</el-dialog>
	</el-container>

</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import DeptListAddAndEdit from '../../views/userCenter/DeptListAddAndEdit.vue';
    export default {
        name: 'DeptList',//部门管理列表
        components: {
			Pagination, //分页组件
			DeptListAddAndEdit//用户新增和编辑组件
		},
        data() {
            return {
            	aDeptDatas:{},
		        defaultProps: {//tree与data字段映射
		          children: 'children',
		          label: 'text',
		          id:'id'
		        },
                tableData: [],
                multipleSelection: [],//选中项
                pageObj: {
					pageIndex: this.API.leansite.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.leansite.constObj.pageSize, //页大小
				},
				userDialogVisible:false,//是否显示用户信息弹框
				deptId:'',//选中的部门id
				searchText:'',//搜索字段
				userObj:{},//添加和编辑时的用户信息
				dialogTitle:'添加用户',
				showDeptName:'显示选中的部门名称'
            }
        },

        created() {
        	this.getDeptData();//获取部门数据
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
			treeClick(nodeObj,nodes,nodeSelf){
                if(!nodeObj.hasChildren){
                    this.deptId = nodeObj.id;
                    this.showDeptName = nodeObj.text;
                    this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
				    this.getData();
                }
			},
			/**
			 * 新增部门
			 */
			addDept(){
				this.$prompt('请输入部门名称', '新增部门', {
		          confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /^[\S\n\s]{1,10}$/,
		          inputErrorMessage: '请输入十位以内字符'
		        }).then(({ value }) => {
		          this.addDeptRequest({parentId:this.aDeptDatas.id,name:value.trim()});
		        }).catch(() => {});
			},
			/**
			 * 新增部门请求
			 */
			addDeptRequest(oDept){
				this.$axios.leansite({
					method: 'post',
					url: this.API.leansite.addDept,
					data:{
						'parentId':oDept.parentId,
						'deptName':oDept.name
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.getDeptData();//获取部门数据
					} else {
						this.$message({
							type: 'error',
							message: '添加部门失败，请重新添加！'
						});
					}
				}).catch((err) => {
					let res = err.response.data;
					if(res.data == "部门名称重复录入"){
						this.$message({
							type: 'error',
							message: '部门名称重复!'
						});
					}
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
            },
            //获取首个部门
            getFirstDept(arr) {
                for(let i = 0;i < arr.length;i++ ){
                    if(arr[i].hasChildren){
                        this.getFirstDept(arr[i].children);
                        return;
                    }else{
                        this.deptId = arr[i].id;
                        this.showDeptName = arr[i].text;
                        this.getData();
                        return;
                    }
                }
            },
			/**
			 * 获取部门数据
			 */
			getDeptData() {
				this.$axios.leansite({
					method: 'get',
					url: this.API.leansite.getDepts,
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
                        this.aDeptDatas = resData.data.rows;
                        if(this.aDeptDatas.hasChildren){
                            this.getFirstDept(this.aDeptDatas.children);
                        }else{
                            this.deptId = this.aDeptDatas.id;
                            this.showDeptName = this.aDeptDatas.text;
                            this.getData();
                        }
					} else {
						this.$message({
							type: 'error',
							message: '获取部门失败，请刷新重试！'
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
			 * 根据部门id获取人员数据
			 */
			getData() {
				this.$axios.leansite({
					method: 'get',
					url: this.API.leansite.getUserByDeptId,
					params: {
						'id':this.deptId,
						'username':this.searchText,
						'pageNum': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.tableData = resData.data.records;
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
            	let self = this;
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
	            	self.multipleSelection.forEach(function(item,index){
	            		delUsers.push(item.userId);
	            	});
		          self.deleteRequest(delUsers.toString());//批量删除请求
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
		          this.deleteRequest(row.userId);//批量删除请求
		        }).catch(() => {});
            },
            /**
             * 批量删除请求
             */
            deleteRequest(delUserText){
                console.log(this.API.leansite.delDeptUser + '?deptId=' + this.deptId + '&userId=' + delUserText)
				this.$axios.leansite({
					method: 'post',
					url: this.API.leansite.delDeptUser + '?deptId=' + this.deptId + '&userId=' + delUserText,
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
             * 新增部门
             */
			append(data) {
				this.$prompt('请输入部门名称', '新增部门', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
                  inputPattern: /^[\S\n\s]{1,10}$/,
		          inputErrorMessage: '请输入十位以内字符'
		        }).then(({ value }) => {
		          this.addDeptRequest({parentId:data.id,name:value.trim()});
		        }).catch(() => {});
		    },
			/**
			 * 删除部门
			 */
	        remove(node, data) {
		        // const parent = node.parent;
		        // const children = parent.data.children || parent.data;
		        // const index = children.findIndex(d => d.id === data.id);
                // children.splice(index, 1);
                this.$axios.leansite({
					method: 'delete',
					url: this.API.leansite.addDept+'/'+data.id,
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.getDeptData();
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
			 * tree添加功能
			 */
	      	renderContent(h, { node, data, store }) {
		        return (
		          <span class="custom-tree-node">
		            <span style="display:inline-block;width:164px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{node.label}</span>
		            <span>
		              <el-button size="mini" v-if="hasPermission('dept:add')"  type="text" on-click={ () => this.append(data) }>+</el-button>
		              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>-</el-button>
		            </span>
		          </span>);
	      	}
        }
    }

</script>

<style lang="scss" scoped type="text/css">
    .deptList {
	    height: 100%;
	    background-color: #eef1f7;
        /deep/ .el-tree-node>.el-tree-node__children{
            overflow: visible;
        }
	    .outAside{
	    	height: 100%;
            overflow: auto;
	    	background-color: #eef1f7;
	    	.el-tree{
	    		height: 100%;
	    		background-color: #eef1f7;
	    	}

	    }
	    /deep/ .el-tree-node__content{
	    	height: 33px !important;
	    	font-size: 14px;
	    }
	    /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
	    		background-color: #FFFFFF;
	    		color: #3f78f6;
	    }
        /deep/ .custom-tree-node{
            line-height: 12px;
            span{
                overflow: visible !important;
            }
        }
	    .el-header {
	        height: 60px;
	        line-height: 60px;
	        background-color: #ffffff;
	        border-bottom: 1px solid #d9e3f3;
    		padding: 0 40px;
    		.leftHeader{
    			font-size: 16px;
    			color: #424956;
                width: calc(100% - 397px);
                float: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
    		}
	        .rightHeader{
                float: right;
                width: 397px;
	        	text-align: right !important;
	        	.addUser{
	        		// margin-right: 23px;
	        		font-size: 16px;
	        		color: #2c5ac2;
                    float: left;
                    height: 60px;
	        	}
	        	.batchDel{
	        		font-size: 16px;
	        		color: #ed5151;
                    float: left;
                    height: 60px;
	        	}
	        	.el-input{
	        		margin-left: 13px;
                    float: left;
	        		width: calc(100% - 197px);
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
