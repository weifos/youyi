<template>
  <view class="wrapper-rights">
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    <view class="rights-content">
      <view class="content-main" v-if="index == 0">
        <rightsList :type="2"></rightsList>
        <view class="card-rights-rule">
          <view class="rule-p">1) 享受线上线下自营正价商品9.5折优惠，部分特殊商品及促销商品不参与会员折扣；</view>
          <view class="rule-p">2) 享受线下咖啡吧饮品95折优惠；</view>
          <view class="rule-p">3) 消费获积分，积分可兑换商品或优惠券；</view>
          <view class="rule-p">4) 会员每月专享特惠商品；</view>
          <view class="rule-p">5) 优先报名参加文化活动。</view>
        </view>
      </view>
      <view class="content-main" v-if="index == 1">
        <rightsList :type="3"></rightsList>
        <view class="card-rights-rule">
          <view class="rule-p">1) 享受线上线下自营正价商品9.5折优惠，部分特殊商品及促销商品不参与会员折扣；</view>
          <view class="rule-p">2) 享受线下咖啡吧饮品95折优惠；</view>
          <view class="rule-p">3) 消费获积分，积分可兑换商品或优惠券；</view>
          <view class="rule-p">4) 会员生日当天首单专享8.8折；</view>
          <view class="rule-p">5) 会员每月专享特惠商品；</view>
          <view class="rule-p">6) 优先报名参加文化活动。</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import sunTab from '@/components/sun-tab/sun-tab.vue'
import rightsList from '@/components/yoyi-vip-rights-list/'

export default {
  data() {
    return {
      index: 0,
      tabList: ['普通会员', '高级会员'],
    }
  },
  components: { sunTab, rightsList },
  onLoad() {

  },
  methods: {}
}
</script>

<style lang="scss">
.wrapper-rights {
  .card-rights-rule {
    width: 650px;
    margin: 50px auto 0;
    line-height: 1.8;
    .rule-p {
      margin: 10px 0;
    }
  }
}
</style>
