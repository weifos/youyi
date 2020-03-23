<template>
  <view class="content page-category">
    <view class="top-bar"><searchBar></searchBar></view>
    <view class="category-bar">
      <view class="cate-bar scrolling">
        <view class="cate-list">
            <view :class="['cate__item',curIndex == index ? 'cur' : '']" v-for="(item,index) in cateInfo" :key="item" @click="onCateItemClick(index)">
              {{item.name}}
            </view>
        </view>
      </view>
      <view class="list-bar scrolling">
        <view class="filter-bar hidden"><text>默认</text><filter>价格</filter></view>
        <view class="list__item" v-for="(item,index) in cateInfo[curIndex].list" :key="item">
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
  </view>
</template>

<script>
import searchBar from "@/components/yoyi-search-bar"
import filter from "@/components/yoyi-filter"
  export default {
    data() {
      return {
        title: '分类',
        curIndex:0,
        cateInfo:[
          {
            name:"图书",
            list:[{
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
          },
          {
            name:"童书",
            list:[{
              title:"中国少年儿童百科全书(全套共10册)2",
              url:"/static/images/27891160.png",
              desc:"贺晓兴 /2016-09-15 /…",
              price:96.72
            }]
          },
          {
            name:"创意文具",
            list:[{
              title:"中国少年儿童百科全书(全套共10册)3",
              url:"/static/images/27891160.png",
              desc:"贺晓兴 /2016-09-15 /…",
              price:96.72
            }]
          }
        ]
      }
    },
    components: {
      searchBar,
      filter
    },
    onLoad() {

    },
    methods: {
      onCateItemClick(index){
        this.curIndex=index;
      }
    }
  }
</script>

<style lang="scss">
.page-category{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;

  .top-bar{
    position: fixed;
    width: 100%;
    height: 2*44px;
    left: 0;
    top: 0;
  }
  .category-bar{
    box-sizing: border-box;
    padding: 2*44px 0 0 0;
    overflow: hidden;
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }
  .cate-bar{
    height: 100%;
    width: 2*89px;
    overflow-x:hidden;
    overflow-y: auto;
    border-right:1px solid $yoyi-border-color;
  }
  .list-bar{
    height: 100%;
    overflow-y: auto;
    overflow-x:hidden;
    flex: 1;
    padding-top: 2*34px;
    box-sizing: border-box;
    position: relative;
  }
  .cate__item{
    height: 2*24px;
    line-height: 2*24px;
    padding:0 2*14px;
    margin:50px 0;

    &.cur{
      color: $yoyi-text-color;
      position: relative;

      &:before{
        content:"";
        position: absolute;
        height: 100%;
        width: 2*4px;
        background: $yoyi-bg-color;
        left: 0;
        top: 0;
      }
    }
  }
  .filter-bar{
    display: flex;
    justify-content: space-between;
    height: 2*34px;
    align-items: center;
    padding: 0 2*16px;
    border-bottom: 1px solid $yoyi-border-color;
    font-size: $uni-font-size-sm;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
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
}
</style>
