<template>
  <view class="page-mine-order">
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    <view class="tab-content">
        <!-- tab-c s -->
        <view class="tab-c" v-if="index == 0">
            <yoyiOrderItem :item="item" v-for="item in orderList" :key="item"></yoyiOrderItem>
            <view class="order-no-data" v-if="orderList.length == 0">
                <view class="icon-cart2 dib"></view>
                <view class="mt20">还没有购买记录哦 <br>快去下单吧~</view>
            </view>
        </view>
        <!-- tab-c e -->
        <!-- tab-c s -->
        <view class="tab-c" v-if="index == 1">
            <yoyiOrderItem :item="item" v-for="item in orderList" :key="item" v-if="orderList.length >0 && item.type == 0"></yoyiOrderItem>
        </view>
        <!-- tab-c e -->
        <!-- tab-c s -->
        <view class="tab-c" v-if="index == 2">
            <yoyiOrderItem :item="item" v-for="item in orderList" :key="item" v-if="orderList.length >0 && item.type == 1"></yoyiOrderItem>
        </view>
        <!-- tab-c e -->
        <!-- tab-c s -->
        <view class="tab-c" v-if="index == 3">
            <yoyiOrderItem :item="item" v-for="item in orderList" :key="item" v-if="orderList.length >0 && item.type == 3"></yoyiOrderItem>
        </view>
        <!-- tab-c e -->
    </view>
  </view>
</template>

<script>
 import sunTab from '@/components/sun-tab/sun-tab.vue'
 import yoyiOrderItem from '@/components/yoyi-order-item/index.vue'
  export default {
      data() {
      return {
        index: 0,
        tabList: ['全部', '待付款', '待收货',"退款/售后"],
        orderList:[
            {
                type:0,//0:待付款，1:待收货，2:退款/售后，3:已完成，4:已取消，
                time:"2019-05-05 14:48:42",
                list:[
                    "/static/images/27891160-1_l_2.png",
                    "/static/images/27891160-1_l_2.png",
                ],
                num:2,
                price:98,
                status:"待付款"
            },
            {
                type:1,//0:待付款，1:待收货，2:退款/售后，3:已完成，
                time:"2019-05-05 14:48:42",
                list:["/static/images/27891160-1_l_2.png"],
                num:1,
                price:58,
                status:"已发货"
            },
            {
                type:3,//0:待付款，1:待收货，2:退款/售后，3:已完成，
                time:"2019-05-05 14:48:42",
                list:["/static/images/27891160-1_l_2.png"],
                num:1,
                price:58,
                status:"交易完成"
            },
            {
                type:2,//0:待付款，1:待收货，2:退款/售后，3:已完成，
                time:"2019-05-05 14:48:42",
                list:["/static/images/27891160-1_l_2.png"],
                num:1,
                price:58,
                status:"退货退款 退款成功"
            },
            {
                type:4,//0:待付款，1:待收货，2:退款/售后，3:已完成，
                time:"2019-05-05 14:48:42",
                list:["/static/images/27891160-1_l_2.png"],
                num:1,
                price:58,
                status:"订单已取消"
            }
        ]
      }
    },
    components: {
        sunTab,
        yoyiOrderItem
    },
  }
</script>

<style lang="scss">
page{
    background-color: $yoyi-bg-color-grey;
}
.order-no-data{
    text-align: center;
    padding-top: 40%;
    color: #B2B2B2;
    font-size: $uni-font-size-base;
    line-height: 1.5;
}
.page-mine-order{
    .tab-c{
        padding: 20px;
    }
}

</style>