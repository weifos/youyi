<template>
  <view class="wrapper-card-rights">
    <template v-if="type == 2">
      <view class="card-rights-list">
        <rightsItem type="money" text="95折畅购"></rightsItem>
        <rightsItem type="drink" text="95折畅饮"></rightsItem>
        <rightsItem type="coin" text="消费积分"></rightsItem>
      </view>
      <view class="card-rights-list">
        <rightsItem type="cake" text="生日特权"></rightsItem>
        <rightsItem type="crown" text="专享商品"></rightsItem>
        <rightsItem type="crown" text="会员专享劵"></rightsItem>
      </view>
      <view class="card-rights-list">
        <rightsItem type="activity" text="精品活动"></rightsItem>
      </view>
    </template>
    <template v-if="type == 3">
      <view class="card-rights-list">
        <rightsItem type="money" text="85折畅购"></rightsItem>
        <rightsItem type="drink" text="免费咖啡"></rightsItem>
        <rightsItem type="coin" text="消费积分"></rightsItem>
      </view>
      <view class="card-rights-list">
        <rightsItem type="crown" text="专享商品"></rightsItem>
        <rightsItem type="crown" text="会员专享劵"></rightsItem>
        <rightsItem type="list" text="优先特权"></rightsItem>
      </view>
    </template>
  </view>
</template>
<script>
import rightsItem from '@/components/yoyi-vip-rights-item/'

export default {
  name: 'rightsList',
  components: { rightsItem },
  props: {
    type: {
      type: [String, Number],
      default: '',
    }, // 类型 2:普通会员 3:高级会员
  },
}
</script>
<style lang="scss">
.wrapper-card-rights {
  margin: 0 80px;
  .card-rights-list {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }
}
</style>