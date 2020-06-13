<template>
  <view class="wrapper-wallet-recharge">
    <view class="wallet-recharge-card">
      <image src="/static/images/wallet-recharge-card.png" />
    </view>
    <view class="wallet-recharge-title">
      <yoyiTitle title="填写领卡人信息"></yoyiTitle>
    </view>
    <view class="uni-form">
      <view class="uni-form-item">
        <input class="uni-input" type="text" v-model="userName" placeholder="请输入真实姓名" maxlength="30" />
      </view>
      <view class="uni-form-item">
        <input class="uni-input" type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11" />
      </view>
      <view class="uni-form-item">
        <input class="uni-input" type="text" placeholder="请输入验证码" />
        <view class="btn-getcode" @click="api_209">{{timer.text}}</view>
      </view>
    </view>
    <operationButton buttonText="领取" @click="api_210"></operationButton>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import yoyiTitle from '@/components/yoyi-title/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, operationButton },
  data() {
    return {
      userName: '',
      mobile: '',
      loaing: false,
      timer: {
        text: '获取验证码',
        setInter: '',
        num: 60
      }
    }
  },
  onLoad() {

  },
  methods: {
    //获取验证码
    api_209() {
      let that = this
      if (!appG.verifyStr.isMoblie(that.mobile)) {
        uni.showToast({ title: '手机号码输入不正确', duration: 2000, icon: "none" })
        return
      }

      if (that.loaing) { return }
      that.loaing = true
      if (that.timer.num >= 0 && that.timer.num < 60) { return }

      //发送短信
      api.post(api.api_209, api.getSign({ Mobile: that.mobile, UserName: that.userName }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.startSetInter()
        } else {
          uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
    },
    //立即领卡
    api_210() {
      let that = this

      if (that.userName.length == 0) {
        uni.showToast({ title: '请输入用户名称', duration: 2000, icon: "none" })
        return
      }

      if (appG.verifyStr.isMoblie(that.mobile)) {
        uni.showToast({ title: '手机号码输入不正确', duration: 2000, icon: "none" })
        return
      }

      api.post(api.api_210, api.getSign(), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((ele, index) => {
            that.$set(ele, "checked", false)
          })
          that.checkUpdate()
          that.result = res.data.Result
        } else {
          uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })

    },
    /**
    * 开始计时器
    */
    startSetInter: function () {
      let that = this
      //将计时器赋值给setInter
      that.setInter = setInterval(function () {
        that.timer.num--
        if (that.timer.num <= 0) {
          that.endSetInter()
        } else {
          that.timer.text = that.timer.num + "秒后重新发送"
        }
      }, 1000)
    },
    /**
     * 开始计时器
     */
    endSetInter: function () {
      let that = this
      that.timer.num = 60
      that.timer.text = "获取验证码"
      //清除计时器  即清除setInter
      clearInterval(that.setInter)
    }
  }
}
</script>

<style lang="scss">
.wrapper-wallet-recharge {
  .wallet-recharge-card {
    margin: 0 auto;
    width: 646px;
    height: 340px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .wallet-recharge-title {
    width: 100%;
    margin-top: 50px;
    border-bottom: 2px solid $yoyi-border-color2;
  }
  .uni-form {
    width: 646px;
    margin: 40px auto 0;
    .uni-form-item {
      margin-bottom: 20px;
      position: relative;
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
.btn-getcode {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: $yoyi-text-color;
  font-size: $uni-font-size-sm;
  z-index: 10;
}
</style>