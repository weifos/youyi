<template>
  <view class="wrapper-operation" :class="{'wrapper-operation-price':price && price > 0, 'wrapper-operation-disabled':disabled}" @click="handleClick">
    <view class="operation-button">
      <view class="operation-amount" v-if="price && price > 0">
        <text class="operation-amount-text">合计：&yen;</text>
        <text class="operation-amount-price">{{price}}元</text>
      </view>
      <view class="operation-submit">{{buttonText}}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'operationButton',
  props: {
    price: {
      type: [String, Number],
      default: 0,
    }, // 金额
    buttonText: {
      type: [String],
      default: '确认支付',
    }, // 按钮文字
    disabled: {
      type: [String, Boolean],
      default: false,
    }, // 是否不可用
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>
<style scoped lang="scss">
.wrapper-operation {
  .operation-button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 96px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -2px 0px 0px rgba(237, 237, 237, 1);
    display: flex;
    justify-content: space-between;
    .operation-amount {
      display: flex;
      margin-left: 40px;
      height: 96px;
      line-height: 96px;
      .operation-amount-text {
        font-size: $uni-font-size-base;
        font-weight: 400;
        color: $uni-text-color;
      }
      .operation-amount-price {
        font-size: $uni-font-size-lg;
        font-weight: 600;
        color: $uni-text-color;
      }
    }
    .operation-submit {
      width: 100%;
      height: 96px;
      text-align: center;
      background: $yoyi-button-color;
      font-size: $uni-font-size-lg;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 96px;
    }
  }
  &.wrapper-operation-price {
    .operation-submit {
      width: 280px;
    }
  }
  &.wrapper-operation-disabled {
    .operation-submit {
      background: #b2b2b2;
    }
  }
}
</style>