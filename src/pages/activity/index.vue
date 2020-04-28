<template>
  <view class="content page-activity">
    <searchBar type="location"></searchBar>
    <view class="banner align-center">
      <image class="img" src="/static/images/i1.png" />
    </view>
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    <view class="tab-con">
      <view class="tab-c" v-if="index == 0">
        <view class="activity-list">
          <view class="activity-item" v-for="(item, key) in activityInfo" :key="key">
            <activityItem :src="item.url" :title="item.title" :guest="item.guest" :time="item.time" :address="item.address" :price="item.price" :status="1" @click="itemClick(item)" @buttonClick="itemButtonClick(item)"></activityItem>
          </view>
        </view>
      </view>
      <view class="tab-c" v-if="index == 1">
        <view class="activity-list">
          <view class="activity-item" v-for="(item, key) in usedActivityInfo" :key="key">
            <activityItem :src="item.url" :title="item.title" :guest="item.guest" :time="item.time" :address="item.address" :price="item.price" :status="4" @click="itemClick(item)" @buttonClick="itemButtonClick(item)"></activityItem>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchBar from "@/components/yoyi-search-bar"
import sunTab from '@/components/sun-tab/sun-tab.vue'
import activityItem from '@/components/yoyi-activity-item/'
export default {
  data() {
    return {
      title: '活动',
      index: 0,
      tabList: ['活动报名', '往期活动'],
      activityInfo: [
        {
          url: "/static/images/803457549969975.png",
          title: "实物编程机器人，实现孩子创新启蒙，爱上编程",
          guest: "毛俊程老师",
          time: "08/10 - 09/15",
          address: "罗湖店",
          price: 88
        },
        {
          url: "/static/images/803457549969975.png",
          title: "实物编程机器人，实现孩子创新启蒙，爱上编程",
          guest: "毛俊程老师",
          time: "08/10 - 09/15",
          address: "罗湖店",
          price: 99
        },
        {
          url: "/static/images/803457549969975.png",
          title: "实物编程机器人，实现孩子创新启蒙，爱上编程",
          guest: "毛俊程老师",
          time: "08/10 - 09/15",
          address: "罗湖店",
          price: 88
        },
        {
          url: "/static/images/803457549969975.png",
          title: "实物编程机器人，实现孩子创新启蒙，爱上编程",
          guest: "毛俊程老师",
          time: "08/10 - 09/15",
          address: "罗湖店",
          price: 99
        }
      ],
      usedActivityInfo: [
        {
          url: "/static/images/803457549969975.png",
          title: "实物编程机器人，实现孩子创新启蒙，爱上编程",
          guest: "毛俊程老师",
          time: "08/10 - 09/15",
          address: "罗湖店",
          price: 88
        },
        {
          url: "/static/images/803457549969975.png",
          title: "实物编程机器人，实现孩子创新启蒙，爱上编程",
          guest: "毛俊程老师",
          time: "08/10 - 09/15",
          address: "罗湖店",
          price: 99
        }
      ]
    }
  },
  onLoad() {

  },
  components: {
    searchBar,
    sunTab,
    activityItem,
  },
  methods: {
    itemClick(item) {
      console.log('item', item)
    },
    itemButtonClick(item) {
      console.log('button', item)
    },
  },
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
