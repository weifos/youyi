<template>
  <view class="wrapper-vip-card">
    <view class="vip-card">
      <view class="card-profile">
        <image class="card-avatar" :src="avatar" />
        <view class="card-user">
          <view class="user-phone">{{phone}}</view>
          <view class="user-vip">{{title}}</view>
        </view>
      </view>
      <view class="card-info">
        <view class="card-number">{{number}}</view>
        <view class="card-date" v-if="startDate != null">有效期 {{startDate}} - {{endDate}}</view>
        <view class="card-date" v-else>有效期 -</view>
      </view>
      <navigator class="card-qrcode" hover-class url="/pages/user/pay"></navigator>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    }, // 卡名
    avatar: {
      type: String,
      default: require('@/static/images/user/user-avatar.png'),
    }, // 头像
    phone: {
      type: [String, Number],
      default: 0,
    }, // 手机
    number: {
      type: [String, Number],
      default: 0,
    }, // 卡号
    startDate: {
      type: [String, Number],
      default: 0,
    }, // 开始日期
    endDate: {
      type: [String, Number],
      default: 0,
    }, // 结束日期
  },
}
</script>

<style lang="scss">
.wrapper-vip-card {
  .vip-card {
    position: relative;
    margin: 18px auto;
    width: 566px;
    height: 280px;
    padding: 30px 40px;
    background: $yoyi-bg-color;
    box-shadow: 0px 2px 8px 2px #333333;
    border-radius: 24px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card-profile {
      display: flex;
      align-items: center;
      .card-avatar {
        width: 100px;
        height: 100px;
        background: #eee;
        border-radius: 50px;
        margin-right: 15px;
      }
      .card-user {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 28px;
        font-weight: 400;
        .user-phone {
          height: 40px;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
        }
        .user-vip {
          height: 32px;
          padding: 6px 20px;
          color: rgba(255, 255, 255, 1);
          line-height: 32px;
        }
      }
    }
    .card-info {
      .card-number {
        font-size: 36px;
        font-weight: bolder;
        font-family: Times, Times New Roman;
      }
      .card-date {
      }
    }
    .card-qrcode {
      position: absolute;
      top: 50px;
      right: 40px;
      width: 76px;
      height: 76px;
      background: url(data:image/png;base64,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)
        0 0 no-repeat;
      background-size: 100%;
    }
  }
}
</style>