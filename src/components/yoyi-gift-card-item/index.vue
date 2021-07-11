<template>
  <view class="wrapper-gift-card-item">
    <view class="gift-card-item-content1">
      <view class="gift-card-item-image">
        <image :src="image" />
      </view>
      <view class="gift-card-item-button">
        <view @click="handleClick('send')" v-if="showUseButton && sendStatus == 0">赠送</view>
        <view style="border: 0.267vw solid #D8D8D8;color:#D8D8D8;" v-else-if="showUseButton && sendStatus == 1">赠送中</view>
        <view style="border: 0.267vw solid #D8D8D8;color:#D8D8D8;" v-else-if="sendStatus == 10">已赠送</view>
        <view @click="handleClick('use')" v-if="showUseButton && (sendStatus == 0 || sendStatus == -1)">使用</view>
        <view style="border: 0.267vw solid #D8D8D8;color:#D8D8D8;" v-else-if="!showUseButton && (sendStatus == 0 || sendStatus == -1)">已使用</view>
      </view>
    </view>
    <view class="gift-card-item-content2">
      <view>
        <view class="gift-card-item-number">{{number}}</view>
        <view class="gift-card-item-date">{{date}}</view>
      </view>
      <view class="gift-card-item-price">&yen;{{price}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'giftCardItem',
  props: {// 金额
    price: {
      type: [String, Number],
      default: 0,
    }, // 时间
    date: {
      type: [String, Number],
      default: '',
    }, // 卡号
    number: {
      type: [String, Number],
      default: '',
    }, // 卡面
    image: {
      type: [String],
      default: require('@/static/images/wallet-recharge-card.png'),
    }, // 赠送状态
    sendStatus: {
      type: Number,
      default: 0,
    }, // 是否可用
    showUseButton: {
      type: [Boolean],
      default: false,
    }
  },
  methods: {
    handleClick (type) {
      switch (type) {
        case 'send':
          this.$emit('send')
          break;
        default:
        case 'use':
          this.$emit('use')
          break;
      }
    },
  }
}
</script>

<style lang="scss">
.wrapper-gift-card-item {
  position: relative;
  width: 654px;
  height: 336px;
  background: rgba(255, 255, 255, 1);
  border-radius: 24px;
  padding: 20px 28px;
  .gift-card-item-content1 {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 4px solid $yoyi-border-color2;
  }
  .gift-card-item-content2 {
    display: flex;
    padding-top: 14px;
    justify-content: space-between;
  }
  .gift-card-item-image {
    width: 406px;
    height: 214px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .gift-card-item-button {
    width: 248px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    view {
      margin: 0 auto;
      width: 140px;
      height: 60px;
      line-height: 60px;
      background: rgba(255, 255, 255, 1);
      border-radius: 30px;
      border: 2px solid $yoyi-button-color;
      color: $yoyi-button-color;
      text-align: center;
    }
  }
  .gift-card-item-number {
    height: 44px;
    font-size: 32px;
    font-weight: 400;
    color: $yoyi-text-color-basic;
    line-height: 44px;
  }
  .gift-card-item-date {
    height: 34px;
    font-size: 24px;
    font-weight: 400;
    color: $yoyi-text-color-grey;
    line-height: 34px;
  }
  .gift-card-item-price {
    height: 56px;
    font-size: 40px;
    font-weight: 400;
    color: $yoyi-button-color;
    line-height: 56px;
  }
}
</style>