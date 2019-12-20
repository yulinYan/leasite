<template>
	<el-dialog ref="xhzqDialog" :width="width"  class="xhzqDialog" :title="Object.name" :fullscreen="isfullscreen" :modal="false" :visible.sync="dialogVisible"  :append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true" :show-close="false"  :class="isminimize? 'isminimize': ''" center>
		<div v-show="!isminimize" slot="title" class="medium">
			<div class="centers"><span>{{appObj.name}}</span></div>
			<div class="icons">
				<i class="el-icon-minus" style="font-size: 24px" @click="minimize"></i>
				<i :class="isfullscreen? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline' " style="font-size: 24px" @click="IsFullscreen"></i>
				<i class="el-icon-close" style="font-size: 24px" @click="closeDialog"></i>
			</div>
		</div>
		<div v-show="!isminimize" class="dialogBody">
			<iframe :src="appObj.path" id="mobsf" scrolling="no" frameborder="0" style="width: 100%;height: 100%;"></iframe>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		name: 'DialogUrl', //弹框打开第三方应用
		props: {
			width:{//显示宽度
				type: String,
				default: '70%'
			},
			appObj: {//选中的第三方应用对象
				type: Object,
				required:true
			}
		},
		data() {
			return {
				isfullscreen: false, // 全屏
				isminimize: false, // 最小化
				dialogVisible: false, // 隐藏弹窗
				username:this.$store.state.user.username,
				leansiteToken:this.$store.state.token,
			}
		},
		created() {
			this.appObj.path +="?username="+this.username+"&leansiteToken="+this.leansiteToken;
			this.openDialog();
		},
		watch: {
			dialogVisible(val) {
				if(val) {
					const el = this.$refs.xhzqDialog.$el.querySelector('.el-dialog')
					el.style.left = 0
					el.style.top = 0
				}
			}
		},
		methods: {
			// 最小化
			minimize() {
				this.dialogVisible = false;
				this.isminimize = !this.isminimize
				if(this.isfullscreen) this.isfullscreen = !this.isfullscreen
			},
			// 关闭弹窗
			closeDialog() {
				this.$emit('callBackFun',this.appObj);
				this.dialogVisible = false
			},
			// 打开弹窗
			openDialog() {
				this.dialogVisible = true
			},
			// 全屏
			IsFullscreen() {
				this.isfullscreen = !this.isfullscreen
				if(this.isfullscreen) this.$emit('isfullscreen')
			}
		},
		mounted() {

		},
		destroyed() {

		}
	}
</script>
<style lang="scss" type="text/css" scoped>
	.el-dialog {
		margin-top: 10vh!important;
	}
	
	.no_select {
		-webkit-touch-callout: none;
		/* iOS Safari */
		-webkit-user-select: none;
		/* Chrome/Safari/Opera */
		-khtml-user-select: none;
		/* Konqueror */
		-moz-user-select: none;
		/* Firefox */
		-ms-user-select: none;
		/* Internet Explorer/Edge */
		user-select: none;
		/* Non-prefixed version, currently */
	}
	
	.isminimize{
		left: 20px;
		bottom: 20px;
		top: auto;
		right: auto;
		overflow: hidden;
		.el-dialog{
			margin: 0 !important;
			width: 240px !important;
			height: 40px;
			top: 0 !important;
			left: 0 !important;
		}
		.el-dialog__header{
			cursor: auto!important;
			.el-dialog__headerbtn{
				display: none;
			}
		}
		.dialogFooter{
			position: absolute;
			bottom: 0;
		}
	}
	
	.xhzqDialog{
		min-height: 600px;
		.is-fullscreen{
			width: 100% !important;
			left: 0 !important;
			top: 0 !important;
			margin-top: 0 !important;
			overflow: hidden;
			position: relative;
			.el-dialog__header{
				cursor: auto!important;
			}
			.el-dialog__body{
				height: 100%;
				.dialogBody{
					height: 100%!important;
					max-height: none!important;
					padding-bottom: 120px!important;
				}
			}
			.dialogFooter{
				position: absolute;
				bottom: 0;
				width: 100%;
				background: #fff;
			}
		}
		.el-dialog {
			.el-dialog__header{
				width: 100%;
				height: 48px;
			    line-height: 48px;
			    padding: 0 20px !important;
			    color: #303030;
			    border-bottom: solid 1px #d9e3f3 !important;
				display: flex;
				@extend .no_select;
				cursor: auto;
				.medium{
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.centers{
						span {
							text-align: center;
							font-size: 16px;
							color: #606266;
						}
					}
					.icons{
						height: 21px;
						display: flex;
						justify-content: flex-end;
						i{
							color: #5f6368;
							font-size: 18px!important;
							display: block;
							padding: 0 7px;
						}
						i:hover {
							background: #dcdfe6;
							cursor: pointer;
						}
						.el-icon-close:hover {
							background: #f00;
							color: #fff;
						}
					}
				}
				.horn{
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: space-between;
					div{
						i{
							color: #5f6368;
							font-size: 20px!important;
						}
					}
					.lefts {
						flex: 4;
						margin-top: 3px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						span {
							font-size: 16px;
							color: #606266;
						}
					}
					.centers {
						flex: 1;
					}
					.rights {
						flex: 1;
					}
					i:hover {
						cursor: pointer;
						color: #000;
					}
				}
				.el-dialog__headerbtn {
					top: 0;
					font-size: 24px;
				}
			}
			.el-dialog__body {
				padding: 1px !important;
				.dialogBody {
					max-height: calc(80vh - 50px);
					overflow: auto;
					padding: 0 !important;
					background: #f7f9fc;
					&::-webkit-scrollbar {
						width: 4px;
						height: 8px;
					}
					&::-webkit-scrollbar-thumb {
						background: transparent;
						border-radius: 4px;
					}
					&:hover::-webkit-scrollbar-thumb {
						background: hsla(0, 0%, 53%, .4)
					}
					&:hover::-webkit-scrollbar-track {
						background: hsla(0, 0%, 53%, .1)
					}
				}
				.dialogFooter {
					padding: 10px 15px;
					border-top: 1px solid #ccc;
					text-align: right;
					.el-button {
						padding: 7px 15px;
					}
				}
			}
		}
		.xhzqDialog {
			.el-select {
				width: 100%;
			}
			.el-date-editor {
				width: 100%;
			}
		}
		/deep/ .el-dialog--center{
			.el-dialog__header{
					height: 48px;
				    padding: 0 20px !important;
				    color: #303030;
				    border-bottom: solid 1px #d9e3f3 !important;
				}
			.el-dialog__body{
				padding: 0;
			}
		}
	}
</style>