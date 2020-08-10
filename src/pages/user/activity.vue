<template>
  <view class="wrapper-user-activity">
    <sun-tab :value.sync="index" activeColor="#0056B2" :rangeKey="'title'" :tabList="orderData"></sun-tab>
    <view class="user-activity-list" v-show="index == 0">
      <view class="user-activity-empty" v-if="orderData[0].list.length == 0">
        <view></view>
        <text>您还没有报名活动哦~</text>
        <text>快去参加报名吧</text>
      </view>
      <view class="activity-item" v-else v-for="(item, key) in orderData[0].list" :key="key">
        <activityItem :isPay="item.is_pay" :src="item.img_url" :title="item.course_name" :guest="item.teacher_name" :time="item.time" :address="item.address" :price="item.price" :status="2" @click="itemClick(item)" @buttonClick="itemButtonClick(item)" @goPay="goPay(item)"></activityItem>
      </view>
    </view>
    <view class="user-activity-list" v-show="index == 1">
      <view class="user-activity-empty" v-if="orderData[1].list.length == 1">
        <view></view>
        <text>您还没有报名活动哦~</text>
        <text>快去参加报名吧</text>
      </view>
      <view class="activity-item" v-else v-for="(item, key) in orderData[1].list" :key="key">
        <activityItem :isPay="item.is_pay" :src="item.img_url" :title="item.course_name" :guest="item.teacher_name" :time="item.time" :address="item.address" :price="item.price" :status="2" @click="itemClick(item)" @buttonClick="itemButtonClick(item)" @goPay="goPay(item)"></activityItem>
      </view>
    </view>
    <view class="user-activity-list" v-show="index == 2">
      <view class="activity-item" v-for="(item, key) in orderData[2].list" :key="key">
        <activityItem :isPay="item.is_pay" :src="item.img_url" :title="item.course_name" :guest="item.teacher_name" :time="item.time" :address="item.address" :price="item.price" :status="4" @click="itemClick(item)" @buttonClick="itemButtonClick(item)" @goPay="goPay(item)"></activityItem>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import sunTab from '@/components/sun-tab/sun-tab.vue'
import activityItem from '@/components/yoyi-activity-item/'

export default {
  data() {
    return {
      index: 0,
      //1：活动，5：课程
      type_id: 5,
      scrollLeft: 0,
      pageSize: 5,
      orderData: [{
        title: "待参加",
        loading: false,
        loadComplete: false,
        pageIndex: 0,
        list: []
      },
      {
        title: "已参加",
        loading: false,
        loadComplete: false,
        pageIndex: 0,
        list: []
      }]
    }
  },
  components: { sunTab, activityItem },
  onLoad() {
    this.api_328()
  },
  methods: {
    /**
    * 查看详情
    */
    itemClick(item) {
      uni.navigateTo({
        //url: `/pages/user/activity-detail?id=${item.id}`,
        url: `/pages/activity/details?id=${item.course_id}`,
      })
    },
    /**
     * 查看券码
     */
    itemButtonClick(item) {
      uni.navigateTo({
        url: `/pages/user/activity-ticket-list?id=${item.id}`,
      })
    },
    /**
     * 加载订单数据
     */
    api_328: function () {
      let that = this
      //付款状态
      let isPay = 0
      //当前选中索引
      let index = this.index
      //当前选中项
      let curItem = this.orderData[index]
      //是否加载中
      let loading = curItem.loading
      //是否加载完成
      let loadComplete = curItem.loadComplete

      if (index == 0) {
        isPay = -1
      } else if (index == 1) {
        isPay = 1
      } else if (index == 2) {
        isPay = 0
      }

      //是否加载中，是否加载完成
      if (!curItem.loading && !curItem.loadComplete) {

        //请求接口数据
        api.post(api.api_328, api.getSign({
          TypeID: that.type_id,
          IsPay: isPay,
          Size: that.pageSize,
          Index: curItem.pageIndex
        }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          } else {
            curItem.loading = false
            curItem.pageIndex = curItem.pageIndex + 1
            res.data.Result.forEach(function (o, i) {
              let s_time = appG.util.date.dateFormat(o.start_date, 'MM/dd')
              let e_time = appG.util.date.dateFormat(o.end_date, 'MM/dd')
              o.time = s_time + ' ' + e_time
              curItem.list.push(o)
            })
            that.orderData[index] = curItem

            //是否全部加载完毕
            if (res.data.Result.length == 0) {
              curItem.loadComplete = true
              that.orderData[index] = curItem
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
     * 去支付
     */
    goPay: function (item) {
      let param = '?no=' + item.serial_no + '&store_id=' + item.store_id
      uni.navigateTo({
        url: '../activity/pay' + param
      })
    },
    /**
     * 退款申请
     */
    refundApply: function (e) {
      let that = this
      let id = e.currentTarget.dataset.id
      wx.showModal({
        title: '提示',
        content: '确认申请退款吗？',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确认',
        success: function (res) {
          if (res.confirm) {
            api.post(api.api_341, api.getSign({
              ID: id
            }), function (app, res) {
              if (res.data.Basis.State == api.state.state_200) {
                that.orderData[0].list.forEach(function (item, index) {
                  if (item.id == id) {
                    item.refund_status = 2
                    return
                  }
                })
                that.orderData[0].list = that.orderData[0].list
              } else {
                uni.showToast({
                  title: res.data.Basis.Msg,
                  icon: 'none',
                  duration: 3000
                })
              }
            })
          } else if (res.cancel) { }
        }
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: $yoyi-page-bg-color;
}

.wrapper-user-activity {
  margin-top: 2px;
  .user-activity-list {
    margin-top: 22px;
  }
  .activity-item {
    padding: 2 * 15px 2 * 10px;
    margin-bottom: 20px;
    background: #fff;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .user-activity-empty {
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    view {
      margin: 0 auto 40px;
      width: 110px;
      height: 98px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACTCAMAAADY1ilYAAAAjVBMVEUAAADc3Nze3t7e3t7b29vb29va2tri4uLb29vc3Nzb29vb29vb29v////b29v6+vrb29vb29vb29vd3d3b29vc3Nzb29vd3d3b29vc3Nzb29vb29vb29vb29vb29vb29vc3Nzd3d3i4uLa2trc3Nzd3d3a2trg4OD////b29vd3d3b29vf39/b29va2todoMyWAAAALnRSTlMAQTYt6ffzCKt9+t7ZA1QGz+GmHqBowBWPiMO0g3fHl247DuZZSmEbAe8z8SC49stJ+QAABNFJREFUeNrs2tuSojAQBuAwJAoBBBQ8Kx7Hw8z+7/94uztWrWMFobvdLb3Y7976U2DapFv1t3S9sJ9tO7azzfqh11UvqNubGXxnZr1XW2hSarh0magX0otRL+6pVzFY4r7lQL2EtUYTvVYv4N2gmXlXTzdHu7l6sndQPPlprg0ozFo90UCDRj9zpy9BtVT/ih/2h3GnEw/7oV9fzEHXowax+OMI30Rj9/NJDLo4oQdRDQo4ioG6VYKj5ARRpBODGmaSqm+6Ghy6ywpqNZrijunI+VbS9XhBLfwcd+W++mMGnhkzqJHfQYPOn093DXhMlxnUYJSjUT5SFx64PEFQvXSKFtNUfQnBFQqC6k3QaqK+9MHVlwW5BgatzKWcZeDKZEGuAgSF+m0Lrq0oyOWD5Gv7dcDVEQW5xiAZq18suKwoyBWBJBI+S0mQyweRL/teSoJcIYhC2R6XBLn6IOrL6qUkyDUE0VD22yMJcsUgimW/45IgVwdEHdmZSBLkMuRA+fny8VVuQbSVn9Uff+MZiDL5vefx3ROAKJDfIR+vRAsQLeT38cerugciT97bePwXMtEg0Qm/TyQ+1rgqkFSCnpv4iCg/BfP7l/Ig6S4PJL1g+dXF5Vu0sr60r/7Q7YwZOhfPKIQ3XVeaoUWWiuc90q6B61Ojkf6Uz87EHRjXubnJdObOIeVts0Znjbv0mTvTlbcgW3xmuCP75M7H5e3cVuncooadp9z/Gshb4xR+AEfgKyb5mIHKrzS+0RV7jfKRDUfiLYJYG6PjYOElikc+/vrvvybJ26oaRtrYU74sCIXl6O/mQRZpAwBGR1kw3/lH1W6zD/tZfrJGR8Nq9ZYosrQXnHDDDlcNlfZQBho1dFAeVJPDamlx4xT0UkVxGNdG2uCtvprvfljcZX/s7r6H9cyihh4f2tdYGdzz4+y+sIVGC73Y1K5xiHtMyzqT8gNNqtv33g1PIDiFzvMcFWjyUR4bHuQULbaeutpHIIr26sZeo8VwxDhMucKjuhgFYAg215xkgivu6W3/AYrisgnfcrDkfzZfGoDiw1M1SsvpZq0smOyKOVq3pXKsQLVT6jiBwITbYHKW6VlGJywpIFIkvO6eXasbB81oKh4LCBXX3gaJvimc6RJE+eZ65xe/9E0MomWqrirOQGSFB6wuBcKCqBI0WDG+JsjYS0Ga8+dESQYivVGbHA/Jv8p7NwdRlrD/DPZOaB/SWos/2zWDVYVhIIoOmBieeVVBilAUsURpFeb/P0/o2sW9OK68Zx3KmcXkTpg29jrqKlHXzT9myfQJ7tfakWVtrVT/mFqWPCZXBwNR1Z8DQBuS6Z9aTh2IW2ScPYB55LrhwORVHoGz+F6rPJnjA96cJXkIqVA5OTCb7q01D6JR/ZMLnjvrAkyGzLZ8N+P5c8a/fNx4EJsjtUU+2wU/2nsYPTV4X/Cd+hWonYvJB35jVsfIuyl5GGkys27tGNUS/BPFygNZMT9hJMtw8zQPpDHtkw2ff08eyImahQ0OcaBytn36cMu77T2QPfUyNzwfqwdSqYw0fMJOHkiiXoWGZ2n2QPLy4P2CpYciS1nKUpaylKUsZSlLWcpSlrKUpSxlKUtZylKWspSlLGUpy1+yhIm2ZJClLGUpS1nKUpbveAGppg/h2B/H+AAAAABJRU5ErkJggg==)
        0 0 no-repeat;
      background-size: 100%;
    }
    text {
      display: block;
      height: 40px;
      font-size: 28px;
      font-weight: 400;
      color: rgba(178, 178, 178, 1);
      line-height: 40px;
    }
  }
  .pay-coupon-list {
    .pay-coupon-item {
      margin-bottom: 28px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>