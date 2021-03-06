<template>
  <view class="content page-order">
    <view class="section-address" @click="selectAddress">
      <view class="text-gray">{{addr.province}} {{addr.city}} {{addr.area}}</view>
      <view class="text-size-lg mt10">{{addr.address}}</view>
      <view class="text-gray mt10">
        <text>{{addr.contact+" "}}</text>
        <text>{{addr.mobile}}</text>
      </view>
      <view class="icon-arrow"></view>
    </view>

    <view class="section-order-info bg-white">
      <view class="section-title">商品信息</view>
      <view class="order-list">
        <view class="list-item hidden" v-for="item in order.store_details" :key="item">
          <view class="img-bar image-size-sm fl">
            <image :src="item.img_url" />
          </view>
          <view class="text-bar">
            <view class="ellipsis">{{item.product_name}}</view>
            <view class="side-bar">
              <text class="text-size-basic">￥{{item.unit_price}}</text>
              <text class="text-no">x {{item.count}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="section-order-price-bar bg-white">
      <!-- <view class="section-order-info bg-white">
        <view class="price-item text-size-basic">
          <text>订单编号</text>
          <text>20192323123212343</text>
        </view>
      </view>-->
      <view class="price-item text-size-basic">
        <text>商品原价</text>
        <text>¥ {{productAmount}}</text>
      </view>
      <view class="price-item text-size-basic">
        <text>优惠券</text>
        <!-- <view class="text-size-basic"><text class="dib vam text-sub">-65.8</text><view class="icon-arrow dib vam ml10"></view></view>   -->
        <view class="text-size-basic">
          <text class="dib vam text-gray">0张优惠券</text>
          <view class="icon-arrow dib vam ml10"></view>
        </view>
      </view>
      <!-- 会员折扣最优 -->
      <view class="price-item text-size-basic" v-if=" order.vip_dis_amount>order.coupon_amount && order.vip_dis_amount>order.mkt_dis_amount">
        <text>会员折扣</text>
        <text>-¥{{order.vip_dis_amount}}</text>
      </view>
      <!-- 未达到包邮情况 -->
      <view class="price-item text-size-basic">
        <text>运费</text>
        <text v-if="!isPostage">¥ {{order.freight}}</text>
        <text v-if="isPostage">已包邮</text>
      </view>
      <view class="price-item text-size-basic" v-if="freightRemark.id > 0">
        <text>运费说明</text>
      </view>
      <view class="price-item text-size-basic" style="height:auto;" v-if="freightRemark.id > 0">
        <text>{{freightRemark.remarks}}</text>
      </view>
    </view>

    <view class="section-order-price-bar bg-white">
      <view class="price-item text-size-basic" @click="chooseInvoice">
        <text>选择发票</text>
        <view class="text-size-basic">
          <view class="icon-arrow dib vam ml10"></view>
        </view>
      </view>
      <view class="section-order-info bg-white" v-if="order.invoice != ''">
        <view class="price-item text-size-basic">
          <text>抬头名称</text>
          <text>{{order.invoice}}</text>
        </view>
      </view>
      <view class="section-order-info bg-white" v-if="order.tax_number != ''">
        <view class="price-item text-size-basic">
          <text>抬头税号</text>
          <text>{{order.tax_number}}</text>
        </view>
      </view>
    </view>

    <view class="notice-bar" v-if="order.total_amount - order.actual_amount>0">
      <uni-notice-bar background-color="#F7E9CB" color="#FF5600" single="true" :text="'已优惠 ¥'+(order.total_amount - order.actual_amount).toFixed(2)"></uni-notice-bar>
    </view>

    <!-- <view class="section-btns" @click="openPopup"> -->
    <view class="section-btns" @click="buyNow">
      <operationButton :price="(order.actual_amount).toFixed(2)" buttonText="去支付"></operationButton>
    </view>
    <!-- popup s -->
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
    <!-- popup e -->
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import { uniNoticeBar, uniPopup } from "@dcloudio/uni-ui"
import operationButton from '@/components/yoyi-operation-button/'
export default {
  components: {
    operationButton,
    uniNoticeBar,
    uniPopup
  },
  data() {
    return {
      //未设置收货地址
      notSetAddress: false,
      //是否请求中
      isPaying: false,
      //是否提交购物车
      isShoppingCart: false,
      //微信支付配置
      wechatpay: {},
      //电子钱包
      userInfo: {
        balance: 0,
        mbr_dis_count: 1
      },
      //收货地址
      addr: {
        id: 0,
        province: "请选择收货地址",
        city: "",
        area: "",
        address: "",
        contact: "",
        mobile: ""
      },
      //是否达到包邮
      isPostage: false,
      //临时订单
      order: {
        //门店ID
        store_id: 0,
        //线上商品订单
        type: 5,
        //支付方式 13微信小程序支付 31电子钱包支付
        pay_method: 13,
        //总金额
        total_amount: 0,
        //实付金额
        actual_amount: 0,
        //优惠券ID
        user_coupon_id: 0,
        //订单详情
        //details: [],
        //运费
        freight: 0,
        //会员优惠金额
        vip_dis_amount: 0,
        //税号
        tax_number: '',
        //发票抬头
        invoice: '',
        //订单详情
        store_details: []
      },
      //运费包邮模板说明
      freightRemark: {
        id: 0,
        remark: "",
        amount: 0
      },
      //商品金额
      productAmount: 0,
      //配送方式ID
      mode_id: 0,
      //当前页面路由
      currentPage: ''
    }
  },
  onLoad(opt) {
    let that = this
    that.currentPage = appG.route.getCurPath()
    //运营品牌
    that.storeBrand = appG.getCurBrandStore()
    //订单所属门店
    that.order.store_id = that.storeBrand.id

    if (opt.isShoppingCart) {
      that.isShoppingCart = true
    }

    if (!user.methods.isLogin()) {
      uni.setStorageSync('returl', "/" + that.currentPage)
      uni.switchTab({ url: '/pages/home/userIndex' })
    } else {
      //用户信息
      that.userInfo = user.methods.getUser()
      //设置选择的收货地址ID
      if (opt.said) { that.addr.id = opt.said }

      let items = user.methods.getBuyNow()
      items.forEach((item, i) => {
        that.order.store_details.push(item)
      })

      //that.order.details = that.order.store_details
      //计算商品金额
      that.order.store_details.forEach(function (ele, index, arr) {
        that.productAmount += ele.unit_price * ele.count
      })

      //总金额
      that.order.total_amount = parseFloat(that.productAmount.toFixed(4))
      //实付金额
      that.order.actual_amount = that.order.total_amount
      //加载收货地址和运费
      that.api_307()
    }
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    },
    closePopup() {
      this.$refs.popup.close()
    },//更改支付方式
    changePay(e) {
      this.order.pay_method = e.detail.value
    },//更改收货地址
    selectAddress() {
      uni.navigateTo({
        url: "address/manage?isSelect=1"
      })
    },
    /**
     * 选择发票
     */
    chooseInvoice() {
      let that = this
      wx.chooseInvoiceTitle({
        success(res) {
          if (res.errMsg == "chooseInvoiceTitle:ok") {
            that.order.invoice = res.title
            that.order.tax_number = res.taxNumber
          }
        }
      })
    },
    /**
     * 加载收货地址和运费
     */
    api_307() {
      let that = this
      //初始化收货地址和运费
      api.post(api.api_307, api.getSign({
        AddressID: that.addr.id,
        Order: that.order
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          //更新包邮运费模板
          that.freightRemark = res.data.Result.freight_remark
          //收货地址
          that.addr = res.data.Result.data.address
          //判断是否包邮
          that.order.freight = res.data.Result.data.freight
          //获取最新订单金额
          //that.order = res.data.Result.order
          that.order.vip_dis_amount = res.data.Result.order.vip_dis_amount
          that.order.actual_amount = res.data.Result.order.actual_amount
          that.order.coupon_amount = res.data.Result.order.coupon_amount
          that.order.mkt_dis_amount = res.data.Result.order.mkt_dis_amount

          //配送方式
          that.mode_id = res.data.Result.data.mode_id
          //登录
          user.methods.login(res.data.Result.user)
          //当前页面用户钱包
          that.userInfo = res.data.Result.user
          //设置默认支付方式
          if (that.order.balance > that.order.actual_amount) {
            that.order.pay_method = 31
          } else {
            that.order.pay_method = 13
          }

          //不包邮
          if (that.freightRemark.amount > 0 && that.order.actual_amount < that.freightRemark.amount) {
            that.order.total_amount += that.order.freight
            that.order.actual_amount += that.order.freight
          } else {
            that.isPostage = true
            that.order.freight = 0
          }

          //更新实付金额
          //that.order.actual_amount -= that.order.vip_dis_amount
          that.notSetAddress = false
        } else {
          //未设置收货地址
          if (res.data.Basis.State == 803) {
            that.notSetAddress = true
          }
          appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
    },
    /**
     * 微信小程序预支付订单
     */
    api_314(provider) {
      let that = this
      api.post(api.api_314, api.getSign({
        Order: that.order,
        IsShoppingCart: that.isShoppingCart,
        UserAddressId: that.addr.id
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
              //   that.api_366()
              console.log('success:' + JSON.stringify(res))
              uni.navigateTo({ url: '../mine/order-list' })
            },
            fail: function (err) {
              //setTimeout(() => { that.isPaying = false }, 500)
              uni.navigateTo({ url: '../mine/order-list' })
            },
            complete: () => {
              uni.navigateTo({ url: '../mine/order-list' })
              //setTimeout(() => { that.isPaying = false }, 500)
            }
          })
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          setTimeout(() => { that.isPaying = false }, 500)
        }
      })
    },
    /**
     * 电子钱包支付
     */
    api_336() {
      let that = this
      api.post(api.api_336, api.getSign({
        UserCouponId: 0,
        Order: that.order,
        IsShoppingCart: that.isShoppingCart,
        UserAddressId: that.addr.id
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
     * 立即充值
     */
    api_331(rechargeAmount) {
      let that = this
      //获取uni-app服务提供商
      uni.getProvider({
        service: 'payment', success: (res) => {
          let provider = res.provider[0]
          //微信支付
          if (~res.provider.indexOf('wxpay')) {
            api.post(api.api_331, api.getSign({ ID: 0, Amount: rechargeAmount }), function (app, res) {
              if (res.data.Basis.State != api.state.state_200) {
                appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
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
                    //直接通过电子钱包购买
                    that.api_336()
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
    },
    /**
     * 订单支付回调
     */
    api_366() {
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
     * 立即充值
     */
    goRecharge() {
      let that = this
      uni.setStorageSync('returl', "/" + that.currentPage)
      uni.navigateTo({ url: "/pages/wallet/index?returl=" + that.currentPage })
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
              that.api_314(res.provider[0])
            }
          }
        })

        //钱包支付
      } else if (this.order.pay_method == 31) {
        if (that.order.actual_amount - that.userInfo.balance > 0) {
          appG.dialog.showToast({ title: '钱包余额不足', icon: 'none', duration: 2000 })
          return
        }
        that.api_336()
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
.page-order {
  // min-height:100%;
  // background-color: $uni-bg-color-grey;
  padding: 2 * 10px;
  box-sizing: border-box;
  padding-bottom: 2 * 58px;
}
.section-address {
  border-radius: 2 * 10px;
  margin-bottom: 2 * 10px;
  padding: 30px;
  background: #fff url("~@/static/images/bg1.png") no-repeat 0 bottom/100% auto;
  position: relative;

  .icon-arrow {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.section-order-info {
  border-radius: 2 * 10px;
  .section-title {
    font-size: 2 * 16px;
  }
  .list-item {
    padding: 40px;
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

  .price-item {
    //padding: 0 4vw 0 4vw;
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
}
.section-order-price-bar {
  border-radius: 2 * 10px;
  padding: 30px;
  margin-top: 20px;

  .price-item {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
}
.notice-bar {
  position: fixed;
  bottom: 2 * 48px;
  left: 0;
  width: 100%;
  .uni-noticebar {
    margin-bottom: 0 !important;
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