<template>
  <view class="wrapper-user-index">
    <view class="user-index-main">
      <view class="user-profile">
        <image class="user-avatar" :src="userInfo.headimgurl" />
        <button class="btn-refresh" open-type="getUserInfo" @getuserinfo="getWxUser"></button>
        <view class="user-other">
          <view class="user-phone">{{userInfo.login_name}}</view>
          <navigator class="user-vip" hover-class :url="`/pages/user/open?type=${userType}`" v-if="userType == 1">开通会员享好礼</navigator>
          <navigator class="user-vip" hover-class :url="`/pages/user/card?type=${userType}`" v-if="userType == 2">普通会员</navigator>
          <navigator class="user-vip" hover-class :url="`/pages/user/card?type=${userType}`" v-if="userType == 3">高级会员</navigator>
        </view>
      </view>
      <view class="user-info">
        <!-- <navigator class="info-item" hover-class url="/pages/user/point"> -->
        <navigator class="info-item" hover-class>
          <view class="item-text1">{{userInfo.point}}</view>
          <view class="item-text2">积分</view>
        </navigator>
        <navigator class="info-item">
          <!-- <navigator class="info-item" hover-class url="/pages/wallet/coupon"> -->
          <view class="item-text1">0</view>
          <view class="item-text2">优惠券</view>
        </navigator>
        <navigator class="info-item" hover-class url="/pages/wallet/index">
          <view class="item-text1">{{userInfo.balance}}</view>
          <view class="item-text2">钱包</view>
        </navigator>
      </view>
    </view>
    <navigator class="user-index-card" hover-class :class="[`user-index-card-${userType}`]" :url="`/pages/user/open?type=${userType}`"></navigator>
    <view class="user-index-my">
      <view class="my-item" @click="goUrl('/pages/user/shopping-cart')">
        <image class="item-icon" src="/static/images/user/user-cart.png" mode="aspectFit" />
        <view class="item-text">购物车</view>
      </view>
      <view class="my-item" @click="goUrl('/pages/user/card')">
        <image class="item-icon" src="/static/images/user/user-gift.png" mode="aspectFit" />
        <view class="item-text">礼品卡</view>
      </view>
      <view class="my-item" @click="goUrl('/pages/user/collectProduct')">
        <image class="item-icon" src="/static/images/user/user-favor.png" mode="aspectFit" />
        <view class="item-text">商品收藏</view>
      </view>
      <view class="my-item" @click="goUrl('/pages/mine/order-list')">
        <image class="item-icon" src="/static/images/user/user-order.png" mode="aspectFit" />
        <view class="item-text">订单</view>
      </view>
    </view>
    <view class="user-index-navigation">
      <navigator class="navigation-item" hover-class url="/pages/user/card-transfer">
        <view class="item-info">
          <image class="item-icon" src="/static/images/user/user-vip.png" mode="aspectFit" />
          <view class="item-name">会员卡迁移</view>
        </view>
        <view class="item-nav">
          <view class="item-nav1">旧会员卡</view>
          <view class="item-nav2">绑定更新</view>
        </view>
      </navigator>
      <navigator class="navigation-item" hover-class url="/pages/user/activity">
        <view class="item-info">
          <image class="item-icon" src="/static/images/user/user-act.png" mode="aspectFit" />
          <view class="item-name">活动中心</view>
        </view>
        <view class="item-nav">
          <view class="item-nav1">我的活动</view>
          <view class="item-nav2">票券扫码</view>
        </view>
      </navigator>
    </view>
    <view class="user-index-list">
      <uni-list>
        <uni-list-item title="付款码" note="门店扫码积分或优惠券、电子钱包支付" @click="goUrl('/pages/wallet/pay')"></uni-list-item>
        <!-- <uni-list-item title="授权副卡" @click="goUrl('/pages/user/card-second')"></uni-list-item> -->
        <uni-list-item title="收货地址" @click="goUrl('/pages/user/address/manage')"></uni-list-item>
        <uni-list-item title="个人资料" @click="goUrl('/pages/user/personalInfo')"></uni-list-item>
        <uni-list-item title="关于书城" @click="goUrl('/pages/user/about')"></uni-list-item>
      </uni-list>
    </view>

    <view class="toast_div" :class="isLogin ? '':'show_toast'">
      <view class="toast_c">
        <view class="tlt_shuf">当前未登录</view>
        <view class="toast_shuf">点击一键授权快速登录</view>
        <!-- <view class="rules">我已同意借阅规则</view> -->
        <button class="fast_login" open-type="getPhoneNumber" @getphonenumber="getMobile">立即授权</button>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import passport from "@/modules/passport"
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

export default {
  components: { uniList, uniListItem },
  data() {
    return {
      userType: 1,//1:非会员 2:普通会员 3:高级会员
      isLogin: true,
      userInfo: {
        id: 0,
        nick_name: '未设置',
        login_name: '未登录',
        headimgurl: '/static/images/user/user-avatar.png'
      }
    }
  },
  onLoad() {
  },
  onShow() {
    let that = this
    //检测成功回调
    passport.checkSession(function (openid) {
      let wxUser = user.methods.getUser()
      if (!wxUser.login_name) {
        //加载用户信息
        that.api_106()
      } else {
        that.bindUser(wxUser)
        //检测页面重定向
        that.checkRedirect()
      }
    })
  },
  methods: {
    /**
     * 获取手机号码
     */
    getMobile: function (e) {
      let that = this
      passport.bindMobile(e, function (code, user) {
        if (code == api.state.state_200) {
          that.isLogin = true
          that.bindUser(user)
        }
        //是否存在重定向
        let returl = uni.getStorageSync('returl')
        if (returl) {
          uni.removeStorage({ key: 'returl', success: function (res) { } })
          //重定向
          uni.navigateTo({ url: returl })
        }
      })
    },
    /**
     * 加载微信用户信息
     */
    getWxUser: function (e) {
      let that = this
      passport.getWxUser(e, function (code, user) {
        if (code == api.state.state_200) {
          that.userInfo.headimgurl = user.avatarUrl
          that.bindUser(that.userInfo)
        }
      })
    },
    /**
     * 加载微信用户信息
     */
    bindUser: function (_user) {
      if (_user.headimgurl != undefined && !_user.headimgurl.length) _user.headimgurl = '/static/images/user/user-avatar.png'
      this.userInfo.login_name = appG.util.getHideMobile(_user.login_name)
      if (_user.nickname) this.userInfo.nick_name = _user.nickname
      this.userInfo = _user
      //登录  
      user.methods.login(_user)
    },
    /**
     * 加载用户信息
     */
    api_106: function () {
      let that = this
      let userInfo = user.methods.getUser()
      api.post(api.api_106, api.getSign({ OpenID: userInfo.openid }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            if (res.data.Result.login_name != undefined) {
              //设置登录状态
              that.isLogin = true
              //昵称
              res.data.Result.nickname = decodeURI(res.data.Result.nickname)
              //绑定用户
              that.bindUser(res.data.Result)
              //检测页面重定向
              that.checkRedirect()
            } else {
              //弹出手机号码授权
              that.isLogin = false
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
     * 路由跳转
     */
    goUrl(url) {
      uni.navigateTo({
        url,
      })
    },
    /**
     * 检测是否需要重定向
     */
    checkRedirect(url) {
      let returl = uni.getStorageSync('returl')
      if (returl != "") {
        uni.removeStorage({ key: 'returl', success: function (res) { } })
        uni.navigateTo({ url: returl })
      }
    }
  }
}
</script>

<style lang="scss">
.wrapper-user-index {
  .user-index-main {
    width: 750px;
    height: 285px;
    padding: 30px 0;
    background: $yoyi-bg-color;
    .user-profile {
      display: flex;
      padding: 0 60px;
      .user-avatar {
        width: 100px;
        height: 100px;
        background: #eee;
        border-radius: 50px;
        margin-right: 25px;
      }
      .btn-refresh {
        background: #fff;
        width: 45rpx;
        height: 45rpx;
        position: flex;
        margin-left: -32rpx;
        margin-top: 58rpx;
        right: 30rpx;
        bottom: -5rpx;
        border-radius: 100%;
        padding: 0;
        overflow: hidden;
        background: #fff
          url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACR0lEQVRYR8WXgTUDQRCG/1SAClABKkAFqIBUgApQASpABaiAVIAK0AEV8D5vJm9yt5e1d5dk3svLJXe388//z87MDrRgGyzYv0oA7EnaNMA7kl4lfUn6kPRo18Xx5ACsSTqTtC9pObM6gK4k3ZWgaAKAs0tJRw2LfUtaarj3LOnUGMpiSQGA5ptAN4tA8YN9oD0a7CAJYCOooaTbHIIqAJw/BbpHkk7+GQ2s8SySucEEsjRaBMACL5LQHbu2BXNBVO/DBmw5Gwf2O7lOBEDkvIxdSDov9Ryeh0lyARBItmW7pbakA8AxAFxvdO1q5AS5hLEzkgntAN6NerIbCaqJ1hYMLGzby+spFgAAXWjfB/VVoARDcFgypwCA1p65SZRtw7f3KFAbFj3rTxgAnKbPsAO6+ETrQ4uY3RADXDF5YZ1CNwIA9PMHe953QRcAUXeKEb3CE3zXAIxrDQB+etafHXQfImAHwAhGYUJu7yvDWQDAUdyCTWz+lWoAeJL0JYE7nAZi3CdiEqJVLUu7JEMDExNNah7bMDJR65CzLkROIAWJxEPuWh3gD88DSjAy9FWKswqmmhHFgxY6F4vtOBaQru0Yyr0aTmWzOpAgxaqFziRD4Sg1qimFCM0Z5aa29tRI5oMEjrmGDb5zhsPjyiBTNJK5A/oCwyQdzM0H0tT8z3nBh9I4urcaSt0hCyGB1/Bq9OjadE4oGWSzJyOSiXaKjk3nAAf3ZqCzo3iMJncyis8Cwo9mfFO6/WiGRK1qRwmAXBK2ur9wAL9Ta3wACYX9yAAAAABJRU5ErkJggg==)
          no-repeat center center/28rpx 28rpx;
      }
      .btn-refresh:after {
        border: none;
      }

      .user-other {
        display: flex;
        flex-direction: column;
        text-align: center;
        .user-phone {
          height: 40px;
          font-size: 28px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
        }
        .user-vip {
          height: 32px;
          padding: 6px 20px;
          background: rgba(0, 67, 139, 1);
          border-radius: 22px;
          font-size: 22px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 32px;
        }
      }
    }
    .user-info {
      margin-top: 36px;
      padding: 0 60px;
      display: flex;
      justify-content: space-around;
      .info-item {
        width: 104px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        .item-text1 {
          height: 50px;
          font-size: 36px;
          line-height: 50px;
        }
        .item-text2 {
          height: 34px;
          font-size: 24px;
          line-height: 34px;
        }
      }
    }
  }
  .user-index-card {
    margin-top: -71px;
    width: 750px;
    height: 142px;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-image: url(~@/static/images/user/user-index-card-1.png);
    background-size: contain;
  }
  .user-index-card-1 {
    background-image: url(~@/static/images/user/user-index-card-1.png);
  }
  .user-index-card-2 {
    background-image: url(~@/static/images/user/user-index-card-2.png);
  }
  .user-index-my {
    margin: 0 0 20px;
    display: flex;
    justify-content: space-around;
    .my-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      .item-icon {
        margin: 0 auto;
        width: 60px;
        height: 60px;
      }
      .item-text {
        width: 120px;
        height: 36px;
        font-size: 26px;
        font-weight: 400;
        color: rgba(32, 32, 32, 1);
        line-height: 36px;
      }
    }
  }
  .user-index-navigation {
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
    .navigation-item {
      width: 250px;
      height: 100px;
      padding: 24px 40px 16px 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      border: 2px solid rgba(0, 78, 162, 0.3);
      .item-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .item-icon {
          width: 90px;
          height: 48px;
        }
        .item-name {
          height: 48px;
          font-size: 30px;
          font-weight: 500;
          color: rgba(0, 86, 178, 1);
          line-height: 48px;
        }
      }
      .item-nav {
        margin-top: 12px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 24px;
        font-weight: 400;
        color: rgba(0, 78, 162, 0.6);
      }
    }
  }
  .user-index-list {
    background: rgba(245, 245, 245, 1);
    padding-top: 16px;
    .uni-list {
      &:before {
        height: 0;
      }
    }
    .uni-list-item {
      &__content {
        flex-direction: row;
        justify-content: space-between;
        &-title {
          font-size: $uni-font-size-middle;
        }
        &-note {
          line-height: 1.5;
        }
      }
      &__extra {
        width: auto;
      }
    }
  }

  .toast_div {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -100%;
    left: 0;
    opacity: 0;
    transition: all 250ms ease-in-out;
    z-index: 600;

    .toast_c {
      width: 68%;
      height: 330rpx;
      border-radius: 15rpx;
      background: #fff;
      position: relative;
      text-align: center;
      color: #666;
    }

    .toast_c {
      view {
        font-size: 28rpx;
      }
      .tlt_shuf {
        font-size: 40rpx;
        color: #000;
        padding: 25rpx 0;
      }

      .toast_shuf {
        font-size: 32rpx;
        color: #999;
        padding: 10rpx 0;
      }
      .rules {
        font-size: 32rpx;
        color: #999;
        padding: 15rpx 0;
        margin-top: 15rpx;
      }
      .fast_login {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 36rpx;
        color: #333;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #ebebeb;
        background: #f1f1f1;
      }
    }
  }

  .show_toast {
    bottom: 0 !important;
    opacity: 1;
  }
}
</style>
