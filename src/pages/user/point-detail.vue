<template>
  <view class="wrapper-point-detail">
    <view class="point-summary">
      <view class="summary-count">
        <text>824</text>
      </view>
      <view class="summary-title">当前积分</view>
    </view>
    <view class="wallet-detail-list">
      <view class="wallet-detail-item"
            v-for="(value, index) in [1,2,3,3,4,5,6,7,8]"
            :key="index">
        <moneyDetailItem
            :name="`充值${value*100}`"
            :date="`2019-01-${value} 10:00:01`"
            :price="index%2==0?value*1000:'-'+value*1000"></moneyDetailItem>
      </view>
    </view>
  </view>
</template>
<script>
  import moneyDetailItem from '@/components/yoyi-money-detail-item/'

  export default {
    components: {moneyDetailItem},
  }
</script>
<style lang="scss">
  .wrapper-point-detail{
    .point-summary{
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
    .wallet-detail-list{
      width:670px;
      margin:0 auto;
    }
  }
</style>