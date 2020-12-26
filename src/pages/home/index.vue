<template>
  <view class="content page-index">
    <selectBrand type="location" :brandName="''" ref="sBrand"></selectBrand>
    <view class="section-banner">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="item in banners" :key="item" @click="bannerSelect(item)">
          <image :src="item.imgurl" />
        </swiper-item>
      </swiper>
    </view>
    <view class="section-featured">
      <view class="section-title mt10">热门精选</view>
      <view class="section-content mt10">
        <view class="list">
          <view class="list-item" v-for="item in banners0" :key="item" @click="openPopup">
            <image :src="item.imgurl" @click="bannerSelect(item)" />
          </view>
        </view>
      </view>
    </view>

    <!-- 小程序引导关注 -->
    <official-account></official-account>
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
  data() {
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
  onLoad() {
    let that = this
    //that.api_200()
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
    api_200() {
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
    bannerSelect(item) {
      let url = ''
      //商品列表
      if (item.content_type == 2) {
        url = '../category/index?id=' + item.content_value
        //商品详情
      } else if (item.content_type == 5) {
        url = '../category/details?id=' + item.content_value
        //课程活动详情
      } else if (item.content_type == 10) {
        url = '../activity/details?id=' + item.content_value
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
