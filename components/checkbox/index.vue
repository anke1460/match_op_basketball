<template>
    <view class="flex items-center gap-23 w-full">
        <view class="free-throw-button h-42" :class="[checkValue == item.value?'active':'']" @click="handleCheck(item.value)" v-for="item,index in list" :key="index">{{ item.label }}</view>
    </view>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'input'
    },
    props: ['list', 'value'],
    mounted() {
        this.checkValue = this.value
    },
    watch: {
        'value': function(val) {
            this.checkValue = val
        }
    },
    data() {
        return {
            checkValue: ''
        }
    },
    methods: {
        handleCheck(value) {
            this.checkValue = value
            this.$emit('input', value)
        }
    }
}
</script>

<style lang="scss" scoped>
.free-throw-button {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 26px;
    background-color: #F2F2F2;
    border-radius: 8px;
    flex: 1;
    text-align: center;
    line-height: 42px;
    &.active {
        background-color: #0A70F5;
        color: #FFFFFF;
    }
}
</style>
