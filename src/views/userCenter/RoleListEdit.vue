<template>
<div class="RoleListEdit">
    <div class="header">
        <div>模块1</div>
        <div>模块2</div>
        <div>模块3</div>
    </div>
    <div class="model">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
    </div>
</div>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "RoleListEdit",
        data() {
            return {
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true
            };
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
            }
        }
    }

</script>

<style lang="scss" scoped type="text/css">
    .RoleListEdit{
        width: 80%;
        height: 80%;
        margin: 0 auto;
        margin-top: 5%;
        background-color: #fff;
        border-radius:16px;
        .model{
            display: flex;
            justify-content: center;
        }
    }
</style>
