<template>
  <view class="page-mine-after-sale">
    <view class="product-info bg-white">
      <view class="hidden">
        <view class="img-bar image-size-sm fl">
          <image :src="info.url" />
        </view>
        <view class="text-bar">
          <view class="ellipsis">{{info.name}}</view>
          <view class="side-bar">
            <text class="text-size-basic">￥{{info.price}}</text>
            <text class="text-no">x {{info.no}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="section mt20 list-5 bg-white">
      <view class="list-item">
        <view>
          申请类型
          <text class="ml20" v-if="type">{{type}}</text>
        </view>
        <view>
          <text class="text-gray dib vam text-size-sm" v-if="!type">请选择</text>
          <view class="icon-arrow ml20 dib vam"></view>
        </view>
      </view>
      <view class="list-item">
        <view>
          申请原因
          <text class="ml20" v-if="reason">{{reason}}</text>
        </view>
        <view>
          <text class="text-gray dib vam text-size-sm" v-if="!reason">请选择</text>
          <view class="icon-arrow ml20 dib vam"></view>
        </view>
      </view>
    </view>
    <view class="section bg-white mt20 list-5">
      <view class="list-item">
        <view class="text-size-md">
          退款金额
          <text class="text-sub ml20">¥ 55.8</text>
        </view>
      </view>
      <view class="list-item align-normal">
        <view class="text-size-md">申请说明</view>
        <view class="mt20">
          <input class="yoyi-input-normal" type="text" placeholder="请输入申请说明" />
        </view>
      </view>
    </view>
    <view class="section bg-white mt20 list-5">
      <view class="list-item">
        <view class="text-size-md">联系客服 123467598</view>
      </view>
    </view>
    <view class="section-btns">
      <operationButton buttonText="提交申请"></operationButton>
    </view>
  </view>
</template>

<script>
import operationButton from '@/components/yoyi-operation-button/'
import { uniList, uniListItem } from "@dcloudio/uni-ui"
export default {
  data() {
    return {
      info: {
        url: "/static/images/27891160-1_l_2.png",
        name: "中国少年儿童百科全书(全套共全套共全套共...",
        price: "96.72",
        no: 2
      },
      type: "退货退款",
      reason: "七天无理由"

    }
  },
  components: {
    uniList, uniListItem,
    operationButton
  },
}
</script>

<style lang="scss">
page {
  background-color: $yoyi-bg-color-grey;
}

.product-info {
  padding: 40px;
  border-bottom: 1px solid $yoyi-bg-color-grey;

  &:last-child {
    border: none;
  }

  .img-bar {
    margin-right: 40px;
  }
  .text-bar {
    padding-top: 15px;
  }
  .side-bar {
    padding-top: 2 * 30px;
    display: flex;
    justify-content: space-between;
  }
  .operation-bar {
    border-top: 1px solid $yoyi-border-color;
    padding-top: 20px;
  }
}
.list-5 {
  .list-item {
    padding: 0 40px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    view {
      font-size: 2 * 16px;
    }
    border-bottom: 1px solid $yoyi-border-color;

    &:last-child {
      border: none;
    }
  }
  .align-normal {
    display: block;
    height: auto;
    padding: 20px 40px;
  }
}
</style>