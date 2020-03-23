<template>
  <view class="wrapper-wallet-detail">
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    <view class="wallet-detail-list" v-show="index == 0">
      <view class="wallet-detail-item"
            v-for="(value, index) in [1,2,3,3,4,5,6,7,8]"
            :key="index">
        <moneyDetailItem
          :name="`充值${value*1}`"
          :date="`2019-01-${value} 10:00:01`"
          :price="index%2==0?value*1000:'-'+value*1000"></moneyDetailItem>
      </view>
    </view>
    <view class="wallet-detail-list" v-show="index == 1">
      <view class="wallet-detail-item"
            v-for="(value, index) in [1,2,3,3,4,5,6,7,8]"
            :key="index">
        <moneyDetailItem
          :name="`充值${value*100}`"
          :date="`2019-01-${value} 10:00:01`"
          :price="index%2==0?value*1000:'-'+value*1000"></moneyDetailItem>
      </view>
    </view>
    <view class="wallet-detail-list" v-show="index == 2">
      <view class="wallet-detail-item"
            v-for="(value, index) in [1,2,3,3,4,5,6,7,8]"
            :key="index">
        <moneyDetailItem
          :name="`充值${value*10}`"
          :date="`2019-01-${value} 10:00:01`"
          :price="index%2==0?value*1000:'-'+value*1000"></moneyDetailItem>
      </view>
    </view>
  </view>
</template>

<script>
  import sunTab from '@/components/sun-tab/sun-tab.vue'
  import moneyDetailItem from '@/components/yoyi-money-detail-item/'

  export default {
    data() {
      return {
        index: 0,
        tabList: ['全部', '支出', '收入'],
      }
    },
    components: {sunTab, moneyDetailItem},
  }
</script>

<style lang="scss">
  .wrapper-wallet-detail{
    .wallet-detail-list{
      width:670px;
      margin:0 auto;
    }

  }
</style>