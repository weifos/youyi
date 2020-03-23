<template>
  <view class="wrapper-wallet-detail-item"
        :class="{'wrapper-wallet-detail-item-out':price < 0}"
        @click="handleClick">
    <view>
      <view class="detail-item-name">{{name}}</view>
      <view class="detail-item-date">{{date}}</view>
    </view>
    <view class="detail-item-sum">{{price>0?'+'+price:price}}</view>
  </view>
</template>

<script>

  export default {
    name: 'moneyDetailItem',
    props: {
      price: {
        type: [String, Number],
        default: 0,
      }, // 金额
      date: {
        type: [String, Number],
        default: '',
      }, // 时间
      name: {
        type: [String],
        default: '',
      }, // 项目
    },
    methods: {
      handleClick() {
        this.$emit('click')
      },
    },
  }
</script>

<style lang="scss">
  .wrapper-wallet-detail-item{
    height:94px;
    padding:28px 0;
    display:flex;
    justify-content:space-between;
    border-bottom:2px solid $yoyi-border-color;
    .detail-item-name{
      height:44px;
      font-size:32px;
      font-weight:400;
      color:$yoyi-text-color-basic;
      line-height:44px;
    }
    .detail-item-date{
      margin-top:16px;
      height:34px;
      font-size:24px;
      font-weight:400;
      color:$yoyi-text-color-placeholder;
      line-height:34px;
    }
    .detail-item-sum{
      height:60px;
      font-size:44px;
      font-weight:400;
      color:$yoyi-button-color;
      line-height:94px;
    }
    &.wrapper-wallet-detail-item-out{
      .detail-item-sum{
        color:$yoyi-text-color;
      }
    }
  }
</style>