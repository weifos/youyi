<template>
  <view class="wrapper-wallet-coupon">
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    <view class="wallet-coupon-list" v-show="index == 0">
      <view class="pay-coupon-list">
        <view class="pay-coupon-item" v-for="(value, key) in [1,2,3]" :key="key">
          <yoyiCoupon
            :shopName="`友谊书城${index}`"
            title="图书8折优惠券"
            discount="8"
            deadline="2019-10-26"
            status="1"></yoyiCoupon>
        </view>
      </view>
    </view>
    <view class="wallet-coupon-list" v-show="index == 1">
      <view class="pay-coupon-empty">
        <view></view>
        <text>您还没有可用的优惠券哦~</text>
      </view>
    </view>
    <view class="wallet-coupon-list" v-show="index == 2">
      <view class="pay-coupon-list">
        <view class="pay-coupon-item" v-for="(value, key) in [1,2,3]" :key="key">
          <yoyiCoupon
            :shopName="`友谊书城${index}`"
            title="图书8折优惠券"
            discount="8"
            deadline="2019-10-26"
            status="1"></yoyiCoupon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import sunTab from '@/components/sun-tab/sun-tab.vue'
  import yoyiCoupon from '@/components/yoyi-coupon/'

  export default {
    data() {
      return {
        index: 0,
        tabList: ['未使用', '已使用', '已过期'],
      }
    },
    components: {sunTab, yoyiCoupon},
  }
</script>

<style lang="scss">
  page{ background-color:$yoyi-page-bg-color; }

  .wrapper-wallet-coupon{
    margin-top:2px;
    .wallet-coupon-list{
      margin-top:22px;
    }
    .pay-coupon-empty{
      margin-top:200px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      text-align:center;
      view{
        margin:0 auto 40px;
        width:130px;
        height:90px;
        background:url(data:image/png;base64,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) 0 0 no-repeat;
        background-size:100%;
      }
      text{
        display:block;
        height:40px;
        font-size:28px;
        font-weight:400;
        color:rgba(178, 178, 178, 1);
        line-height:40px;
      }
    }
    .pay-coupon-list{
      .pay-coupon-item{
        margin-bottom:28px;
        &:last-child{
          margin-bottom:0;
        }
      }

    }
  }
</style>