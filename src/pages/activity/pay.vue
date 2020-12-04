<template>
  <view class="page-orderCheck">
    <view class="section">
      <view class="section__title">订单信息</view>
      <view class="section__content">
        <view>订单编号：{{orderInfo.serial_no}}</view>
        <view>活动名称：{{orderInfo.course_name}} {{orderInfo.details.length}}人</view>
        <view>订单备注：{{orderInfo.remarks==null?"--":orderInfo.remarks}}</view>
      </view>
    </view>
    <view class="section" v-if="orderInfo.course.is_use_coupon">
      <view class="align-justify">
        <view class="fz33">
          优惠券
          <text class="no-ticket" v-if="ticketInfo.length == 0">（暂无可用的优惠券）</text>
        </view>
        <view @click="checkTicket">
          <text v-if="cid>0&&cname!=''&&tname!=''" style="color:#5B9AFA;margin-right:10px;">{{cname}} {{tname}}</text>
          <button class="cu-btn round line-black" @click="selectTicket">选择</button>
        </view>
      </view>
      <view class="tac mt20 mb20" v-if="ticketInfo.id > 0">
        <!-- <i-ticket class="dib" ticketInfo="{{ticketInfo[0]}}"></i-ticket> -->
      </view>
    </view>
    <view class="section">
      <view class="section__title">支付方式</view>
      <view class="section__content">
        <radio-group class="block">
          <view class="radio__item">
            <radio name="payType" @click="checkedPay" data-id="0" :checked="payType == 0"></radio>
            <text class="dib vam">微信支付</text>
          </view>
          <view class="radio__item">
            <radio name="payType" @click="checkedPay" data-id="1" :checked="payType == 1"></radio>
            <text class="dib vam">钱包</text>
            <text class="txt-balance dib vam">余额：{{balance}}</text>
          </view>
        </radio-group>
      </view>
    </view>
    <view class="order-tool-bar">
      <view class="cu-bar tabbar">
        <view class="bg-darkGray info">
          共计￥{{orderInfo.actual_amount}}
          <text class="discounts" v-if="orderInfo.total_amount-orderInfo.actual_amount>0">| 优惠{{orderInfo.total_amount-orderInfo.actual_amount}}元</text>
        </view>
        <view class="bg-lightYellow submit text-white" @click="goPay">支付</view>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import { uniPopup, uniNumberBox } from "@dcloudio/uni-ui"

export default {
  data() {
    return {
      appId: "",
      cid: 0,
      cname: '',
      tname: '',
      isPayIng: false,
      balance: 0,
      //微信支付，还是电子钱包支付
      payType: 0,
      //折扣金额
      discounts: 0,
      orderInfo: {
        course_name: '',
        serial_no: "",
        user_coupon_id: 0,
        coupon_amount: 0,
        vip_dis_amount: 0,
        actual_amount: 0,
        remarks: "",
        details: [],
        course: {
          is_use_coupon: false
        }
      },
      //微信支付参数
      wechatPay: {},
      ticketInfo: [{
        id: 0,
        key: "",
        name: "",
        startTime: "",
        endTime: "",
        discount: "",
        quota: ""
      }]
    }
  },
  components: {
    uniPopup,
    uniNumberBox
  },
  onLoad(opt) {

    //优惠券
    if (opt.cid != undefined && opt.cname != undefined && opt.tname != undefined) {
      this.cid = opt.cid
      this.cname = opt.cname
      this.tname = opt.tname
    }

    this.api_327(opt.no)
  },
  methods: {
    /**
    * 选择支付方式
    */
    checkedPay: function (e) {
      this.payType = e.currentTarget.dataset.id
    },
    /**
     * 加载订单信息
     */
    api_327(no) {
      let that = this
      api.post(api.api_327,
        api.getSign({
          OrderNo: no,
          UserCouponId: that.cid
        }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {

            //加载用户电子钱包余额
            user.methods.login(res.data.Result.user)
            that.balance = res.data.Result.user.balance

            let disAmount = 0
            let actual_amount = res.data.Result.order.actual_amount
            if (that.tname.indexOf('元') != -1) {
              disAmount = parseFloat(that.tname.replace('元'))
              res.data.Result.order.coupon_amount = disAmount
              res.data.Result.order.actual_amount = actual_amount - disAmount
            }

            if (that.tname.indexOf('折') != -1) {
              disAmount = parseFloat(that.tname.replace('折'))
              res.data.Result.order.coupon_amount = actual_amount * ((10 - disAmount) / 10).toFixed(2)
              res.data.Result.order.actual_amount = actual_amount - res.data.Result.order.coupon_amount
            }

            //订单信息
            that.orderInfo = res.data.Result.order

          } else {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      )
    },
    /**
     * 电子钱包支付
     */
    api_335() {
      let that = this
      api.post(api.api_335,
        api.getSign({ UserCouponId: that.cid, No: that.orderInfo.serial_no }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            user.methods.login(res.data.Result)
            that.api_359()
          } else {
            wx.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
            that.isPayIng = false
          }
        }
      )
    },
    /**
     * 微信小程序支付课程订单
     */
    api_338(no) {
      let that = this
      api.post(api.api_338,
        api.getSign({
          OrderNo: that.orderInfo.serial_no,
          UserCouponId: that.cid
        }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {

            wx.requestPayment({
              appId: res.data.Result.wechatpay.appId,
              timeStamp: res.data.Result.wechatpay.timeStamp,
              nonceStr: res.data.Result.wechatpay.nonceStr,
              package: res.data.Result.wechatpay.package,
              signType: res.data.Result.wechatpay.signType,
              paySign: res.data.Result.wechatpay.paySign,
              success: function (res) {
                if (res.errMsg = "requestPayment:ok") {
                  that.api_359()
                }
              },
              //失败执行
              fail: function (res) {
                //console.log(res)
              },
              //无论怎样都是执行
              complete: function (res) {
                that.isPayIng = false
              }
            })

          } else {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      )
    },
    /**
     * 提交调查问卷
     */
    api_359: function () {
      var that = this
      let courseAnswer = user.methods.getOrderCourseAnswer()

      if (courseAnswer != null) {
        courseAnswer.forEach((o, i) => {
          o.order_id = that.orderInfo.id
        })

        api.post(api.api_359, api.getSign({
          CourseAnswers: courseAnswer
        }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          } else {
            user.methods.setOrderCourseAnswer(null)
            //跳转到报名列表
            uni.navigateTo({ url: '/pages/user/activity' })
          }
        })
      }

    },
    /**
     * 立即支付
     */
    goPay: function () {
      let that = this

      if (!that.isPayIng) {
        //是否支付中
        that.isPayIng = true
        //电子钱包支付
        if (that.payType == 1) {
          that.api_335()
        } else {
          that.api_338()
        }
      }
    },
    /**
     * 授权订阅
     * 推动活动报名信息
     */
    accreditSubscribeMsg: function () {
      wx.requestSubscribeMessage({
        tmplIds: ['pjXYFSyXlOOsGdCW8ZBl-guWI0YmFz4Bp7z2UNu54wE'],
        //接口调用成功的回调函数
        success(res) {

        },//接口调用失败的回调函数
        fail(res) {

        },//接口调用结束的回调函数（调用成功、失败都会执行）
        complete(res) {
          console.log(res)
          uni.navigateTo({ url: '../user/activity?tid=' + that.orderInfo.type })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.section {
  padding: 29rpx 36rpx;
  margin-bottom: 7rpx;
}
.section__title {
  font-size: 33rpx;
  padding-bottom: 22rpx;
  border-bottom: 1rpx solid #707070;
}
.section__content {
  padding: 36rpx 0;
  border-bottom: 1rpx solid #707070;
}
.page-orderCheck .cu-btn {
  height: 53rpx;
}
.radio__item {
  font-size: 27rpx;
  margin-bottom: 24rpx;
}
.radio__item text {
  margin: 0 25rpx;
}
.txt-balance {
  color: #b2b2b2;
  font-size: 22rpx;
}
.no-ticket {
  margin-left: 18rpx;
  color: #b2b2b2;
  font-size: 22rpx;
}

.bg-darkGray {
  background-color: #707070;
}

.order-tool-bar {
  font-size: 36rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 127rpx;
}
.order-tool-bar .info {
  align-items: center;
  display: flex;
  text-indent: 34rpx;
  position: relative;
  flex: 5;
  align-self: stretch;
  color: #fff;
  font-size: 36rpx;
}
.order-tool-bar .cu-bar {
  height: 127rpx;
}
.order-tool-bar .discounts {
  font-size: 30rpx;
  opacity: 0.8;
}

.cu-bar {
  display: flex;
  position: relative;
  align-items: center;
  min-height: 100rpx;
  justify-content: space-between;
}
.cu-bar.tabbar .submit {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  flex: 2;
  align-self: stretch;
  font-size: 36rpx;
}
.bg-lightYellow {
  background-color: #ffb825;
}
</style>
