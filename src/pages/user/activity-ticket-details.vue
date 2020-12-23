<template>
  <view class="wrapper-user-activity-ticket">
    <view class="user-activity-ticket">
      <view class="activity-ticket-content-1">
        <view class="activity-ticket-title">{{result.course_name}}</view>
        <view class="activity-ticket-date">{{result.start_date + "至" + result.end_date}}</view>
        <view class="activity-ticket-guest">嘉宾：{{result.teacher_name}}</view>
        <view class="activity-ticket-address">地点：{{result.address}}</view>
      </view>
      <view class="activity-ticket-content-2">
        <view class="activity-ticket-sub-title">到场后向工作人员出示二维码即可入场</view>
        <view class="activity-ticket-code">
          <canvas class="code-image" canvas-id="myQrcode" style="background:#fff;width: 180px;height: 180px;margin:0 auto;" />
        </view>
        <!-- <view class="activity-ticket-number">票号：123456890987</view> -->
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import QRCode from '../../modules/weapp-qrcode.js'

export default {
  data() {
    return {
      result: {
        name: '',
        teacher_name: '',
        qRcode: ''
      }
    }
  },
  components: {},
  onLoad(opt) {
    this.api_339(opt.id)
  },
  methods: {
    /**
     * 加载课堂详票据情页数据
     */
    api_339: function (id) {
      var that = this
      api.post(api.api_339, api.getSign({ ID: id }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        } else {
          that.result = res.data.Result
          that.createQRCode(that.result.ticket)
          //延迟一秒执行兼容华为手机
          setTimeout(() => {
            that.createQRCode(that.result.ticket)
          }, 1000)
        }
      })
    },
    /**
     * 生成二维码
     * 用户ID#优惠券ID#时间戳
     */
    createQRCode(ticket) {
      new QRCode('myQrcode', {
        text: ticket,
        width: 180,
        height: 180,
        padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
        correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
        callback: (res) => {
          console.log(res.path)
        }
      })
    }
  }
}
</script>


<style lang="scss">
.wrapper-user-activity-ticket {
  .user-activity-ticket {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABCkAAAXKCAMAAADtj8XNAAAAXVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////Z2dmysrLs7OyyX390AAAAG3RSTlMABRVkItK/P/rw7N+xknNsM+fMuaiYiVtVSQwVd9wxAAAUNklEQVR42uzc3Y7aMBCA0TEQBUI2/EmA8Pu/Z7tqt2W3wUN7Wc55iE9O7Jlo2S/PY7cd1hX4f62HbTeel/v4F4vduKnA69iMu0X8lXI5VeD1nC4lnnWbDhV4TYfpFs8o01CB1zVMJVJ9V4HX1vXRVt4qwFuJhtWxAtR6XMVDvXtR4IdNHw9cPbECPqyvMWtZAX5bxoxrBbg3c6rofXoAn637+GLlZybw1WYVnxTXo8CfjiXueXAFzHmLO30FmNPHL8WsBzCvK/FhqgDzpvjpZswceGS4OVIAzx4qig1XwGOHEu8uFeCxS7yzXBdoOcV3iwrQsoiIXQVo2UXEWAFaxogwRAq0bSL2FaBtbycekFrGuQK0nf3QBFJjGDgHMl1sK0DbNkycA5khLO8HMuuoABmlAJQCUApgllIAOaUAckoB5JQCyCkFkFMKIKcUQE4pgJxSADmlAHJKAeSUAsgpBZBTCiCnFEBOKYCcUgA5pfjGTh0IAAAAAAjytx5hgYIIeKYAnimAZwrgmQJ4pgCeKYBnCuCZAnimAJ4pgGcK4JkCeKYAnimAZwrgmQJ4pgCeKYBnCuCZAnimAJ4pgGcK4JkCeKYAnimAZwrgmQJ4pgCeKYBnCuCZAnimAJ4pgGcK4JkCeKYAnimAZwrgmQJ4pgCeKYBnCuCZAnimAJ4pgGcK4JkCeKYAnimAZwrgmQJ4pgCeKYBnCuCZAnimIHbqQAAAAABAkL/1CAsURPBMATxTAM8UwDMF8EwBPFMAzxTAMwXwTAE8UwDPFMAzBfBMATxTAM8UwDMF8EwBPFMAzxTAMwXwTAE8UwDPFMAzBfBMATxTAM8UwDMF8EwBPFMAzxTAMwXwTAE8UwDPFMAzBfBMATxTAM8UwDMF8EwBPFMAzxTAMwXwTAE8UwDPFMAzBfBMATxTAM8UwDMF8EwBPFMAzxTAMwXwTAGxUwcCAAAA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)
      0 0 no-repeat;
    background-size: contain;
  }
  .user-activity-ticket {
    margin: 0 auto;
    width: 630px;
    height: 852px;
    padding: 76px 40px 60px;
    display: flex;
    flex-direction: column;
  }
  .activity-ticket-content-1 {
    position: relative;
    // overflow: hidden;
    height: 400rpx;
  }
  .activity-ticket-content-2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 140rpx;
  }
  .activity-ticket-title {
    width: 630px;
    font-size: 36px;
    font-weight: 400;
    color: $yoyi-text-color-basic;
    line-height: 50px;
    margin-bottom: 24px;
  }
  .activity-ticket-date,
  .activity-ticket-guest,
  .activity-ticket-address {
    margin: 5px 0;
    height: 36px;
    font-size: 26px;
    font-weight: 400;
    color: $yoyi-text-color-grey;
    line-height: 36px;
  }
  .activity-ticket-guest {
  }
  .activity-ticket-address {
  }
  .activity-ticket-sub-title {
    height: 44px;
    font-size: 32px;
    font-weight: 500;
    color: $yoyi-text-color-basic;
    line-height: 44px;
  }
  .activity-ticket-code {
    margin: 50rpx auto;
    width: 480rpx;
    height: 480rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .activity-ticket-number {
    height: 40px;
    font-size: 28px;
    font-weight: 400;
    color: $yoyi-text-color-basic;
    line-height: 40px;
  }
}
</style>