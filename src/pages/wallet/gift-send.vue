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
        <input class="uni-input" type="text" v-model="mobile" maxlength="11" placeholder="被赠送的用户(手机号码)" />
      </view>
    </view>
    <view class="uni-form">
      <view class="uni-form-item">
        <input class="uni-input" type="text" v-model="giveCard.remarks" placeholder="请输入留言(仅支持文字信息)" />
      </view>
    </view>
    <operationButton buttonText="赠送" @click="api_355"></operationButton>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import yoyiTitle from '@/components/yoyi-title/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, operationButton },
  data() {
    return {
      tabIndex: 0,
      mobile: '',
      giveCard: {
        serial_no: '',
        remarks: ''
      }
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (opt) {
    this.api_354(opt.no)
  },
  methods: {
    /**
     * 加载礼品卡
     */
    api_354: function (card_no) {
      let that = this
      api.post(api.api_354, api.getSign({ CardNo: card_no }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.giveCard = res.data.Result
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 赠送礼品卡
     */
    api_355: function () {
      let that = this
      if (!appG.verifyStr.isMoblie(that.mobile)) {
        appG.dialog.showToast({ title: '手机号码输入不正确', duration: 2000, icon: "none" })
        return
      }

      api.post(api.api_355, api.getSign({
        Mobile: that.mobile,
        giveCard: that.giveCard
      }), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          uni.navigateTo({ url: 'gift-buy?tab=1' })
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        }
      })

    }
  }
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