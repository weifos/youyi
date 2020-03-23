<template>
  <view class="component-order-item">
    <view class="title-bar">
        <view class="order-time">{{item.time}}</view>
        <view class="order-status"><text class="ml20" v-if="item.type == 1 || item.type == 3">在线支付</text><text class="text-sub ml20">{{item.status}}</text></view>
    </view>
    <view class="list-bar">
        <view class="order-item image-size-sm" v-for="sItem in item.list" :key="sItem"><image :src="sItem"></image></view>
    </view>
    <view class="side-bar">
        <view class="order-price">
            <view class="dib vam">共{{item.num}}件</view>
            <view class="dib vam ml20">合计：<text>¥ {{item.price}}</text></view>
        </view>
        <view class="order-btns" v-if="item.type == 1">
            <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">开发票</button>
            <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">确认收货</button>
        </view>
        <view class="order-btns" v-else-if="item.type == 2">
            <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">查看详情</button>
        </view>
        <view class="order-btns" v-else-if="item.type == 0">
            <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">取消订单</button>
            <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">去支付</button>
        </view>
        <view class="order-btns" v-else-if="item.type == 3">
            <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray ml20">开发票</button>
            <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20">申请售后</button>
        </view>
        <view class="order-btns" v-else-if="item.type == 4">
            <button class="btn btn-size-sm btn-line-gray btn-round-sm text-gray">查看详情</button>
        </view>
    </view>
  </view>
</template>

<script>

  export default {
      name: 'orderItem',
      props: {
          item:[Object],
          default:{}  
      },
      data() {
      return {
        
      }
    },
    components: {
        
    },
  }
</script>

<style lang="scss">
.component-order-item{
    background-color: #fff;
    border-radius: 20px;
    padding: 2*14px;
    margin-bottom: 20px;

    .title-bar{
        border-bottom:1px solid $yoyi-border-color;
        padding-bottom: 2*10px;
        display: flex;
        justify-content: space-between;
        color: $yoyi-text-color-grey;
    }
    .list-bar{
        font-size: 0;
        padding: 20px 0 0 0;
        display: flex;
        flex-wrap:wrap;

        .order-item{
            vertical-align: top;
            margin:0 20px 20px 0;
        }
    }
    .side-bar{
        border-top:1px solid $yoyi-border-color;
        padding-top: 2*10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>