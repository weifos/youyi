<template>
  <view class="page-category">
    <view class="top-bar">
      <searchBar ref="searchBar"></searchBar>
    </view>
    <scroll-view scroll-y="true" class="list-bar scrolling" @scroll="scroll">
      <view class="filter-bar hidden" @click="orderByPrice">
        <text @click.stop="orderByDefault">默认</text>
        <filter>价格</filter>
      </view>
      <view class="list__item" v-for="(item,index) in productList" :key="item">
        <view class="item-img">
          <image :src="item.img_url" />
        </view>
        <view class="item-info">
          <view class="item-title text-size-basic ellipsis2">{{item.name}}</view>
          <view class="item-desc text-size-sm text-gray ellipsis">{{item.introduction}}</view>
          <view class="item-title text-sub text-size-basic">￥{{item.sale_price}}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import searchBar from "@/components/yoyi-search-bar"
import filter from "@/components/yoyi-filter"
export default {
  data() {
    return {
      //价格排序
      byPrice: 0,
      //滚动高度
      scrollTop: 0,
      //每页大小
      pageSize: 6,
      //当前页
      pageIndex: 0,
      //总页数
      totalPage: false,
      //是否加载完成
      loadComplete: false,
      //查询关键词
      keyWord: '',
      //结果集合
      productList: []
    }
  },
  components: { searchBar, filter },
  onLoad(opt) {
    this.keyWord = opt.k
    this.api_212()
  },
  methods: {
    onClickList() {
      this.nearList = []
    },
    //根据价格设置
    orderByDefault() {
      this.byPrice = 0
      //当前加载数据的分类
      let catg = this.cateInfo[this.curIndex]
      catg.list = []
      catg.pageIndex = 0
      this.api_202(catg)
    },
    //根据价格排序
    orderByPrice() {
      if (this.byPrice == 0) {
        this.byPrice = 1
      } else if (this.byPrice == 1) {
        this.byPrice = 2
      } else if (this.byPrice == 2) {
        this.byPrice = 1
      }

      //当前加载数据的分类
      let catg = this.cateInfo[this.curIndex]
      catg.list = []
      catg.pageIndex = 0
      //下拉到指定位置
      this.api_202(catg)
    },
    //根据关键词查询
    api_212() {
      let that = this
      if (!that.loadComplete) {
        //设置查询关键词
        that.selectKey(that.keyWord)
        //请求数据
        api.post(api.api_212, api.getSign({
          ByPrice: that.byPrice,
          Size: that.pageSize,
          Index: that.pageIndex,
          KeyWord: that.keyWord
        }), function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //页面加一
            that.pageIndex++
            //总页数
            that.totalPage = parseInt(res.data.Result.totalRow / that.pageSize) + (res.data.Result.totalRow % that.pageSize == 0 ? 0 : 1)
            //达到总页数
            if (that.pageIndex >= that.totalPage) {
              that.loadComplete = true
            }
            //添加到结果集合
            res.data.Result.productList.forEach(function (item, index1) {
              that.productList.push(item)
            })
          }
        })
      }

    },
    //根据价格设置
    orderByDefault() {
      this.byPrice = 0
      this.pageIndex = 0
      this.api_202()
    },
    //根据价格排序
    orderByPrice() {
      if (this.byPrice == 0) {
        this.byPrice = 1
      } else if (this.byPrice == 1) {
        this.byPrice = 2
      } else if (this.byPrice == 2) {
        this.byPrice = 1
      }
      this.pageIndex = 0
      //下拉到指定位置
      this.api_212()

    },
    //局部上拉滚动
    scroll(e) {
      let that = this
      //console.log("==" + (e.detail.scrollHeight - e.detail.scrollTop))
      //下拉到指定位置
      if (e.detail.scrollTop > 0 && e.detail.scrollTop - that.scrollTop > 0 && (e.detail.scrollHeight - e.detail.scrollTop) < 505) {
        that.api_212()
      }
      //记录上次滚动位置
      that.scrollTop = e.detail.scrollTop
    },
    //设置查询关键词
    selectKey(params) {
      this.$refs.searchBar.selectKey(params)
    }
  }
}
</script>

<style lang="scss">
.page-category {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .top-bar {
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 2 * 44px;
    left: 0;
    top: 0;
  }
  .filter-bar {
    display: flex;
    justify-content: space-between;
    height: 2 * 34px;
    align-items: center;
    padding: 0 2 * 16px;
    border-bottom: 1px solid $yoyi-border-color;
    font-size: $uni-font-size-sm;
    position: relative;
    width: 2 * 268px;
    top: 0;
    left: 2 * 100px;
    box-sizing: border-box;
  }
  .list__item {
    overflow: hidden;
    padding: 2 * 10px;
    .item-img {
      float: left;
    }
    .item-img image {
      width: 2 * 100px;
      height: 2 * 100px;
    }
    .item-title {
      margin-top: 10px;
    }
    .item-desc {
      margin: 15px 0;
    }
  }
  .list-bar {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    // padding-top: 2 * 34px;
    box-sizing: border-box;
    position: relative;
  }
}
</style>
