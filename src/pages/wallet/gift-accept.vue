<template>
  <view class="wrapper-wallet-gift-accept">
    <view class="wallet-recharge-card">
      <image :src="result.img_url" />
    </view>
    <view class="wallet-gift-accept-title">
      <view class="accept-text">收到好友赠送的礼品卡</view>
      <view class="accept-sum">
        <text>&yen;</text>
        <text>{{result.amount}}元</text>
      </view>
    </view>
    <view class="wallet-gift-accept-list">
      <view class="wallet-gift-accept-item">
        <view class="user-profile">
          <image class="user-avatar" :src="giveUser.headimgurl" />
          <view class="user-other">
            <view class="user-phone">{{giveUser.login_name}}</view>
            <view class="user-vip">{{result.remarks}}</view>
          </view>
        </view>
      </view>
    </view>
    <operationButton buttonText="领取" @click="api_357"></operationButton>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import yoyiTitle from '@/components/yoyi-title/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  data() {
    return {
      giveUser: {},
      result: {}
    }
  },
  components: { yoyiTitle, operationButton },
  onLoad: function () {
    this.api_356()
  },
  methods: {
    /**
     * 加载被赠送的礼品卡
     */
    api_356: function (item) {
      let that = this
      api.post(api.api_356, api.getSign({}),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.giveUser = res.data.Result.userDetails
            that.giveUser.login_name = appG.util.getHideMobile(that.giveUser.login_name)
            that.result = res.data.Result.userGiveCard
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 接受赠送礼品卡
     */
    api_357: function (item) {
      let that = this
      api.post(api.api_357, api.getSign({}),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            let wxUser = user.methods.getUser()
            wxUser.balance += item.amount
            user.methods.login(wxUser)
            uni.navigateTo({ url: 'gift-buy' })
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    }
  }

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