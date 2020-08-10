<template>
  <view class="wrapper-wallet-pay-coupon">
    <checkbox-group class="pay-coupon-checkbox" @change="checkboxChange">
      <text>不使用优惠券</text>
      <checkbox :checked="checked" color="#FFB825" />
    </checkbox-group>
    <view class="pay-coupon-tips">
      <uniIcon type="info" size="18" color="#787878" />
      <text>优惠券不能使用多张</text>
    </view>
    <view class="pay-coupon-list">
      <view class="pay-coupon-item" v-for="(value, key) in []" :key="key">
        <yoyiCoupon shopName="友谊书城" title="图书8折优惠券" discount="8" deadline="2019-10-26" status="2"></yoyiCoupon>
      </view>
    </view>
  </view>
</template>
<script>
import yoyiCoupon from '@/components/yoyi-coupon/'
import uniIcon from '@/components/uni-icon/uni-icon.vue'

export default {
  components: { yoyiCoupon, uniIcon },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    checkboxChange(e) {
      this.checked = e.detail.value.length > 0
    },
  },
}
</script>
<style lang="scss">
page {
  background-color: $yoyi-page-bg-color;
}

.wrapper-wallet-pay-coupon {
  .pay-coupon-checkbox {
    display: flex;
    width: auto;
    height: 108px;
    justify-content: space-between;
    background: #fff;
    line-height: 108px;
    padding: 0 40px;
    font-size: 32px;
    checkbox {
      margin-right: 8px;
    }
  }
  .pay-coupon-tips {
    width: 690px;
    margin: 20px auto 10px;
    color: $yoyi-text-color-grey;
    height: 36px;
  }
  .pay-coupon-list {
    width: 710px;
    margin: 20px auto 0;
    .pay-coupon-item {
      margin-bottom: 28px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>