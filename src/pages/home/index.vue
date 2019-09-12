<template>
  <view class="content page-index">
    <view class="section-banner">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
          <swiper-item v-for="item in bannerImg" :key="item">
              <image :src="item"></image>
          </swiper-item>
      </swiper>
    </view>
    <view class="section-featured">
      <view class="section-title mt10">热门精选</view>
      <view class="section-content mt10">
        <view class="list">
          <view class="list-item" v-for="item in listImg" :key="item">
            <image :src="item"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'hello world!',
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        bannerImg:[
          "/static/images/c2177d86a8199176802cd6.png",
          "/static/images/c2177d86a8199176802cd6.png",
          "/static/images/c2177d86a8199176802cd6.png"
        ],
        listImg:[
          "/static/images/i1.png",
          "/static/images/i1.png",
          "/static/images/i1.png"
        ]
      }
    },
    onLoad() {

    },
    methods: {}
  }
</script>

<style lang="scss">
.section-banner{
  image{
    width: 100%;
    height:100%;
  }
}
.list{
  padding:0 2*10px;
  .list-item{
    margin-bottom:2*10px;

    image{
      width: 710px;
      height: 220px;
    }
  }
}
</style>
