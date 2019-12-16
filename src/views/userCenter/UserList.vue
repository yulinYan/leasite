<template>
    <el-container class="userList">
        <el-header>
            <el-row>
			  <el-col :span="12">
			  	<span>用户管理</span>
			  </el-col>
			  <el-col :span="12">
			  	<el-button type="text" icon="el-icon-plus">新增用户</el-button>
			  	<el-button type="text" icon="el-icon-delete">批量删除</el-button>
			  	<el-input
				   placeholder="输入内容搜索"
				   suffix-icon="el-icon-search"
				   v-model="searchText">
				</el-input>
			  </el-col>
			</el-row>
        </el-header>
        <el-main>
            
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'UserList', //用户列表
    components: {},
    props: [],
    data() {
        return {
            searchText:""
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
        asideClick(index, route) {
           
        }
    }
}
</script>

<style lang="scss" scoped type="text/css">
.userList {
    height: 100%;
    header {
        height: 60px;
        background-color: #ffffff;
    }
    .el-container {
        height: 100%;
    }
    .el-main {
        padding: 30px;
    }
}
</style>
