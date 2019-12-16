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
                    <li v-for="(item,index) in asideList" :key="index" :class="item.isactive ? 'active' : '' " @click='asideClick(index)'><img :src="item.isactive ? item.icon[1]:item.icon[0]" alt="">
                        <router-link :to="item.route">{{item.name}}</router-link>
                    </li>
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
                icon: [require('../../assets/img/internetPlatform/shouye1.png'), require('../../assets/img/internetPlatform/shouye2.png')],
                name: '信息总览',
                route: '/internetPlatform/Overview',
                isactive: false
            }, {
                icon: [require('../../assets/img/internetPlatform/zichan1.png'), require('../../assets/img/internetPlatform/zichan2.png')],
                name: '资产中心',
                route: '/internetPlatform/Asset',
                isactive: false
            }, {
                icon: [require('../../assets/img/internetPlatform/caijishebei1.png'), require('../../assets/img/internetPlatform/caijishebei2.png')],
                name: '采集设备',
                route: '/internetPlatform/Overview',
                isactive: false
            }, ],
        }
    },
    created() {

    },
    mounted() {
        this.asideClick();
    },
    computed: {

    },
    methods: {
        //点击侧边栏
        asideClick(index) {
            this.$nextTick(() => {
                this.asideList.forEach((v, i) => {
                    if (index === undefined) {
                        if (location.hash.includes(v.route)) {
                            v.isactive = true;
                        } else {
                            v.isactive = false;
                        }
                    } else {
                        if (i == index) {
                            v.isactive = true;
                        } else {
                            v.isactive = false;
                        }
                    }
                })
            });
        },
    }
}
</script>

<style lang="scss" scoped type="text/css">
.internetPlatform {
    a:link {
        text-decoration: none;
        /* 指正常的未被访问过的链接*/
    }
    a:visited {
        text-decoration: none;
        /*指已经访问过的链接*/
    }
    a:hover {
        text-decoration: none;
        /*指鼠标在链接*/
    }
    a:active {
        text-decoration: none;
        /* 指正在点的链接*/
    }
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
        overflow-x: hidden;
        overflow-y: auto;
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
