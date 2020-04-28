<template>
  <view class="wrapper-user-index">
    <view class="user-index-main">
      <view class="user-profile">
        <image class="user-avatar" src="/static/images/user/user-avatar.png" />
        <view class="user-other">
          <view class="user-phone">134***7818</view>
          <navigator class="user-vip" hover-class :url="`/pages/user/open?type=${userType}`" v-if="userType == 1">开通会员享好礼</navigator>
          <navigator class="user-vip" hover-class :url="`/pages/user/card?type=${userType}`" v-if="userType == 2">普通会员</navigator>
          <navigator class="user-vip" hover-class :url="`/pages/user/card?type=${userType}`" v-if="userType == 3">高级会员</navigator>
        </view>
      </view>
      <view class="user-info">
        <navigator class="info-item" hover-class url="/pages/user/point">
          <view class="item-text1">824</view>
          <view class="item-text2">积分</view>
        </navigator>
        <navigator class="info-item" hover-class url="/pages/wallet/coupon">
          <view class="item-text1">5</view>
          <view class="item-text2">优惠券</view>
        </navigator>
        <navigator class="info-item" hover-class url="/pages/wallet/index">
          <view class="item-text1">2.72</view>
          <view class="item-text2">钱包</view>
        </navigator>
      </view>
    </view>
    <navigator class="user-index-card" hover-class :class="[`user-index-card-${userType}`]" :url="`/pages/user/open?type=${userType}`"></navigator>
    <view class="user-index-my">
      <view class="my-item">
        <image class="item-icon" src="/static/images/user/user-cart.png" mode="aspectFit" />
        <view class="item-text">购物车</view>
      </view>
      <view class="my-item">
        <image class="item-icon" src="/static/images/user/user-gift.png" mode="aspectFit" />
        <view class="item-text">礼品卡</view>
      </view>
      <view class="my-item">
        <image class="item-icon" src="/static/images/user/user-favor.png" mode="aspectFit" />
        <view class="item-text">商品收藏</view>
      </view>
      <view class="my-item">
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
        <uni-list-item title="付款码" note="门店扫码积分或优惠券、电子钱包支付" @click="jump('/pages/wallet/pay')"></uni-list-item>
        <uni-list-item title="授权副卡" @click="jump('/pages/user/card-second')"></uni-list-item>
        <uni-list-item title="收货地址"></uni-list-item>
        <uni-list-item title="个人资料"></uni-list-item>
        <uni-list-item title="关于书城" @click="jump('/pages/user/about')"></uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import passport from '@/modules/passport'

import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

export default {
  components: { uniList, uniListItem },
  data() {
    return {
      isLogin: true,
      userInfo: {
        id: 0,
        nick_name: '未设置',
        login_name: '未登录',
        headimgurl: '/images/user.png',
      },
      userType: 1,//1:非会员 2:普通会员 3:高级会员
    }
  },
  methods: {
    jump(url) {
      uni.navigateTo({
        url,
      })
    },

    /**
     * 获取手机号码
     */
    getMobile: function (e) {
      let that = this
      passport.bindMobile(e, function (code, user) {
        if (code == api.state.state_200) {
          that.setData({
            isLogin: true
          })
          that.setData({
            ['userInfo.login_name']: appG.util.getHideMobile(user.login_name)
          })
        }

        wx.getStorage({
          key: 'returl',
          success(res) {
            if (res.data) {
              router.goUrl({
                url: res.data
              })
            }
            wx.removeStorageSync('returl')
          }
        })
      })
    },

    /**
     * 加载微信用户信息
     */
    getWxUser: function (e) {
      let that = this
      passport.getWxUser(e, function (code, user) {
        if (code == api.state.state_200) {
          that.setData({
            ['userInfo.headimgurl']: appG.util.getHideMobile(user.avatarUrl)
          })
        }
      })
    },

    /**
     * 加载微信用户信息
     */
    bindUser: function (user) {
      if (user.nickname) {
        this.setData({
          ['userInfo.nick_name']: user.nickname
        })
      }
      this.setData({
        ['userInfo.login_name']: appG.util.getHideMobile(user.login_name)
      })

      this.setData({
        ['userInfo.headimgurl']: user.headimgurl
      })
    },

    /**
     * 加载用户信息
     */
    api_106: function () {
      let that = this
      let userInfo = user.methods.getUser()
      console.log("openid:" + userInfo.openid)
      api.post(api.api_106,
        api.getSign({
          OpenID: userInfo.openid
        }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            if (res.data.Result.login_name != undefined) {
              //昵称
              res.data.Result.nickname = decodeURI(res.data.Result.nickname)
              //登录
              user.methods.login(res.data.Result)
              //绑定用户
              that.bindUser(res.data.Result)
              //如果存在重定向地址
              let returl = wx.getStorageSync("returl")
              if (returl != "") {
                wx.removeStorage({
                  key: 'returl',
                  success(res) { }
                })
                //重定向
                router.goUrl({
                  url: returl,
                })
              }
            } else {
              //弹出手机号码授权
              that.setData({
                isLogin: false
              })
            }
          } else {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          }
        })
    },

    /**
     * 打开微信付款码
     */
    openOfflinePayView: function () {
      wx.openOfflinePayView({
        appId: $this.wechatpay.appId,
        timeStamp: $this.wechatpay.timestamp,
        nonceStr: $this.wechatpay.nonceStr,
        package: $this.wechatpay.package,
        signType: $this.wechatpay.signType,
        paySign: $this.wechatpay.paySign,
        success: function (res) {

        },
        fail: function (res) {

        },
        complete: function (res) {

        }
      })
    },

    /**
     * 菜单跳转
     */
    goUrl: function (e) {
      //跳转地址
      let url = ''
      let key = e.currentTarget.dataset.key
      switch (key) {
        //购买记录
        case "buy":
          url = '../orderList/index'
          break
        //我的钱包
        case "wallet":
          url = '../memberWallet/index'
          break
        //付款码
        case "paycode":
          url = '../memberPayCode/index'
          break
        //我的活动
        case "activity":
          url = '../orderCourseList/index?tid=5'
          break
        //我的课程
        case "course":
          url = '../orderCourseList/index?tid=1'
          break
        //我的会员卡
        case "member":
          url = '../memberCard/index'
          break
        //我的积分
        case "integral":
          url = '../memberIntegral/index'
          break
        //我的优惠券
        case "ticket":
          url = '../ticketList/index'
          break


        default:
          break;
      }

      if (url.length > 0) {
        router.goUrl({
          url: url
        })
      }
    },

  },
  onLoad() {
    let that = this
    let wxUser = user.methods.getUser()
    if (!wxUser.openid || !wxUser.token) {
      //检测成功回调
      passport.checkSession(function (openid) {
        wxUser = user.methods.getUser()
        if (!wxUser.login_name) {
          //加载用户信息
          that.api_106()
        } else {
          that.bindUser(wxUser)
        }
      })
    } else {
      that.bindUser(wxUser)
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
}
</style>
