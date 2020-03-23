<template>
  <view class="wrapper-user-activity">
    <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    <view class="user-activity-list" v-show="index == 0">
      <view class="activity-item" v-for="(item, key) in list" :key="key">
        <activityItem
          :src="item.url"
          :title="item.title"
          :guest="item.guest"
          :time="item.time"
          :address="item.address"
          :price="item.price"
          :status="2"
          @click="itemClick(item)"
          @buttonClick="itemButtonClick(item)"></activityItem>
      </view>
    </view>
    <view class="user-activity-list" v-show="index == 1">
      <view class="user-activity-empty">
        <view></view>
        <text>您还没有报名活动哦~</text>
        <text>快去参加报名吧</text>
      </view>
    </view>
    <view class="user-activity-list" v-show="index == 2">
      <view class="activity-item" v-for="(item, key) in list" :key="key">
        <activityItem
          :src="item.url"
          :title="item.title"
          :guest="item.guest"
          :time="item.time"
          :address="item.address"
          :price="item.price"
          :status="4"
          @click="itemClick(item)"
          @buttonClick="itemButtonClick(item)"></activityItem>
      </view>
    </view>
  </view>
</template>

<script>
  import sunTab from '@/components/sun-tab/sun-tab.vue'
  import activityItem from '@/components/yoyi-activity-item/'

  export default {
    data() {
      return {
        index: 0,
        tabList: ['待参加', '已参加', '已过期'],
        list: [
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
      }
    },
    components: {sunTab, activityItem},
    methods: {
      itemClick(item) {
        console.log('item', item)
        uni.navigateTo({
          url: `/pages/user/activity-detail?id=${item.title}`,
        })
      },
      itemButtonClick(item) {
        console.log('button', item)
        uni.navigateTo({
          url: `/pages/user/activity-ticket?id=${item.title}`,
        })
      },
    },
  }
</script>

<style lang="scss">
  page{ background-color:$yoyi-page-bg-color; }

  .wrapper-user-activity{
    margin-top:2px;
    .user-activity-list{
      margin-top:22px;
    }
    .activity-item{
      padding:2*15px 2*10px;
      margin-bottom:20px;
      background:#fff;
      &:last-child{
        margin-bottom:0;
      }
    }
    .user-activity-empty{
      margin-top:200px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      text-align:center;
      view{
        margin:0 auto 40px;
        width:110px;
        height:98px;
        background:url(data:image/png;base64,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) 0 0 no-repeat;
        background-size:100%;
      }
      text{
        display:block;
        height:40px;
        font-size:28px;
        font-weight:400;
        color:rgba(178, 178, 178, 1);
        line-height:40px;
      }
    }
    .pay-coupon-list{
      .pay-coupon-item{
        margin-bottom:28px;
        &:last-child{
          margin-bottom:0;
        }
      }

    }
  }
</style>