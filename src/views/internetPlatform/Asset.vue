<template>
<div class="Asset">
    <div class="overview">
        <div class="header">
            <span class="fl">设备信息</span>
            <div class="fr">
                <span class="el-icon-plus" @click="addDevice">新增设备</span>
                <span><img :src="require('../../assets/img/internetPlatform/shanchu.png')" alt=""> 批量删除</span>
                <div>
                    <input type="text" v-model="searchInp">
                    <img @click="searchDevice" :src="require('../../assets/img/internetPlatform/sousuo.png')" alt="">
                </div>
            </div>
        </div>
        <div class="con">
            <el-table class="deviceTable" :height="tableDataHeight" :data="tableData" stripe highlight-current-row style="width: 100%;" :cell-style="cellStyle" :header-cell-style="headerStyle">
                <el-table-column prop="name" label="设备名称">
                </el-table-column>
                <el-table-column prop="name" label="设备分组">
                </el-table-column>
                <el-table-column prop="name" label="设备ID">
                    <template slot-scope="scope">
                        {{scope.row.id.id}}
</template>
                </el-table-column>
                <el-table-column prop="name" label="访问令牌">
                </el-table-column>
                <el-table-column prop="name" label="设备状态">
                </el-table-column>
                <el-table-column prop="name" label="设备类型">
                </el-table-column>
                <el-table-column prop="name" label="创建时间">
                </el-table-column>
                <el-table-column prop="name" label="最后上线时间" min-width="110">
                </el-table-column>
                <el-table-column label="操作" width="240">
<template slot-scope="scope">
<el-button type="text" @click="addDevice(scope.row)" size="small" class="detailsBtn">
    <img :src="require('../../assets/img/internetPlatform/bianji.png')" alt="">编辑</el-button>
<el-button type="text" size="small" @click="delDevice(scope.row)" class="delBtn"><i class="el-icon-error"></i>删除</el-button>
</template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-drawer
        :modal = 'false'
        :visible.sync = "drawer"
        :with-header="false"
        size="900px"
        direction = "rtl">
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="设备详情" name="first">
                    <el-form label-position="left" label-width="110px" :model="formLabelAlign">
                        <el-form-item label="设备名称：">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="设备分组：">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>
                        <el-form-item label="设备ID：">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="访问令牌：">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="设备状态：">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="设备类型：">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="最后上线时间：">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="saveDevice">
                        <button @click="cancelDevice">取消</button>
                        <button @click="saveDevice">保存</button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="属性" name="second">
                    <el-select v-model="addAttributeSel" placeholder="请选择">
                        <el-option  label="服务端属性" value="服务端属性"></el-option>
                        <el-option  label="客户端属性" value="客户端属性"></el-option>
                        <el-option  label="共享属性" value="共享属性"></el-option>
                    </el-select>
                    <span class="addAttribute">+新增属性</span>
                    <el-table :data="tableDataAttribute" stripe highlight-current-row style="width: 100%;" :cell-style="cellStyle" :header-cell-style="headerStyle">
                        <el-table-column prop="name" label="键">
                        </el-table-column>
                        <el-table-column prop="name" label="更新时间">
                        </el-table-column>
                        <el-table-column prop="name" label="值">
                        </el-table-column>
                        <el-table-column prop="name" label="操作">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="遥测" name="third">
                    <div class="telemetry">
                        <div v-for="(item, index) in telemetryList" :key="index" :class="{'active':item.active}">
                            <p>{{item.name}}<span>{{item.time}}</span></p>
                            <div>{{item.num}}</div>
                            <span @click="telemetryDetails(index)">数据详情</span>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-drawer>
    <el-dialog
    title="电流数据详情"
    :visible.sync="centerDialogVisible"
    center>
        <div id="telemetryDetailsCharts"></div>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'Asset', //资产中心
    components: {},
    props: [],
    data() {
        return {
            url: 'http://192.168.2.31:8070/', //接口ip
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5eXl5MTIzQHFxLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYzMyYmMwMjAtMTRiMi0xMWVhLThkNWMtOGIyZjFmMjg4MmNlIiwiZmlyc3ROYW1lIjoieXl5eSIsImVuYWJsZWQiOmZhbHNlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiNmFjNzY0YjAtMDc0ZC0xMWVhLWI3MzAtOTkyNTI3YmMyYTJkIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNTc2NDg3NDQwLCJleHAiOjE1NzY0OTY0NDB9.5463YAB1M4qfBd13HNJP0Mybd9zTyJWuW0mzfQlIHwW0HYOyFyhOaLHLeHlqnykFfjASTEOTxkThXjnf45hFJA', //headers
            tableData: [], //设备列表
            tableDataHeight: 0, //设备列表高度
            searchInp: '', //设备搜索
            drawer: false, //抽屉
            activeName: 'first', //抽屉tab栏
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            }, //设备详情
            addAttributeSel: '', //属性类型下拉框
            tableDataAttribute: [], //属性表格,
            telemetryList: [{
                name: '电流',
                time: '2019-12-09  14:10',
                num: '1.58A',
                active: false,
            }, {
                name: '电流',
                time: '2019-12-09  14:10',
                num: '1.58A',
                active: false,
            }, {
                name: '电流',
                time: '2019-12-09  14:10',
                num: '1.58A',
                active: false,
            }, {
                name: '电流',
                time: '2019-12-09  14:10',
                num: '1.58A',
                active: false,
            }, {
                name: '电流',
                time: '2019-12-09  14:10',
                num: '1.58A',
                active: false,
            }, {
                name: '电流',
                time: '2019-12-09  14:10',
                num: '1.58A',
                active: false,
            }],
            centerDialogVisible: false, //遥测详情
            telemetryDetailsCharts: null,
            telemetryDetailsOption: {
                color: ['#3c70d7', '#7ea6f2', '#D4E8FF', '#7DE5D2', '#FEAE7B', '#003399', '#3366cc', '#0087cb', '#3399ff', '#017890', '#587498', '#74828f', '#666633', '#99cccc', '#a1bad0', '#c25b56', '#ff9933', '#d0a727', '#f9ca79', '#d9ccb9'],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(240, 244, 251, 0.8)',
                    textStyle: {
                        color: '#505050',
                        fontFamily: 'Microsoft YaHei',
                        align: 'left'
                    },
                    axisPointer: {
                        type: 'line'
                    }
                },
                legend: {
                    type: 'scroll',
                    width: '70%',
                    data: [],
                    icon: 'pin',
                    textStyle: {
                        fontSize: '14px',
                        fontFamily: 'Microsoft YaHei',
                    },
                    itemGap: 30,
                    right: 10,
                    top: '10px',
                },
                grid: {
                    left: '40px',
                    right: '26px',
                    bottom: '40px',
                    top: '50px'
                },
                xAxis: {
                    type: 'category',
                    nameGap: 10,
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#d8d8d8'
                        }
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置。
                        color: '#505050'
                    },
                    axisTick: { //坐标轴刻度相关设置。
                        show: false,
                        alignWithLabel: false
                    },
                    splitLine: { //坐标轴在 grid 区域中的分隔线
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    name: ''
                },
                yAxis: {
                    name: '',
                    nameTextStyle: {
                        // align: 'left',
                        fontFamily: 'Microsoft YaHei',
                        align: 'right'
                    },
                    type: 'value',
                    nameGap: 20,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#505050',
                        margin: 40,
                        align: 'left'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                series: [{
                    name: 'part1',
                    type: 'bar',
                    // barWidth: 43,
                    stack: 'device',
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                }],
            },
        }
    },
    created() {

    },
    mounted() {
        //获取所有设备
        this.getDevice();
    },
    computed: {

    },
    methods: {
        //遥测详情
        telemetryDetails(index) {
            console.log('index', index)
            this.telemetryList.forEach((v, i) => {
                if (i === index) {
                    v.active = true;
                } else {
                    v.active = false;
                }
            })
            this.centerDialogVisible = true;
            this.$nextTick(() => {
                console.log(document.querySelector('#telemetryDetailsCharts'));
                this.telemetryDetailsCharts && this.telemetryDetailsCharts.clear();
                this.telemetryDetailsCharts = this.$echarts.init(document.getElementById('telemetryDetailsCharts'));
                this.telemetryDetailsCharts && this.telemetryDetailsCharts.setOption(this.telemetryDetailsOption);
                window.addEventListener("resize", () => {
                    this.telemetryDetailsCharts.resize();
                });
            })
        },
        //点击tab
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //取消保存
        cancelDevice() {
            this.drawer = false;
        },
        //保存
        saveDevice() {

        },
        //搜索设备
        searchDevice() {
            this.$axios({
                loading: {
                    isShow: false,
                },
                method: 'get',
                url: `${this.url}api/tenant/devices?limit=1000&textSearch=${this.searchInp}`,
                //请求头配置
                headers: {
                    'X-Authorization': this.Authorization
                }
            }).then(res => {
                this.tableData = res.data.data;
                this.$message({
                    type: 'success',
                    message: '搜索成功'
                });
            }).catch(function(err) {
                console.log(err.response);
            })
        },
        //新增设备
        addDevice(row) {
            this.drawer = true;
        },
        //删除设备
        delDevice(row) {
            if (row.id.id) {
                this.$confirm('删除此设备?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.$axios({
                        loading: {
                            isShow: false,
                        },
                        method: 'delete',
                        url: `${this.url}api/device/${row.id.id}`,
                        //请求头配置
                        headers: {
                            'X-Authorization': this.Authorization
                        }
                    }).then(res => {
                        console.log(res)
                        this.getDevice();
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    }).catch(function(err) {
                        console.log(err.response);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消设置'
                    });
                });
            }
        },
        //获取所有设备
        getDevice() {
            this.$axios({
                loading: {
                    isShow: false,
                },
                method: 'get',
                url: `${this.url}api/tenant/devices?limit=1000&textSearch=`,
                //请求头配置
                headers: {
                    'X-Authorization': this.Authorization
                }
            }).then(res => {
                console.log(res.data.data)
                this.tableData = res.data.data;
                this.$nextTick(() => {
                    this.tableDataHeight = document.querySelector('.overview').offsetHeight - 116;
                })
            }).catch(function(err) {
                console.log(err.response);
            })
        },
        // 改变表格样式
        cellStyle({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            let style = {
                'text-align': 'center',
                'font-size': '14px',
                'height': '70px',
                'background-color': '#ffffff',
                'color': '#303030',
                // 'border-left': 'solid 1px #d8d8d8',
            }
            if (window.innerWidth > 1660) {
                if (rowIndex % 2 != 0) {
                    style['background-color'] = '#f2f4f6';
                }
            } else if (window.innerWidth > 1440) {
                style['height'] = '52px';
                if (rowIndex % 2 != 0) {
                    style['background-color'] = '#f2f4f6';
                }
            } else {
                style['height'] = '20px';
                if (rowIndex % 2 != 0) {
                    style['background-color'] = '#f2f4f6';
                }
            }
            return style;
        },
        headerStyle({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            let style = {
                'background-color': '#f2f4f6',
                'font-size': '16px',
                'font-weight': 'normal',
                'color': '#101010',
                'text-align': 'center',
                'height': '70px',
            }
            if (window.innerWidth > 1440) {
                style['height'] = '52px';
                style['font-size'] = '14px';
            } else {
                style['height'] = '20px';
                style['font-size'] = '14px';
            }
            return style;
        },
    }
}
</script>

<style lang="scss" scoped type="text/css">
.Asset {
    height: 100%;
    .overview {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        border-radius: 16px;
        padding: 0 40px;
        overflow: hidden;
        box-sizing: border-box;
        .header {
            text-align: left;
            height: 60px;
            line-height: 60px;
            border-bottom: solid 1px #d9e3f3;
            padding: 0 40px;
            margin: 0 -40px;
            position: relative;
            background-color: #fff;
            .fl {
                font-size: 16px;
                font-weight: bold;
                color: #424956;
            }
            .fr {
                float: right;
                span {
                    font-family: 'MicrosoftYaHei';
                    font-size: 16px;
                    color: #2c5ac2;
                    cursor: pointer;
                    &:nth-of-type(2) {
                        margin-left: 24px;
                        color: #ed5151;
                    }
                }
                >div {
                    display: inline-block;
                    width: 201px;
                    height: 32px;
                    margin-left: 24px;
                    background-color: #f2f4f6;
                    border-radius: 4px;
                    overflow: hidden;
                    vertical-align: middle;
                    img {
                        float: right;
                        margin: 6px 10px 0 0;
                    }
                }
                input {
                    float: left;
                    background-color: #f2f4f6;
                    outline: none;
                    border: none;
                    height: 100%;
                    padding: 0px 18px;
                    box-sizing: border-box;
                    font-size: 14px;
                    width: 80%;
                }
            }
        }
        .con {
            padding: 28px 0;
            box-sizing: border-box;
        }
    }
    /deep/ .el-table {
        td .cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        button {
            width: 80px;
            height: 30px;
            font-size: 14px;
            padding: 0;
            margin: 10px 0;
            border-radius: 4px;
            border: solid 1px #68c161;
            background-color: transparent;
            i {
                margin-right: 6px;
            }
            &.detailsBtn {
                color: #6ecd8b;
            }
            &.delBtn {
                color: #ed5151;
                border: solid 1px #ed5151;
                margin-left: 20px;
            }
            img {
                vertical-align: middle;
                margin-right: 6px;
            }
        }
    }
    /deep/ .el-drawer {
        top: 60px;
        height: calc( 100% - 60px);
        >section>div {
            height: 100%;
            >div {
                height: 100%;
                .el-tabs__content {
                    height: calc( 100% - 100px);
                }
            }
        }
    }
    /deep/ .el-tabs__header {
        height: 60px;
        line-height: 60px;
        margin-bottom: 30px;
    }
    /deep/ .el-tabs__nav-scroll {
        padding: 0 40px;
    }
    /deep/ .el-tabs__item {
        font-size: 16px;
    }
    /deep/ .el-tabs__item.is-active {
        color: #3f78f6;
    }
    /deep/ .el-tabs__active-bar {
        background-color: #3f78f6;
    }
    /deep/ .el-tabs__content {
        padding: 0 42px;
    }
    /deep/ .el-form {
        width: 410px;
        margin: 10px 0 0 32px;
    }
    .saveDevice {
        position: absolute;
        bottom: 12%;
        button {
            width: 130px;
            height: 32px;
            background-color: #c4d4e7;
            border-radius: 4px;
            font-family: 'MicrosoftYaHei';
            font-size: 14px;
            color: #ffffff;
            outline: none;
            border: none;
            margin-left: 181px;
            &:last-child {
                margin-left: 133px;
                background-color: #3c70d7;
            }
        }
    }
    .el-select {
        width: 140px;
    }
    /deep/ .el-input--medium .el-input__inner {
        height: 32px;
        line-height: 32px;
        background-color: #f2f4f6;
        border-radius: 4px;
        border: none;
    }
    .addAttribute {
        float: right;
        display: inline-block;
        margin: 16px 0 30px;
        font-size: 16px;
        color: #2c5ac2;
    }
    .telemetry {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        >div {
            width: 253px;
            height: 140px;
            background-color: #3c70d7;
            border-radius: 10px;
            overflow: hidden;
            color: #fff;
            padding: 23px 20px;
            box-sizing: border-box;
            margin-bottom: 50px;
            &.active {
                width: 289px;
                height: 160px;
            }
            >div {
                margin: 18px 0 8px;
                font-family: 'GrayDesign';
                font-size: 30px;
                text-align: center;
            }
            >span {
                font-size: 14px;
                display: block;
                text-align: center;
                position: relative;
                cursor: pointer;
                &::after {
                    position: absolute;
                    content: '|';
                    color: #aee4fa;
                    left: 68px;
                }
                &::before {
                    position: absolute;
                    content: '|';
                    color: #aee4fa;
                    right: 68px;
                }
            }
        }
        p {
            font-family: 'MicrosoftYaHei';
            font-size: 14px;
            span {
                font-family: 'Helvetica';
                font-size: 12px;
                color: #8ab1ff;
                float: right;
                margin-top: 5px;
            }
        }
    }
    /deep/ .el-dialog {
        overflow: hidden;
        margin: 0 auto !important;
        top: 50%;
        background-color: #ffffff;
        border-radius: 16px;
        border: none;
        transform: translateY(-50%);
        width: 1004px !important;
    }
    /deep/ .el-dialog--center .el-dialog__body {
        padding: 18px 40px;
    }
    /deep/ .el-dialog__header {
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        border-bottom: solid 1px #d9e3f3;
        padding: 0px 40px;
        text-align: left;
        font-size: 16px;
        color: #202020;
    }
    /deep/ .el-dialog__headerbtn {
        top: 15px;
    }
    /deep/ .el-dialog__close {
        color: #202020;
        font-size: 22px;
    }
    #telemetryDetailsCharts {
        height: 392px;
    }
}
</style>
