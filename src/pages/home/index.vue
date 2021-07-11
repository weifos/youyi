<template>
  <view class="content page-index">
    <!-- 小程序引导关注 -->
    <official-account></official-account>
    <selectBrand :brandName="''" ref="sBrand" type="location"></selectBrand>
    <view class="section-banner">
      <swiper :autoplay="autoplay" :duration="duration" :indicator-dots="indicatorDots" :interval="interval" class="swiper">
        <swiper-item :key="item" @click="bannerSelect(item)" v-for="item in banners">
          <image :src="item.imgurl" />
        </swiper-item>
      </swiper>
    </view>
    <view class="section-featured">
      <view class="section-title mt10">热门精选</view>
      <view class="section-content mt10">
        <view class="list">
          <view :key="item" class="list-item" v-for="item in banners0">
            <image :src="item.imgurl" @click="bannerSelect(item)" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import selectBrand from "@/components/select-brand"

export default {
  components: {
    selectBrand,
  },
  data () {
    return {
      title: 'hello world!',
      indicatorDots: true,
      autoplay: true,
      interval: 2001,
      duration: 500,
      banners: [],
      banners0: []
    }
  },
  onLoad () {
    let that = this
    that.storeBrand = appG.getCurBrandStore()
    if (that.storeBrand == null) {
      that.$refs.sBrand.api_215(() => {
        that.storeBrand = appG.getCurBrandStore()
        that.api_200()
      })
    } else {
      that.api_200()
    }
  },
  methods: {
    //分享给朋友
    onShareAppMessage: function (res) {
      let that = this
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }

      return {
        title: "首页",
        path: appG.route.getCurPath()
      }
    },
    //分享朋友圈
    onShareTimeline: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: "首页",
        path: appG.route.getCurPath()
      }
    },
    api_200 () {
      let that = this
      api.post(api.api_200, api.getSign({
        StoreId: that.storeBrand.id
      }), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.banners = res.data.Result.banners
          that.banners0 = res.data.Result.banners0
        }
      })
    },
    /**
     * banner点击事件
     */
    bannerSelect (item) {
      let url = ''
      //商品列表
      if (item.content_type == 2) {
        url = '../category/index?id=' + item.content_value
        //促销活动
      } else if (item.content_type == 3) {
        url = '../home/atyProductList?id=' + item.content_value
        //课程活动详情
      } else if (item.content_type == 5) {
        url = '../category/details?id=' + item.content_value
        //课程活动详情
      } else if (item.content_type == 10) {
        url = '../activity/details?id=' + item.content_value
        //会员升级页
      } else if (item.content_type == 15) {
        url = '../user/open?id=' + item.content_value
      }

      uni.navigateTo({ url: url })
    }
  }
}
</script>

<style lang="scss">
.section-banner {
  image {
    width: 100%;
    height: 100%;
  }
}
.list {
  padding: 0 2 * 10px;
  .list-item {
    margin-bottom: 2 * 10px;
    image {
      width: 710px;
      height: 220px;
    }
  }
}
</style>
