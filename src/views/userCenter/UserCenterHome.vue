<template>
<el-container class="userCenterHome">
    <el-header>
        <img src="../../assets/img/dhLogo.png" alt="大航联科logo">
        <span>用户中心</span>
    </el-header>
    <el-container class="platformContainer">
        <el-tabs type="border-card" tab-position="left" :before-leave="beforeLeave">
            <el-tab-pane>
                <span slot="label">
				    	<img :src="activeIndex == 0 ? asideList[0].icon[1] : asideList[0].icon[0]" alt="菜单图标">{{asideList[0].name}}
				    </span>
                <el-row>
                    <el-col :span="24">
                        <UserList></UserList>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label">
				    	<img :src="activeIndex == 1 ? asideList[1].icon[1] : asideList[1].icon[0]" alt="菜单图标">{{asideList[1].name}}
				    </span>
                <el-row>
                    <el-col :span="24">
                        <RoleList></RoleList>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-container>
</el-container>
</template>

<script>
import Vue from 'vue'
import UserList from '../../views/userCenter/UserList.vue';
import RoleList from '../../views/userCenter/RoleList.vue';
export default {
    name: 'UserCenterHome', //用户中心首页
    props: {
        username: { //用户名
            type: String,
            required: true
        },
        leansiteToken: { //token信息
            type: String,
            required: true
        }
    },
    components: {
        UserList, //用户列表
        RoleList //角色列表
    },
    data() {
        return {
            //侧边栏
            asideList: [{
                    icon: [
                        require('../../assets/img/userCenter/yonghu1.png'),
                        require('../../assets/img/userCenter/yonghu2.png')
                    ],
                    name: '用户管理',
                    links: '/userList'
                }, {
                    icon: [
                        require('../../assets/img/userCenter/quanxianguanli1.png'),
                        require('../../assets/img/userCenter/quanxianguanli2.png')
                    ],
                    name: '权限管理',
                    links: '/roleList',
                    isShow: false
                }
                //          , {
                //              icon: [
                //              	require('../../assets/img/userCenter/zuzhijiagou1.png'),
                //              	require('../../assets/img/userCenter/zuzhijiagou2.png')
                //              ],
                //              name: '组织架构',
                //              link: 'Overview'
                //          }
            ],
            //点击当前元素的index
            activeIndex: 0
        }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
        /**
         * 点击侧边栏
         */
        asideClick(index, links) {
            this.isActive = index;
            this.$router.push({
                name: links
            });
        },
        /**
         *	tabs点击切换前
         */
        beforeLeave(activeName, oldActiveName) {
            this.activeIndex = activeName * 1;

        },
        /**
         * 点击弹出组件
         */
        alertUserComponent(path) {

        },
        loginCheck() {
            let self = this;
            this.$axios.internet({
                url: this.API.internet.login, //不需要再添加ip和端口
                method: 'post', //提交方式：get和post，同 params 和 data配合使用
                data: {
                    "username": this.username,
                    "password": "",
                    "leansitetoken": this.leansiteToken
                }
            }).then((res) => {
                var resData = res.data;
                if (resData.token && resData.token.length > 0) {
                    this.$store.commit('saveStoreByName', {
                        name: this.API.internet.constObj.internetToken,
                        storeName: 'internetToken',
                        storeInfo: token
                    });
                } else {
                    self.$alert("打开物联网中心失败,请关闭重新打开!");
                }
            }).catch(function(err) {
                console.log("连接错误" + err);
            })
        }
    }
}
</script>

<style lang="scss" scoped type="text/css">
.userCenterHome {
    height: 100%;
    min-height: 500px;
    .el-header {
        height: 60px;
        background-color: #ffffff;
        >img {
            margin: 12px 21px 0 30px;
            max-width: 136px;
        }
        >span {
            font-family: 'MicrosoftYaHei';
            font-size: 16px;
            color: #101010;
            vertical-align: -webkit-baseline-middle;
        }
    }
    .platformContainer {
        background-color: #eef1f7;
        height: calc(100% - 60px);
        .el-tabs {
            width: 100%;
            background-color: #ffffff;
            .el-tabs__header {
                width: 180px;
            }
        }
    }
    /deep/ .el-tabs--border-card {
        border: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    /deep/ .el-tabs--left .el-tabs__header.is-left {
        margin-right: 0;
        width: 180px;
        background-color: #fff;
        border: none;
    }
    /deep/ .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
        height: 54px;
        line-height: 54px;
        color: #101010;
        padding: 0;
        display: flex;
        justify-content: center;
        span {
            display: flex;
            align-items: center;
            img {
                margin-right: 15px;
            }
        }
    }
    /deep/ .el-tabs--border-card>.el-tabs__content {
        background-color: #eef1f7;
        padding: 30px;
    }
    /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item {
        border-left: solid 5px #FFFFFF;
        background-color: #FFFFFF;
    }
    /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        border-color: transparent transparent;
        border-left: solid 5px #61adf8;
        background-color: #eef1f7;
        color: #3f78f6;
    }
}
</style>
