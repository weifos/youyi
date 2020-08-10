<template>
  <view class="wrapper-card-transfer">
    <vipBrand type="2" text="会员卡迁移"></vipBrand>
    <view class="uni-form">
      <view class="uni-form-item">
        <!-- <view class="uni-label">卡号</view> -->
        <input class="uni-input" type="text" v-model="old_card_no" placeholder="输入老会员卡" />
      </view>
      <view class="uni-form-item">
        <!-- <view class="uni-label">手机</view> -->
        <input class="uni-input" type="text" v-model="mobile" placeholder="输入老会员卡绑定的手机号" />
      </view>
      <view class="uni-form-item">
        <input class="uni-input" type="text" v-model="code" placeholder="请输入验证码" />
        <view class="btn-getcode" @click="api_209">{{timer.text}}</view>
      </view>
    </view>
    <view class="user-agreement">
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <checkbox :checked="checked" color="#FFB825" />
        <view>
          <text>我已阅读并同意</text>
          <navigator class="agreement-link" url="/pages/user/index">《老卡会员迁移协议》</navigator>及
          <navigator class="agreement-link" url="/pages/user/index">《线上新会员规则协议》</navigator>
        </view>
      </checkbox-group>
    </view>
    <operationButton :buttonText="btn_text" :disabled="is_vip" @click="api_361"></operationButton>
  </view>
</template>
<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import vipBrand from '@/components/yoyi-vip-brand/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { vipBrand, operationButton },
  data() {
    return {
      checked: false,
      //按钮文字
      btn_text: '确定',
      //是否成为会员
      is_vip: false,
      //是否加载中
      loaing: false,
      //手机号码
      mobile: '',
      //老会员卡号
      old_card_no: '',
      //验证码
      code: '',
      timer: {
        text: '获取验证码',
        setInter: '',
        num: 60
      }
    }
  },
  onLoad() {
    var that = this
    that.userInfo = user.methods.getUser()
    if (that.userInfo.card_no != '') {
      that.btn_text = "已成为会员"
      that.is_vip = true
    }
  },
  methods: {
    checkboxChange(e) {
      if (e.detail && e.detail.value && e.detail.value.length > 0) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    //获取验证码
    api_209() {
      let that = this

      //已经成为会员
      if (that.is_vip) {
        return
      }

      //老会员卡号
      if (that.old_card_no == "") {
        appG.dialog.showToast({ title: '请输入老会员卡', duration: 2000, icon: "none" })
        return
      }

      //手机号码
      if (!appG.verifyStr.isMoblie(that.mobile)) {
        appG.dialog.showToast({ title: '手机号码输入不正确', duration: 2000, icon: "none" })
        return
      }

      //是否加载
      if (that.loaing) { return }
      that.loaing = true

      //倒计时
      if (that.timer.num >= 0 && that.timer.num < 60) { return }

      //发送短信，绑定会卡验证码
      api.post(api.api_209, api.getSign({
        Mobile: that.mobile,
        UserName: that.userName,
        SmsType: 20
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.startSetInter()
        } else {
          that.loaing = false
          appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
    },
    /**
    * 绑定老会员卡
    */
    api_361() {
      let that = this

      //已经成为会员
      if (that.is_vip) {
        return
      }

      //老会员卡号
      if (that.old_card_no == "") {
        appG.dialog.showToast({ title: '请输入老会员卡', duration: 2000, icon: "none" })
        return
      }

      //手机号码
      if (!appG.verifyStr.isMoblie(that.mobile)) {
        appG.dialog.showToast({ title: '手机号码输入不正确', duration: 2000, icon: "none" })
        return
      }

      //验证码
      if (that.code == "") {
        appG.dialog.showToast({ title: '验证码不能为空', duration: 2000, icon: "none" })
        return
      }

      //绑定老会员卡
      api.post(api.api_361, api.getSign({
        Code: that.code,
        CardNo: that.old_card_no,
        Mobile: that.mobile
      }), function (vue, res) {
        if (res.data.Basis.State != 500) {
          //刷新用户信息
          user.methods.login(res.data.Result)
          //会员卡页面
          uni.navigateTo({ url: "/pages/user/card" })
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
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
     * 结束计时器
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
<style scoped lang="scss">
.wrapper-card-transfer {
  .uni-form {
    width: 646px;
    margin: 80px auto 0;
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
  .user-agreement {
    position: fixed;
    left: 50%;
    bottom: 120px;
    width: 650px;
    margin-left: -325px;
    font-size: $uni-font-size-sm;
    display: flex;
    justify-content: center;
    .agreement-checkbox {
      display: flex;
      width: auto;
      checkbox {
        margin-right: 8px;
      }
    }
    .agreement-link {
      display: inline-block;
      color: #004ea2;
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