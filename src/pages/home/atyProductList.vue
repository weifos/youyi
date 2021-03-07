<template>
  <view class="content page-category">
    <view class="category-bar">
      <scroll-view scroll-y="true" class="list-bar scrolling" @scroll="scroll">
        <view class="filter-bar hidden" @click="orderByPrice">
          <text @click.stop="orderByDefault">默认</text>
          <filter>价格</filter>
        </view>
        <view class="list__item" v-for="(item,index) in list" :key="item" @click="goDetails(item)">
          <view class="item-img">
            <image :src="item.img_url" />
          </view>
          <view class="item-info">
            <view class="item-title text-size-basic ellipsis2">{{item.name}}</view>
            <view class="item-desc text-size-sm text-gray ellipsis">{{item.introduction == null ?'':item.introduction }}</view>
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
import filter from "@/components/yoyi-filter"
export default {
  data() {
    return {
      title: '促销活动',
      //活动ID
      atyId: 0,
      //是否初始化
      isInit: true,
      //价格排序
      byPrice: 0,
      //滚动高度
      scrollTop: 0,
      //每页大小
      pageSize: 6,
      //当前页
      pageIndex: 0,
      //当前品牌门店
      store: null,
      //是否加载中
      loading: false,
      //是否加载完成
      loadComplete: false,
      //总页数
      totalPage: 0,
      //商品集合
      list: []
    }
  },
  components: {
    filter
  },
  onLoad(opt) {
    let that = this
    //活动ID
    that.atyId = opt.id
    //运营品牌对应的线上门店
    that.store = appG.getCurBrandStore(false)
    if (that.store == null) {
      //路径
      let returl = appG.route.getCurPath()
      //存储到缓存
      uni.setStorage({ key: 'returl', data: returl, success: function () { } })
      uni.navigateTo({ url: "./selectShopBrand" })
    } else {
      that.api_217()
    }

  },
  methods: {
    //获取促销商品
    api_217(is_order_by) {
      let that = this
      //是否加载中
      if (!that.loading && !that.loadComplete || is_order_by) {
        that.loading = true
        //请求数据
        api.post(api.api_217, api.getSign({
          Id: that.atyId,
          Size: that.pageSize,
          ByPrice: that.byPrice,
          Index: that.pageIndex,
          StoreId: that.store.id
        }), function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //页面加一
            that.pageIndex++
            //加载完成
            that.loading = false
            //总页数
            that.totalPage = parseInt(res.data.Result.totalRow / that.pageSize) + (res.data.Result.totalRow % that.pageSize == 0 ? 0 : 1)
            //达到总页数
            if (that.pageIndex >= that.totalPage) {
              that.loadComplete = true
              appG.dialog.showToast({ title: '加载完成', icon: 'success', duration: 3000 })
            }

            if (res.data.Result.productList) {
              res.data.Result.productList.forEach(function (item1, index1) {
                that.list.push(item1)
              })
            }

          }
        })
      }
    },
    //查询详情
    goDetails(item) {
      uni.navigateTo({
        url: '../category/details?id=' + item.product_id
      })
    },
    //局部上拉滚动
    scroll(e) {
      let that = this
      //console.log(e.detail.scrollHeight - e.detail.scrollTop)
      //下拉
      if (e.detail.scrollTop > 0 && e.detail.scrollTop - that.scrollTop > 0 && (e.detail.scrollHeight - e.detail.scrollTop) < 1000) {
        that.api_217()
      }
      //记录上次滚动位置
      that.scrollTop = e.detail.scrollTop
    },
    //根据价格设置
    orderByDefault() {
      this.pageIndex = 0
      this.api_217(true)
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

      this.list = []
      this.pageIndex = 0
      //下拉到指定位置
      this.api_217(true)

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
  .category-bar {
    box-sizing: border-box;
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
