<template>
  <view class="wrapper-wallet-coupon">
    <checkbox-group @change="checkboxChange" class="coupon-checkbox">
      <text>不使用优惠券</text>
      <checkbox :checked="checked" color="#FFB825" />
    </checkbox-group>
    <view class="coupon-tips">
      <uniIcon color="#B2B2B2" size="18" type="info" />
      <text>优惠券不能使用多张</text>
    </view>
    <view class="coupon-list">
      <view class="coupon-item" v-for="(value, key) in [1,2,3]">
        <yoyiCoupon deadline="2019-10-26" discount="8" shopName="友谊书城" status="1" title="图书8折优惠券"></yoyiCoupon>
      </view>
    </view>
  </view>
</template>
<script>
import yoyiCoupon from '@/components/yoyi-coupon/'
import uniIcon from '@/components/uni-icon/uni-icon.vue'

export default {
  components: { yoyiCoupon, uniIcon },
  data () {
    return {
      checked: false,
    }
  },
  methods: {
    checkboxChange (e) {
      this.checked = e.detail.value.length > 0
    },
  },
}
</script>
<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
.wrapper-wallet-coupon {
  .coupon-checkbox {
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
  .coupon-tips {
    width: 690px;
    margin: 20px auto 10px;
    color: #b2b2b2;
    height: 36px;
  }
  .coupon-list {
    width: 710px;
    margin: 20px auto 0;
    .coupon-item {
      margin-bottom: 28px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>