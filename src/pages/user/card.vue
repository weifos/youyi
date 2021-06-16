<template>
  <view class="wrapper-user-card">
    <!-- <vipCard :bgurl="m_bgurl" :title="userInfo.card_name +' '+(userInfo.mbr_dis_count == 10 ? '无折扣':userInfo.mbr_dis_count+'折') " :avatar="userInfo.headimgurl" :phone="userInfo.login_name" :number="'NO.'+userInfo.card_no" :startDate="userInfo.mbr_s_date" :endDate="userInfo.mbr_e_date"></vipCard> -->
    <vipCard :bgurl="m_bgurl" :title="userInfo.card_name" :avatar="userInfo.headimgurl" :phone="userInfo.login_name" :number="'NO.'+userInfo.card_no" :startDate="userInfo.mbr_s_date" :endDate="userInfo.mbr_e_date"></vipCard>
    <!-- <yoyiTitle title="升级会员享受以下会员福利" more="权益详情" url="/pages/user/rights"></yoyiTitle> -->
    <yoyiTitle title="升级会员享受以下会员福利"></yoyiTitle>
    <!-- <view class="wrapper-card-rights" :style="mr_bgurl==''?'':'background-image: url('+mr_bgurl+');background-repeat: no-repeat;background-size: 100%;'"></view> -->
    <image bindload="loadMbrBg" :src="mr_bgurl" style="width:100%;height:100%;margin-bottom:140rpx;" mode="widthFix" />
    <template v-if="userType == 21">
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
      //会员卡封面背景图
      m_bgurl: '',
      //会员卡权益背景图
      mr_bgurl: '',
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

    let is_login = user.methods.isLogin()
    //如果未登录
    if (!is_login) {
      let returl = appG.route.getCurPath()
      uni.setStorage({ key: 'returl', data: returl, success: function () { } })
      uni.switchTab({ url: "../home/userIndex" })
    }

    that.userInfo = user.methods.getUser()
    that.m_bgurl = that.userInfo.card_img
    that.mr_bgurl = that.userInfo.rights_img
    if (that.userInfo.card_name == '覔友卡' || that.userInfo.card_name == '注册用户') {
      that.userInfo.mbr_e_date = '永久'
    }

    // if (that.userInfo.card_no == '覔友卡') {
    //   that.userInfo.card_no = '永久'
    //   that.api_362()
    // }
  },
  loadMbrBg(e) {
    // 获取图片实际宽度
    var tempWidth = e.detail.width
    // 获取图片实际高度
    var tempHeight = e.detail.height
    //console.log(tempHeight)
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
