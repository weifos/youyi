<template>
  <view class="vip-list-item" :class="[selected ? 'selected' : '', disabled ? 'disabled' : '']" @click="handleClick">
    <view class="item-title">{{title}}</view>
    <view class="item-price">
      <text class="item-price-number">{{price}}</text>
      <text class="item-price-unit">{{unit}}</text>
    </view>
    <view class="item-icon"></view>
  </view>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
      }, // 标题
      price: {
        type: [String, Number],
        default: '',
      }, // 价格
      unit: {
        type: String,
        default: '元/年',
      }, // 单位
      selected: {
        type: [Boolean, String],
        default: false,
      }, // 选中态
      disabled: {
        type: [Boolean, String],
        default: false,
      }, // 禁用态
    },
    methods: {
      handleClick() {
        this.$emit('click')
      }
    },
  }
</script>

<style lang="scss">
  .vip-list-item{
    position:relative;
    width:550px;
    height:50px;
    line-height:50px;
    padding:35px 40px;
    background:rgba(255, 255, 255, 1);
    border-radius:24px;
    border:4px solid rgba(237, 237, 237, 1);
    display:flex;
    justify-content:space-between;
    .item-title{
      font-size:$uni-font-size-lg;
      font-weight:500;
      color:$uni-text-color;
    }
    .item-price{
      margin-right:20px;
      .item-price-number{
      }
      .item-price-unit{
        font-size:$uni-font-size-sm;
      }
    }
    .item-icon{
      display:none;
      position:absolute;
      right:-4px;
      top:0;
      background:url(data:image/png;base64,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) 0 0 no-repeat;
      width:94px;
      height:82px;
      background-size:contain;
    }
    &.selected{
      border-color:$yoyi-button-color;
      .item-title{
        color:$yoyi-button-color;
      }
      .item-price{
        color:$yoyi-button-color;
      }
      .item-icon{
        display:block;
      }
    }
    &.disabled{
      color:$yoyi-text-color-grey;
      background:$yoyi-bg-color-grey;
      border-color:$yoyi-bg-color-grey;
      .item-title{
        color:$yoyi-text-color-grey;
      }
      .item-price{
        color:$yoyi-text-color-grey;
      }
    }
  }
</style>