<template>
  <view class="wrapper-user-open">
    <vipBrand type="1"></vipBrand>
    <yoyiTitle title="开通会员" more="开通会员享更多好礼"></yoyiTitle>
    <view class="user-open-list">
      <vipListItem v-for="(item,index) in rechargeList" :key="index" class="open-item" :title="item.name" :price="item.full_amount" :selected="selected == index" :disabled="false" @click="selected = index"></vipListItem>
    </view>
    <view class="user-agreement">
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <checkbox :checked="checked" color="#FFB825" />
        <view>
          <text>我已阅读并同意</text>
          <navigator class="agreement-link" hover-class url="/pages/user/index">《友谊书城（付费）会员服务协议》</navigator>
        </view>
      </checkbox-group>
    </view>
    <operationButton :price="10" @click="recharge()"></operationButton>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import yoyiTitle from '@/components/yoyi-title/'
import vipBrand from '@/components/yoyi-vip-brand/'
import vipListItem from '@/components/yoyi-vip-list-item/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, vipBrand, vipListItem, operationButton },
  data() {
    return {
      selected: 0,
      checked: false,
      isPaying: false,
      rechargeList: []
    }
  },
  onLoad(options) {
  },
  onShow() {
    this.api_346()
    this.api_345()
  },
  methods: {
    select(value) {
      this.selected = value
    },
    checkboxChange(e) {
      if (e.detail && e.detail.value && e.detail.value.length > 0) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    /**
     * 判断在老系统是否存在会员
     */
    api_345: function () {
      let that = this
      let userInfo = user.methods.getUser()
      api.post(api.api_345, api.getSign({ Mobile: userInfo.login_name }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //是否存在老会员
            if (res.data.Result == 1) {
              uni.showToast({ title: '检测到您是老会员请先绑定会员卡号', icon: 'none', duration: 3000 })
              setTimeout(() => {
                uni.hideToast()
                uni.navigateTo({ url: '/pages/user/card-transfer' })
              }, 3000)
            }
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
     * 加载付费会员卡购买列表
     */
    api_346: function () {
      let that = this
      api.post(api.api_346, api.getSign({}),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.rechargeList = res.data.Result
          } else {
            uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 付费购买会员卡
     */
    api_347: function () {
      let that = this

      //请同意付费协议
      if (that.checked) {
        setTimeout(function () {
          uni.showToast({ title: '请同意付费协议', icon: 'none', duration: 3000 })
        }, 50)
        setTimeout(function () { uni.hideToast() }, 3000)
      }

      //请选择购买的会员卡
      let item = that.rechargeList[this.selected]
      if (item != null) {
        setTimeout(function () {
          uni.showToast({ title: '请选择购买的会员卡', icon: 'none', duration: 3000 })
        }, 50)
        setTimeout(function () { uni.hideToast() }, 3000)
      }

      uni.getProvider({
        service: 'payment', success: (res) => {
          let provider = res.provider[0]
          //微信支付
          if (~res.provider.indexOf('wxpay')) {
            //立即购买
            api.post(api.api_347, api.getSign({ CardID: item.id }), function (app, res) {
              if (res.data.Basis.State != api.state.state_200) {
                setTimeout(function () {
                  uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
                }, 50)
                setTimeout(function () { uni.hideToast() }, 3000)
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


                  },
                  fail: function (err) {
                    setTimeout(() => { that.isPaying = false }, 500)
                  },
                  complete: () => {
                    setTimeout(() => { that.isPaying = false }, 500)
                  }
                })
              }
            })
          }
        }
      })

    }
  }
}
</script>

<style lang="scss">
.wrapper-user-open {
  .user-open-list {
    width: 650px;
    margin: 36px auto 0;
    display: flex;
    flex-direction: column;
    .open-item {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .user-agreement {
    position: fixed;
    left: 0;
    bottom: 120px;
    width: 100%;
    font-size: $uni-font-size-sm;
    display: flex;
    justify-content: center;
    .agreement-checkbox {
      display: flex;
      width: auto;
      checkbox {
        margin: -2px 8px 0 0;
      }
    }
    .agreement-link {
      display: inline-block;
      color: #004ea2;
    }
  }
}
</style>
