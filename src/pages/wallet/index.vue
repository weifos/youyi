<template>
  <view class="wrapper-wallet">
    <view class="wallet-summary">
      <view class="summary-count">
        <text>&yen;</text>
        <text>{{userInfo.balance}}</text>
      </view>
      <view class="summary-title">当前余额</view>
      <navigator class="summary-detail" url="/pages/wallet/detail">零钱明细</navigator>
    </view>
    <yoyiTitle title="选择充值金额"></yoyiTitle>
    <view class="money-list">
      <view class="money-item" v-for="(item, index) in rechargeList" :key="index">
        <moneyItem :price="item.amount" :present="item.title" :selected="index == selected" @click="selectMoney(`${index}`)"></moneyItem>
      </view>
    </view>
    <view class="wallet-list">
      <uni-list>
        <uni-list-item title="储值卡充入" @click="jump('/pages/wallet/recharge')"></uni-list-item>
        <uni-list-item title="购买礼品卡" @click="jump('/pages/wallet/gift-buy')"></uni-list-item>
        <uni-list-item title="交易密码设置"></uni-list-item>
      </uni-list>
    </view>
    <operationButton :price="10" @click="api_331"></operationButton>
  </view>
</template>
<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import QRCode from '../../modules/weapp-qrcode.js'
import yoyiTitle from '@/components/yoyi-title/'
import moneyItem from '@/components/yoyi-money-item/'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, moneyItem, uniList, uniListItem, operationButton },
  data() {
    return {
      selected: -1,
      //充值金额
      rechargeAmount: 0,
      //充值列表
      rechargeList: [],
      //是否支付中
      isPaying: false,
      //用户信息
      userInfo: { balance: 0 }
    }
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (opt) {
    //获取用户信息
    this.userInfo = user.methods.getUser()
    //加载充值项目
    this.api_330()
  },
  methods: {
    selectMoney(value) {
      this.selected = value
    },
    jump(url) {
      uni.navigateTo({
        url,
      })
    },
    /**
     * 加载充值列表
     */
    api_330: function () {
      var that = this
      api.post(api.api_330, api.getSign(), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.rechargeList = res.data.Result.recharges
          user.methods.login(res.data.Result.user)
        } else {
          uni.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        }
      })
    },
    /**
     * 立即充值
     */
    api_331(provider) {
      let that = this
      if (this.selected == -1) {
        uni.showToast({
          title: '请选择充值金额',
          icon: 'none',
          duration: 3000
        })
        return
      }

      //设置支付状态
      that.isPaying = true
      //获取充值的选项
      let item = that.rechargeList[that.selected]
      api.post(api.api_331, api.getSign({
        ID: item == undefined ? 0 : item.id,
        Amount: that.rechargeAmount
      }),
        function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          } else {
            that.serial_no = res.data.Result.serial_no
            //通过uni-app吊起支付
            uni.requestPayment({
              provider: provider,
              appId: res.data.Result.wechatpay.appId,
              timeStamp: res.data.Result.wechatpay.timeStamp,
              nonceStr: res.data.Result.wechatpay.nonceStr,
              package: res.data.Result.wechatpay.package,
              signType: res.data.Result.wechatpay.signType,
              paySign: res.data.Result.wechatpay.paySign,
              success: function (res) {
                that.api_332()
              },
              fail: function (err) {
                setTimeout(() => {
                  that.isPaying = false
                }, 500)
              },
              complete: () => {
                setTimeout(() => {
                  that.isPaying = false
                }, 500)
              }
            })
          }
        })
    },
    /**
     * 完成充值
     */
    api_332: function () {
      var that = this
      api.post(api.api_332, api.getSign({ No: that.data.serial_no }), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          router.goUrl({ url: '../home/userIndex' })
        } else {
          uni.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        }
      })
    },//立即购买
    buyNow() {
      let that = this
      //是否在支付中
      if (that.isPaying) return
      //微信支付
      if (this.order.pay_method == 13) {
        //获取uni-app服务提供商
        uni.getProvider({
          service: 'payment',
          success: function (res) {
            //微信支付
            if (~res.provider.indexOf('wxpay')) {
              //生成订单吊起支付
              that.api_331(res.provider[0])
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.wrapper-wallet {
  .wallet-summary {
    width: 100%;
    position: relative;
    height: 300px;
    background: $yoyi-bg-color;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .summary-count {
      font-size: 80px;
      text:first-child {
        font-size: 60px;
      }
    }
    .summary-title {
      font-size: 24px;
    }
    .summary-detail {
      position: absolute;
      right: -2px;
      bottom: 30px;
      border-radius: 200px 0px 0px 200px;
      border: 1px solid rgba(255, 255, 255, 1);

      width: 96px;
      height: 34px;
      padding: 7px 20px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 34px;
    }
  }
  .money-title {
    width: 690px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    font-size: 32px;
    font-weight: 400;
    color: $yoyi-text-color-basic;
  }
  .money-list {
    position: relative;
    overflow: hidden;
    width: 682px;
    margin: 0 auto;
    .money-item {
      float: left;
      margin: 0 16px 16px 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .wallet-list {
    margin-top: 20px;
    .uni-list {
      &:before {
        height: 0;
      }
    }
    .uni-list-item {
      &__content {
        &-title {
          font-size: $uni-font-size-middle;
        }
      }
    }
  }
}
</style>