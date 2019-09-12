<template>
  <view class="wrapper-wallet-pay">
    <view class="user-profile">
      <image class="user-avatar" src="/static/images/user/user-avatar.png"></image>
      <view class="user-other">
        <view class="user-phone">134***7818</view>
        <view class="user-number">NO.1234567890</view>
      </view>
    </view>
    <view class="pay-list">
      <view class="pay-item" :class="{'checked':list[0].checked}">
        <checkbox-group class="agreement-checkbox" @change="checkboxChange">
          <checkbox :checked="list[0].checked" :value="list[0].value" color="#202020"/>
          <text>使用优惠券</text>
        </checkbox-group>
        <navigator class="agreement-link" hover-class="" url="/pages/wallet/pay-coupon">3张优惠券 &gt;</navigator>
      </view>
      <view class="pay-item" :class="{'checked':list[1].checked}">
        <checkbox-group class="agreement-checkbox" @change="checkboxChange">
          <checkbox :checked="list[1].checked" :value="list[1].value" color="#202020"/>
          <text>钱包支付（余额12）</text>
        </checkbox-group>
        <navigator class="agreement-link" hover-class="" url="/pages/wallet/index">去充值 &gt;</navigator>
      </view>
    </view>
    <view class="pay-code">
      <view class="code-tips">此二维码可累计积分并付款</view>
      <image class="code-image" :src="src"></image>
      <view class="code-tips">会员码每30秒自动更新</view>
    </view>
  </view>
</template>
<script>
  import vipBrand from '@/components/yoyi-vip-brand/'

  export default {
    components: {vipBrand},
    data() {
      return {
        list: [
          {
            value: 'coupon',
            checked: false,
          },
          {
            value: 'balance',
            checked: false,
          },
        ],
        src: '',
      }
    },
    methods: {
      checkboxChange(e) {
        let items = this.list, values = e.detail.value
        for (let i = 0, item, lenI = items.length; i < lenI; ++i) {
          item = items[i]
          if (values.includes(item.value)) {
            this.$set(item, 'checked', true)
          } else {
            this.$set(item, 'checked', false)
          }
        }
      },
    },
  }
</script>
<style lang="scss">
  .wrapper-wallet-pay{
    width:710px;
    margin:20px auto;
    background:#fff;
    .user-profile{
      display:flex;
      padding:40px;
      height:120px;
      background:$yoyi-bg-color;;
      border-radius:24px 24px 0px 0px;
      .user-avatar{
        width:100px;
        height:100px;
        background:#eee;
        border-radius:50px;
        margin-right:50px;
      }
      .user-other{
        display:flex;
        flex-direction:column;
        .user-phone,
        .user-number{
          height:40px;
          font-size:28px;
          font-weight:400;
          color:rgba(255, 255, 255, 1);
          line-height:40px;
        }
        .user-number{
          margin-top:20px;
          font-family:-apple-system;
        }
      }
    }
    .pay-list{
      margin:60px 0 40px;
      padding:0 40px;
      .pay-item{
        margin:50px 0;
        width:650px;
        font-size:$uni-font-size-sm;
        display:flex;
        justify-content:space-between;
        color:$yoyi-text-color-basic;
        &.checked{
          .agreement-link{
            color:$yoyi-button-color;
          }
        }
        .agreement-checkbox{
          display:flex;
          width:auto;
          checkbox{
            margin-top:4px;
            margin-right:8px;
            width:50px;
            height:50px;
            .wx-checkbox-input{
              width:40px;
              height:40px;
              &.wx-checkbox-input-checked{
                &::before{
                }
              }
            }
          }
          uni-checkbox{
            .uni-checkbox-input{
              width:40px;
              height:40px;
              &.uni-checkbox-input-checked{
                &::before{
                  font-size:$uni-font-size-base;
                }
              }
            }
          }
          text{
            font-size:$uni-font-size-lg;
          }
        }
        .agreement-link{
          height:50px;
          line-height:50px;
          display:inline-block;
          font-size:$uni-font-size-base;
          color:$yoyi-text-color-grey;
        }
      }
    }
    .pay-code{
      padding-top:80px;
      border-top:2px dashed $yoyi-border-color2;
      display:flex;
      flex-direction:column;
      justify-content:center;
      .code-tips{
        text-align:center;
        height:40px;
        line-height:40px;
        margin:10px auto;
      }
      .code-image{
        margin:0 auto;
        width:314px;
        height:314px;
      }
    }
  }
</style>