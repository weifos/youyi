<template>
  <view class="wrapper-user-index">
    <view class="user-index-main">
      <view class="user-profile">
        <image :src="userInfo.headimgurl" class="user-avatar" />
        <button @getuserinfo="getWxUser" class="btn-refresh" open-type="getUserInfo"></button>
        <view class="user-other">
          <view class="user-phone">{{userInfo.login_name}}</view>
          <navigator :url="`/userPackages/open?type=${userType}`" class="user-vip" hover-class v-if="userType == 1">开通会员享好礼</navigator>
          <navigator :url="`/userPackages/card?type=${userType}`" class="user-vip" hover-class v-if="userType == 2">普通会员</navigator>
          <navigator :url="`/userPackages/card?type=${userType}`" class="user-vip" hover-class v-if="userType == 3">高级会员</navigator>
        </view>
      </view>
      <view class="user-info">
        <!-- <navigator class="info-item" hover-class url="/userPackages/point"> -->
        <navigator class="info-item" hover-class>
          <view class="item-text1">{{userInfo.point}}</view>
          <view class="item-text2">积分</view>
        </navigator>
        <navigator class="info-item" hover-class url="/walletPackages/coupon">
          <view class="item-text1">{{userInfo.user_coupon_count}}</view>
          <view class="item-text2">优惠券</view>
        </navigator>
        <!-- <navigator class="info-item" hover-class url="/pages/wallet/index"> -->
        <navigator class="info-item" hover-class>
          <view class="item-text1">{{userInfo.balance}}</view>
          <view class="item-text2">钱包</view>
        </navigator>
      </view>
    </view>
    <!-- <navigator class="user-index-card" hover-class :class="[`user-index-card-${userType}`]" :url="`/userPackages/open?type=${userType}`"></navigator> -->
    <navigator :class="[`user-index-card-${userType}`]" :url="`/userPackages/card`" class="user-index-card" hover-class></navigator>
    <view class="user-index-my">
      <view @click="goUrl('/userPackages/shopping-cart')" class="my-item">
        <image class="item-icon" mode="aspectFit" src="/static/images/user/user-cart.png" />
        <view class="item-text">购物车</view>
      </view>
      <!-- <view class="my-item" @click="goUrl('/pages/wallet/gift-buy?count='+acceptCount)">
        <image class="item-icon" src="/static/images/user/user-gift.png" mode="aspectFit" />
        <view class="item-text">礼品卡</view>
      </view>-->
      <view @click="goUrl('/userPackages/collectProduct')" class="my-item">
        <image class="item-icon" mode="aspectFit" src="/static/images/user/user-favor.png" />
        <view class="item-text">商品收藏</view>
      </view>
      <view @click="goUrl('/minePackages/order-list')" class="my-item">
        <image class="item-icon" mode="aspectFit" src="/static/images/user/user-order.png" />
        <view class="item-text">订单</view>
      </view>
    </view>
    <view class="user-index-navigation">
      <!--/userPackages/card-transfer-->
      <navigator class="navigation-item" hover-class url="/userPackages/card">
        <view class="item-info">
          <image class="item-icon" mode="aspectFit" src="/static/images/user/user-vip.png" />
          <view class="item-name">我的会员卡</view>
        </view>
        <view class="item-nav">
          <view class="item-nav1">会员优惠</view>
          <view class="item-nav2">会员权益</view>
        </view>
      </navigator>
      <navigator class="navigation-item" hover-class url="/userPackages/activity">
        <view class="item-info">
          <image class="item-icon" mode="aspectFit" src="/static/images/user/user-act.png" />
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
        <uni-list-item @click="goUrl('/userPackages/check-ticket')" note="验核用户活动报名的券码" title="验核活动券码" v-if="userInfo.verify_ticket"></uni-list-item>
        <uni-list-item @click="goUrl('/walletPackages/pay')" note="门店扫码积分或优惠券、电子钱包支付" title="付款码"></uni-list-item>
        <!-- <uni-list-item title="授权副卡" @click="goUrl('/userPackages/card-second')"></uni-list-item> -->
        <uni-list-item @click="goUrl('/userPackages/address/manage')" title="收货地址"></uni-list-item>
        <uni-list-item @click="goUrl('/userPackages/personalInfo')" title="个人资料"></uni-list-item>
        <uni-list-item @click="goUrl('/userPackages/about')" title="关于书城"></uni-list-item>
      </uni-list>
    </view>

    <view :class="isLogin ? '':'show_toast'" class="toast_div">
      <view class="toast_c">
        <view class="tlt_shuf">当前未登录</view>
        <view class="toast_shuf">点击一键授权快速登录</view>
        <!-- <view class="rules">我已同意借阅规则</view> -->
        <button @getphonenumber="getMobile" class="fast_login" open-type="getPhoneNumber">立即授权</button>
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
  data () {
    return {
      //1:非会员 2:普通会员 3:高级会员
      userType: 1,
      isLogin: true,
      mobile: '',
      aty_store: { id: 0 },
      //查询接受到的礼品卡
      acceptCount: 0,
      userInfo: {
        id: 0,
        user_coupon_count: 0,
        verify_ticket: false,
        nick_name: '未设置',
        login_name: '未登录',
        headimgurl: '/static/images/user/user-avatar.png'
      }
    }
  },
  onLoad () {
    this.aty_store = user.methods.getAtyStore()
    if (this.aty_store == null) {
      this.getSettingMess()
    }
  },
  onShow () {
    let that = this
    //检验当前用户的session_key是否有效
    passport.checkSession(function (openid) {
      let is_login = user.methods.isLogin()
      //如果未登录
      if (!is_login) {
        //根据openid加载用户信息
        that.api_106()
      } else {
        let userInfo = user.methods.getUser()
        that.bindUser(userInfo)
        that.api_358()
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
      if (_user.headimgurl == undefined || !_user.headimgurl.length) _user.headimgurl = '/static/images/user/user-avatar.png'
      _user.login_name = appG.util.getHideMobile(_user.login_name)
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
              that.api_358()
            } else {
              //弹出手机号码授权
              that.isLogin = false
            }
          } else {
            //appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },

    /**
     * 定位最近的门店
     */
    api_299 () {
      let that = this
      uni.getLocation({
        //wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        type: 'wgs84',
        success: res => {
          //将小程序定位转换成百度位置的定位
          //let tmp = appG.util.map.wgs84togcj02(res.longitude, res.latitude)
          let tmp = appG.util.map.qqMapTransBMap(res.longitude, res.latitude)

          tmp.lng = tmp.lng + 0.005137, tmp.lat = tmp.lat - 0.003237
          //查询最近门店
          api.post(api.api_299, api.getSign({ LngLat: tmp.lng + '#' + tmp.lat }), function (app, res) {
            if (res.data.Basis.State != api.state.state_200) {
              appG.dialog.showToast({ title: res.data.Basis.Msg })
            } else {
              that.aty_store = res.data.Result
              user.methods.setAtyStore(that.aty_store)
              appG.dialog.showToast({ title: '检查到您当前位置已推荐最近门店' })
            }
          })
        },
        fail: e => {
          console.log("获取授权信息授权失败")
        }
      })
    },

    /**
     * 加载赠送的数量
     */
    api_358: function () {
      let that = this
      let userInfo = user.methods.getUser()
      api.post(api.api_358, api.getSign(),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            userInfo.card_img = res.data.Result.member_card_url.split(',')[0]
            userInfo.rights_img = res.data.Result.member_card_url.split(',')[1]
            that.bindUser(userInfo)
            if (res.data.Result.count != undefined) {
              that.acceptCount = res.data.Result.count
            }
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },

    /**
     * 执行查看已授权信息
     */
    getSettingMess () {
      let that = this
      // 获取已授权类别
      uni.getSetting({
        success (res) {
          //userLocation位置功能已授权
          if (res.authSetting['scope.userLocation']) {
            // 如果已授权,直接获取对应参数
            that.api_299()
          } else if (!res.authSetting['scope.userLocation']) {
            // 说明此时要获取的位置功能尚未授权, 则设置进入页面时主动弹出，直接授权
            uni.authorize({
              scope: 'scope.userLocation',
              success (res) {
                // 成功后获取对应的位置参数
                that.api_299()
              },
              fail: e => {
                //debugger
                console.log("位置授权失败")
              }
            })
          }
        },
        fail () {
          console.log("获取授权信息授权失败")
        }
      })
    },

    /**
     * 路由跳转
     */
    goUrl (url) {
      uni.navigateTo({ url })
    },
    /**
     * 检测是否需要重定向
     */
    checkRedirect () {
      let returl = uni.getStorageSync('returl')
      if (returl != "" && returl != '/pages/home/userIndex') {
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
          background: #648176;
          //background: rgba(0, 67, 139, 1);
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
      border: 2px solid #80a999;
      //border: 2px solid rgba(0, 78, 162, 0.3)
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
          color: #80a999;
          //color: rgba(0, 86, 178, 1);
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
        color: #80a999;
        //color: rgba(0, 78, 162, 0.6);
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
