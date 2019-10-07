<template>
  <view class="content page-index">
    <view class="section-banner">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="item in banners" :key="item">
          <image :src="item.imgurl" />
        </swiper-item>
      </swiper>
    </view>
    <view class="section-featured">
      <view class="section-title mt10">热门精选</view>
      <view class="section-content mt10">
        <view class="list">
          <view class="list-item" v-for="item in listImg" :key="item" @click="openPopup">
            <image :src="item.val" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import app_g from '@/modules/appGlobal'

export default {
  data() {
    return {
      title: 'hello world!',
      indicatorDots: true,
      autoplay: true,
      interval: 2001,
      duration: 500,
      banners: [],
      listImg: [
        { key: "1", val: "/static/images/i1.png" },
        { key: "2", val: "/static/images/i1.png" },
        { key: "3", val: "/static/images/i1.png" }
      ]
    }
  },
  onLoad() {
    this.api_200()
  },
  methods: {
    api_200() {
      let that = this
      api.post(api.api_200, api.getSign(), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.banners = res.data.Result.banners
        }
      })
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
