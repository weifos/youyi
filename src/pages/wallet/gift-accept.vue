<template>
  <view class="wrapper-wallet-gift-accept">
    <view class="wallet-recharge-card">
      <image src="/static/images/wallet-recharge-card.png" />
    </view>
    <view class="wallet-gift-accept-title">
      <view class="accept-text">收到好友赠送的礼品卡</view>
      <view class="accept-sum">
        <text>&yen;</text>
        <text>100元</text>
      </view>
    </view>
    <view class="wallet-gift-accept-list">
      <view class="wallet-gift-accept-item">
        <view class="user-profile">
          <image class="user-avatar" src="/static/images/user/user-avatar.png" />
          <view class="user-other">
            <view class="user-phone">134***7818</view>
            <view class="user-vip">女神节快乐~！</view>
          </view>
        </view>
      </view>
    </view>
    <operationButton buttonText="领取"></operationButton>
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
.wrapper-wallet-gift-accept {
  .wallet-recharge-card {
    margin: 0 auto;
    width: 646px;
    height: 340px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .wallet-gift-accept-title {
    width: 646px;
    margin: 50px auto 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .accept-text {
      height: 40px;
      font-size: 28px;
      font-weight: 400;
      color: $yoyi-text-color-basic;
      line-height: 40px;
    }
    .accept-sum {
      height: 60px;
      font-size: 36px;
      font-weight: 600;
      color: $yoyi-button-color;
      line-height: 50px;
    }
  }
  .wallet-gift-accept-list {
    margin-top: 80px;
  }
  .wallet-gift-accept-item {
    .user-profile {
      display: flex;
      padding: 0 60px;
      .user-avatar {
        width: 100px;
        height: 100px;
        background: #eee;
        border-radius: 50px;
        margin-right: 15px;
      }
      .user-other {
        max-width: 500px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        .user-phone {
          height: 40px;
          font-size: 28px;
          font-weight: 400;
          color: $yoyi-text-color-basic;
          line-height: 40px;
        }
        .user-vip {
          padding: 6px 0;
          border-radius: 22px;
          font-size: 22px;
          font-weight: 400;
          color: $yoyi-button-color;
          line-height: 32px;
        }
      }
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