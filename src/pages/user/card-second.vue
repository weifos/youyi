<template>
  <view class="wrapper-card-second">
    <vipBrand type="2" text="赠送副卡"></vipBrand>
    <view class="user-phone-input" :class="{'disabled':disabled}">
      <input class="input-text" placeholder="输入获赠人手机号"/>
      <view class="input-button">赠送</view>
    </view>
    <yoyiTitle title="副卡详情"></yoyiTitle>
    <view class="card-second-list">
      <view class="card-second-item" v-for="(value, key) in [1,2]" :key="key">
        <view class="item-p">
          <text>手机号：</text>
          <text>12345678901</text>
        </view>
        <view class="item-p">
          <text>卡号：</text>
          <text>NO.1234567890</text>
        </view>
        <view class="item-p item-date">2019.09.09 12:12:12</view>
        <view class="item-button">解绑</view>
      </view>
    </view>
  </view>
</template>

<script>
  import vipBrand from '@/components/yoyi-vip-brand/'
  import yoyiTitle from '@/components/yoyi-title/'

  export default {
    components: {vipBrand, yoyiTitle},
    data() {
      return {
        disabled: false,
      }
    },
  }
</script>

<style lang="scss">
  .wrapper-card-second{
    .user-phone-input{
      display:flex;
      justify-content:center;
      width:644px;
      height:86px;
      line-height:84px;
      margin:40px auto 50px;
      border:1px solid $yoyi-button-color;
      .input-text{
        width:464px;
        padding:0 20px;
        font-size:$uni-font-size-base;
        color:$yoyi-text-color-placeholder;
        height:84px;
        line-height:84px;
      }
      .input-button{
        width:70*2px;
        color:#fff;
        text-align:center;
        background:$yoyi-button-color;
        line-height:84px;
      }
      &.disabled{
        border-color:$yoyi-text-color-placeholder;
        .input-text{
          color:$yoyi-text-color-placeholder;
        }
        .input-button{
          background:$yoyi-text-color-placeholder;
        }
      }
    }

    .card-second-list{
      margin-top:20px;
      width:646px;
      margin:0 auto;
      .card-second-item{
        position:relative;
        width:566px;
        height:200px;
        padding:20px 40px;
        border:2px solid $yoyi-text-color-placeholder;
        border-radius:20px;
        margin-bottom:48px;
        &:last-child{
          margin-bottom:0;
        }
        .item-p{
          margin:15px 0;
          text:first-child{
            color:$yoyi-text-color-grey;
          }
        }
        .item-date{
          border-top:2px dashed $yoyi-text-color-placeholder;
          margin-top:20px;
          padding-top:25px;
          color:$yoyi-text-color-grey;
        }
        .item-button{
          position:absolute;
          right:40px;
          bottom:15px;
          width:140px;
          height:60px;
          line-height:60px;
          border-radius:30px;
          border:2px solid $yoyi-button-color;
          color:$yoyi-button-color;
          text-align:center;
        }
      }
    }
  }
</style>