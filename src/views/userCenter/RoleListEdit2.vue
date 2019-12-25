<template>
    <div class="box">
        <div class="top"><div class="text">超级管理员</div></div>
        <div class="RoleListEdit">
            <el-table
                :data="children"
                :span-method="objectSpanMethod"
                stripe
                border
                class="tableBox"

                :cell-style="cellStyle"
                :header-cell-style="{background:'#f2f4f6',padding:'0',color:'#101010'}"
                style="width: 100%;">
                <el-table-column
                    label="模块一"
                    align="center"
                    width="154">
                    <!--                    全选复选框-->
                    <template slot-scope="scope">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllBoss" @change="handleCheckAllChange">全</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="模块二"
                    align="center"
                    width="154">
                    <template slot-scope="scope">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    label="模块三">
                    <template slot-scope="scope">
                        <el-checkbox-group class="checkbox-group" v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox class="model3_checkbox" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州dddd', '深圳深圳不错不错挺好的吧撒旦士大发生的打发撒旦我','上海', '北京', '广州', '深圳','上海', '北京', '广州', '深圳','上海',
        '北京', '广州', '深圳','上海', '北京', '广州', '深圳不错不错','上海', '北京', '广州', '深圳','上海', '北京', '广州', '深圳',];
    export default {
        name: "RoleListEdit",
        data() {
            return {
                // 复选框数据
                checkAllBoss:false,
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                isIndeterminate: false,
                // 表格数据
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',

                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: ['234','2344','56']
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                // model[{
                //     // model1
                //     "name":"首页",
                //     "checked":true,
                //     models:[
                //         {
                //             "name":"首页",
                //             "checked":true,
                //         }
                //     ]
                // }]
                "ids": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "8",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "58",
                    "59",
                    "61",
                    "64",
                    "65",
                    "66",
                    "67",
                    "101",
                    "102",
                    "103",
                    "104",
                    "105",
                    "106",
                    "107",
                    "108",
                    "109",
                    "110",
                    "113",
                    "121",
                    "122",
                    "123",
                    "124",
                    "127",
                    "128",
                    "129",
                    "130",
                    "131",
                    "132",
                    "133",
                    "134",
                    "135",
                    "136",
                    "137",
                    "138",
                    "4819",
                    "4820",
                    "4821",
                    "4822",
                    "4823",
                    "4824",
                    "4825",
                    "4826",
                    "4827",
                    "4828",
                    "4829",
                    "4830",
                    "4831",
                    "4832",
                    "4833",
                    "4834",
                    "4835",
                    "4836",
                    "4837",
                    "4838",
                    "4839",
                    "4840",
                    "4841",
                    "4842",
                    "4843",
                    "4844",
                    "4845",
                    "4846",
                    "4847",
                    "4848",
                    "4849",
                    "4850",
                    "4851",
                    "4852",
                    "4853",
                    "4854",
                    "4855",
                    "4856",
                    "4857",
                    "4858",
                    "4859",
                    "4860",
                    "4861",
                    "4862",
                    "4863",
                    "4864",
                    "4865",
                    "4866"
                ],
                "children": [
                    {
                        "id": "1",
                        "key": "1",
                        "icon": "appstore-o",
                        "title": "系统管理",
                        "text": "系统管理",
                        "type": "0",
                        "order": 1.0,
                        "path": "/system",
                        "component": "PageView",
                        "children": [
                            {
                                "id": "3",
                                "key": "3",
                                "icon": "",
                                "title": "用户管理",
                                "text": "用户管理",
                                "permission": "user:view",
                                "type": "1",
                                "order": 1.0,
                                "path": "/system/user",
                                "component": "system/user/User",
                                "children": [
                                    {
                                        "id": "11",
                                        "key": "11",
                                        "title": "新增用户",
                                        "text": "新增用户",
                                        "permission": "user:add",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "3",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:02:58"
                                    },
                                    {
                                        "id": "12",
                                        "key": "12",
                                        "title": "修改用户",
                                        "text": "修改用户",
                                        "permission": "user:update",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "3",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:04:07"
                                    },
                                    {
                                        "id": "13",
                                        "key": "13",
                                        "title": "删除用户",
                                        "text": "删除用户",
                                        "permission": "user:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "3",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:04:58"
                                    },
                                    {
                                        "id": "130",
                                        "key": "130",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "user:export",
                                        "type": "2",
                                        "parentId": "3",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:35:16"
                                    },
                                    {
                                        "id": "135",
                                        "key": "135",
                                        "title": "密码重置",
                                        "text": "密码重置",
                                        "permission": "user:reset",
                                        "type": "2",
                                        "parentId": "3",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:37:00"
                                    }
                                ],
                                "parentId": "1",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2017-12-28 00:47:13",
                                "modifyTime": "2019-01-22 14:45:55"
                            },
                            {
                                "id": "4",
                                "key": "4",
                                "icon": "",
                                "title": "角色管理",
                                "text": "角色管理",
                                "permission": "role:view",
                                "type": "1",
                                "order": 2.0,
                                "path": "/system/role",
                                "component": "system/role/Role",
                                "children": [
                                    {
                                        "id": "14",
                                        "key": "14",
                                        "title": "新增角色",
                                        "text": "新增角色",
                                        "permission": "role:add",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "4",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:06:38"
                                    },
                                    {
                                        "id": "15",
                                        "key": "15",
                                        "title": "修改角色",
                                        "text": "修改角色",
                                        "permission": "role:update",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "4",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:06:38"
                                    },
                                    {
                                        "id": "16",
                                        "key": "16",
                                        "title": "删除角色",
                                        "text": "删除角色",
                                        "permission": "role:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "4",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:06:38"
                                    },
                                    {
                                        "id": "131",
                                        "key": "131",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "role:export",
                                        "type": "2",
                                        "parentId": "4",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:35:36"
                                    },
                                    {
                                        "id": "4866",
                                        "key": "4866",
                                        "title": "添加角色添加人员",
                                        "text": "添加角色添加人员",
                                        "permission": "role:addRoleAndUser",
                                        "type": "2",
                                        "order": 7.0,
                                        "path": "/role/addRoleAndUser",
                                        "component": "/role/addRoleAndUser",
                                        "parentId": "4",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-21 02:05:54",
                                        "modifyTime": "2019-12-21 02:05:54"
                                    }
                                ],
                                "parentId": "1",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2017-12-28 00:48:09",
                                "modifyTime": "2018-04-25 17:01:12"
                            },
                            {
                                "id": "5",
                                "key": "5",
                                "icon": "",
                                "title": "菜单管理",
                                "text": "菜单管理",
                                "permission": "menu:view",
                                "type": "1",
                                "order": 3.0,
                                "path": "/system/menu",
                                "component": "system/menu/Menu",
                                "children": [
                                    {
                                        "id": "17",
                                        "key": "17",
                                        "title": "新增菜单",
                                        "text": "新增菜单",
                                        "permission": "menu:add",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "5",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:08:02"
                                    },
                                    {
                                        "id": "18",
                                        "key": "18",
                                        "title": "修改菜单",
                                        "text": "修改菜单",
                                        "permission": "menu:update",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "5",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:08:02"
                                    },
                                    {
                                        "id": "19",
                                        "key": "19",
                                        "title": "删除菜单",
                                        "text": "删除菜单",
                                        "permission": "menu:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "5",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:08:02"
                                    },
                                    {
                                        "id": "132",
                                        "key": "132",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "menu:export",
                                        "type": "2",
                                        "parentId": "5",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:36:05"
                                    }
                                ],
                                "parentId": "1",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2017-12-28 00:48:57",
                                "modifyTime": "2018-04-25 17:01:30"
                            },
                            {
                                "id": "6",
                                "key": "6",
                                "icon": "",
                                "title": "部门管理",
                                "text": "部门管理",
                                "permission": "dept:view",
                                "type": "1",
                                "order": 4.0,
                                "path": "/system/dept",
                                "component": "system/dept/Dept",
                                "children": [
                                    {
                                        "id": "20",
                                        "key": "20",
                                        "title": "新增部门",
                                        "text": "新增部门",
                                        "permission": "dept:add",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "6",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:09:24"
                                    },
                                    {
                                        "id": "21",
                                        "key": "21",
                                        "title": "修改部门",
                                        "text": "修改部门",
                                        "permission": "dept:update",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "6",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:09:24"
                                    },
                                    {
                                        "id": "22",
                                        "key": "22",
                                        "title": "删除部门",
                                        "text": "删除部门",
                                        "permission": "dept:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "6",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:09:24"
                                    },
                                    {
                                        "id": "133",
                                        "key": "133",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "dept:export",
                                        "type": "2",
                                        "parentId": "6",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:36:25"
                                    }
                                ],
                                "parentId": "1",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2017-12-28 00:57:33",
                                "modifyTime": "2018-04-25 17:01:40"
                            },
                            {
                                "id": "64",
                                "key": "64",
                                "icon": "",
                                "title": "字典管理",
                                "text": "字典管理",
                                "permission": "dict:view",
                                "type": "1",
                                "order": 5.0,
                                "path": "/system/dict",
                                "component": "system/dict/Dict",
                                "children": [
                                    {
                                        "id": "65",
                                        "key": "65",
                                        "title": "新增字典",
                                        "text": "新增字典",
                                        "permission": "dict:add",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "64",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-01-19 03:10:08"
                                    },
                                    {
                                        "id": "66",
                                        "key": "66",
                                        "title": "修改字典",
                                        "text": "修改字典",
                                        "permission": "dict:update",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "64",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-01-19 03:10:27"
                                    },
                                    {
                                        "id": "67",
                                        "key": "67",
                                        "title": "删除字典",
                                        "text": "删除字典",
                                        "permission": "dict:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "64",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-01-19 03:10:47"
                                    },
                                    {
                                        "id": "134",
                                        "key": "134",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "dict:export",
                                        "type": "2",
                                        "parentId": "64",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:36:43"
                                    }
                                ],
                                "parentId": "1",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2018-01-18 18:38:25",
                                "modifyTime": "2018-04-25 17:01:50"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2017-12-28 00:39:07",
                        "modifyTime": "2019-01-05 19:13:14"
                    },
                    {
                        "id": "2",
                        "key": "2",
                        "icon": "dashboard",
                        "title": "系统监控",
                        "text": "系统监控",
                        "type": "0",
                        "order": 2.0,
                        "path": "/monitor",
                        "component": "PageView",
                        "children": [
                            {
                                "id": "8",
                                "key": "8",
                                "icon": "",
                                "title": "在线用户",
                                "text": "在线用户",
                                "permission": "user:online",
                                "type": "1",
                                "order": 1.0,
                                "path": "/monitor/online",
                                "component": "monitor/Online",
                                "children": [
                                    {
                                        "id": "23",
                                        "key": "23",
                                        "title": "踢出用户",
                                        "text": "踢出用户",
                                        "permission": "user:kickout",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "8",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:11:13"
                                    }
                                ],
                                "parentId": "2",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2017-12-28 00:59:33",
                                "modifyTime": "2018-04-25 17:02:04"
                            },
                            {
                                "id": "10",
                                "key": "10",
                                "icon": "",
                                "title": "系统日志",
                                "text": "系统日志",
                                "permission": "log:view",
                                "type": "1",
                                "order": 2.0,
                                "path": "/monitor/systemlog",
                                "component": "monitor/SystemLog",
                                "children": [
                                    {
                                        "id": "24",
                                        "key": "24",
                                        "title": "删除日志",
                                        "text": "删除日志",
                                        "permission": "log:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "10",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2017-12-28 01:11:45"
                                    },
                                    {
                                        "id": "136",
                                        "key": "136",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "log:export",
                                        "type": "2",
                                        "parentId": "10",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:37:27"
                                    }
                                ],
                                "parentId": "2",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2017-12-28 01:00:50",
                                "modifyTime": "2018-04-25 17:02:18"
                            },
                            {
                                "id": "113",
                                "key": "113",
                                "icon": "",
                                "title": "Redis监控",
                                "text": "Redis监控",
                                "permission": "redis:view",
                                "type": "2",
                                "order": 3.0,
                                "path": "/monitor/redis/info",
                                "component": "monitor/RedisInfo",
                                "parentId": "2",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2018-06-28 22:29:42"
                            },
                            {
                                "id": "121",
                                "key": "121",
                                "title": "请求追踪",
                                "text": "请求追踪",
                                "type": "2",
                                "order": 4.0,
                                "path": "/monitor/httptrace",
                                "component": "monitor/Httptrace",
                                "parentId": "2",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-01-18 10:30:29"
                            },
                            {
                                "id": "122",
                                "key": "122",
                                "title": "系统信息",
                                "text": "系统信息",
                                "type": "2",
                                "order": 5.0,
                                "path": "/monitor/system",
                                "component": "EmptyPageView",
                                "children": [
                                    {
                                        "id": "123",
                                        "key": "123",
                                        "title": "Tomcat信息",
                                        "text": "Tomcat信息",
                                        "type": "2",
                                        "order": 2.0,
                                        "path": "/monitor/system/tomcatinfo",
                                        "component": "monitor/TomcatInfo",
                                        "parentId": "122",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-18 10:32:53",
                                        "modifyTime": "2019-01-18 10:46:57"
                                    },
                                    {
                                        "id": "124",
                                        "key": "124",
                                        "title": "JVM信息",
                                        "text": "JVM信息",
                                        "type": "2",
                                        "order": 1.0,
                                        "path": "/monitor/system/jvminfo",
                                        "component": "monitor/JvmInfo",
                                        "parentId": "122",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-18 10:33:30",
                                        "modifyTime": "2019-01-18 10:46:51"
                                    },
                                    {
                                        "id": "127",
                                        "key": "127",
                                        "title": "服务器信息",
                                        "text": "服务器信息",
                                        "type": "2",
                                        "order": 3.0,
                                        "path": "/monitor/system/info",
                                        "component": "monitor/SystemInfo",
                                        "parentId": "122",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-21 15:53:43",
                                        "modifyTime": "2019-01-21 15:57:00"
                                    }
                                ],
                                "parentId": "2",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2019-01-18 10:31:48",
                                "modifyTime": "2019-01-18 10:39:46"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2017-12-28 00:45:51",
                        "modifyTime": "2019-01-23 14:27:12"
                    },
                    {
                        "id": "58",
                        "key": "58",
                        "icon": "compass",
                        "title": "网络资源",
                        "text": "网络资源",
                        "type": "1",
                        "order": 4.0,
                        "path": "/web",
                        "component": "PageView",
                        "children": [
                            {
                                "id": "59",
                                "key": "59",
                                "icon": "",
                                "title": "天气查询",
                                "text": "天气查询",
                                "permission": "weather:view",
                                "type": "2",
                                "order": 1.0,
                                "path": "/web/weather",
                                "component": "web/Weather",
                                "parentId": "58",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2018-01-12 23:40:02",
                                "modifyTime": "2019-01-22 13:43:19"
                            },
                            {
                                "id": "61",
                                "key": "61",
                                "icon": "",
                                "title": "每日一文",
                                "text": "每日一文",
                                "permission": "article:view",
                                "type": "2",
                                "order": 2.0,
                                "path": "/web/dailyArticle",
                                "component": "web/DailyArticle",
                                "parentId": "58",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2018-01-16 01:17:14",
                                "modifyTime": "2019-01-22 13:43:27"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2018-01-12 23:28:48",
                        "modifyTime": "2018-01-23 03:49:26"
                    },
                    {
                        "id": "101",
                        "key": "101",
                        "icon": "clock-circle-o",
                        "title": "任务调度",
                        "text": "任务调度",
                        "type": "0",
                        "order": 3.0,
                        "path": "/job",
                        "component": "PageView",
                        "children": [
                            {
                                "id": "102",
                                "key": "102",
                                "icon": "",
                                "title": "定时任务",
                                "text": "定时任务",
                                "permission": "job:view",
                                "type": "1",
                                "order": 1.0,
                                "path": "/job/job",
                                "component": "quartz/job/Job",
                                "children": [
                                    {
                                        "id": "103",
                                        "key": "103",
                                        "title": "新增任务",
                                        "text": "新增任务",
                                        "permission": "job:add",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-24 23:55:10"
                                    },
                                    {
                                        "id": "104",
                                        "key": "104",
                                        "title": "修改任务",
                                        "text": "修改任务",
                                        "permission": "job:update",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-24 23:55:53"
                                    },
                                    {
                                        "id": "105",
                                        "key": "105",
                                        "title": "删除任务",
                                        "text": "删除任务",
                                        "permission": "job:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-24 23:56:18"
                                    },
                                    {
                                        "id": "106",
                                        "key": "106",
                                        "title": "暂停任务",
                                        "text": "暂停任务",
                                        "permission": "job:pause",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-24 23:57:08"
                                    },
                                    {
                                        "id": "107",
                                        "key": "107",
                                        "title": "恢复任务",
                                        "text": "恢复任务",
                                        "permission": "job:resume",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-24 23:58:21"
                                    },
                                    {
                                        "id": "108",
                                        "key": "108",
                                        "title": "立即执行任务",
                                        "text": "立即执行任务",
                                        "permission": "job:run",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-24 23:59:45"
                                    },
                                    {
                                        "id": "137",
                                        "key": "137",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "job:export",
                                        "type": "2",
                                        "parentId": "102",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:37:59"
                                    }
                                ],
                                "parentId": "101",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2018-02-24 23:53:53",
                                "modifyTime": "2019-01-22 13:42:50"
                            },
                            {
                                "id": "109",
                                "key": "109",
                                "icon": "",
                                "title": "调度日志",
                                "text": "调度日志",
                                "permission": "jobLog:view",
                                "type": "1",
                                "order": 2.0,
                                "path": "/job/log",
                                "component": "quartz/log/JobLog",
                                "children": [
                                    {
                                        "id": "110",
                                        "key": "110",
                                        "title": "删除日志",
                                        "text": "删除日志",
                                        "permission": "jobLog:delete",
                                        "type": "2",
                                        "path": "",
                                        "component": "",
                                        "parentId": "109",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2018-02-25 00:01:21"
                                    },
                                    {
                                        "id": "138",
                                        "key": "138",
                                        "title": "导出Excel",
                                        "text": "导出Excel",
                                        "permission": "jobLog:export",
                                        "type": "2",
                                        "parentId": "109",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-01-23 14:38:32"
                                    }
                                ],
                                "parentId": "101",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2018-02-25 00:00:45",
                                "modifyTime": "2019-01-22 13:42:59"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2018-01-11 23:52:57"
                    },
                    {
                        "id": "128",
                        "key": "128",
                        "icon": "coffee",
                        "title": "其他模块",
                        "text": "其他模块",
                        "type": "0",
                        "order": 5.0,
                        "path": "/others",
                        "component": "PageView",
                        "children": [
                            {
                                "id": "129",
                                "key": "129",
                                "title": "导入导出",
                                "text": "导入导出",
                                "type": "1",
                                "order": 1.0,
                                "path": "/others/excel",
                                "component": "others/Excel",
                                "parentId": "128",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-01-22 14:51:36",
                                "modifyTime": "2019-01-22 15:06:45"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2019-01-22 14:49:59",
                        "modifyTime": "2019-01-22 14:50:13"
                    },
                    {
                        "id": "4819",
                        "key": "4819",
                        "title": "应用管理",
                        "text": "应用管理",
                        "permission": "",
                        "type": "0",
                        "order": 5.0,
                        "path": "/app",
                        "component": "app_manager",
                        "children": [
                            {
                                "id": "4820",
                                "key": "4820",
                                "title": "应用添加",
                                "text": "应用添加",
                                "permission": "app:add",
                                "type": "1",
                                "order": 1.0,
                                "path": "/app/add",
                                "component": "app_manager",
                                "parentId": "4819",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-12-18 00:22:30",
                                "modifyTime": "2019-12-18 00:22:30"
                            },
                            {
                                "id": "4821",
                                "key": "4821",
                                "title": "获取应用",
                                "text": "获取应用",
                                "permission": "app:getAll",
                                "type": "1",
                                "order": 3.0,
                                "path": "/app/getAll",
                                "component": "app_manager",
                                "parentId": "4819",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-12-18 00:22:30",
                                "modifyTime": "2019-12-18 00:22:30"
                            },
                            {
                                "id": "4822",
                                "key": "4822",
                                "title": "应用修改",
                                "text": "应用修改",
                                "permission": "app:update",
                                "type": "1",
                                "order": 4.0,
                                "path": "/app/update",
                                "component": "/app/update",
                                "parentId": "4819",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-12-18 00:22:30",
                                "modifyTime": "2019-12-18 00:22:30"
                            },
                            {
                                "id": "4823",
                                "key": "4823",
                                "title": "应用删除",
                                "text": "应用删除",
                                "permission": "app:delte",
                                "type": "1",
                                "order": 5.0,
                                "path": "/app/delte",
                                "component": "/app/delte",
                                "parentId": "4819",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-12-18 00:22:30",
                                "modifyTime": "2019-12-18 00:22:30"
                            },
                            {
                                "id": "4865",
                                "key": "4865",
                                "icon": "",
                                "title": "应用是否可用",
                                "text": "应用是否可用",
                                "permission": "app:available",
                                "type": "1",
                                "order": 6.0,
                                "path": "/app/available",
                                "component": "/app/available",
                                "parentId": "4819",
                                "hasParent": true,
                                "hasChildren": false,
                                "createTime": "2019-12-19 00:16:57",
                                "modifyTime": "2019-12-19 00:17:00"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2019-12-18 00:22:30",
                        "modifyTime": "2019-12-18 00:22:30"
                    },
                    {
                        "id": "4824",
                        "key": "4824",
                        "icon": "",
                        "title": "运维中心",
                        "text": "运维中心",
                        "permission": "",
                        "type": "0",
                        "order": 1.0,
                        "path": "",
                        "component": "",
                        "children": [
                            {
                                "id": "4825",
                                "key": "4825",
                                "icon": "",
                                "title": "团队相关",
                                "text": "团队相关",
                                "permission": "",
                                "type": "1",
                                "order": 1.0,
                                "path": "",
                                "component": "",
                                "children": [
                                    {
                                        "id": "4829",
                                        "key": "4829",
                                        "icon": "",
                                        "title": "登入团队",
                                        "text": "登入团队",
                                        "permission": "tenant_access",
                                        "type": "2",
                                        "order": 1.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4830",
                                        "key": "4830",
                                        "icon": "",
                                        "title": "团队权限设置",
                                        "text": "团队权限设置",
                                        "permission": "manage_team_member_permissions",
                                        "type": "2",
                                        "order": 2.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4831",
                                        "key": "4831",
                                        "icon": "",
                                        "title": "开通数据中心",
                                        "text": "开通数据中心",
                                        "permission": "tenant_open_region",
                                        "type": "2",
                                        "order": 3.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4832",
                                        "key": "4832",
                                        "icon": "",
                                        "title": "查看插件信息",
                                        "text": "查看插件信息",
                                        "permission": "view_plugin",
                                        "type": "2",
                                        "order": 19.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4833",
                                        "key": "4833",
                                        "icon": "",
                                        "title": "插件管理",
                                        "text": "插件管理",
                                        "permission": "manage_plugin",
                                        "type": "2",
                                        "order": 20.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4834",
                                        "key": "4834",
                                        "icon": "",
                                        "title": "插件分享",
                                        "text": "插件分享",
                                        "permission": "share_plugin",
                                        "type": "2",
                                        "order": 21.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4835",
                                        "key": "4835",
                                        "icon": "",
                                        "title": "删除团队",
                                        "text": "删除团队",
                                        "permission": "drop_tenant",
                                        "type": "2",
                                        "order": 22.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4836",
                                        "key": "4836",
                                        "icon": "",
                                        "title": "移交所有权",
                                        "text": "移交所有权",
                                        "permission": "transfer_ownership",
                                        "type": "2",
                                        "order": 23.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4837",
                                        "key": "4837",
                                        "icon": "",
                                        "title": "修改团队名称",
                                        "text": "修改团队名称",
                                        "permission": "modify_team_name",
                                        "type": "2",
                                        "order": 24.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4838",
                                        "key": "4838",
                                        "icon": "",
                                        "title": "自定义角色",
                                        "text": "自定义角色",
                                        "permission": "tenant_manage_role",
                                        "type": "2",
                                        "order": 25.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4839",
                                        "key": "4839",
                                        "icon": "",
                                        "title": "应用导入导出",
                                        "text": "应用导入导出",
                                        "permission": "import_and_export_service",
                                        "type": "2",
                                        "order": 26.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4825",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    }
                                ],
                                "parentId": "4824",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2019-12-18 20:02:20",
                                "modifyTime": "2019-12-18 20:02:20"
                            },
                            {
                                "id": "4826",
                                "key": "4826",
                                "icon": "",
                                "title": "应用相关",
                                "text": "应用相关",
                                "permission": "",
                                "type": "1",
                                "order": 2.0,
                                "path": "",
                                "component": "",
                                "children": [
                                    {
                                        "id": "4840",
                                        "key": "4840",
                                        "icon": "",
                                        "title": "应用管理",
                                        "text": "应用管理",
                                        "permission": "manage_group",
                                        "type": "2",
                                        "order": 4.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4841",
                                        "key": "4841",
                                        "icon": "",
                                        "title": "查看应用信息",
                                        "text": "查看应用信息",
                                        "permission": "view_service",
                                        "type": "2",
                                        "order": 5.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4842",
                                        "key": "4842",
                                        "icon": "",
                                        "title": "部署应用",
                                        "text": "部署应用",
                                        "permission": "deploy_service",
                                        "type": "2",
                                        "order": 6.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4843",
                                        "key": "4843",
                                        "icon": "",
                                        "title": "创建应用",
                                        "text": "创建应用",
                                        "permission": "create_service",
                                        "type": "2",
                                        "order": 7.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4844",
                                        "key": "4844",
                                        "icon": "",
                                        "title": "删除应用",
                                        "text": "删除应用",
                                        "permission": "delete_service",
                                        "type": "2",
                                        "order": 8.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4845",
                                        "key": "4845",
                                        "icon": "",
                                        "title": "应用分享",
                                        "text": "应用分享",
                                        "permission": "share_service",
                                        "type": "2",
                                        "order": 9.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4846",
                                        "key": "4846",
                                        "icon": "",
                                        "title": "关闭应用",
                                        "text": "关闭应用",
                                        "permission": "stop_service",
                                        "type": "2",
                                        "order": 10.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4847",
                                        "key": "4847",
                                        "icon": "",
                                        "title": "启动应用",
                                        "text": "启动应用",
                                        "permission": "start_service",
                                        "type": "2",
                                        "order": 11.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4848",
                                        "key": "4848",
                                        "icon": "",
                                        "title": "重启应用",
                                        "text": "重启应用",
                                        "permission": "restart_service",
                                        "type": "2",
                                        "order": 12.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4849",
                                        "key": "4849",
                                        "icon": "",
                                        "title": "回滚应用",
                                        "text": "回滚应用",
                                        "permission": "rollback_service",
                                        "type": "2",
                                        "order": 13.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4850",
                                        "key": "4850",
                                        "icon": "",
                                        "title": "应用容器管理",
                                        "text": "应用容器管理",
                                        "permission": "manage_service_container",
                                        "type": "2",
                                        "order": 14.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4851",
                                        "key": "4851",
                                        "icon": "",
                                        "title": "应用伸缩管理",
                                        "text": "应用伸缩管理",
                                        "permission": "manage_service_extend",
                                        "type": "2",
                                        "order": 15.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4852",
                                        "key": "4852",
                                        "icon": "",
                                        "title": "应用配置管理",
                                        "text": "应用配置管理",
                                        "permission": "manage_service_config",
                                        "type": "2",
                                        "order": 16.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4853",
                                        "key": "4853",
                                        "icon": "",
                                        "title": "应用扩展管理",
                                        "text": "应用扩展管理",
                                        "permission": "manage_service_plugin",
                                        "type": "2",
                                        "order": 17.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4854",
                                        "key": "4854",
                                        "icon": "",
                                        "title": "应用权限设置",
                                        "text": "应用权限设置",
                                        "permission": "manage_service_member_perms",
                                        "type": "2",
                                        "order": 18.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4826",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    }
                                ],
                                "parentId": "4824",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2019-12-18 20:02:20",
                                "modifyTime": "2019-12-18 20:02:20"
                            },
                            {
                                "id": "4827",
                                "key": "4827",
                                "icon": "",
                                "title": "网关相关",
                                "text": "网关相关",
                                "permission": "",
                                "type": "1",
                                "order": 3.0,
                                "path": "",
                                "component": "",
                                "children": [
                                    {
                                        "id": "4855",
                                        "key": "4855",
                                        "icon": "",
                                        "title": "查看访问控制",
                                        "text": "查看访问控制",
                                        "permission": "access_control",
                                        "type": "2",
                                        "order": 27.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4827",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4856",
                                        "key": "4856",
                                        "icon": "",
                                        "title": "访问证书管理",
                                        "text": "访问证书管理",
                                        "permission": "certificate_management",
                                        "type": "2",
                                        "order": 28.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4827",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4857",
                                        "key": "4857",
                                        "icon": "",
                                        "title": "访问控制操作",
                                        "text": "访问控制操作",
                                        "permission": "control_operation",
                                        "type": "2",
                                        "order": 29.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4827",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4858",
                                        "key": "4858",
                                        "icon": "",
                                        "title": "证书管理操作",
                                        "text": "证书管理操作",
                                        "permission": "certificate_operation",
                                        "type": "2",
                                        "order": 30.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4827",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    }
                                ],
                                "parentId": "4824",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2019-12-18 20:02:20",
                                "modifyTime": "2019-12-18 20:02:20"
                            },
                            {
                                "id": "4828",
                                "key": "4828",
                                "icon": "",
                                "title": "第三方组件相关",
                                "text": "第三方组件相关",
                                "permission": "",
                                "type": "1",
                                "order": 4.0,
                                "path": "",
                                "component": "",
                                "children": [
                                    {
                                        "id": "4859",
                                        "key": "4859",
                                        "icon": "",
                                        "title": "添加实例",
                                        "text": "添加实例",
                                        "permission": "add_endpoint",
                                        "type": "2",
                                        "order": 31.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4828",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4860",
                                        "key": "4860",
                                        "icon": "",
                                        "title": "删除实例",
                                        "text": "删除实例",
                                        "permission": "delete_endpoint",
                                        "type": "2",
                                        "order": 32.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4828",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4861",
                                        "key": "4861",
                                        "icon": "",
                                        "title": "修改实例上下线",
                                        "text": "修改实例上下线",
                                        "permission": "put_endpoint",
                                        "type": "2",
                                        "order": 33.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4828",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4862",
                                        "key": "4862",
                                        "icon": "",
                                        "title": "编辑健康检测",
                                        "text": "编辑健康检测",
                                        "permission": "health_detection",
                                        "type": "2",
                                        "order": 34.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4828",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4863",
                                        "key": "4863",
                                        "icon": "",
                                        "title": "重置秘钥",
                                        "text": "重置秘钥",
                                        "permission": "reset_secret_key",
                                        "type": "2",
                                        "order": 35.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4828",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    },
                                    {
                                        "id": "4864",
                                        "key": "4864",
                                        "icon": "",
                                        "title": "创建第三方组件",
                                        "text": "创建第三方组件",
                                        "permission": "create_three_service",
                                        "type": "2",
                                        "order": 36.0,
                                        "path": "",
                                        "component": "",
                                        "parentId": "4828",
                                        "hasParent": true,
                                        "hasChildren": false,
                                        "createTime": "2019-12-18 20:02:20",
                                        "modifyTime": "2019-12-18 20:02:20"
                                    }
                                ],
                                "parentId": "4824",
                                "hasParent": true,
                                "hasChildren": true,
                                "createTime": "2019-12-18 20:02:20",
                                "modifyTime": "2019-12-18 20:02:20"
                            }
                        ],
                        "parentId": "0",
                        "hasParent": true,
                        "hasChildren": true,
                        "createTime": "2019-12-18 20:02:20",
                        "modifyTime": "2019-12-18 20:02:20"
                    }
                ],
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            /**
             * 改变隔行变色 颜色
             */

            cellStyle({row, column, rowIndex, columnIndex}) {
                let style = {
                    'text-align': 'center',
                    'font-size': '14px',
                    // 'height': '70px',
                    'background-color': '#ffffff',
                    'color': '#303030',

                }
                if (rowIndex % 2 != 0) {
                    style['background-color'] = '#f2f4f6';
                }
                return style;
            },
            /**
             * 合并行
             */
            objectSpanMethod({  rowIndex, columnIndex }) {
                if (columnIndex === 0 &&(rowIndex===1||rowIndex===3)) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else if (columnIndex === 0 &&(rowIndex===2||rowIndex===4)) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }else {
                    return {
                        rowspan: 1,
                        colspan:1
                    };
                }
            },


        }

    }

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
        border-bottom:solid 2px #d9e3f3;
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
    /deep/ .tableBox{
        border: solid 1px #d2d5dc;
    th{
        height: 70px;
        line-height: 70px;
        border-right:  1px solid #d2d5dc;
    }
    td{
        height: 70px;
        line-height: 70px;
        border-right:  1px solid #d2d5dc;
        padding: 0;
    }
    }
    .el-table-column{
    }
    .el-checkbox{
        color: #303030;
        font-size: 14px;

    }

    .checkbox-group{

        display: flex;
        align-items: center;
        justify-content: left;
        flex-wrap: wrap;
    .el-checkbox{
        margin-left: 90px;
        margin-top: 10px;
    }
    }
    /deep/ .el-checkbox__inner{
        border-radius:4px;
        border: solid 1px #b7c3d0;
        float: left;
    }
    /deep/ .el-checkbox__label{

        width: 85px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        float: right;
        margin-top: 4px;
    }
    /deep/ .model3_checkbox{
        margin-left: 90px;
        width: 113px;
        text-align: left;
        overflow: hidden;
    }


    }

    }

</style>
