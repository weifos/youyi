<template>
  <view class="wrapper-money-item"
        :class="{'wrapper-money-item-selected' : selected}"
        @click="handleClick">
    <view class="money-sum" v-if="price && parseInt(price) > 0">{{price}}元</view>
    <view class="money-present" v-if="present && parseInt(present) > 0">赠{{present}}元券</view>
  </view>
</template>
<script>
  export default {
    name: 'moneyItem',
    props: {
      price: {
        type: [String, Number],
        default: '',
      }, // 金额
      present: {
        type: [String, Number],
        default: '',
      }, // 附赠
      selected: {
        type: [Boolean],
        default: false,
      }, // 选中
    },
    methods: {
      handleClick() {
        this.$emit('click')
      },
    },
  }
</script>
<style scoped lang="scss">
  .wrapper-money-item{
    width:208px;
    height:156px;
    border-radius:16px;
    border:4px solid $yoyi-border-color;
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    .money-sum{
      font-size:40px;
      font-weight:600;
      color:$yoyi-text-color-basic;
      line-height:56px;
    }
    .money-present{
      color:$yoyi-text-color-grey;
    }
    &.wrapper-money-item-selected{
      border-color:$yoyi-button-color;
    }
  }
</style>