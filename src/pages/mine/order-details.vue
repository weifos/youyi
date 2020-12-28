<template>
  <view class="page-mine-order-detail">
    <view class="section">
      <view class="status-title" v-if="order.status == 1">待付款</view>
      <view class="status-title" v-if="order.status == 3">已付款</view>
      <view class="status-title" v-if="order.status == 10">已发货</view>
      <view class="status-title" v-if="order.status == 18">交易成功</view>

      <view class="section-status mt20" v-if="orderInfo.type == 1111">
        <view class="text-size-md bold">
          剩余支付时间为
          <text class="ml20 text-sub">14:41</text>
        </view>
        <view class="text-size-sm mt20">15分钟内未支付，订单自动取消</view>
        <view class="btns align-right mt20">
          <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">取消订单</button>
          <button class="btn btn-size-sm btn-line-yellow btn-round-sm btn-bg-main text-white ml20">去支付</button>
        </view>
      </view>
      <view class="section-status mt20" v-if="order.status == 10">
        <view class="text-size-md bold">商品已发货，请您确认收货</view>
        <view class="text-size-sm mt20">物流单号：{{delivery.tracking_no}}</view>
        <view class="btns align-right mt20">
          <button class="btn btn-size-sm btn-line-yellow btn-round-sm btn-bg-main text-white ml20" @click="goLogistics">查看物流</button>
          <!-- <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">开发票</button> -->
          <!-- <button class="btn btn-size-sm btn-line-yellow btn-round-sm btn-bg-main text-white ml20">确认收货</button> -->
        </view>
      </view>
      <view class="section-status mt20" v-if="orderInfo.type == 111">
        <text class="icon-arrow2 dib vat"></text>
        <!-- <view  class="ml20 dib vat">
                <view class="text-size-md bold"><text>商家同意退货，请及时退货</text></view>
                <view class="text-size-sm mt20">剩<text class="text-red">6</text>天<text class="text-red">6</text>时<text class="text-red">6</text>分</view>
        </view>-->
        <view class="ml20 dib vat">
          <view class="text-size-md bold">
            <text>退款成功</text>
            <text class="text-gray ml20 text-size-sm">2019年7月3日 19:41</text>
          </view>
          <view class="text-size-sm mt20">
            退款金额：
            <text class="text-sub text-size-lg">96.72</text>
          </view>
        </view>
      </view>

      <view class="section-address mt20">
        <view class="text-gray">收货地址</view>
        <view class="mt5">{{delivery.province + delivery.city+ delivery.area}}{{delivery.address}}</view>
        <view class="mt5">
          <text>{{order.delivery.contact}}</text>
          <text class="ml20">{{order.delivery.mobile}}</text>
        </view>
      </view>
      <view class="section-proudct bg-white mt20">
        <view :class="['order-list',orderInfo.type == 3 ? 'order-list-2' : '']">
          <view class="list-item hidden" v-for="item in order.details" :key="item">
            <view class="hidden">
              <view class="img-bar image-size-sm fl">
                <image :src="item.img_url" />
              </view>
              <view class="text-bar">
                <view class="ellipsis">{{item.product_name}}</view>
                <view class="side-bar">
                  <text class="text-size-basic">单价￥{{item.unit_price}} x{{item.count}}</text>
                  <text class="text-size-basic" v-if="item.total_amount - item.actual_amount > 0">优惠：-￥{{item.total_amount - item.actual_amount}}</text>
                  <text class="text-no">￥{{item.actual_amount}}</text>
                </view>
              </view>
            </view>
            <view class="operation-bar align-right mt20" v-if="item.refund_count < item.count">
              <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">申请售后</button>
            </view>
          </view>
        </view>
      </view>
      <view class="section-price mt20">
        <view class="price-item bold">
          <text>商品原价</text>
          <text>￥{{order.total_amount - order.freight}}</text>
        </view>
        <view class="price-item mt20" v-if="order.order > 0">
          <text>使用优惠券</text>
          <text>-￥{{order.coupon_amount}}</text>
        </view>
        <view class="price-item mt20">
          <text>折扣</text>
          <text>-￥{{order.max_dis_amount}}</text>
        </view>
        <view class="price-item mt20">
          <text>运费</text>
          <text>+￥{{order.freight}}</text>
        </view>
        <view class="total-bar mt20">
          <text v-if="order.total_amount - order.freight - order.actual_amount >0">已优惠¥{{(order.total_amount-order.actual_amount).toFixed(2)}}</text>
          <text class="ml20">实付款：</text>
          <text class="text-sub text-size-md bold">¥ {{order.actual_amount}}</text>
        </view>
      </view>
      <view class="section-order mt20 mb20 text-gray rel" style="margin-bottom:90rpx;">
        <!-- <button class="btn btn-size-sm btn-line-gray text-gray btn-round-ss btn-copy">复制</button> -->
        <view class="order-list">
          <view class="order-item">订单编号：{{order.serial_no}}</view>
          <view class="order-item mt20" v-if="order.pay_method== 11">支付方式：微信付款码支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 13">支付方式：微信小程序支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 14">支付方式：微信扫码支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 21">支付方式：支付宝支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 31">支付方式：电子钱包支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 41">支付方式：储值卡支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 51">支付方式：现金支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 61">支付方式：刷卡支付</view>
          <view class="order-item mt20" v-if="order.pay_method== 100">支付方式：混合支付</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.timePay">下单时间：{{order.created_date}}</view>
          <!--  <view class="order-item mt20" v-if="orderInfo.formInfo.timeDeliver">发货时间：{{orderInfo.formInfo.timeDeliver}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.express">快递方式：{{orderInfo.formInfo.express}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.expressNo">运单编号：{{orderInfo.formInfo.expressNo}}</view>-->
        </view>
      </view>
    </view>

    <!-- <view class="section-btns" @click="openPopup" v-if="!order.is_pay"> -->
    <view class="section-btns" @click="buyNow" v-if="!order.is_pay">
      <operationButton :price="(order.actual_amount).toFixed(2)" buttonText="去支付"></operationButton>
    </view>

    <uniPopup ref="popup" type="bottom" class="pop-pay yoyi-pop">
      <view class="pop-title text-size-md align-center">支付方式</view>
      <view class="pop-content">
        <radio-group class="agreement-checkbox" @change="changePay">
          <view class="pay-item mt20">
            <view class="text-size-basic">
              <radio :checked="order.pay_method == 31" color="#FFB825" value="31" />
              <text class="dib vam ml20">钱包支付</text>
            </view>
            <view class="text-gray text-size-sm text-desc">钱包余额 ¥{{userInfo.balance}}，尚需 ¥{{(order.actual_amount).toFixed(2)}}</view>
            <view class="btns-bar mt20">
              <button class="btn btn-round btn-size-full text-size-md btn-bg-main text-white" @click="api_331((order.actual_amount - userInfo.balance).toFixed(2))" v-if="order.actual_amount > userInfo.balance">立即充值 ¥{{(order.actual_amount - userInfo.balance).toFixed(2)}}</button>
              <button class="btn btn-round btn-size-full btn-line-main text-size-md bg-white text-sub mt20" @click="goRecharge">其他充值优惠</button>
            </view>
          </view>
          <view class="pay-item mt20">
            <view class="text-size-basic">
              <radio :checked="order.pay_method== 13" color="#FFB825" value="13" />
              <text class="dib vam ml20">微信支付</text>
            </view>
          </view>
        </radio-group>
      </view>
      <button class="btn btn-bg-main text-white btn-size-full text-size-lg btn-sure" style="margin-bottom:0px" @click="buyNow">确定购买</button>
    </uniPopup>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import { uniPopup } from "@dcloudio/uni-ui"
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { operationButton, uniPopup },
  data() {
    return {
      //收货地址
      delivery: {
        province: '',
        city: '',
        area: '',
        address: '',
        tracking_no: ''
      },
      userInfo: {
        balance: 0,
        mbr_dis_count: 1
      },
      order: {
        is_pay: false,
        freight: 0,
        actual_amount: 0,
        total_amount: 0,
        details: []
      }
    }
  },
  onLoad(opt) {
    //用户信息
    this.userInfo = user.methods.getUser()
    this.api_319(opt.no)
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    },//更改支付方式
    changePay(e) {
      this.order.pay_method = e.detail.value
    },
    /**
     * 加载订单数据
     */
    api_319(no) {
      let that = this
      //请求接口数据
      api.post(api.api_319, api.getSign({ OrderNo: no }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        } else {
          that.delivery = res.data.Result.delivery
          that.order = res.data.Result.order
        }
      })
    },
    /**
     * 微信小程序预支付订单
     */
    api_363(provider) {
      let that = this

      api.post(api.api_363, api.getSign({
        OrderNo: that.order.serial_no,
        UserCouponId: 0
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
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
              console.log('success:' + JSON.stringify(res))
              uni.navigateTo({ url: '../mine/order-list' })
            },
            fail: function (err) {
              setTimeout(() => { that.isPaying = false }, 500)
            },
            complete: () => {
              setTimeout(() => { that.isPaying = false }, 500)
            }
          })
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          setTimeout(() => { that.isPaying = false }, 500)
        }
      })
    },
    /**
     * 申请退款
     */
    api_369() {
      var that = this
      uni.showModal({
        title: '提示',
        content: '确认申请退款吗？',
        success: function (res) {
          if (res.confirm) {
            //请求接口数据
            api.post(api.api_369, api.getSign({ SerialNo: that.order.serial_no }), function (app, res) {
              if (res.data.Basis.State != api.state.state_200) {
                appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
              } else {
                appG.dialog.showToast({ title: "申请成功", icon: 'none', duration: 3000 })

                setTimeout(() => {
                  uni.navigateTo({
                    url: '/pages/user/activity',
                  })
                }, 1000)
              }
            })
          }
        }
      })

    },
    /**
     * 电子钱包支付
     */
    api_364() {
      let that = this

      api.post(api.api_364, api.getSign({
        OrderNo: that.order.serial_no,
        UserCouponId: 0
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          //更新用户信息
          user.methods.login(res.data.Result)
          appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
          setTimeout(function () {
            uni.navigateTo({ url: '../mine/order-list' })
          }, 1000)
        } else {
          setTimeout(function () {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }, 50)
          setTimeout(function () { uni.hideToast() }, 3000)
          that.isPaying = false
        }
      })
    },
    /**
     * 查看物流
     * 打开第三方小程序
     */
    goLogistics() {
      let that = this
      wx.navigateToMiniProgram({
        appId: 'wx6885acbedba59c14',
        path: `pages/result/result?nu=${that.delivery.tracking_no}&com=&querysource=third_xcx`
      })
    },
    /**
     * 立即购买
     */
    buyNow() {
      let that = this
      //是否在支付中
      if (that.isPaying) return
      //设置支付中
      that.isPaying = true
      //是否设置收货地址
      if (that.notSetAddress) {
        appG.dialog.showToast({ title: '未设置收货地址', duration: 2000 })
        return
      }

      //微信支付
      if (this.order.pay_method == 13) {
        //获取uni-app服务提供商
        uni.getProvider({
          service: 'payment', success: (res) => {
            //微信支付
            if (~res.provider.indexOf('wxpay')) {
              //生成订单吊起支付
              that.api_363(res.provider[0])
            }
          }
        })

        //钱包支付
      } else if (this.order.pay_method == 31) {
        if (that.order.actual_amount - that.userInfo.balance > 0) {
          appG.dialog.showToast({ title: '钱包余额不足', icon: 'none', duration: 2000 })
          return
        }
        that.api_364()
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: $yoyi-bg-color-grey;
}
.status-title {
  font-size: 2 * 22px;
  padding: 2 * 16px 40px 0 40px;
}
.section-address,
.section-price,
.section-order,
.section-status {
  background-color: #fff;
  border-radius: 20px;
  padding: 2 * 14px;
  margin-left: 20px;
  margin-right: 20px;
}
.section-status {
  box-shadow: 0 4px 8px #ededed;
}
.order-list {
  .list-item {
    padding: 40px;
    border-bottom: 1px solid $yoyi-bg-color-grey;

    &:last-child {
      border: none;
    }
  }
  .img-bar {
    margin-right: 40px;
  }
  .text-bar {
    padding-top: 15px;
  }
  .side-bar {
    padding-top: 2 * 30px;
    display: flex;
    justify-content: space-between;
  }
  .operation-bar {
    border-top: 1px solid $yoyi-border-color;
    padding-top: 20px;
  }
}
.order-list-2 {
  .list-item {
    border-width: 20px;
  }
}
.section-price {
  .price-item {
    display: flex;
    justify-content: space-between;
  }
  .total-bar {
    border-top: 1px solid $yoyi-border-color;
    padding-top: 20px;
    text-align: right;
  }
}
.section-order {
  .btn-copy {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

.pop-pay {
  .pop-title {
    padding-bottom: 20px;
    border-bottom: 1px solid $yoyi-border-color;
    margin-bottom: 20px;
  }
  .text-desc {
    margin: 10px 0 0 60px;
  }
  .btns-bar {
    margin-left: 60px;
    margin-right: 60px;
  }
  .btn-sure {
    margin-top: 20px;
  }
  .uni-transition {
    padding-bottom: 0;
  }
}
</style>