<template>
  <view class="wrapper-user-card">
    <vipCard :title="userInfo.card_name" :avatar="userInfo.headimgurl" :phone="userInfo.login_name" :number="'NO.'+userInfo.card_no" :startDate="userInfo.mbr_s_date" :endDate="userInfo.mbr_e_date"></vipCard>
    <yoyiTitle title="我的权益" more="权益详情" url="/pages/user/rights"></yoyiTitle>
    <template v-if="userType == 2">
      <rightsList :type="2"></rightsList>
    </template>
    <template v-if="userType == 3">
      <rightsList :type="3"></rightsList>
    </template>
    <view class="card-tips">升级会员享更多优惠！</view>
    <operationButton :buttonText="btn_text" @click="jump()" style="width: 50%;"></operationButton>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import yoyiTitle from '@/components/yoyi-title/'
import vipCard from '@/components/yoyi-vip-card/'
import rightsList from '@/components/yoyi-vip-rights-list/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, vipCard, rightsList, operationButton },
  data() {
    return {
      userType: 2,
      btn_text: "立即升级",
      userInfo: {
        headimgurl: '',
        card_no: '',
        mbr_s_date: '',
        mbr_e_date: '',
        login_name: ''
      }
    }
  },
  onLoad(options) {
    var that = this
    that.userInfo = user.methods.getUser()
    if (that.userInfo.card_no == '') {
      that.userInfo.card_no = '未成为会员'
      that.api_362()
    }
  },
  methods: {
    jump() {
      let that = this
      if (that.btn_text == "立即升级") {
        uni.navigateTo({ url: "/pages/user/open" })
      } else {
        uni.navigateTo({ url: "/pages/user/card-transfer" })
      }
    },
    /**
     * 检测当前会员在老系统是否存在
     */
    api_362() {
      let that = this
      api.post(api.api_362, api.getSign(), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          //该会员在老系统存在
        } else if (res.data.Basis.State == 227) {
          that.btn_text = "立即绑卡"
          appG.dialog.showToast({ title: '检测到您是老会员请立即绑卡', icon: 'none', duration: 3000 })
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        }
      })
    }
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
