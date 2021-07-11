<template>
  <view :class="['ticket ticket-2', ticketInfo.is_used ? 'used' : '']" v-if="type == 'into'">
    <view class="ticket__baseInfo dib vat">
      <view class="ticket__name ellipsis2">{{ticketInfo.name}}</view>
      <view class="ticket__time">{{ticketInfo.startTime}}至{{ticketInfo.endTime}}</view>
    </view>
    <view class="ticket__discountInfo tac dib vat">
      <view class="ticket__discount" data-item="ticketInfo" v-if="!ticketInfo.is_used" @click="handleClick('used')">点击使用</view>
      <view class="ticket__discount" data-item="ticketInfo" wx:else>已使用</view>
      <view class="ticket__quota ticket__tk" data-item="ticketInfo" v-if="ticketInfo.is_used" style="margin-top:5px;">{{ticketInfo.used_time}}</view>
      <view class="ticket__quota ticket__tk" v-if="!ticketInfo.is_used && !ticketInfo.is_refund && ticketInfo.type == 5 && ticketInfo.refund_status == 0" @click="api_367" :data-no="ticketInfo.serial_no" data-item="ticketInfo" style="margin-top:5px;">申请退款</view>
      <view class="ticket__quota ticket__tk" v-if="!ticketInfo.is_used && !ticketInfo.is_refund && ticketInfo.type == 5 && ticketInfo.refund_status == 2" data-item="ticketInfo" style="margin-top:5px;">申请退款中</view>
      <view class="ticket__quota ticket__tk" v-if="!ticketInfo.is_used && !ticketInfo.is_refund && ticketInfo.type == 5 && ticketInfo.refund_status == 10" data-item="ticketInfo" style="margin-top:5px;">退款完成</view>

      <!-- <view class="ticket__discount" data-item="ticketInfo" v-if="!ticketInfo.is_used">点击使用</view>
           <view class="ticket__quota ticket__tk" v-if="!ticketInfo.is_used && !ticketInfo.is_refund" bindtap="appRefund" data-item="ticketInfo" style="margin-top:5px;">申请退款</view>
      -->
    </view>
  </view>
  <view data-item="ticketInfo" bindtap="ticketDetails" :class="['ticket ticket-1', ticketInfo.is_used ? 'used' : '', isSelect && useFullAmount < ticketInfo.quota?'used':'' ]" v-else>
    <view class="ticket__baseInfo dib vat">
      <view class="ticket__name ellipsis" style="height:50rpx;margin: 16rpx 0 1rpx 24rpx;">{{ticketInfo.name}}</view>
      <view class="ticket__name ellipsis" style="height:45rpx;margin: 1rpx 0 5rpx 24rpx;font-size:12px;">{{ticketInfo.remark}}</view>
      <view class="ticket__time">{{ticketInfo.startTime}}至{{ticketInfo.endTime}}</view>
    </view>
    <view class="ticket__discountInfo tac dib vat">
      <view class="ticket__discount">
        <text v-if="ticketInfo.type==5">{{ticketInfo.discount}}折</text>
        <text v-if="ticketInfo.type==1">{{ticketInfo.discount}}元</text>
        <text v-if="ticketInfo.type==10">买赠券</text>
        <text v-if="ticketInfo.type==15">免费券</text>
      </view>
      <view class="ticket__quota">满{{ticketInfo.quota}}元可用 {{type}}</view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  name: 'ticket',
  props: {
    //满多少
    useFullAmount: {
      type: Number,
      default: 0
    },//优惠券详情
    ticketInfo: {
      type: Object,
      default: {}
    },
    type: {
      type: String,
      default: {}
    },
    //是否使用
    used: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(value) {
      this.$emit('useClick')
    },
    /**
     * 申请退款
     */
    api_367(e) {
      var that = this
      uni.showModal({
        title: '提示',
        content: '确认申请退款吗？',
        success: function (res) {
          if (res.confirm) {
            let serial_no = e.currentTarget.dataset.no
            //请求接口数据
            api.post(api.api_367, api.getSign({ SerialNo: serial_no }), function (app, res) {
              if (res.data.Basis.State != api.state.state_200) {
                appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
              } else {
                appG.dialog.showToast({ title: "申请成功", icon: 'none', duration: 3000 })
                //that.$set(that.ticketInfo, "refund_status", 2)
                setTimeout(() => {
                  uni.navigateTo({
                    url: '/userPackages/activity',
                  })
                }, 1000)
              }
            })
          }
        }
      })

    }
  }
}
</script>

<style scoped lang="scss">
.tac {
  text-align: center;
}
.dib {
  display: inline-block;
}
.ticket {
  color: #fff;
  font-size: 0;
  vertical-align: top;
}
.ticket__baseInfo {
  width: 420rpx;
  height: 153rpx;
  border-radius: 18rpx;
  background-color: #bfd3ff;
  border-right: 1px dashed #fff;
  font-size: 33rpx;
  text-align: left;
}
.ticket__discountInfo {
  width: 240rpx;
  height: 153rpx;
  border-radius: 18rpx;
  background-color: #9bbaff;
  font-size: 33rpx;
}
.ticket__name {
  height: 75rpx;
  margin: 16rpx 0 12rpx 24rpx;
}
.ticket__time {
  margin-left: 24rpx;
  font-size: 22rpx;
}
.ticket__discount {
  font-size: 54rpx;
  margin: 16rpx 0 10rpx 0;
}
.ticket__quota {
  font-size: 22rpx;
}
.tac {
  text-align: center;
}
.dib {
  display: inline-block;
}
.vat {
  vertical-align: top;
}

.ticket-2 .ticket__name {
  font-size: 27rpx;
  padding-right: 20rpx;
}
.ticket-2 .ticket__discount {
  font-size: 36rpx;
  margin-top: 50rpx;
}
.ellipsis2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.used .ticket__baseInfo {
  background-color: #d6d6d6;
}
.used .ticket__discountInfo {
  background-color: #bbbbbb;
}
.ticket__discountInfo {
  position: relative;
}
.ticket__tk {
  position: absolute;
  width: 100%;
  /* height: 50rpx;
  line-height: 50rpx; */
  border-top: 1rpx dashed #fff;
}
</style>