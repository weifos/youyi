<template>
  <view class="wrapper-user-open">
    <vipBrand type="1"></vipBrand>
    <yoyiTitle title="开通会员" more="开通会员享更多好礼"></yoyiTitle>
    <view class="user-open-list">
      <vipListItem
        class="open-item"
        title="普通会员"
        price="10.00"
        :selected="selected == 1"
        :disabled="false"
        @click="selected = 1"></vipListItem>
      <vipListItem
        class="open-item"
        title="高级会员"
        price="198.00"
        :selected="selected == 2"
        :disabled="false"
        @click="selected = 2"></vipListItem>
    </view>
    <view class="user-agreement">
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <checkbox :checked="checked" color="#FFB825"/>
        <view>
          <text>我已阅读并同意</text>
          <navigator class="agreement-link" hover-class="" url="/pages/user/index">《友谊书城（付费）会员服务协议》</navigator>
        </view>
      </checkbox-group>
    </view>
    <operationButton :price="10"></operationButton>
  </view>
</template>

<script>
  import yoyiTitle from '@/components/yoyi-title/'
  import vipBrand from '@/components/yoyi-vip-brand/'
  import vipListItem from '@/components/yoyi-vip-list-item/'
  import operationButton from '@/components/yoyi-operation-button/'

  export default {
    components: {yoyiTitle, vipBrand, vipListItem, operationButton},
    data() {
      return {
        selected: 1,
        checked: false,
      }
    },
    onLoad(options) {
      console.log(options)
    },
    methods: {
      select(value) {
        this.selected = value
      },
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

<style lang="scss">
  .wrapper-user-open{
    .user-open-list{
      width:650px;
      margin:36px auto 0;
      display:flex;
      flex-direction:column;
      .open-item{
        margin-bottom:20px;
        &:last-child{
          margin-bottom:0;
        }
      }
    }
    .user-agreement{
      position:fixed;
      left:0;
      bottom:120px;
      width:100%;
      font-size:$uni-font-size-sm;
      display:flex;
      justify-content:center;
      .agreement-checkbox{
        display:flex;
        width:auto;
        checkbox{
          margin:-2px 8px 0 0;
        }
      }
      .agreement-link{
        display:inline-block;
        color:#004EA2;
      }
    }
  }
</style>
