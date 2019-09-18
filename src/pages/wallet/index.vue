<template>
  <view class="wrapper-wallet">
    <view class="wallet-summary">
      <view class="summary-count">
        <text>&yen;</text>
        <text>100.00</text>
      </view>
      <view class="summary-title">当前余额</view>
      <navigator class="summary-detail" url="/pages/wallet/detail">零钱明细</navigator>
    </view>
    <yoyiTitle title="选择充值金额"></yoyiTitle>
    <view class="money-list">
      <view class="money-item"
            v-for="(value, key) in [1,2,3,4,5,6]"
            :key="key">
        <moneyItem
          :price="100*value"
          :present="60*(value%2)"
          :selected="value == selected"
          @click="selectMoney(`${value}`)"></moneyItem>
      </view>
    </view>
    <view class="wallet-list">
      <uni-list>
        <uni-list-item title="储值卡充入" @click="jump('/pages/wallet/recharge')"></uni-list-item>
        <uni-list-item title="购买礼品卡" @click="jump('/pages/wallet/gift-buy')"></uni-list-item>
        <uni-list-item title="交易密码设置"></uni-list-item>
      </uni-list>
    </view>
    <operationButton :price="10"></operationButton>
  </view>
</template>
<script>
  import yoyiTitle from '@/components/yoyi-title/'
  import moneyItem from '@/components/yoyi-money-item/'
  import uniList from '@/components/uni-list/uni-list.vue'
  import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
  import operationButton from '@/components/yoyi-operation-button/'

  export default {
    components: {yoyiTitle, moneyItem, uniList, uniListItem, operationButton},
    data() {
      return {
        selected: 1,
      }
    },
    methods: {
      selectMoney(value) {
        this.selected = value
      },
      jump(url) {
        uni.navigateTo({
          url,
        })
      },
    },
  }
</script>
<style lang="scss">
  .wrapper-wallet{
    .wallet-summary{
      width:100%;
      position:relative;
      height:300px;
      background:$yoyi-bg-color;
      color:#fff;
      display:flex;
      flex-direction:column;
      justify-content:center;
      text-align:center;
      .summary-count{
        font-size:80px;
        text:first-child{
          font-size:60px;
        }
      }
      .summary-title{
        font-size:24px;
      }
      .summary-detail{
        position:absolute;
        right:-2px;
        bottom:30px;
        border-radius:200px 0px 0px 200px;
        border:1px solid rgba(255, 255, 255, 1);

        width:96px;
        height:34px;
        padding:7px 20px;
        font-size:24px;
        font-weight:400;
        color:rgba(255, 255, 255, 1);
        line-height:34px;
      }
    }
    .money-title{
      width:690px;
      height:100px;
      line-height:100px;
      margin:0 auto;
      font-size:32px;
      font-weight:400;
      color:$yoyi-text-color-basic;
    }
    .money-list{
      position:relative;
      overflow:hidden;
      width:682px;
      margin:0 auto;
      .money-item{
        float:left;
        margin:0 16px 16px 0;
        &:nth-child(3n){
          margin-right:0;
        }
      }
    }
    .wallet-list{
      margin-top:20px;
      .uni-list{
        &:before{
          height:0;
        }
      }
      .uni-list-item{
        &__content{
          &-title{font-size:$uni-font-size-middle;}
        }
      }
    }
  }
</style>