<template>
  <view class="page-mine-order">
    <!-- activeColor="#0056B2" -->
    <sun-tab :value.sync="index" activeColor="#80A999" :tabList="tabList" :rangeKey="'title'" @change="change"></sun-tab>
    <view class="tab-content">
      <view class="tab-c" v-if="index == 0">
        <view v-if="tabList[0].list.length >0">
          <yoyiOrderItem :item="item" v-for="item in tabList[0].list" :key="item"></yoyiOrderItem>
        </view>
        <view class="order-no-data" v-else>
          <view class="icon-cart2 dib"></view>
          <view class="mt20">
            还没有购买记录哦
            <br />快去下单吧~
          </view>
        </view>
      </view>
      <view class="tab-c" v-if="index == 1">
        <yoyiOrderItem :item="item" v-for="item in tabList[1].list" :key="item" v-if="tabList[1].list.length >0"></yoyiOrderItem>
      </view>
      <view class="tab-c" v-if="index == 2">
        <yoyiOrderItem :item="item" v-for="item in tabList[2].list" :key="item" v-if="tabList[2].list.length >0"></yoyiOrderItem>
      </view>
      <view class="tab-c" v-if="index == 3">
        <yoyiOrderItem :item="item" v-for="item in tabList[3].list" :key="item" v-if="tabList[3].list.length >0"></yoyiOrderItem>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import sunTab from '@/components/sun-tab/sun-tab.vue'
import yoyiOrderItem from '@/components/yoyi-order-item/index.vue'
export default {
  data() {
    return {
      index: 0,
      //每页大小
      pageSize: 5,
      tabList: [{
        title: "全部",
        loading: false,
        loadComplete: false,
        pageIndex: 0,
        list: []
      },
      {
        title: "待付款",
        loading: false,
        pageIndex: 0,
        list: []
      },
      {
        title: "待收货",
        loading: false,
        pageIndex: 0,
        list: []
      },
      {
        title: "退款/售后",
        loading: false,
        pageIndex: 0,
        list: []
      }]
    }
  },
  components: {
    sunTab,
    yoyiOrderItem
  },
  onLoad() {
    this.api_318()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    uni.switchTab({
      url: "../home/userIndex"
    })
  },
  methods: {
    /**
     * 加载订单数据
     */
    api_318() {
      let that = this
      //付款状态
      let isPay = 0
      //当前选中索引
      let index = this.index
      //当前选中项
      let curItem = this.tabList[index]
      //是否加载中
      let loading = curItem.loading
      //是否加载完成
      let loadComplete = curItem.loadComplete
      //退款
      let refundStatus = 0

      if (index == 0) {
        isPay = -1
      } else if (index == 1) {
        isPay = 0
      } else if (index == 2) {
        isPay = 1
      }

      //是否加载中，是否加载完成
      if (!curItem.loading && !curItem.loadComplete) {
        //请求接口数据
        api.post(api.api_318, api.getSign({
          IsPay: isPay,
          Size: that.pageSize,
          Index: curItem.pageIndex
        }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          } else {
            curItem.loading = false
            curItem.pageIndex = curItem.pageIndex + 1
            res.data.Result.orders.forEach(function (o, i) {
              curItem.list.push(o)
            })

            that.tabList[index] = curItem

            //是否全部加载完毕
            if (res.data.Result.orders.length == 0) {
              curItem.loadComplete = true
              that.tabList[index] = curItem
              uni.showToast({ title: '加载完成', icon: 'success', duration: 3000 })
            }

          }
        })
      }
    },
    /**
     * 加载退货订单数据
     */
    api_305() {
      let that = this
      //当前选中索引
      let index = this.index
      //当前选中项
      let curItem = this.tabList[index]
      //是否加载中
      let loading = curItem.loading
      //是否加载完成
      let loadComplete = curItem.loadComplete
      //是否加载中，是否加载完成
      if (!curItem.loading && !curItem.loadComplete) {
        //请求接口数据
        api.post(api.api_305, api.getSign({ Size: that.pageSize, Index: curItem.pageIndex }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          } else {
            curItem.loading = false
            curItem.pageIndex = curItem.pageIndex + 1
            res.data.Result.orders.forEach(function (o, i) {
              curItem.list.push(o)
            })

            that.tabList[index] = curItem

            //是否全部加载完毕
            if (res.data.Result.orders.length == 0) {
              curItem.loadComplete = true
              that.tabList[index] = curItem
              uni.showToast({ title: '加载完成', icon: 'success', duration: 3000 })
            }
          }
        })
      }
    },
    /**
     * tab切换事件
     */
    change(e) {
      //订单数据
      if (this.index == 0 || this.index == 1 || this.index == 2) {
        this.api_318()
        //退货单数据
      } else if (this.index == 3) {
        this.api_305()
      }

    }
  }
}
</script>

<style lang="scss">
page {
  background-color: $yoyi-bg-color-grey;
}
.order-no-data {
  text-align: center;
  padding-top: 40%;
  color: #b2b2b2;
  font-size: $uni-font-size-base;
  line-height: 1.5;
}
.page-mine-order {
  .tab-c {
    padding: 20px;
  }
}
</style>