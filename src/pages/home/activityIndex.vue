<template>
  <view class="content page-activity">
    <searchBar type="location" @click></searchBar>
    <view class="banner align-center">
      <image class="img" src="/static/images/i1.png" />
    </view>
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList" :rangeKey="'title'"></sun-tab>
    <view class="tab-con">
      <view class="tab-c" v-if="index == 0">
        <view class="activity-list">
          <view class="activity-item" v-for="(item, key) in tabList[0].list" :key="key">
            <activityItem :src="item.img_url" :title="item.name" :guest="item.teacher_name" :time="item.time" :address="item.store_name" :price="item.sale_price" :status="1" @click="goDetails(item)" @buttonClick="goDetails(item)"></activityItem>
          </view>
        </view>
      </view>
      <view class="tab-c" v-if="index == 1">
        <view class="activity-list">
          <view class="activity-item" v-for="(item, key) in tabList[1].list" :key="key">
            <activityItem :src="item.img_url" :title="item.name" :guest="item.teacher_name" :time="item.time" :address="item.store_name" :price="item.sale_price" :status="4" @click="goDetails(item)" @buttonClick="goDetails(item)"></activityItem>
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
import sunTab from '@/components/sun-tab/sun-tab.vue'
import activityItem from '@/components/yoyi-activity-item/'
export default {
  data() {
    return {
      title: '活动',
      index: 0,
      tabCur: 0,
      pageSize: 6,
      banners: [],
      tabList: [{
        title: "活动报名",
        loading: false,
        pageIndex: 0,
        list: []
      },
      {
        title: "往期活动",
        loading: false,
        pageIndex: 0,
        list: []
      }]
    }
  },
  onLoad() {
    this.api_205()
  },
  components: {
    searchBar,
    sunTab,
    activityItem,
  },
  methods: {
    //查看详情
    goDetails(item) {
      console.log('goDetails')
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
    /**
     * 加载课堂页数据
     */
    api_205: function () {
      var that = this
      //当前选中索引
      let index = this.tabCur
      //当前选中项
      let curItem = this.tabList[index]

      //是否加载中
      let loading = curItem.loading
      //是否加载完成
      let loadComplete = curItem.loadComplete

      if (!curItem.loading && !curItem.loadComplete) {
        api.post(api.api_205, api.getSign({
          Type: 5,
          Size: that.pageSize,
          Index: that.tabList[0].pageIndex
        }), function (app, res) {

          if (res.data.Basis.State != api.state.state_200) {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          } else {
            //banner数据
            if (that.tabCur == 0 && curItem.pageIndex == 0) {
              res.data.Result.banners.map(function (obj, index, arr) {
                obj.type = "image"
                obj.url = obj.imgurl
              })
              //banner数据
              for (let item of res.data.Result.banners) {
                that.banners.push(item)
              }
              that.banners = that.banners
            }

            curItem.loading = false
            curItem.pageIndex = curItem.pageIndex + 1
            res.data.Result.course.forEach(function (o, i) {
              let s_time = appG.util.date.dateFormat(o.start_date, 'MM/dd')
              let e_time = appG.util.date.dateFormat(o.end_date, 'MM/dd')
              o.time = s_time + ' ' + e_time
              curItem.list.push(o)
            })

            that.tabList[index] = curItem
            //是否全部加载完毕
            if (res.data.Result.course.length == 0) {
              curItem.loadComplete = true
              that.tabList[index] = curItem
              uni.showToast({
                title: '加载完成',
                icon: 'success',
                duration: 3000
              })
            }

          }
        })
      }
    },
    /**
     * 加载课程历史数据
     */
    api_207: function () {
      var that = this
      //当前选中索引
      let index = this.tabCur2
      //当前选中项
      let curItem = this.tabList[1].list[index]
      //如果没加载过
      if (!curItem.loadComplete) {
        api.post(api.api_207, api.getSign({
          Type: 5,
          Month: index + 1
        }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          } else {
            curItem.loadComplete = true
            res.data.Result.forEach(function (o, i) {
              o.start_date = appG.util.date.dateFormat(o.start_date, 'yyyy-MM-dd hh:mm')
              curItem.items.push(o)
            })
            that.tabList[1].list[index] = curItem
          }
        })
      }
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
