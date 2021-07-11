<template>
  <view :class="[`wrapper-vip-brand-${type}`]" class="wrapper-vip-brand">
    <view class="vip-brand-content">
      <template v-if="type == 1">
        <view class="card-text-1">会员俱乐部</view>
        <view class="card-text-2">开通书城会员 尊享多重特权</view>
        <!-- <navigator class="card-text-3" hover-class="" url="/userPackages/rights">会员权益详情&gt;</navigator> -->
      </template>
      <template v-if="type == 2">
        <view class="card-text-1">会员俱乐部</view>
        <view class="card-text-2">{{text}}</view>
      </template>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vipBrand',
  props: {
    type: {
      type: [String, Number],
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
.wrapper-vip-brand {
  .vip-brand-content {
    margin: 18px auto;
    width: 486px;
    height: 280px;
    padding: 40px 80px 20px 80px;
    background: url(data:image/png;base64,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)
      center center no-repeat $yoyi-bg-color;
    border-radius: 24px;
    text-align: center;
    color: #fff;
    .card-text-1 {
      font-size: $uni-font-size-lg;
      font-weight: bolder;
      margin: 50px 0 0px;
      font-family: -apple-system;
    }
    .card-text-2 {
      font-size: $uni-font-size-lg;
      margin-bottom: 50px;
    }
    .card-text-3 {
      font-size: $uni-font-size-sm;
    }
  }
}

.wrapper-vip-brand-2 {
  .vip-brand-content {
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .card-text-1 {
      font-size: $uni-font-size-lg;
      font-weight: bolder;
      margin: 0;
      font-family: -apple-system;
      line-height: 250px;
    }
    .card-text-2 {
      font-size: $uni-font-size-lg * 1.5;
      margin: 0;
      font-weight: normal;
      line-height: 240px;
    }
  }
}
</style>