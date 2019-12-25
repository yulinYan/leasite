

<template >
    <div class="box">
        <div class="top"><div class="text">超级管理员</div></div>
        <div class="RoleListEdit" v-if="menuList.children">
            <!-- 表头-->
            <div class="model" style="width: 1600px">
                <div style="width: 154px">模块1</div>
                <div style="width: 154px">模块2</div>
                <div style="width: 1154px">模块3</div>
            </div>
            <!--表身-->
            <div v-for="(item,index) in menuList.children" :key="item.title+index" class="models">
                <div class="model_1" style="width: 154px" >
                    <el-checkbox class="model1_checkbox"   @change="model_1_selectAll(arguments,index)" v-model="item.checked"  >{{item.title}}</el-checkbox>
                </div>
<!--                右边模块2 和模块3-->
                <div>
                    <div class="model_2" v-for="(item2,index2) in item.children" :key="index2">
                <!--   模块2-->
                        <div class="model_2_2" style="width: 154px">
                            <el-checkbox class="model2_checkbox"  v-model="item2.checked" @change="model_2_selectAll(item,index2)" >{{item2.title}}</el-checkbox>
                        </div>
                <!--  模块3-->
                        <div class="model_2_3" style="width: 1154px">
                            <el-checkbox class="model3_checkbox"   @change="model_3_select(item,item2,index3)" v-model="item3.checked" v-for="(item3,index3) in item2.children"  :key="index3">{{item3.title}}</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--按钮-->
            <el-row>
                <el-button @click="asas">取消</el-button>
                <el-button @click="save">保存</el-button>
            </el-row>
    </div>

</template>

<script>
    export default {
        name: "RoleListEdut2",
        // props:{
        //     roleId:{
        //         type:integer,
        //         required:true
        //     }
        // },
        data() {
           return{
               "menuList": null,
               "menuIds":[]
           }
        },

        methods: {
            /**
             * 一级全选
             */
            model_1_selectAll(args,index){
                args=args;
                let checked = this.menuList.children[index].checked;
                // console.log(checked);

                this.menuList.children[index].children.forEach((children)=>{
                    children.checked = checked;
                    if(children.children){
                        children.children.forEach((children2)=>{
                        children2.checked = checked;
                    })
                    }
                })
                this.model_2_selectAll(item,index2)
                this.model_3_select(item,item2,index3)
                },
            /**
             * 二级全选
             */
            model_2_selectAll(item,index2){
                let checked = item.children[index2].checked;
                item.children[index2].children.forEach((children)=>{
                    children.checked = checked;
                })

                let model1_checcked = item.children.every((model2)=>{
                    return model2.checked == true;
                })
                item.checked = model1_checcked;

            },

            /**
             * 单选改变状态
             */
            model_3_select(item,item2,index3){
                let checked = item2.children.every((model3)=>{
                    return model3.checked==true
                })
                item2.checked = checked;

                let one_checked = item.children.every((model2)=>{
                    return model2.checked==true;
                })
                item.checked = one_checked;
            },
            /**
             * 二级单选改变状态
             */
            getData() {
                this.$axios.leansite({
                    method: 'get',
                    url: this.API.leansite.getMenuByRoleId,
                    params: {
                        'roleId':1
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
                this.getMenusId();
                this.$axios.leansite({
                    method: 'POST',
                    url: this.API.leansite.saveMenuState,
                    params: {
                        'roleId':1,
                        'menuIds':this.menuIds.toString()
                    }
                }).then((res) => {
                    var resData = res.data;
                    if (resData.status == 200) {
                        alert("保存成功");
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
            },

            /**
             * 获取所有被选中的权限的id
             */
            getMenusId(){
                this.menuList.children.forEach((children1)=>{
                    if(children1.checked==true){
                        if(this.menuIds.indexOf(children1.id)==-1){
                            this.menuIds.push(children1.id);
                        }
                    };
                    if(children1.children){
                        children1.children.forEach((children2)=>{
                            if(children2.checked==true){
                                if(this.menuIds.indexOf(children2.id)==-1){
                                    this.menuIds.push(children2.id);
                                }
                            };
                            if(children2.children){
                                children2.children.forEach((children3)=>{
                                    if(children3.checked==true){
                                        if(this.menuIds.indexOf(children3.id)==-1){
                                            this.menuIds.push(children3.id);
                                            console.log(this.menuIds)
                                        }
                                    }
                                })
                            }
                        })
                    }
                })

            }
            },
        created() {
            this.getData();
            this.model_1_selectAll(args,index);
        },


    };
</script>
<style lang="scss" scoped type="text/css">

    .box{
        width: 1680px;
        height: 974px;
        background-color: #ffffff;
        border-radius: 8px;
        margin: 0 auto;
        margin-top: 5%;
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
        width: 1600px;
        background-color: #ffffff;
        margin: 16px auto;
        border:solid 1px #d2d5dc;
        .model{
            display: flex;
            align-items: center;
            div{
                text-align: center;
                border-right: 1px solid #d2d5d4;
                border-bottom: 1px solid #d2d5d4;
            }
        }
        .models{
            display: flex;
            align-items: center;
            border-bottom:1px solid #d2d5d4;
            div{
                border-right: 1px solid #d2d5d4;
                text-align: center;
            }
            .model_2{
                display: flex;
                align-items: center;
                border-bottom: 1px solid #d2d5d4;
                border-left: 1px solid #d2d5d4;
            }
            .model_2_3{
                display: flex;
                flex-wrap: wrap;
                justify-content: left;
                text-align: center;
            }
            /deep/ .el-checkbox__label{

                width: 85px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                float: right;
                margin-top: 4px;
            }
        }
    }
}

</style>

