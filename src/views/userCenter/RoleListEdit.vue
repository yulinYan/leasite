

<template >
    <div class="box">
<!--        <div class="top"><div class="text">超级管理员</div></div>-->
        <div class="RoleListEdit" v-if="menuList.children">
            <!-- 表头-->
            <div class="model" >
                <div style="width: 157px">模块1</div>
                <div style="width: 175px">模块2</div>
                <div style="width: calc(100% - 310px)">模块3</div>
            </div>
            <!--表身-->
            <div v-for="(item,index) in menuList.children" :key="index" class="models" >
                <div class="model_1"  style="width: 154px;">
                    <el-checkbox class="model1_checkbox"    @change="model_1_selectAll(index)" v-model="item.checked"  >{{item.title}}</el-checkbox>
                </div>
                <!--                右边模块2 和模块3-->
                <div v-if="item.children">
                    <div class="model_2"  v-for="(item2,index2) in item.children" :key="index2">
                        <!--   模块2-->
                        <div class="model_2_2" style="width: 175px" v-if="item2.checked">
                            <el-checkbox class="model2_checkbox"  v-model="item2.checked" @change="model_2_selectAll(item,index2)" >{{item2.title}}</el-checkbox>
                        </div>
                        <!--  模块3-->
                        <div class="model_2_3" style="width: calc(100% - 154px)" v-if="item2.children">
                            <el-checkbox class="model3_checkbox"   @change="model_3_select(item,item2,index3)" v-model="item3.checked" v-for="(item3,index3) in item2.children"  :key="index3">{{item3.title}}</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--按钮-->
        <div class="btn">
            <el-button class="cancelBtn" @click="cancelOpt" >取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RoleListEdut",//编辑角色权限
        props:{
            roleObj:{
                type:Object,
                required:true
            }
        },
        data() {
            return{
                "menuList": null,
                "ApplicationEntry":[],
                "centerDialogVisible":true,
                "menuIds":[],
                "appParentId":''//获取应用入口列表的id
            }
        },

        methods: {
            /**
             * 一级全选
             */
            model_1_selectAll(index){
                let checked = this.menuList.children[index].checked;
                // console.log(checked);
                if(this.menuList.children){
                    this.menuList.children[index].children.forEach((children)=>{
                        children.checked = checked;
                        if(children.children){
                            children.children.forEach((children2)=>{
                                children2.checked = checked;
                            })
                        }
                    })
                }
                this.model_2_selectAll(item,index2)
                this.model_3_select(item,item2,index3)
            },
            /**
             * 二级全选
             */
            model_2_selectAll(item,index2){
                let checked = item.children[index2].checked;
                if(item.children[index2].children){
                    item.children[index2].children.forEach((children)=>{
                        children.checked = checked;
                    })
                }

                let model1_checcked = item.children.every((model2)=>{
                    return model2.checked == true;
                })
                item.checked = model1_checcked;
            },

            /**
             * 单选改变状态
             */
            model_3_select(item,item2,index3){
                if(item2.children){
                    let checked = item2.children.every((model3)=>{
                        return model3.checked==true
                    })
                }
                item2.checked = checked;
                if(item.children){
                let one_checked = item.children.every((model2)=>{
                    return model2.checked==true;
                })
                }
                item.checked = one_checked;
            },
            /**
             * 二级单选改变状态
             */
            /**
             * 获取角色权限列表数据
             */
            getAuthData() {
                this.$axios.leansite({
                    method: 'get',
                    url: this.API.leansite.getMenuByRoleId,
                    params: {
                        'roleId':this.roleObj.roleId*1
                    }
                }).then((res) => {
                    var resData = res.data;
                    if (resData.status == 200) {
                        this.menuList = resData.data.rows;
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
             * 保存所选状态
             */
            save(){
                this.menuIds = [];
            	this.ApplicationEntry = [];
            	this.appParentId = '';
            	this.foreachMenu(this.menuList.children);
                this.$axios.leansite({
                    method: 'POST',
                    url: this.API.leansite.saveMenuState,
                    params: {
                        'roleId':this.roleObj.roleId*1,
                        'menuIds':this.menuIds.toString(),
                        'appIds':this.ApplicationEntry.toString()
                    }
                }).then((res) => {
                    var resData = res.data;
                    if (resData.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '权限编辑成功！'
                        });

                    } else {
                        this.$message({
                            type: 'error',
                            message: '保存失败，请刷新重试！'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: '请求异常，请检查网络！'
                    });
                })

                this.$emit("RoleAuthCallBack",false);
            },
 			/**
             * 获取所有被选中的权限的id
             */
			foreachMenu(childMenu){
				let self = this;
            	childMenu.forEach(function(item,index){
                    if( item.title=="获取应用入口列表" && item.checked){
                        self.menuIds.push(item.id);
                        self.appParentId = item.id;
                	}else if( self.appParentId == item.parentId && item.checked){
                        self.ApplicationEntry.push(item.id);
                	}else if( item.title!="获取应用入口列表" && item.checked){
                        self.menuIds.push(item.id);
                	}
                	if(item.children && item.children.length > 0){
                		self.foreachMenu(item.children);
                	}
                })
            },
            /**
             * 取消
             */
            cancelOpt(){
                // this.resetForm();//重置表单
                // //调用父组件方法--isRefresh=false不需要刷新父组件的数据
                this.$emit("RoleAuthCallBack",false);
                // centerDialogVisible = false;
            },
        },
        created() {
            this.getAuthData();
        },
    };
</script>
<style lang="scss" scoped type="text/css">

    .box{
        /*min-width: 1462px;*/
        /*height: 90%;*/

        background-color: #ffffff;
        border-radius: 8px!important;
        margin-top:-30px;
        padding:0;
        overflow:hidden;
    .top{
        height:59px;
        border-bottom:solid 2px #d9e3f3 ;
        overflow:hidden;
    .text{
        margin: 15px 0 0 30px;
        font-size: 16px;
        color: #424956;
    }
    }
    .RoleListEdit{
        background-color: #ffffff;
        margin: 16px auto;
        border:solid 2px #d2d5dc;
        border-radius: 8px!important;
        overflow:hidden;
    .model{
        display: flex;
        align-items: center;
    div{
        text-align: center;
        border-right: 1px solid #d2d5dc;
        border-bottom: 2px solid #d2d5dc;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #101010;
    }
    }
    .models{
        height: 100%;
        display: flex;
        align-items: center;
        border-bottom:1px solid #d2d5dc;
    div{
        /*border-right: 1px solid #d2d5dc;*/
        /*border-left: 1px solid #d2d5dc;*/

        text-align: center;
        width: calc(100% - 154px);
    }
    .model_1{
        border-right: none!important;
    .el-checkbox{
        padding: 10px ;
    }
    }
    .model_2{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d2d5d4;
        border-left: 1px solid #d2d5dc;
        width: 100%;
    .el-checkbox{
        margin: 10px 30px 10px;
    }
    }
    .model_2_2{
        display: flex;
        justify-content: left;
    }
    .model_2_3{
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        text-align: center;
        border-left:1px solid #d2d5dc;
        .el-checkbox{
            margin: 10px 30px 0;
            padding:  0 0 10px;

            .el-checkbox__label{
                margin-top: 10px;
                margin: 0;
                padding: 0;
                float: right;
            }
            .el-checkbox__inner{
                float: left;
                margin: 0;
                padding: 0;
            }
        }
        .el-checkbox__label{
            margin-top: 10px;
            text-align: left;
        }
    }
    .el-checkbox__inner{
        float: left;
    }
    /deep/ .el-checkbox__label{
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
    .btn{
        width: 200px;
        margin: 0 auto;
        text-align: center;
        .cancelBtn{
             background-color: #c4d4e7!important;
            margin-right: 20px;
         }
    }
    }

</style>

