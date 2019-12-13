<template>
	<el-breadcrumb v-if="levelList.length > 1" class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
				<span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
				<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
	import pathToRegexp from 'path-to-regexp'
	export default {
		name:'Breadcrumb',
		data() {
			return {
				levelList: null
			}
		},
		watch: {
			$route(route) {
				// if you go to the redirect page, do not update the breadcrumbs
				if(route.path.startsWith('/redirect/')) {
					return
				}
				this.getBreadcrumb();
			}
		},
		created() {
			this.getBreadcrumb();
		},
		methods: {
			getBreadcrumb() {
				// only show routes with meta.title
				let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
				const first = matched[0];
				if(!this.isIndex(first)) {
					matched = [{
						path: '/index',
						meta: {
							title: '首页'
						}
					}].concat(matched);
				}
				//按照返回的菜单名称修改点击的菜单名称
				if(this.$store.state.mainInfo && this.$store.state.mainInfo.myUserMenus){
					let myUserMenus = this.$store.state.mainInfo.myUserMenus;
					for(let i=0;i<myUserMenus.length;i++){
						if(myUserMenus[i].url == this.$route.matched[1].path){
							this.$route.matched[1].meta.title =myUserMenus[i].text;
							break;
						}
					}
				}
				this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
			},
			isIndex(route) {
				const name = route && route.name;
				if(!name) {
					return false;
				}
				return name.trim().toLocaleLowerCase() === 'index'.toLocaleLowerCase();
			},
			pathCompile(path) {
				// To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
				const {
					params
				} = this.$route;
				var toPath = pathToRegexp.compile(path);
				return toPath(params);
			},
			handleLink(item) {
				const {
					redirect,
					path
				} = item;
				if(redirect) {
					this.$router.push(redirect);
					return;
				}
				this.$router.push(this.pathCompile(path));
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-breadcrumb.el-breadcrumb {
	    display: inline-block;
	    font-size: 17px;
	    height: 46px;
	    line-height: 46px;
	    padding: 0 0 0 20px;
	    .transition-group{
		    .el-breadcrumb-item{
		    	span,a{
		    		font-weight: 500 !important;
		    	}
				.no-redirect {
					color: #97a8be;
					cursor: text;
				}	    	
			}
	    }
		/deep/ .el-breadcrumb__inner a, 
    	/deep/ .el-breadcrumb__inner.is-link{
    		font-weight: 500 !important;
    	}
	}
</style>