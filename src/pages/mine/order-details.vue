<template>
  <view class="page-mine-order-detail">
    <view class="section">
      <view class="status-title">{{orderInfo.status}}</view>
      <view class="section-status mt20" v-if="orderInfo.type == 0">
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
      <view class="section-status mt20" v-else-if="orderInfo.type == 1">
        <view class="text-size-md bold">商品已发货，请您确认收货</view>
        <view class="text-size-sm mt20">感谢您对我们的信任</view>
        <view class="btns align-right mt20">
          <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">开发票</button>
          <button class="btn btn-size-sm btn-line-yellow btn-round-sm btn-bg-main text-white ml20">确认收货</button>
        </view>
      </view>
      <view class="section-status mt20" v-if="orderInfo.type == 2">
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
        <view class="mt5">{{orderInfo.address.city}}{{orderInfo.address.addr}}</view>
        <view class="mt5">
          <text>{{orderInfo.address.name}}</text>
          <text class="ml20">{{orderInfo.address.tel}}</text>
        </view>
      </view>
      <view class="section-proudct bg-white mt20">
        <view :class="['order-list',orderInfo.type == 3 ? 'order-list-2' : '']">
          <view class="list-item hidden" v-for="item in orderInfo.orderList" :key="item">
            <view class="hidden">
              <view class="img-bar image-size-sm fl">
                <image :src="item.url" />
              </view>
              <view class="text-bar">
                <view class="ellipsis">{{item.name}}</view>
                <view class="side-bar">
                  <text class="text-size-basic">￥{{item.price}}</text>
                  <text class="text-no">x {{item.no}}</text>
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
          <text>￥{{orderInfo.priceInfo.oPrice}}</text>
        </view>
        <view class="price-item mt20" v-if="orderInfo.priceInfo.coupon">
          <text>使用优惠券</text>
          <text>-￥{{orderInfo.priceInfo.coupon}}</text>
        </view>
        <view class="price-item mt20">
          <text>运费</text>
          <text>+￥{{orderInfo.priceInfo.cPrice}}</text>
        </view>
        <view class="total-bar mt20">
          <text class v-if="orderInfo.priceInfo.discount">已优惠¥{{orderInfo.priceInfo.discount}}</text>
          <text class="ml20">实付款：</text>
          <text class="text-sub text-size-md bold">¥ {{orderInfo.priceInfo.total}}</text>
        </view>
      </view>
      <view class="section-order mt20 mb20 text-gray rel">
        <button class="btn btn-size-sm btn-line-gray text-gray btn-round-ss btn-copy">复制</button>
        <view class="order-list">
          <view class="order-item" v-if="orderInfo.formInfo.id">订单编号：{{orderInfo.formInfo.id}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.payType">支付方式：{{orderInfo.formInfo.payType}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.timePay">下单时间：{{orderInfo.formInfo.timePay}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.timeDeliver">发货时间：{{orderInfo.formInfo.timeDeliver}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.timeOrder">成交时间：{{orderInfo.formInfo.timeOrder}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.express">快递方式：{{orderInfo.formInfo.express}}</view>
          <view class="order-item mt20" v-if="orderInfo.formInfo.expressNo">运单编号：{{orderInfo.formInfo.expressNo}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      orderInfo: {
        type: 2,//0:待付款，1:待收货，2:退款/售后，3:已完成，4:已取消，
        status: "待付款",
        address: {
          city: "广东省深圳市",
          addr: "龙华区星星小区5栋1303室",
          name: "徐先生",
          tel: "13234568769"
        },
        orderList: [
          {
            url: "/static/images/27891160-1_l_2.png",
            name: "中国少年儿童百科全书(全套共全套共全套共...",
            price: "96.72",
            no: 2
          },
          {
            url: "/static/images/27891160-1_l_2.png",
            name: "中国少年儿童百科全书(全套共全套共全套共...",
            price: "96.72",
            no: 1
          },
          {
            url: "/static/images/27891160-1_l_2.png",
            name: "中国少年儿童百科全书(全套共全套共全套共...",
            price: "96.72",
            no: 1
          }
        ],
        priceInfo: {
          oPrice: "65.8",
          coupon: "20.0",
          cPrice: "10.0",
          discount: "20.0",
          total: "55.8"
        },
        formInfo: {
          id: "12132445543656547",
          payType: "电子钱包",
          timePay: "2019-09-09  12:12:12",
          timeDeliver: "2019-09-09  12:12:12",
          timeOrder: "2019-09-09  12:12:12",
          express: "韵达快递",
          expressNo: "4212784365837275"
        }
      }
    }
  },
  components: {

  },
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