<template>
  <view class="wrapper-coupon"
        :class="[`wrapper-coupon-status-${status}`, `wrapper-coupon-type-${type}`]"
        @click="handleClick('item')">
    <template v-if="type == 1">
      <view class="coupon-shop">{{shopName}}</view>
      <view class="coupon-title">{{title}}</view>
      <view class="coupon-discount">
        <text>{{discount}}</text>
        <text>{{unit}}</text>
      </view>
      <view class="coupon-deadline">有效期至{{deadline}}</view>
      <view class="coupon-button" @click.stop="handleClick('button')">{{buttonText}}</view>
    </template>
    <template v-if="type == 2">
      <view class="coupon-shop">{{shopName}}</view>
      <view class="coupon-title">{{title}}</view>
      <view class="coupon-amount">
        <text>{{amount}}</text>
        <text>{{unit}}</text>
      </view>
      <view class="coupon-deadline">{{rule}}</view>
      <view class="coupon-point">
        <text>{{point}}</text>
        <text>积分</text>
      </view>
    </template>
  </view>
</template>
<script>
  export default {
    name: 'coupon',
    props: {
      type: {
        type: [Number, String],
        default: 1,
      }, // 状态 1:带按钮型 2:积分兑换型
      shopName: {
        type: [String],
        default: '',
      }, // 店名
      title: {
        type: String,
        default: '',
      }, // 名称
      discount: {
        type: String,
        default: '',
      }, // 折扣
      amount: {
        type: String,
        default: '',
      }, // 金额
      unit: {
        type: String,
        default: '折',
      }, // 单位
      point: {
        type: [String, Number],
        default: '',
      }, // 积分
      rule: {
        type: String,
        default: '',
      }, // 限定
      deadline: {
        type: String,
        default: '',
      }, // 截止日期
      status: {
        type: [Number, String],
        default: 1,
      }, // 状态 1:可领取 2:已领取 3：已使用 4：已过期
    },
    computed: {
      buttonText() {
        let text = ''
        switch (parseInt(this.status)) {
          case 1:
            text = '立即领取'
            break;
          case 2:
            text = '立即使用'
            break;
          case 3:
            text = '已使用'
            break;
          case 4:
            text = '已过期'
            break;
        }
        return text
      },
    },
    methods: {
      handleClick(value) {
        switch (value) {
          case 'item':
            this.$emit('click')
            break;
          case 'button':
            this.$emit('buttonClick')
            break;
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .wrapper-coupon{
    position:relative;
    width:710px;
    height:240px;
    margin:0 auto;
    background:url(data:image/png;base64,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) 0 0 no-repeat;
    // background-size:contain;
    background-size: 100% auto;
    // box-shadow:0px 4px 6px 2px #B2B2B2;
    .coupon-shop,
    .coupon-title,
    .coupon-discount,
    .coupon-amount,
    .coupon-deadline,
    .coupon-button,
    .coupon-point{
      position:absolute;
    }
    .coupon-shop{
      left:60px;
      top:22px;
      /*width:96px;*/
      height:34px;
      font-size:24px;
      font-weight:400;
      color:$yoyi-text-color;
      line-height:34px;
    }
    .coupon-title{
      left:60px;
      top:64px;
      /*width:238px;*/
      height:50px;
      font-size:36px;
      font-weight:400;
      color:$yoyi-text-color-basic;
      line-height:50px;
    }
    .coupon-discount{
      left:528px;
      top:24px;
      /*width:74px;*/
      height:84px;
      font-size:60px;
      font-weight:400;
      color:$yoyi-button-color;
      line-height:84px;
      text:nth-child(2){
        font-size:36px;
      }
    }
    .coupon-amount{
      left:528px;
      top:24px;
      /*width:74px;*/
      height:84px;
      font-size:60px;
      font-weight:400;
      color:$yoyi-text-color-basic;
      line-height:84px;
      text:nth-child(2){
        font-size:36px;
      }
    }
    .coupon-deadline{
      left:60px;
      top:170px;
      /*width:232px;*/
      height:34px;
      font-size:24px;
      font-weight:400;
      color:$yoyi-text-color-grey;
      line-height:34px;
    }
    .coupon-button{
      left:478px;
      top:156px;
      width:172px;
      height:60px;
      line-height:60px;
      color:#fff;
      background:$yoyi-button-color;
      border-radius:30px;
      text-align:center;
    }
    .coupon-point{
      left:478px;
      top:156px;
      height:60px;
      font-size:60px;
      line-height:60px;
      color:$yoyi-button-color;
      font-weight:400;
      text-align:center;
      text:nth-child(2){
        font-size:36px;
      }
    }
  }
</style>