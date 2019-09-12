<template>
  <view class="wrapper-card-transfer">
    <vipBrand type="2" text="会员卡迁移"></vipBrand>
    <view class="uni-form">
      <view class="uni-form-item">
        <view class="uni-label">卡号</view>
        <input class="uni-input" type="text" placeholder="输入老会员卡"/>
      </view>
      <view class="uni-form-item">
        <view class="uni-label">手机</view>
        <input class="uni-input" type="text" placeholder="输入老会员卡绑定的手机号"/>
      </view>
    </view>
    <view class="user-agreement">
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <checkbox :checked="checked" color="#FFB825"/>
        <view>
          <text>我已阅读并同意</text>
          <navigator class="agreement-link" url="/pages/user/index">《老卡会员迁移协议》</navigator>
          及
          <navigator class="agreement-link" url="/pages/user/index">《线上新会员规则协议》</navigator>
        </view>
      </checkbox-group>
    </view>
    <operationButton buttonText="确定"></operationButton>
  </view>
</template>
<script>
  import vipBrand from '@/components/yoyi-vip-brand/'
  import operationButton from '@/components/yoyi-operation-button/'

  export default {
    components: {vipBrand, operationButton},
    data() {
      return {
        checked: false,
      }
    },
    methods: {
      checkboxChange(e) {
        if (e.detail && e.detail.value && e.detail.value.length > 0) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
    }
  }
</script>
<style scoped lang="scss">
  .wrapper-card-transfer{
    .uni-form{
      width:646px;
      margin:80px auto 0;
      .uni-form-item{
        margin-bottom:20px;
      }
      .uni-label{
        width:60px;
        height:42px;
        line-height:49px;
        padding:14px;
        text-align:center;
        text-indent:0;
      }
      .uni-input{
        width:580px;
        height:42px;
        line-height:42px;
        padding:12px 24px;
        border:2px solid $yoyi-border-color2;
        border-radius:10px;
      }
    }
    .user-agreement{
      position:fixed;
      left:50%;
      bottom:120px;
      width:650px;
      margin-left:-325px;
      font-size:$uni-font-size-sm;
      display:flex;
      justify-content:center;
      .agreement-checkbox{
        display:flex;
        width:auto;
        checkbox{
          margin-right:8px;
        }
      }
      .agreement-link{
        display:inline-block;
        color:#004EA2;
      }
    }
  }
</style>