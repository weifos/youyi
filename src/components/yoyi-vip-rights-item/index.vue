<template>
  <view class="vip-rights-item">
    <view :class="[`rights-item-icon-${type}`]" class="rights-item-icon"></view>
    <view class="rights-item-text">{{text}}</view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    }, // 类型
    text: {
      type: String,
      default: '',
    }, // 名称
  },
}
</script>

<style lang="scss">
.vip-rights-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .rights-item-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .rights-item-icon-book {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-book.png);
  }
  .rights-item-icon-cake {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-cake.png);
  }
  .rights-item-icon-coin {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-coin.png);
  }
  .rights-item-icon-crown {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-crown.png);
  }
  .rights-item-icon-drink {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-drink.png);
  }
  .rights-item-icon-list {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-list.png);
  }
  .rights-item-icon-money {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-money.png);
  }
  .rights-item-icon-activity {
    background-image: url(https://res67.yoyi100.cn:21144/DefaultRes/Images/VUE/components/yoyi-vip-rights-item/images/rights-activity.png);
  }
  .rights-item-text {
    margin: 12px auto 0;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(32, 32, 32, 1);
    line-height: 40px;
    text-align: center;
  }
}
</style>