<template>
  <view class="content page-activity">
    <searchBar type="location" :storeName="aty_store.name" placeholderText="搜索您想要的活动" @search="search"></searchBar>
    <!-- <view class="banner align-center"> -->
    <view class="align-center">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="item in banners" :key="item">
          <image :src="item.imgurl" style="width:320px;height:150px;" />
        </swiper-item>
      </swiper>
      <!-- <image v-for="(item, key) in banners" class="img" :key="key" :src="item.imgurl" @click="bannerSelect(item)" /> -->
    </view>
    <sun-tab :value.sync="index" activeColor="#80a999" :tabList="tabList" :rangeKey="'title'" @change="change"></sun-tab>
    <view class="tab-con">
      <view class="tab-c" v-if="index == 0">
        <view class="activity-list">
          <view class="activity-item" v-for="(item, key) in tabList[0].list" :key="key">
            <activityItem :isPay="item.is_pay" :src="item.img_url" :storeId="item.store_id" :title="item.name" :guest="item.teacher_name" :time="item.time" :address="item.store_name" :price="item.sale_price" :status="1" @buttonClick="goDetails(item)"></activityItem>
          </view>
        </view>
      </view>
      <view class="tab-c" v-if="index == 1">
        <view class="activity-list">
          <view class="activity-item" v-for="(item, key) in tabList[1].list" :key="key">
            <activityItem :isPay="item.is_pay" :src="item.img_url" :storeId="item.store_id" :title="item.name" :guest="item.teacher_name" :time="item.time" :address="item.store_name" :price="item.sale_price" :status="4" @buttonClick="goDetails(item)"></activityItem>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import searchBar from "@/components/yoyi-search-bar"
import sunTab from '@/components/sun-tab/sun-tab.vue'
import activityItem from '@/components/yoyi-activity-item/'
export default {
  data() {
    return {
      title: '活动',
      indicatorDots: true,
      autoplay: true,
      loadBanner: true,
      interval: 2001,
      duration: 500,
      aty_store: { id: 0 },
      index: 0,
      pageSize: 6,
      banners: [],
      storeBrand: null,
      tabList: [{
        title: "活动报名",
        loading: false,
        loadComplete: false,
        pageIndex: 0,
        list: []
      },
      {
        title: "往期活动",
        loading: false,
        loadComplete: false,
        pageIndex: 0,
        list: []
      }]
    }
  },
  onLoad() {
    //获取当前品牌门店
    this.storeBrand = appG.getCurBrandStore()
    //是否定位过门店
    this.aty_store = user.methods.getAtyStore()
    if (this.aty_store == null) {
      this.api_299()
    } else {
      this.api_205()
    }

    this.api_207('')
  },
  components: {
    searchBar,
    sunTab,
    activityItem,
  },
  methods: {
    //分享给朋友
    onShareAppMessage: function (res) {
      let that = this
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }

      return {
        title: "活动列表页",
        path: appG.route.getCurPath()
      }
    },
    //分享朋友圈
    onShareTimeline: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: "活动列表页",
        path: appG.route.getCurPath()
      }
    },
    //查看详情
    goDetails(item) {
      uni.navigateTo({
        url: "../activity/details?id=" + item.id
      })
    },
    //去报名
    goSignup(item) {
      console.log('goSignup')
      uni.navigateTo({
        url: "../activity/sign-up?id=" + item.id
      })
    },
    //去报名
    search(e) {
      var that = this
      //当前选中索引
      let index = that.index
      //当前选中项
      let curItem = that.tabList[index]
      //当前页
      that.tabList[index].pageIndex = 0
      //是否加载中
      curItem.loading = false
      //是否加载完成
      curItem.loadComplete = false
      //清空数据
      curItem.list = []

      //查询数据
      if (index == 0) {
        that.api_205(e)
      } else {
        that.api_207(e)
      }

    },
    /**
     * 加载课堂页数据
     */
    api_205: function (keywory) {
      var that = this
      //当前选中索引
      let index = this.index
      //当前选中项
      let curItem = this.tabList[index]

      if (!curItem.loading && !curItem.loadComplete) {
        api.post(api.api_205, api.getSign({
          Type: 5,
          Size: that.pageSize,
          LoadBanner: that.loadBanner,
          BrandStoreId: that.storeBrand.id,
          StoreId: that.aty_store.id,
          keyword: keywory,
          Index: that.tabList[index].pageIndex
        }), function (app, res) {
          //标记已加载
          that.loadBanner = false
          if (res.data.Basis.State != api.state.state_200) {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          } else {

            //banner数据
            if (that.banners.length == 0) {
              res.data.Result.banners.map(function (obj, index, arr) {
                obj.type = "image"
                obj.url = obj.imgurl
              })
              //banner数据
              for (let item of res.data.Result.banners) {
                that.banners.push(item)
              }

              //设置banner图
              that.banners = res.data.Result.banners
            }

            curItem.loading = false
            curItem.pageIndex = curItem.pageIndex + 1
            res.data.Result.course.forEach(function (o, i) {
              //   let s_time = appG.util.date.dateFormat(o.start_date, 'MM/dd hh:mm')
              //   let e_time = appG.util.date.dateFormat(o.end_date, 'MM/dd hh:mm')
              //   o.time = s_time + '至' + e_time
              let s_time = appG.util.date.dateFormat(o.start_date, 'yyyy/MM/dd hh:mm')
              o.time = '开始日期' + s_time
              curItem.list.push(o)
            })

            that.tabList[index] = curItem
            //是否全部加载完毕
            if (res.data.Result.course.length == 0) {
              curItem.loadComplete = true
              that.tabList[index] = curItem
              uni.showToast({ title: '加载完成', icon: 'success', duration: 3000 })
            }

          }
        })
      }
    },
    /**
     * 加载课程历史数据
     */
    api_207: function (keywory) {
      var that = this
      //当前选中索引
      let index = this.index
      //当前选中项
      let curItem = this.tabList[1]
      //如果没加载过
      if (!curItem.loadComplete) {
        api.post(api.api_207, api.getSign({
          Size: that.pageSize,
          Index: that.tabList[index].pageIndex,
          StoreId: that.aty_store.id,
          Keyword: keywory
        }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          } else {
            curItem.loading = false
            curItem.loadComplete = true
            curItem.pageIndex = curItem.pageIndex + 1

            res.data.Result.forEach(function (o, i) {
              let s_time = appG.util.date.dateFormat(o.start_date, 'MM/dd hh:mm')
              let e_time = appG.util.date.dateFormat(o.end_date, 'MM/dd hh:mm')
              o.time = s_time + '至' + e_time
              curItem.list.push(o)
            })

            //是否全部加载完毕
            if (res.data.Result.length == 0) {
              curItem.loadComplete = true
              that.tabList[index] = curItem
              uni.showToast({ title: '加载完成', icon: 'success', duration: 3000 })
            }

          }
        })
      }
    },
    /**
     * 定位最近的门店
     */
    api_299() {
      let that = this
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          //将小程序定位转换成百度位置的定位
          let tmp = appG.util.map.qqMapTransBMap(res.longitude, res.latitude)
          //查询最近门店
          api.post(api.api_299, api.getSign({ LngLat: tmp.lng + '#' + tmp.lat }), function (app, res) {
            if (res.data.Basis.State != api.state.state_200) {
              uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
            } else {
              that.aty_store = res.data.Result
              user.methods.setAtyStore(that.aty_store)
              uni.showToast({ title: '检查到您当前位置已推荐最近门店', icon: 'none', duration: 3000 })
              that.api_205()
            }
          })
        }
      })
    },
    /**
     * banner点击事件
     */
    bannerSelect(item) {
      let url = ''
      //商品列表
      if (item.content_type == 2) {
        url = '../category/index?id=' + item.content_value
        //商品详情
      } else if (item.content_type == 5) {
        url = '../category/details?id=' + item.content_value
        //课程活动详情
      } else if (item.content_type == 10) {
        url = '../activity/details?id=' + item.content_value
      }
      uni.navigateTo({ url: url })
    },
    change(e) {
      console.log(this.index)
    }
  }
}
</script>

<style lang="scss">
.page-activity {
  .banner {
    padding: 2 * 15px 0 2 * 15px 0;

    .img {
      width: 2 * 355px;
      height: 2 * 120px;
    }
  }
  .activity-item {
    padding: 2 * 15px 2 * 10px;
  }
}
</style>
