<template>
  <view class="wrapper-user-card">
    <vipCard title="普通会员卡" phone="134***7818" number="NO.1234567890" startDate="2018.10.10" endDate="2019.10.10"></vipCard>
    <yoyiTitle title="我的权益" more="权益详情" url="/pages/user/rights"></yoyiTitle>
    <template v-if="userType == 2">
      <rightsList :type="2"></rightsList>
    </template>
    <template v-if="userType == 3">
      <rightsList :type="3"></rightsList>
    </template>
    <view class="card-tips">升级会员享更多优惠！</view>
    <!-- <operationButton buttonText="立即升级" @click="jump('/pages/user/open')"></operationButton> -->
    <operationButton buttonText="立即升级"></operationButton>
  </view>
</template>

<script>
import yoyiTitle from '@/components/yoyi-title/'
import vipCard from '@/components/yoyi-vip-card/'
import rightsList from '@/components/yoyi-vip-rights-list/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, vipCard, rightsList, operationButton },
  data() {
    return {
      userType: 2,
    }
  },
  onLoad(options) {
    console.log(options)
  },
  methods: {
    jump(url) {
      uni.navigateTo({
        url,
      })
    },
  }
}
</script>

<style lang="scss">
.wrapper-user-card {
  border-top: 2px solid $yoyi-text-color-placeholder;
  .card-rights-list {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
  }
  .card-tips {
    color: $yoyi-button-color;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 106px;
    width: 100%;
  }
}
</style>
