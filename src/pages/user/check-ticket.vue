<template>
  <view class="check-ticket-user">
    <view class="user-address-content" v-if="entity.id != null">
      <view style="text-align: center;" v-if="entity.used_time == null">
        <image src="https://res67.yoyibook.com:20185/DefaultRes/Images/VUE/static/images/success.png" style="max-width:120rpx;max-height:120rpx;" />
      </view>
      <view class="text-size-md mt20" style="text-align:center" v-if="entity.used_time == null">扫码通过，当前票据校验成功</view>
    </view>
    <view class="line"></view>
    <view class="user-address-content" v-if="entity.id != null">
      <view class="text-size-md bold" v-if="entity.is_used" style="color:red;">已使用</view>
      <!-- <view class="text-size-md bold" v-if="!entity.is_used">未使用</view> -->
      <view class="text-size-sm mt20">{{entity.course_name}}</view>
      <view class="text-size-sm mt20">票据金额：{{entity.amount}}</view>
      <view class="text-size-sm mt20" v-if="entity.used_time != null">使用时间：{{entity.used_time}}</view>
      <view class="text-size-sm mt20" v-if="entity.is_refund">已退款</view>
    </view>
    <view class="btn-add-address" @click="verifyTicket">验核课程票据</view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  data() {
    return {
      entity: null
    }
  },
  onLoad() { },
  methods: {
    /**
     * 校验活动票据
     */
    verifyTicket: function () {
      let that = this
      uni.scanCode({
        onlyFromCamera: false,
        scanType: 'qrCode',
        success: function (res) {
          api.post(api.api_360, api.getSign({ ticket: res.result }),
            function (app, res) {
              that.entity = res.data.Result
              if (res.data.Basis.State == 500) {
                appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
              }
            })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.check-ticket-user {
  background-color: #f1f1f1;
  width: 100%;
  min-height: 100%;
  padding: 10px * 2;
  box-sizing: border-box;
  .user-address-content {
    padding: 26px * 2 15px * 2;
    background-color: #fff;
  }
  .btn-add-address {
    width: 100%;
    height: 48px * 2;
    color: #fff;
    line-height: 48px * 2;
    font-size: 18px * 2;
    text-align: center;
    background-color: #ffb825;
    position: absolute;
    left: 0;
    bottom: 0;
  }

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
}

.line {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rpx;
  //   border-top: 1px #989898 solid;
}
</style>