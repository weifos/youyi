<template>
  <view class="wrapper-wallet-gift-send">
    <view class="wallet-recharge-card">
      <image src="/static/images/wallet-recharge-card.png" />
    </view>
    <view class="wallet-gift-send-title">
      <yoyiTitle title="赠卡留言"></yoyiTitle>
    </view>
    <view class="uni-form">
      <view class="uni-form-item">
        <input class="uni-input" type="text" placeholder="请输入留言(仅支持文字信息)" />
      </view>
    </view>
    <operationButton buttonText="赠送"></operationButton>
  </view>
</template>

<script>
import yoyiTitle from '@/components/yoyi-title/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, operationButton },
}
</script>

<style lang="scss">
.wrapper-wallet-gift-send {
  .wallet-recharge-card {
    margin: 0 auto;
    width: 646px;
    height: 340px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .wallet-gift-send-title {
    width: 100%;
    margin-top: 50px;
    border-bottom: 2px solid $yoyi-border-color2;
  }
  .uni-form {
    width: 646px;
    margin: 40px auto 0;
    .uni-form-item {
      margin-bottom: 20px;
    }
    .uni-label {
      width: 60px;
      height: 42px;
      line-height: 49px;
      padding: 14px;
      text-align: center;
      text-indent: 0;
    }
    .uni-input {
      width: 580px;
      height: 42px;
      line-height: 42px;
      padding: 12px 24px;
      border: 2px solid $yoyi-border-color2;
      border-radius: 10px;
    }
  }
  .wallet-recharge-tips {
    width: 600px;
    margin: 172px auto 0;
    color: $yoyi-border-color2;
    view:first-child {
      color: $yoyi-text-color-basic;
    }
  }
}
</style>