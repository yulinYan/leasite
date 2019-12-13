<template>
    <div class="wrapper" @click="handleGlobalClick">
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import vTags from '../components/Tags.vue';
    import bus from '../common/bus.js';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                isMount:false,//是否挂载组件
                initTime:new Date().getTime()
            }
        },
        components:{},
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
		mounted(){
        	if(this.$store.state.user && !this.$store.state.user.token){
        		this.isMount = false;
        		//this.commonFun.againLogin(true);
        		return;
        	}else{
        		this.isMount = true;
        	}
		},
		destroyed(){

		},
		methods:{

		}
    }
</script>
<style lang="scss" scoped>
	.wrapper{
		.v-head{
			height: 40px;
			font-size: 16px;
		}
		.content-box{
			.content{
				width: 100%;
				/*height: auto;*/
				overflow-x: auto;
				padding: 10px;
				overflow-y: hidden;
				.el-container{
					min-width: 1126px;

					/*min-height: 698px;*/
				}
				.container{
					padding: 10px 30px 0;
				}
				.app-breadcrumb.el-breadcrumb{
					display: block;
					background-color: #fff;
					font-size: 17px;
				    height: 46px;
				    line-height: 46px;
				    padding: 0 0 0 20px;
				    margin-left: 0;
				    border-radius: 5px 5px 0 0;
				}
				.app-breadcrumb.el-breadcrumb .no-redirect{
				    font-weight: bold;
				}
			}
		}
	}
	/deep/ .el-dialog__body{
		padding: 20px 0 20px !important;
	}
</style>
