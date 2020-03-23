<template>
  <view class="wrapper-user-point-convert">
    <view class="point-summary">
      <yoyiCoupon
        class="point-summary-item"
        type="2"
        shopName="友谊书城"
        title="图书8折优惠券"
        amount="3"
        unit="张"
        rule="线上、门店通用"
        point="500"></yoyiCoupon>
    </view>
    <view class="point-title">
      <view class="point-title-1">满49减8元券</view>
      <view class="point-title-2">
        <text>500</text>
        <text>积分</text>
      </view>
    </view>
    <view class="point-content">
      <view class="point-content-title">兑换详情</view>
      <view class="point-content-p">积分有效期1年，积分获得日起，开始按照一年的周期计算积分有效期，若一年周期已满该积分未使用，则该积分将过期失效。</view>
      <view class="point-content-p">例如：2019年7月31日消费产生的积分将于2020年7月31日过期失效。</view>
      <view class="point-content-p">用户在是使用积分时，按照积分获得的时间的先后顺序进行消耗。</view>
    </view>
    <operationButton
      buttonText="马上兑换"
      :disabled="false"
      @click="convert"></operationButton>
  </view>
</template>
<script>
  import yoyiCoupon from '@/components/yoyi-coupon/'
  import operationButton from '@/components/yoyi-operation-button/'

  export default {
    components: {yoyiCoupon, operationButton},
    data() {
      return {
        id: null,
      }
    },
    onLoad(options) {
      console.log(options)
      this.id = options.id
    },
    methods: {
      convert() {

      }
    },
  }
</script>
<style lang="scss">
  .wrapper-user-point-convert{
    .point-summary{
      width:100%;
      position:relative;
      height:300px;
      background:$yoyi-bg-color;
      color:#fff;
      display:flex;
      flex-direction:column;
      justify-content:center;
      text-align:center;
      .wrapper-coupon{
        transform:scale(0.9);
        box-shadow:none;
      }
    }
    .point-title{
      height:108px;
      padding:46px 52px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      background:#fff;
      .point-title-1{
        height:50px;
        font-size:36px;
        font-weight:500;
        color:$yoyi-text-color-basic;
        line-height:50px;
      }
      .point-title-2{
        height:66px;
        font-size:48px;
        font-weight:400;
        color:$yoyi-button-color;
        line-height:66px;
        text:last-child{
          font-size:36px;
        }
      }
    }
    .point-content{
      margin-top:20px;
      padding:50px;
      .point-content-title{
        height:44px;
        font-size:32px;
        font-weight:400;
        color:$yoyi-text-color-basic;
        line-height:44px;
      }
      .point-content-p{
        margin:20px 0;
        font-size:26px;
        font-weight:400;
        color:rgba(79, 79, 79, 1);
        line-height:36px;
      }
    }
  }
</style>