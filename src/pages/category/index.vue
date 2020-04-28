<template>
  <view class="content page-category">
    <view class="top-bar">
      <searchBar></searchBar>
    </view>
    <view class="category-bar">
      <view class="cate-bar scrolling">
        <view class="cate-list">
          <view :class="['cate__item',curIndex == index ? 'cur' : '']" v-for="(item,index) in cateInfo" :key="item" @click="onCateItemClick(index)">{{item.name}}</view>
        </view>
      </view>
      <scroll-view scroll-y="true" class="list-bar scrolling" @scroll="scroll">
        <view class="filter-bar hidden">
          <text>默认</text>
          <filter>价格</filter>
        </view>
        <view class="list__item" v-for="(item,index) in cateInfo[curIndex].list" :key="item" @click="goDetails(item)">
          <view class="item-img">
            <image :src="item.img_url" />
          </view>
          <view class="item-info">
            <view class="item-title text-size-basic ellipsis2">{{item.name}}</view>
            <view class="item-desc text-size-sm text-gray ellipsis">{{item.introduction }}</view>
            <view class="item-title text-sub text-size-basic">￥{{item.sale_price}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
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
      title: '分类',
      //是否初始化
      isInit: true,
      //滚动高度
      scrollTop: 0,
      //每页大小
      pageSize: 6,
      //当前类别索引
      curIndex: 0,
      //类别集合
      cateInfo: []
      //    name: "",
      //   loading: false,
      //   firstLoad: true,
      //   loadComplete: false,
      //   pageIndex: 0,
      //   totalPage: 0,
      //   list: []
    }
  },
  components: {
    searchBar,
    filter
  },
  onLoad() {
    this.api_201()
  },
  methods: {
    onCateItemClick(index) {
      this.curIndex = index
      let catg = this.cateInfo[index]
      if (!catg.firstLoad) {
        this.api_202(catg)
      }
    },
    //获取商品列表
    api_201() {
      let that = this
      //请求数据
      api.post(api.api_201, api.getSign({
        Size: that.pageSize
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.catgs.forEach(function (item, index) {
            if (index == 0) {
              item.pageIndex = 1
              item.firstLoad = false
            } else {
              item.pageIndex = 0
              item.firstLoad = true
            }

            item.list = []
            item.loading = false
            item.loadComplete = false
            item.totalPage = parseInt(item.totalRow / that.pageSize) + (item.totalRow % that.pageSize == 0 ? 0 : 1)
            res.data.Result.productList.forEach(function (item1, index1) {
              if (item.id == item1.gcatg_id) {
                item.list.push(item1)
              }
            })
          })

          that.cateInfo = res.data.Result.catgs
        }
      })
    },
    //获取商品列表
    api_202(catg) {
      let that = this
      //设置加载中
      catg.loading = true
      //请求数据
      api.post(api.api_202, api.getSign({
        Size: catg.pageSize,
        Index: catg.pageIndex,
        CatgID: catg.id
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          //页面加一
          catg.pageIndex++
          //加载完成
          catg.loading = false
          //总页数
          catg.totalPage = parseInt(item.totalRow / that.pageSize) + (item.totalRow % that.pageSize == 0 ? 0 : 1)
          //达到总页数
          if (catg.pageIndex >= catg.totalPage) {
            catg.loadComplete = true
          }
          res.data.Result.productList.forEach(function (item, index) {
            if (catg.id == item.gcatg_id) {
              catg.list.push(item)
            }
          })
        }
      })
    },
    //查询详情
    goDetails(item) {
      uni.navigateTo({
        url: 'details?id=' + item.id
      })
    },
    //局部上拉滚动
    scroll(e) {
      let that = this
      //下拉
      if (e.detail.scrollTop < this.scrollTop) {
        //当前加载数据的分类
        let catg = this.cateInfo[this.curIndex]
        //下拉到指定位置
        if (e.detail.scrollTop - e.detail.scrollHeight > -430) {
          that.api_202(catg)
        }
      }
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
    position: fixed;
    width: 100%;
    height: 2 * 44px;
    left: 0;
    top: 0;
  }
  .category-bar {
    box-sizing: border-box;
    padding: 2 * 44px 0 0 0;
    overflow: hidden;
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }
  .cate-bar {
    height: 100%;
    width: 2 * 89px;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid $yoyi-border-color;
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
  .cate__item {
    height: 2 * 24px;
    line-height: 2 * 24px;
    padding: 0 2 * 14px;
    margin: 50px 0;

    &.cur {
      color: $yoyi-text-color;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        height: 100%;
        width: 2 * 4px;
        background: $yoyi-bg-color;
        left: 0;
        top: 0;
      }
    }
  }
  .filter-bar {
    display: flex;
    justify-content: space-between;
    height: 2 * 34px;
    align-items: center;
    padding: 0 2 * 16px;
    border-bottom: 1px solid $yoyi-border-color;
    font-size: $uni-font-size-sm;
    // position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
  }
  .list__item {
    overflow: hidden;
    padding: 2 * 10px;
    .item-img {
      float: left;
      margin-right: 20rpx;
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
}
</style>
