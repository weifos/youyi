<template>
  <view class="container page-member-ticket">
    <view class="title-1">
      <text>入场券</text>
    </view>
    <view class="ticket-list tac">
      <view class="ticket__item dib" v-for="item in result">
        <ticketItem :ticketInfo="item" :type="'into'" style="margin-left:20rpx;" @useClick="useClick(item)"></ticketItem>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import ticketItem from '@/components/yoyi-ticket/'

export default {
  data() {
    return {
      type: 0,
      result: []
    }
  },
  components: { ticketItem },
  onLoad(opt) {
    this.api_329(opt.id)
  },
  methods: {
    /**
     * 加载订单票据
     */
    api_329(id) {
      let that = this
      //请求接口数据
      api.post(api.api_329, api.getSign({
        ID: id
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          uni.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        } else {
          //课程信息
          let course = res.data.Result.orderCourse
          res.data.Result.tickets.forEach(function (o, i) {
            that.result.push({
              id: o.id,
              name: course.course_name,
              is_used: o.is_used,
              startTime: appG.util.date.dateFormat(course.start_date, 'yyyy-MM-dd hh:mm'),
              endTime: appG.util.date.dateFormat(course.end_date, 'yyyy-MM-dd hh:mm')
            })
          })
        }
      })
    },
    /**
     * 使用点击
     */
    useClick(item) {
      uni.navigateTo({ url: `activity-ticket-details?id=${item.id}` })
    }
  }
}
</script>


<style lang="scss">
.tac {
  text-align: center;
}
.title-1 {
  padding-top: 69rpx;
  text-align: center;
}
.title-1 text {
  font-size: 33rpx;
  color: #b2b2b2;

  height: 45rpx;
  line-height: 45rpx;
  position: relative;
}
.title-1 text:before,
.title-1 text:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 92rpx;
  height: 2rpx;
  background-color: #b2b2b2;
}
.title-1 text:before {
  left: -135rpx;
}
.title-1 text:after {
  right: -135rpx;
}
.container {
  padding-bottom: 141rpx;
}
</style>