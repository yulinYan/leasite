<template>
    <el-container class="deptList">
	  	<el-aside class="outAside" width="auto">
	  		<!--<el-button type="text" v-if="hasPermission('dept:add')" icon="el-icon-plus" @click="addDept" style="padding-left: 10px;">新增集团</el-button>-->
	  		<el-tree
		      :data="aDeptDatas.children"
		      node-key="id"
		      :props="defaultProps"
		      default-expand-all
		      highlight-current
		      current-node-key="0"
		      :indent="10"
		      @node-click="treeClick"
		      @node-contextmenu="rightClick"
		      :expand-on-click-node="false">
		       <span class="custom-tree-node" slot-scope="{ node, data }"  style="padding-right:10px;">
		        <i :class="node.level == 1?'iconfont leansite-ziyuan':'iconfont leansite-bumen'" style="color:#aee4fa;"></i>
		        <span style="display:inline-block;margin-left:5px;width: 120px;overflow: hidden !important;text-overflow:ellipsis;white-space: nowrap;" :title="node.label">{{ node.label }}</span>
		        <!--<span>
		          <el-button
		          	v-if="hasPermission('dept:add')"
		            type="text"
		            size="mini"
		            icon="el-icon-plus"
		            @click="() => append(data)">
		          </el-button>
		          <el-button
		          	v-if="hasPermission('dept:delete')"
		            type="text"
		            size="mini"
		            icon="el-icon-delete"
		            style="color:red"
		            @click="() => remove(node, data)">
		          </el-button>
		        </span>-->
		      </span>
		    </el-tree>
	   		<ul v-show="showRightMenu" id="rightMenu">
		   	   <li @click="editDeptHandle" v-if="hasPermission('dept:update')">编辑</li>
			   <li @click="delDeptHandle" v-if="hasPermission('dept:delete')">删除</li>
		   	   <li @click="addBroDeptHandle" v-if="hasPermission('dept:add')">添加同级部门</li>
		   	   <li @click="addChildDeptHandle" v-if="hasPermission('dept:add')">添加子级部门</li>
		   </ul>
	  	</el-aside>
	  	<el-container class="rightContainer">
	        <el-header>
	            <el-row>
				  <div class="leftHeader" :title="showDeptName">
				  	{{showDeptName}}
				  </div>
				  <div class="rightHeader">
				  	<el-button type="text" v-if="hasPermission('dept:addUser')" icon="el-icon-plus" class="addUser" @click="handleAddUser">添加用户</el-button>
				  	<el-button type="text" v-if="hasPermission('dept:deleteUser')" icon="el-icon-error" class="batchDel" @click="datchDel">批量删除</el-button><el-input
				  		style="width:200px;"
				  		v-if="hasPermission('dept:deleteUser')"
					   placeholder="输入用户名搜索"
					   suffix-icon="el-icon-search"
					   v-model="searchText"
					   @keyup.enter.native="searchEnterFun">
					</el-input>
				  </div>
				</el-row>
	        </el-header>
	        <div class="container">
	            <el-table stripe :data="tableData" class="table" ref="multipleTable" @selection-change="handleSelectionChange" :cell-style="cellStyle" :header-cell-style="{background:'#f2f4f6',color:'#101010'}">
	                <el-table-column type="selection" width="55" align="center"></el-table-column>
	                <el-table-column prop="nickname" label="员工姓名" align="center" width="150"></el-table-column>
	                <el-table-column prop="username" label="用户" align="center" width="150"></el-table-column>
	                <el-table-column prop="mobile" label="电话"  align="center" width="150"></el-table-column>
	                <el-table-column prop="email" label="邮箱" align="center" min-width="200"></el-table-column>
	                <el-table-column label="操作" width="160" align="center">
	                    <template slot-scope="scope">
	                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
	                        <el-button type="text" v-if="hasPermission('dept:deleteUser')" icon="el-icon-error" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
				oChioceDept:{},//选中的部门
				showRightMenu:false,//部门树右键菜单是否显示
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
			/**
			 * 部门树 右击事件
			 */
			rightClick(event, data, node, obj) {
			  this.oChioceDept = data;
		      this.showRightMenu = false; // 先把模态框关死，目的是：第二次或者第n次右键鼠标的时候 它默认的是true
		      this.showRightMenu = true;
		      let menu = document.querySelector('#rightMenu');
		      menu.style.left = event.srcElement.offsetLeft + 'px';
		      menu.style.top = event.srcElement.offsetTop+20 + 'px';
		      // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
		      document.addEventListener('click', this.closeRightMenu)
		    },
		    /**
		     * 关闭右键菜单
		     */
		    closeRightMenu() {
		      this.showRightMenu = false
		      document.removeEventListener('click', this.closeRightMenu);// 及时关掉鼠标监听事件
		    },
			/**
			 * 部门树点击事件
			 */
			treeClick(nodeObj,nodes,nodeSelf){
                this.deptId = nodeObj.id;
                this.showDeptName = nodeObj.text;
                this.pageObj.pageIndex = this.API.leansite.constObj.pageIndex;
			    this.getData();
			},
			/**
			 * 新增部门
			 */
			addDept(){
				this.$prompt('请输入部门名称', '新增部门', {
		          confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /^[\S\n\s]{1,10}$/,
		          inputErrorMessage: '请输入部门名称(10个字符以内)'
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
					if(res.message == "部门名称重复录入"){
						this.$message({
							type: 'error',
							message: '部门名称重复!'
						});
					}else{
						this.$message({
							type: 'error',
							message: '请求异常，请检查网络！'
						});	
					}
					
				})
            },
			/**
			 * 修改部门请求
			 */
			updateDeptRequest(oDept){
				this.$axios.leansite({
					method: 'post',
					url: this.API.leansite.updateDept,
					data:{
						'deptId':oDept.deptId,
						'deptName':oDept.name
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.status == 200) {
						this.getDeptData();//获取部门数据
					} else {
						this.$message({
							type: 'error',
							message: '修改部门名称失败，请重新添加！'
						});
					}
				}).catch((err) => {
					let res = err.response.data;
					if(res.message == "部门名称重复录入"){
						this.$message({
							type: 'error',
							message: '修改部门名称失败,部门名称重复!'
						});
					}else{
						this.$message({
							type: 'error',
							message: '请求异常，请检查网络！'
						});	
					}
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
             * 新增子部门
             */
			addChildDeptHandle() {
				this.$prompt('请输入部门名称', '新增部门', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
                  inputPattern: /^[\S\n\s]{2,10}$/,
		          inputPlaceholder:"请输入部门名称(2~10个字符)",
		          inputErrorMessage: '部门名称必须是2~10个字符'
		        }).then(({ value }) => {
		          this.addDeptRequest({parentId:this.oChioceDept.id,name:value.trim()});
		        }).catch(() => {});
		    },
            /**
             * 新增兄弟部门
             */
			addBroDeptHandle() {
				this.$prompt('请输入部门名称', '新增部门', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
                  inputPattern: /^[\S\n\s]{2,10}$/,
		          inputPlaceholder:"请输入部门名称(2~10个字符)",
		          inputErrorMessage: '部门名称必须是2~10个字符'
		        }).then(({ value }) => {
		          this.addDeptRequest({parentId:this.oChioceDept.parentId,name:value.trim()});
		        }).catch(() => {});
		    },
            /**
             * 编辑部门
             */
			editDeptHandle() {
				this.$prompt('请输入部门名称', '新增部门', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
                  inputPattern: /^[\S\n\s]{2,10}$/,
                  inputValue:this.oChioceDept.title,
                  inputPlaceholder:"请输入部门名称(2~10个字符)",
		          inputErrorMessage: '部门名称必须是2~10个字符'
		        }).then(({ value }) => {
		          this.updateDeptRequest({deptId:this.oChioceDept.id,name:value.trim()});
		        }).catch(() => {});
		    },
			/**
			 * 删除部门
			 */
	        delDeptHandle() {
            	this.$confirm('确定删除选中的部门', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	                this.$axios.leansite({
						method: 'delete',
						url: this.API.leansite.addDept+'/'+this.oChioceDept.id,
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
				}).catch(() => {});
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
            	this.$confirm('确定删除选中的部门', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
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
				}).catch(() => {});
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
                    'font-family': 'MicrosoftYaHei',
					'font-weight': 'normal',
					'font-stretch': 'normal',
					'line-height': '24px',
					'letter-spacing': '0px',
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
    .deptList {
	    height: 100%;
	    background-color: #eef1f7;
        /deep/ .el-tree-node>.el-tree-node__children{
            overflow: visible;
        }
	    .outAside{
	    	height: auto;
            overflow: auto;
	    	background-color: #eef1f7;
	    	position:relative;
	    	.el-tree{
	    		width: 220px;
	    		height: auto;
	    		background-color: #eef1f7;
	    	}
			ul{
				z-index: 2;
				width: 94px;
				position:absolute;
			    display: inline-block;
			    border-bottom: solid 1px #ccc;
			    background-color: #fff;
			    li{
				    padding: 5px 10px;
				    text-align: center;
				    border: solid 1px #ccc;
				    border-bottom: none;
				    cursor: pointer;
				    font-size: 12px;
				    color: #606266;
			    }
			    li:hover{
			    	background-color: #eef1f7;
			    }
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
        .rightContainer{
        	border-radius: 16px;
    		overflow: hidden;
    		min-height: 640px;
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
	        		/deep/ .el-icon-search{
	        			color: #68c161!important;
	        			font-size: 20px;
	        			font-weight: 500;
	        			margin-top: 3px;
	        		}
	        	}
	        	
	        }
	    }
	    .container {
	    	background-color: #FFFFFF;
	        height: 100%;
	        padding: 27px 40px 0;
	        .el-table{
	        	.red{
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
	/deep/ .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 50px!important;
}
</style>
