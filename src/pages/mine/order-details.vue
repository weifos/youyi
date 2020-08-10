<template>
  <view class="page-mine-order-detail">
    <view class="section">
      <view class="status-title" v-if="orderInfo1.status == 1">待付款</view>
      <view class="status-title" v-if="orderInfo1.status == 3">已付款</view>
      <view class="status-title" v-if="orderInfo1.status == 10">已发货</view>
      <view class="status-title" v-if="orderInfo1.status == 18">交易成功</view>

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
      <view class="section-status mt20" v-if="orderInfo1.status == 10">
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
          <text>{{orderInfo1.delivery.contact}}</text>
          <text class="ml20">{{orderInfo1.delivery.mobile}}</text>
        </view>
      </view>
      <view class="section-proudct bg-white mt20">
        <view :class="['order-list',orderInfo.type == 3 ? 'order-list-2' : '']">
          <view class="list-item hidden" v-for="item in orderInfo1.details" :key="item">
            <view class="hidden">
              <view class="img-bar image-size-sm fl">
                <image :src="item.img_url" />
              </view>
              <view class="text-bar">
                <view class="ellipsis">{{item.product_name}}</view>
                <view class="side-bar">
                  <text class="text-size-basic">￥{{item.actual_amount}}</text>
                  <text class="text-no">x {{item.count}}</text>
                </view>
              </view>
            </view>
            <view class="operation-bar align-right mt20" v-if="orderInfo.type == 3">
              <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">申请售后</button>
            </view>
          </view>
        </view>
      </view>
      <view class="section-price mt20">
        <view class="price-item bold">
          <text>商品原价</text>
          <text>￥{{orderInfo1.total_amount - orderInfo1.freight}}</text>
        </view>
        <view class="price-item mt20" v-if="orderInfo1.orderInfo1 > 0">
          <text>使用优惠券</text>
          <text>-￥{{orderInfo1.coupon_amount}}</text>
        </view>
        <view class="price-item mt20">
          <text>折扣</text>
          <text>-￥{{orderInfo1.max_dis_amount}}</text>
        </view>
        <view class="price-item mt20">
          <text>运费</text>
          <text>+￥{{orderInfo1.freight}}</text>
        </view>
        <view class="total-bar mt20">
          <text v-if="orderInfo1.total_amount - orderInfo1.freight - orderInfo1.actual_amount >0">已优惠¥{{(orderInfo1.total_amount-orderInfo1.actual_amount).toFixed(2)}}</text>
          <text class="ml20">实付款：</text>
          <text class="text-sub text-size-md bold">¥ {{orderInfo1.actual_amount}}</text>
        </view>
      </view>
      <view class="section-order mt20 mb20 text-gray rel">
        <!-- <button class="btn btn-size-sm btn-line-gray text-gray btn-round-ss btn-copy">复制</button> -->
        <view class="order-list">
          <view class="order-item">订单编号：{{orderInfo1.serial_no}}</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 11">支付方式：微信付款码支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 13">支付方式：微信小程序支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 14">支付方式：微信扫码支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 21">支付方式：支付宝支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 31">支付方式：电子钱包支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 41">支付方式：储值卡支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 51">支付方式：现金支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 61">支付方式：刷卡支付</view>
          <view class="order-item mt20" v-if="orderInfo1.pay_method== 100">支付方式：混合支付</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.timePay">下单时间：{{orderInfo1.created_date}}</view>
          <!--  <view class="order-item mt20" v-if="orderInfo.formInfo.timeDeliver">发货时间：{{orderInfo.formInfo.timeDeliver}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.express">快递方式：{{orderInfo.formInfo.express}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.expressNo">运单编号：{{orderInfo.formInfo.expressNo}}</view>-->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'

export default {
  components: {},
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
      orderInfo1: {
        details: []
      }
    }
  },
  onLoad(opt) {
    this.api_319(opt.no)
  },
  methods: {
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
          that.orderInfo1 = res.data.Result.order
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
</style>