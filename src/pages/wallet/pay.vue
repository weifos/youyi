<template>
  <view class="wrapper-wallet-pay">
    <view class="user-profile">
      <image class="user-avatar" :src="userInfo.headimgurl" />
      <view class="user-other">
        <view class="user-phone">{{userInfo.login_name}}</view>
        <view class="user-number">{{'NO.'+userInfo.card_no}}</view>
      </view>
    </view>
    <view class="pay-list">
      <view class="pay-item" :class="{'checked':list[0].checked}">
        <checkbox-group class="agreement-checkbox" @change="checkboxChange">
          <checkbox :checked="list[0].checked" :value="list[0].value" color="#202020" />
          <text>使用优惠券</text>
        </checkbox-group>
        <navigator class="agreement-link" hover-class url="/pages/wallet/pay-coupon">选择优惠券 &gt;</navigator>
      </view>
      <view class="pay-item" :class="{'checked':list[1].checked}">
        <checkbox-group class="agreement-checkbox" @change="checkboxChange">
          <checkbox :checked="list[1].checked" :value="list[1].value" color="#202020" />
          <text>钱包支付（余额{{userInfo.balance}}）</text>
        </checkbox-group>
        <navigator class="agreement-link" hover-class>去充值 &gt;</navigator>
        <!-- <navigator class="agreement-link" hover-class url="/pages/wallet/index">去充值 &gt;</navigator> -->
      </view>
    </view>
    <view class="pay-code">
      <view class="code-tips">此二维码可累计积分并付款</view>
      <canvas class="code-image" canvas-id="myQrcode" style="background:#fff;width: 180px;height: 180px;margin:0 auto;" />
      <view class="code-tips">{{30 - timer.num}} 秒后刷新</view>
    </view>
  </view>
</template>
<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import vipBrand from '@/components/yoyi-vip-brand/'
import QRCode from '../../modules/weapp-qrcode.js'

export default {
  components: { vipBrand },
  data() {
    return {
      cid: 0,
      cname: '',
      tname: '',
      userInfo: {
        id: 0,
        balance: 0,
        card_no: '',
        nick_name: '未设置',
        login_name: '未登录',
        headimgurl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      },
      user_code: 0,
      timer: {
        setInter: '',
        num: 0
      },
      list: [
        {
          value: 'coupon',
          checked: false,
        },
        {
          value: 'balance',
          checked: false,
        },
      ],
      src: '',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    //优惠券
    if (opt.cid != undefined && opt.cname != undefined && opt.tname != undefined) {
      this.cid = opt.cid
      this.cname = opt.cname
      this.tname = opt.tname
    }

    //获取用户信息
    let _user = user.methods.getUser()
    //获取用户ID信息
    let str1 = appG.util.getPlaceholder('000000000000000', _user.user_id)
    //获取用户优惠券
    let str2 = appG.util.getPlaceholder('000000000000000', this.cid)
    //设置付款码
    this.user_code = str1 + str2
    //
    this.userInfo = _user
    this.bindUser(_user)

    this.createQRCode(this.user_code)
    setTimeout(() => {
      this.createQRCode(this.user_code)
      this.startSetInter()
    }, 1000)

    this.userInfo = user.methods.getUser()
    this.userInfo.login_name = appG.util.getHideMobile(this.userInfo.login_name)
  },
  methods: {
    /**
    * 开始计时器
    */
    startSetInter: function () {
      let that = this
      //将计时器赋值给setInter
      that.setInter = setInterval(
        function () {
          let numVal = that.timer.num + 1
          if (numVal > 30) {
            numVal = 0
            that.createQRCode(that.user_code)
          }
          that.timer.num = numVal
        }, 1000)
    },
    /**
     * 开始计时器
     */
    endSetInter: function () {
      let that = this;
      //清除计时器  即清除setInter
      clearInterval(that.setInter)
    },
    /**
     * 生成二维码
     * 用户ID#优惠券ID#时间戳
     */
    createQRCode(str) {
      //时间戳
      let time_ticket = new Date().getTime()
      //console.log(str + time_ticket)
      new QRCode('myQrcode', {
        text: str + time_ticket,
        width: 180,
        height: 180,
        padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
        correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
        callback: (res) => {
          console.log(res.path)
          // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
        }
      })
    },
    /**
     * 加载微信用户信息
     */
    bindUser: function (user) {
      if (user.nickname) this.userInfo.nick_name = user.nickname
      this.userInfo.login_name = appG.util.getHideMobile(user.login_name)
      this.userInfo.headimgurl = user.headimgurl
    },
    checkboxChange(e) {
      let items = this.list, values = e.detail.value
      for (let i = 0, item, lenI = items.length; i < lenI; ++i) {
        item = items[i]
        if (values.includes(item.value)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
      }
    }
  },
}
</script>
<style lang="scss">
.wrapper-wallet-pay {
  width: 710px;
  margin: 20px auto;
  background: #fff;
  .user-profile {
    display: flex;
    padding: 40px;
    height: 120px;
    background: $yoyi-bg-color;
    border-radius: 24px 24px 0px 0px;
    .user-avatar {
      width: 100px;
      height: 100px;
      background: #eee;
      border-radius: 50px;
      margin-right: 50px;
    }
    .user-other {
      display: flex;
      flex-direction: column;
      .user-phone,
      .user-number {
        height: 40px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
      .user-number {
        margin-top: 20px;
        font-family: -apple-system;
      }
    }
  }
  .pay-list {
    margin: 60px 0 40px;
    padding: 0 40px;
    .pay-item {
      margin: 50px 0;
      width: 650px;
      font-size: $uni-font-size-sm;
      display: flex;
      justify-content: space-between;
      color: $yoyi-text-color-basic;
      &.checked {
        .agreement-link {
          color: $yoyi-button-color;
        }
      }
      .agreement-checkbox {
        display: flex;
        width: auto;
        checkbox {
          margin-top: 6px;
          margin-right: 8px;
          width: 40px;
          height: 40px;
          .wx-checkbox-input {
            width: 30px;
            height: 30px;
            &.wx-checkbox-input-checked {
              &::before {
              }
            }
          }
        }
        uni-checkbox {
          .uni-checkbox-input {
            width: 40px;
            height: 40px;
            &.uni-checkbox-input-checked {
              &::before {
                font-size: $uni-font-size-base;
              }
            }
          }
        }
        text {
          font-size: $uni-font-size-middle;
        }
      }
      .agreement-link {
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: $uni-font-size-sm;
        color: $yoyi-text-color-grey;
      }
    }
  }
  .pay-code {
    padding-top: 80px;
    border-top: 2px dashed $yoyi-border-color2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .code-tips {
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin: 10px auto;
    }
    .code-image {
      margin: 0 auto;
      width: 314px;
      height: 314px;
    }
  }
}
</style>