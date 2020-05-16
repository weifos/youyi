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
      <view class="list-bar scrolling">
        <view class="filter-bar hidden">
          <text>默认</text>
          <filter>价格</filter>
        </view>
        <view class="list__item" v-for="(item,index) in cateInfo[curIndex].list" :key="item">
          <view class="item-img">
            <image :src="item.url" />
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

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import searchBar from "@/components/yoyi-search-bar"
import filter from "@/components/yoyi-filter"
export default {
  data() {
    return {
      title: '分类',
      curIndex: 0,
      pageSize: 10,
      OrderByPrice: -1,
      cateInfo: [
        {
          name: "图书",
          pageIndex: 0,
          list: [{
            title: "中国少年儿童百科全书(全套共10册)中国少年儿童百科全书中国少年儿童百科全书",
            url: "/static/images/27891160.png",
            desc: "贺晓兴 /2016-09-15 /aaaaaaaaaa",
            price: 96.72
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
    //搜索页过来的关键词
    // this.keyWord = this.$route.query.k
    // if (this.$route.query.k != undefined) {
    //   this.isSearchResult = true
    //   this.catgID = 0
    // }
    // //是否获取同级分类
    // if (this.$route.query.id != undefined && this.$route.query.k == undefined) {
    //   this.catgID = this.$route.query.id
    //   this.api_205()
    // }
    //加载数据
    this.api_201()
  },
  methods: {
    onCateItemClick(index) {
      this.curIndex = index;
    },
    //页面滚动加载数据
    scroll() {
      var bar_top = $('#loading').offset().top - $(window).height()
      //判断是否滚动到底部
      if (bar_top < -40 && !this.loadding) {
        this.loading = true
        this.loadding = true
        this.pager.index++
        this.api_201()
      }
    },
    //加载列表页数据
    api_201() {

      api.post(
        api.api_201,
        api.getSign({
          Index: this.pager.index,
          Size: pageSize,
          GuideID: this.catgID,
          KeyWord: this.keyWord,
          OrderByPrice: this.OrderByPrice,
          OrderBySale: this.OrderBySale,
          OrderByView: this.OrderByView
        }),
        function (vue, res) {
          if (res.data.Basis.State == app_g.state.state_200) {
            if (vue.listLayout == 1) {
              res.data.Result.forEach(function (v, i) {
                vue.result.push(v)
              })
            } else if (vue.listLayout == 2) {
              res.data.Result.forEach(function (v, i) {
                vue.result1.push(v)
              })
            } else if (vue.listLayout == 3) {
              res.data.Result.forEach(function (v, i) {
                vue.result2.push(v)
              })
            }

            if (res.data.result == 0) {
              vue.loading = false
            }
          } else {
            vue.$vux.toast.text(res.data.Basis.Msg)
          }
        }
      )
      this.$store.commit('loadingStatus', { isLoading: false })
    }, //获取商品sku数据
    api_202(item) {
      api.post(
        api.api_202,
        api.getSign({
          ID: item.id
        }),
        function (vue, res) {
          if (res.data.Basis.State == app_g.state.state_200) {
            vue.productDetails = res.data.Result
            vue.dType = false
            vue.loadSkuBox = false
            setTimeout(() => {
              vue.loadSkuBox = true
            }, 1)
          } else {
            vue.$vux.toast.text(res.data.Basis.Msg)
          }
        }
      )
    }, //获取当前分类同一级
    api_205(item) {
      api.post(api.api_205, api.getSign({ ID: this.catgID }), function (vue, res) {
        if (res.data.Basis.State == app_g.state.state_200) {
          vue.catgList = res.data.Result
        } else {
          vue.$vux.toast.text(res.data.Basis.Msg)
        }
      })
    }, //查看详情
    goDetails(item) {
      this.$router.push({
        path: '/home/productDetails',
        query: {
          id: item.id
        }
      })
    }, //显示查询框
    showSearch() {
      if (this.isShowSearch) {
        this.isShowSearch = false
      } else {
        this.isShowSearch = true
      }
    }, //隐藏查询框
    hideSearch() {
      this.isShowSearch = false
    }, //显示导航
    showDrawer() {
      this.$store.commit('loadingDrawer', { isShowDrawer: true })
    }, //设置排序
    setOrderBy(attr, val) {
      this.$set(this, attr, val)
    }, //重置
    reset() {
      this.OrderByPrice = -1
      this.OrderBySale = -1
      this.OrderByView = -1
    }, //布局类型
    setListLayout: function (index) {
      this.listLayout = index
      this.UserInfo.setPdtListLayout(index)

      //默认从第一页查询
      this.pager.index = 0

      this.result = []
      this.result1 = []
      this.result2 = []
      this.api_201()
    }, //查询
    search(catgID) {

      //查询当前分类全部
      if (catgID == -1 && this.catgList.length > 0) {
        this.catgID = this.catgList[0].parent_id
        catgID = this.catgID
        this.active_all = true
      } else {
        this.active_all = false
      }

      if (catgID != undefined) {
        this.catgID = catgID
      }

      this.isShowSearch = false
      this.result = []
      this.result1 = []
      this.result2 = []

      this.api_201()
    }, //查询页
    goSearch() {
      this.$router.push({
        path: '/home/search?id=' + this.$route.query.id
      })
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
    padding-top: 2 * 34px;
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
    position: absolute;
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
