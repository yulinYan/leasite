<template>
    <el-container class="userCenterHome">
        <el-header>
            <img src="../../assets/img/dhLogo.png" alt="大航联科logo">
            <span>用户中心</span>
        </el-header>
        <el-container class="platformContainer">
            <el-aside width="180px">
                <ul>
                    <li v-for="(item,index) in asideList" :key="index" :class="isActive == index ? 'active' : '' " @click='asideClick(index,item.links)'>
                   	<!--<li v-for="(item,index) in asideList" :key="index" :class="isActive == index ? 'active' : '' ">-->
            			<img :src="isActive == index ? item.icon[1] : item.icon[0]" alt="菜单图标">
            			<span v-cloak>{{item.name}}</span>
                    </li>
                </ul>
            </el-aside>
            <el-main>
            	<transition name="move" mode="out-in">
                    <keep-alive>
                         <router-view name="userCenterView"></router-view>
                    </keep-alive>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'UserCenterHome', //用户中心首页
    data() {
        return {
            //侧边栏
            asideList: [{
                icon: [
                	require('../../assets/img/userCenter/yonghu1.png'),
                	require('../../assets/img/userCenter/yonghu2.png')
                ],
                name: '用户管理',
                links: 'userList'
            }, {
                icon: [
                	require('../../assets/img/userCenter/quanxianguanli1.png'),
                	require('../../assets/img/userCenter/quanxianguanli2.png')
                ],
                name: '权限管理',
                links: 'roleList'
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
            isActive: false
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
            this.$router.push({name:links});
        }
    }
}
</script>

<style lang="scss" scoped type="text/css">
.userCenterHome {
    height: 100%;
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
    .el-aside {
        background-color: #ffffff;
        width:10vw;
        li {
            width: 100%;
            height: 54px;
            line-height: 54px;
            background-color: #fff;
            border-left: 3px solid #fff;
            img {
                margin: 0 15px 0 43px;
            }
            span {
                font-family: 'MicrosoftYaHei';
                font-size: 14px;
                color: #101010;
                cursor: pointer;
            }
            &.active {
                background-color: #eef1f7;
                border-left: 3px solid #61adf8;
                span {
                    color: #3f78f6;
                }
            }
        }
    }
    .el-container {
        height: 100%;
    }
    .platformContainer {
        background-color: #eef1f7;
        height: calc(100% - 60px);
    }
    .el-main {
        padding: 30px;
        width:500px;
        height: 500px;
    }
}
</style>
