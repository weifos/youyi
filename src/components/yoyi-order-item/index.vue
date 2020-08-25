<template>
  <view class="component-order-item">
    <view class="title-bar">
      <view class="order-time">{{item.created_date}}</view>
      <view class="order-status">
        <text class="ml20" v-if="item.pay_method == 11">微信付款码支付</text>
        <text class="ml20" v-else-if="item.pay_method == 13">微信小程序支付</text>
        <text class="ml20" v-else-if="item.pay_method == 14">微信扫码支付</text>
        <text class="ml20" v-else-if="item.pay_method == 21">支付宝支付</text>
        <text class="ml20" v-else-if="item.pay_method == 31">电子钱包支付</text>
        <text class="ml20" v-else-if="item.pay_method == 41">储值卡支付</text>
        <text class="ml20" v-else-if="item.pay_method == 51">现金支付</text>
        <text class="ml20" v-else-if="item.pay_method == 61">刷卡支付</text>
        <text class="ml20" v-else-if="item.pay_method == 100">混合支付</text>

        <text class="text-sub ml20" v-if="item.status == 1">待付款</text>
        <text class="text-sub ml20" v-else-if="item.status == 3">已付款</text>
        <text class="text-sub ml20" v-else-if="item.status == 10">已发货</text>
        <text class="text-sub ml20" v-else-if="item.status == 18">交易成功</text>
      </view>
    </view>
    <view class="list-bar">
      <view class="order-item image-size-sm" v-for="sItem in item.store_details" :key="sItem">
        <image :src="sItem.img_url" />
      </view>
    </view>
    <view class="side-bar">
      <view class="order-price">
        <view class="dib vam">共{{item.count}}件</view>
        <view class="dib vam ml20">
          合计：
          <text>¥ {{item.actual_amount}}</text>
        </view>
      </view>
      <view class="order-btns">
        <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20" @click="goDetails(item)">查看详情</button>
      </view>
      <view class="order-btns" v-if="item.type == 1">
        <!-- <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">开发票</button> -->
        <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20" @click="confirmReceipt(item)">确认收货</button>
      </view>
      <view class="order-btns" v-else-if="item.status == 1">
        <!-- <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">取消订单</button> -->
        <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20" @click="goPay(item)">去支付</button>
      </view>
      <view class="order-btns" v-else-if="item.type == 3">
        <!-- <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">开发票</button> -->
        <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">申请售后</button>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  components: {},
  name: 'orderItem',
  props: {
    item: [Object],
    default: {}
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 查看详情
     */
    goDetails(item) {
      uni.navigateTo({ url: 'order-details?no=' + item.serial_no })
    },
    /**
     * 去付款
     */
    goPay(item) {
      uni.navigateTo({ url: 'order-details?no=' + item.serial_no })
    },
    /**
     * 确认收货
     */
    confirmReceipt(value) {
      this.$emit('confirmReceipt')
    }
  }
}
</script>

<style lang="scss">
.component-order-item {
  background-color: #fff;
  border-radius: 20px;
  padding: 2 * 14px;
  margin-bottom: 20px;

  .title-bar {
    border-bottom: 1px solid $yoyi-border-color;
    padding-bottom: 2 * 10px;
    display: flex;
    justify-content: space-between;
    color: $yoyi-text-color-grey;
  }
  .list-bar {
    font-size: 0;
    padding: 20px 0 0 0;
    display: flex;
    flex-wrap: wrap;

    .order-item {
      vertical-align: top;
      margin: 0 20px 20px 0;
    }
  }
  .side-bar {
    border-top: 1px solid $yoyi-border-color;
    padding-top: 2 * 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>