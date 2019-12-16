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
</div>
</template>

<script>
export default {
    name: 'Overview', //物联网平台
    components: {},
    props: [],
    data() {
        return {
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
            }]
        }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {

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
}
</style>
