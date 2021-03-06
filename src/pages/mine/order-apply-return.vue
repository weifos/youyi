<template>
  <view class="page-mine-order-detail">
    <view class="section">
      <view class="status-title" v-if="order.status == 1">退货申请中</view>
      <view class="status-title" v-if="order.status == 3">退货申请中</view>
      <view class="status-title" v-if="order.status == 10">已发货</view>
      <view class="status-title" v-if="order.status == 18">退货完成</view>

      <!-- 退回的商品信息 -->
      <view class="section-proudct bg-white mt20">
        <!-- <view :class="['order-list',orderInfo.type == 3 ? 'order-list-2' : '']"> -->
        <view :class="'order-list'">
          <view class="list-item hidden">
            <view class="hidden">
              <view class="img-bar image-size-sm fl">
                <image :src="retDetails.img_url" />
              </view>
              <view class="text-bar">
                <view class="ellipsis">{{retDetails.product_name}}</view>
                <view class="side-bar">
                  <text class="text-size-basic">￥{{retDetails.actual_amount}}</text>
                  <text class="text-no">x {{retDetails.count}}</text>
                </view>
              </view>
            </view>
            <view class="con-no mt20">
              <text>退货数量</text>
              <view>
                <uni-number-box class="number-box-skin-1" :value="retNum" :min="1" :max="retDetails.num" @change="updateNum"></uni-number-box>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 退货信息 -->
      <view class="section-address mt20">
        <view class="text-gray">物流单号</view>
        <view class="mt5">
          <input class="form-input" placeholder-class="form-input-placeholder" v-model="info.contact" placeholder="填写物流单号" />
        </view>
      </view>

      <view class="section-status mt20" v-if="order.status == 10">
        <view class="text-size-md bold">商品已发货，请您确认收货</view>
        <view class="text-size-sm mt20">物流单号：{{delivery.tracking_no}}</view>
        <view class="btns align-right mt20">
          <button class="btn btn-size-sm btn-line-yellow btn-round-sm btn-bg-main text-white ml20" @click="goLogistics">查看物流</button>
        </view>
      </view>

      <view class="section-status mt20" v-if="orderInfo.type == 111">
        <text class="icon-arrow2 dib vat"></text>
        <view class="ml20 dib vat">
          <view class="text-size-md bold">
            <text>商家同意退货，请及时退货</text>
          </view>
          <view class="text-size-sm mt20">
            剩
            <text class="text-red">6</text>天
            <text class="text-red">6</text>时
            <text class="text-red">6</text>分
          </view>
        </view>
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
        <view class="text-gray">退货信息</view>
        <view class="mt5">{{delivery.province + delivery.city+ delivery.area}}{{delivery.address}}</view>
        <view class="mt5">
          <text>联系人：{{delivery.contact}}</text>
          <text class="ml20">联系电话：{{delivery.mobile}}</text>
        </view>
      </view>
    </view>

    <view class="section-btns">
      <operationButton buttonText="提交"></operationButton>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import { uniPopup, uniNumberBox } from "@dcloudio/uni-ui"
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { uniNumberBox, operationButton, uniPopup },
  data() {
    return {
      order: {
        status: 0
      },
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
      retDetails: {
        name: '',
        unit_price: '',
        img_url: '',
        num: 1
      },
      //退货数量
      retNum: 1
    }
  },
  onLoad() {
    //用户信息
    this.userInfo = user.methods.getUser()
    //订单明细
    this.retDetails = user.methods.getRetDetails()
    //加载退货地址信息
    this.api_370()
  },
  methods: {
    /**
     * 申请退款
     */
    api_369() {
      var that = this
      //退货数量不能为0
      if (retNum == 0) return

      uni.showModal({
        title: '提示',
        content: '确认申请退款吗？',
        success: function (res) {
          if (res.confirm) {
            //请求接口数据
            api.post(api.api_369, api.getSign({
              returnNum: that.retDetails.num,
              orderDetails: that.retDetails
            }), function (app, res) {
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
     * 加载门店退货地址
     */
    api_370() {
      var that = this
      //请求接口数据
      api.post(api.api_370, api.getSign({
        StoreId: that.retDetails.store_id
      }), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          console.log(res.data)
          that.delivery = res.data.Result
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
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
      * 数量更新
      */
    updateNum(value) {
      if (parseInt(value) > this.retDetails.num) return
      this.retNum = this.retDetails.count
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
.con-no {
  display: flex;
  justify-content: space-between;
}
</style>