<template>
<el-container class="userCenterHome">
    <el-header>
        <img src="../../assets/img/dhLogo.png" title="dahanglianke" alt="大航联科logo">
        <span>用户中心</span>
    </el-header>
    <el-container class="platformContainer">
        <el-tabs type="border-card" tab-position="left" :before-leave="beforeLeave">
            <el-tab-pane v-for="(aside,index) in asideList" :key="aside.name+index">
                <span slot="label">
				    	<img :src="activeIndex == index ? aside.icon[1] : aside.icon[0]" alt="菜单图标">{{aside.name}}
				    </span>
                <el-row v-if="activeIndex == index">
                    <el-col :span="24">
                        <currMenu :key="aside.name+index"></currMenu>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-container>
</el-container>
</template>

<script>
import Vue from 'vue'
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

    },
    data() {
        return {
            oldAsideList: [//原始侧边栏菜单
            	{
                    icon: [
                        require('../../assets/img/userCenter/yonghu1.png'),
                        require('../../assets/img/userCenter/yonghu2.png')
                    ],
                    name: '用户管理',
                    links: '/userList',
                    powerName:'user:view',
                },
                {
                    icon: [
                        require('../../assets/img/userCenter/quanxianguanli1.png'),
                        require('../../assets/img/userCenter/quanxianguanli2.png')
                    ],
                    name: '权限管理',
                    links: '/roleList',
                    powerName:'role:view'
                },
                {
                    icon: [
                    	require('../../assets/img/userCenter/zuzhijiagou1.png'),
                    	require('../../assets/img/userCenter/zuzhijiagou2.png')
                    ],
                    name: '组织架构',
                    links: '/deptList',
                    powerName:'dept:view'
                }
            ],
            asideList:[],//显示的菜单列表
            activeIndex: 0//点击当前元素的index
        }
    },
    created() {
    	this.menuPower();//左侧菜单权限
		this.loadComponent(this.asideList[0].links);//加载组件
    },
    mounted() {

    },
    computed: {

    },
    methods: {
    	/**
    	 * 左侧菜单权限
    	 */
    	menuPower(){
    		var self = this;
    		let powerList = this.$store.state.operationAuthority;
    		if(powerList.length > 0){
    			let newList = [];
    			self.oldAsideList.forEach(function(item,index){
    				let bMenuExist = self.hasPermission(item.powerName);
    				if(bMenuExist){
    					newList.push(item);
    				}
    			});
    			self.asideList = newList;
    		}else{
    			self.asideList = newList;
    		}
    	},
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
			this.loadComponent(this.asideList[this.activeIndex].links);//加载组件
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
        },
        /**
         * 加载组件
         */
		loadComponent(componentPath) {
			let routers = this.$router.options.routes;
			let currComponent = '';
			for(let i=0;i<routers.length;i++){
				if(componentPath == routers[i].path){
					currComponent = routers[i].component;
					break;
				}
			}
			Vue.component('currMenu',currComponent);
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
            height: 100%;
            overflow: auto;
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
        min-height: calc(100% - 60px);
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
