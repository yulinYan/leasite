<template>
<div class="internetPlatform">
    <el-container>
        <el-header>
            <img :src="require('../../assets/img/dhLogo.png')" alt="">
            <span>物联网平台</span>
        </el-header>
        <el-container class="platformContainer">
            <el-aside width="180px">
                <ul>
                    <li v-for="(item,index) in asideList" :key="index" :class="isactive == index ? 'active' : '' " @click='asideClick(index,item.route)'><img :src="item.icon" alt=""><span v-cloak>{{item.name}}</span></li>
                </ul>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    name: 'internetPlatform', //物联网平台
    components: {},
    props: [],
    data() {
        return {
            //侧边栏
            asideList: [{
                icon: require('../../assets/img/internetPlatform/shouye1.png'),
                name: '信息总览',
                route: 'Overview'
            }, {
                icon: require('../../assets/img/internetPlatform/zichan1.png'),
                name: '资产中心',
                route: 'Overview'
            }, {
                icon: require('../../assets/img/internetPlatform/caijishebei1.png'),
                name: '采集设备',
                route: 'Overview'
            }, ],
            //点击当前元素的index
            isactive: false
        }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
        //点击侧边栏
        asideClick(index, route) {
            this.isactive = index;
            this.$router.push({
                path: route
            });
        }
    }
}
</script>

<style lang="scss" scoped type="text/css">
.internetPlatform {
    height: 100%;
    header {
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
    }
}
</style>
