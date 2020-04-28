<template>
  <view class="wrapper-user-activity-detail">
    <view class="section">
      <view class="section-titlebar">
        <image :src="articleInfo.url" />
      </view>
      <view class="section-content">
        <view class="article-title">{{articleInfo.title}}</view>
        <view class="article-price text-sub mt10">￥{{articleInfo.price}}</view>
        <view class="mt10 text-size-sm text-gray">{{articleInfo.time}}</view>
        <view class="text-size-sm text-gray">嘉宾：{{articleInfo.guest}}</view>
        <view class="text-size-sm text-gray">地点：{{articleInfo.address}}</view>
      </view>
      <view class="section-detail">
        <image :src="articleInfo.content" style="height:1304rpx;" />
      </view>
    </view>
    <operationButton buttonText="我的票券" @click="jump"></operationButton>
  </view>
</template>

<script>
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { operationButton },
  data() {
    return {
      articleInfo: {
        url: "/static/images/80345754996997.png",
        title: "实物编程机器人，实现孩子创新启蒙，爱上编程爱上编程",
        price: 88,
        time: "2019年8月10日 9:00 ～ 2019年9月15日 20:00",
        guest: "毛俊程老师",
        address: "罗湖店",
        content: "/static/images/dt.png"
      },
    }
  },
  onLoad(options) {
    // url入参
    console.log(options)
  },
  methods: {
    jump(item) {
      uni.navigateTo({
        url: `/pages/user/activity-ticket?id=1`,
      })
    },
  },
}
</script>

<style lang="scss">
.wrapper-user-activity-detail {
  .section {
    padding-bottom: 100px;
  }
  .section-titlebar image {
    width: 750px;
    height: 2 * 210px;
  }
  .section-content {
    padding: 2 * 20px;
  }
  .article-title {
    font-size: 2 * 18px;
    font-weight: bold;
  }
  .article-price {
    font-size: 2 * 20px;
  }
  .text-gray {
    line-height: 1.5;
  }
  .section-detail {
    border-top: 12px solid $yoyi-border-color;
  }
}
</style>