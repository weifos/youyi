<template>
  <view class="content page-category-search">
    <view class="top-bar"><searchBar type="buttons"></searchBar></view>
    <view class="section-search">
        <view class="search-title">热门搜索</view>
        <view class="search-list">
            <view class="list-item" v-for="item in hotList" :key="item">{{item}}</view>
        </view>
    </view>
    <view class="section-search">
        <view class="search-title"><text>最近搜索</text> <text class="btn-clear" @click="onClickList">清除</text></view>
        <view class="search-list">
            <view class="list-item" v-for="item in nearList" :key="item">{{item}}</view>
        </view>
    </view>
  </view>
</template>

<script>
import {uniTag} from "@dcloudio/uni-ui"
import searchBar from "@/components/yoyi-search-bar"
  export default {
    data() {
      return {
        hotList:[
            "现代汉语词典",
            "西游记",
            "朝花夕拾",
            "东野圭吾"
        ],
        nearList:[
            "cc","dd"
        ]
      }
    },
    components: {
        searchBar,
        uniTag
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
.section-search{
    padding: 2*20px 2*20px 0 2*20px;

    .search-title{
        margin-bottom: 2*10px;
        font-size: 2*14px;
        display: flex;
        justify-content:space-between;
        width: 100%;
    }
}
.search-list{
    font-size: 0;
    .list-item{
        display: inline-block;
        font-size: 2*14px;
        background-color: $yoyi-border-color;
        height: 2*30px;
        line-height: 2*30px;
        padding: 0 20px;
        border-radius: 2*5px;
        margin: 0 2*10px 2*10px 0;
    }
}
</style>
