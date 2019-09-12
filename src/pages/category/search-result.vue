<template>
  <view class="content page-category-search-result">
    <view class="top-bar"><searchBar></searchBar></view>
    <view class="list-bar scrolling">
    <view class="filter-bar hidden"><text>默认</text><filter>价格</filter></view>
    <view class="list__item" v-for="(item,index) in searchInfo" :key="item">
        <view class="item-img">
            <image :src="item.url"></image>
        </view>
        <view class="item-info">
            <view class="item-title text-size-basic ellipsis2">{{item.title}}</view>
            <view class="item-desc text-size-sm text-gray ellipsis">{{item.desc}}</view>
            <view class="item-title text-sub text-size-basic">￥{{item.price}}</view>
        </view>
        </view>
    </view>
  </view>
</template>

<script>
import searchBar from "@/components/yoyi-search-bar"
import filter from "@/components/yoyi-filter"
  export default {
    data() {
      return {
        searchInfo:[{
              title:"中国少年儿童百科全书(全套共10册)中国少年儿童百科全书中国少年儿童百科全书",
              url:"/static/images/27891160.png",
              desc:"贺晓兴 /2016-09-15 /aaaaaaaaaa",
              price:96.72
            },{
              title:"中国少年儿童百科全书(全套共10册)中国少年儿童百科全书中国少年儿童百科全书",
              url:"/static/images/27891160.png",
              desc:"贺晓兴 /2016-09-15 /aaaaaaaaaa",
              price:96.72
            }]
          
      }
    },
    components: {
        searchBar,
        filter
    },
    onLoad() {

    },
    methods: {
        onClickList(){
            this.nearList=[];
        }
    }
  }
</script>

<style lang="scss">
.filter-bar{
    display: flex;
    justify-content: space-between;
    height: 2*34px;
    align-items: center;
    padding: 0 2*16px;
    border-bottom: 1px solid $yoyi-border-color;
    font-size: $uni-font-size-sm;
    position: relative;
    width: 2*268px;
    top: 0;
    left: 2*100px;
    box-sizing: border-box;
  }
  .list__item{
    overflow: hidden;
    padding: 2*10px;
    .item-img{
      float: left;
    }
    .item-img image{
      width: 2*100px;
      height: 2*100px;
    }
    .item-title{
      margin-top: 10px;
    }
    .item-desc{
      margin:15px 0;
    }
  }
</style>
