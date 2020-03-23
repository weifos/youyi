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
      interval: 2000,
      duration: 500,
      bannerImg: [
        "/static/images/c2177d86a8199176802cd6.png",
        "/static/images/c2177d86a8199176802cd6.png",
        "/static/images/c2177d86a8199176802cd6.png"
      ],
      listImg: [
        "/static/images/i1.png",
        "/static/images/i1.png",
        "/static/images/i1.png"
      ]
    }
  },
  methods: {
    //加载Banner图
    api_200() {
      this.post(app_g.api.api_200, this.GetSign(), function (vue, res) {
        if (res.data.Basis.State == app_g.state.state_200) {
          vue.result = res.data.Result
        } else {
          vue.$vux.toast.text(res.data.Basis.Msg)
        }
      })
      this.$store.commit('loadingStatus', { isLoading: false })
    }
  },
  created() {
    this.api_200()
    this.$store.commit('indexStatus', { index: 3 })
    localStorage.setItem('pageTitle', this.pageTitle)
    document.getElementById('pageTitle').innerHTML = localStorage.getItem('pageTitle')


  },
  onLoad() {
    this.api_200()
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
