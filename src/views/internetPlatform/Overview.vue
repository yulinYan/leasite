<template>
<div class="Overview">
    <div class="deviceOverview">
        <ul>
            <li v-for="(item,index) in deviceOverviewList" :key="index">
                <img :src="item.icon" alt="">
                <div class="deviceOverviewName" v-cloak>{{item.name}}</div>
                <span v-cloak>{{item.details}}</span>
                <div class="deviceOverviewNum" v-cloak>{{item.num}}</div>
            </li>
        </ul>
    </div>
    <div class="overview">
        <p class="header"><span>设备消息数</span></p>
        <div id="deviceMessage">
        </div>
    </div>
    <div class="overview">
        <p class="header"><span>设备在线时长排行榜</span></p>
        <div id="deviceTime">
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Overview', //物联网平台
    components: {},
    props: [],
    data() {
        return {
            //资产总数 设备在线数 设备在线时长
            deviceOverviewList: [{
                icon: require('../../assets/img/internetPlatform/zichanzongshu.png'),
                name: '资产总数',
                details: 'The total number of assets',
                num: '265'
            }, {
                icon: require('../../assets/img/internetPlatform/shebei.png'),
                name: '设备在线数',
                details: 'Device on line number',
                num: '237/50'
            }, {
                icon: require('../../assets/img/internetPlatform/shijian.png'),
                name: '设备在线时长',
                details: 'Device online time',
                num: '10'
            }],
            deviceMessageCharts: null,
            // 设备消息数charts
            deviceMessageOption: {
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
                    },
                    {
                        name: 'part2',
                        type: 'bar',
                        stack: 'device',
                        data: [120, 132, 101, 134, 290, 230, 220]
                    },
                ],
            },
            // 设备在线时长排行榜charts
            deviceTimeOption: {

            },
        }
    },
    created() {

    },
    mounted() {
        // 获取设备消息数
        this.getDeviceMessage();
    },
    computed: {

    },
    methods: {
        // 获取设备消息数
        getDeviceMessage() {
            this.deviceMessageCharts && this.deviceMessageCharts.clear();
            this.deviceMessageCharts = this.$echarts.init(document.getElementById('deviceMessage'));
            this.deviceMessageCharts && this.deviceMessageCharts.setOption(this.deviceMessageOption);
            window.addEventListener("resize", () => {
                this.deviceMessageCharts.resize();
            });
        }
    }
}
</script>

<style lang="scss" scoped type="text/css">
.Overview {
    height: 100%;
    .deviceOverview {
        ul {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        li {
            width: calc( 100% / 3);
            float: left;
            height: 240px;
            background-color: #ffffff;
            box-shadow: 0px 15px 25px 0px rgba(49, 59, 87, 0.12);
            border-radius: 16px;
            &:nth-of-type(2) {
                margin: 0 30px;
            }
            img {
                display: block;
                margin: 24px auto 0px;
            }
            div,
            span {
                text-align: center;
                display: block;
            }
            .deviceOverviewName {
                font-family: 'MicrosoftYaHei';
                font-size: 16px;
                font-weight: bold;
                color: #424956;
            }
            span {
                font-family: 'Helvetica';
                font-size: 14px;
                color: #929fae;
                margin: 6px 0 33px 0;
            }
            .deviceOverviewNum {
                font-family: 'GrayDesign-Medium';
                font-size: 50px;
                color: #303030;
            }
        }
    }
    .overview {
        width: 100%;
        background-color: #ffffff;
        border-radius: 16px;
        margin: 30px auto;
        padding: 0 40px;
        overflow: hidden;
        box-sizing: border-box;
        p.header {
            text-align: left;
            height: 60px;
            line-height: 60px;
            border-bottom: solid 1px #d9e3f3;
            padding: 0 40px;
            margin: 0 -40px;
            position: relative;
            background-color: #fff;
            span {
                font-size: 16px;
                font-weight: bold;
                color: #424956;
            }
        }
    }
    #deviceMessage,
    #deviceTime {
        height: 267px;
    }
}
</style>
