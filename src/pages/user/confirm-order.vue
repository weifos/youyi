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
        <view class="list-item hidden" v-for="item in orderList" :key="item">
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
      </view>
    </view>

    <view class="section-order-price-bar bg-white">
      <view class="price-item text-size-basic">
        <text>商品原价</text>
        <text>¥ 65.8</text>
      </view>
      <view class="price-item text-size-basic">
        <text>优惠券</text>
        <!-- <view class="text-size-basic"><text class="dib vam text-sub">-65.8</text><view class="icon-arrow dib vam ml10"></view></view>   -->
        <view class="text-size-basic">
          <text class="dib vam text-gray">0张优惠券</text>
          <view class="icon-arrow dib vam ml10"></view>
        </view>
      </view>
      <view class="price-item text-size-basic">
        <text>运费</text>
        <text>¥ 10</text>
      </view>
    </view>

    <!-- <view class="section-order-info bg-white">
      <view class="section-title">订单信息</view>
      <view class="price-item text-size-basic">
        <text>订单编号</text>
        <text>20192323123212343</text>
      </view>
      <view class="price-item text-size-basic">
        <text>下单时间</text>
        <view class="text-size-basic">
          <text class="dib vam text-gray">0张优惠券</text>
          <view class="icon-arrow dib vam ml10"></view>
        </view>
      </view>
      <view class="price-item text-size-basic">
        <text>运费</text>
        <text>¥ 10</text>
      </view>
    </view>-->

    <view class="notice-bar">
      <uni-notice-bar background-color="#F7E9CB" color="#FF5600" single="true" text="已优惠 ¥20"></uni-notice-bar>
    </view>
    <view class="section-btns" @click="openPopup">
      <operationButton price="78.5" buttonText="去支付"></operationButton>
    </view>
    <!-- popup s -->
    <uniPopup ref="popup" type="bottom" class="pop-pay yoyi-pop">
      <view class="pop-title text-size-md align-center">支付方式</view>
      <view class="pop-content">
        <radio-group class="agreement-checkbox" @change="changePay">
          <view class="pay-item mt20">
            <view class="text-size-basic">
              <radio checked="checked" color="#FFB825" />
              <text class="dib vam ml20">钱包支付</text>
            </view>
            <view class="text-gray text-size-sm text-desc">钱包余额 ¥23，尚需 ¥194.5</view>
            <view class="btns-bar mt20">
              <button class="btn btn-round btn-size-full text-size-md btn-bg-main text-white">立即充值 ¥194.5</button>
              <button class="btn btn-round btn-size-full btn-line-main text-size-md bg-white text-sub mt20">其他充值优惠</button>
            </view>
          </view>
          <view class="pay-item mt20">
            <view class="text-size-basic">
              <radio color="#FFB825" />
              <text class="dib vam ml20">微信支付</text>
            </view>
          </view>
        </radio-group>
      </view>
    </uniPopup>
    <!-- popup e -->
  </view>
</template>

<script> 

import api from '@/modules/api'
import user from '@/modules/userInfo'
import { uniNoticeBar, uniPopup } from "@dcloudio/uni-ui"
import operationButton from '@/components/yoyi-operation-button/'
export default {
  data() {
    return {
      addr: {
        id: 0,
        province: "",
        city: "",
        area: "",
        address: "",
        contact: "",
        mobile: ""
      },
      orderList: [
        {
          url: "/static/images/27891160-1_l_2.png",
          name: "中国少年儿童百科全书(全套共全套共全套共...",
          price: "96.72",
          no: 2
        }
      ]
    }
  },
  components: {
    operationButton,
    uniNoticeBar,
    uniPopup
  },
  onLoad(opt) {
    if (!user.methods.isLogin()) {
      let page = getCurrentPages()[2]
      uni.setStorageSync('returl', "/" + page.route);
      uni.switchTab({
        url: '/pages/home/userIndex'
      })
    } else {
      if (opt.said) {
        this.addr.id = opt.said
      }

      //当前购买的商品信息
      let item = user.methods.getBuyNow()
      this.orderList.push(item)
      console.log(this.orderList)
      return
      //加载收货地址和运费
      this.api_307()
    }
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    },
    closePopup() {
      this.$refs.popup.close()
    },//更改支付方式
    changePay() {

    },//更改收货地址
    selectAddress() {
      uni.navigateTo({
        url: "address/manage?check=1"
      })
    },//加载收货地址和运费
    api_307() {
      let that = this
      let dd = user.methods.getBuyNow()
      console.log(dd)
      return

      api.post(api.api_307, api.getSign({
        AddressID: that.data.addr.id,
        Order: ""
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.addr = res.data.Result
        } else {
          uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
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
    padding: 0 4vw 0 4vw;
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
    margin-bottom: 0;
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
}
</style>