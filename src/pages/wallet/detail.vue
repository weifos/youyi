<template>
  <view class="wrapper-wallet-detail">
    <view class="top-bar">
      <sun-tab :value.sync="index" :rangeKey="'title'" activeColor="#0056B2" :tabList="tabList" @change="tabClick"></sun-tab>
    </view>
    <scroll-view scroll-y="true" class="wallet-detail-list" v-show="index == 0" @scroll="scroll">
      <view class="wallet-detail-item" v-for="(item, index) in tabList[index].list" :key="index">
        <moneyDetailItem :name="item.content" :date="item.created_date" :price="item.trade_type == -1?-item.amount:item.amount"></moneyDetailItem>
      </view>
    </scroll-view>
    <scroll-view scroll-y="true" class="wallet-detail-list" v-show="index == 1" @scroll="scroll">
      <view class="wallet-detail-item" v-for="(item, index) in tabList[index].list" :key="index">
        <moneyDetailItem :name="item.content" :date="item.created_date" :price="-item.amount"></moneyDetailItem>
      </view>
    </scroll-view>
    <scroll-view scroll-y="true" class="wallet-detail-list" v-show="index == 2" @scroll="scroll">
      <view class="wallet-detail-item" v-for="(item, index) in tabList[index].list" :key="index">
        <moneyDetailItem :name="item.content" :date="item.created_date" :price="item.amount"></moneyDetailItem>
      </view>
    </scroll-view>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import sunTab from '@/components/sun-tab/sun-tab.vue'
import moneyDetailItem from '@/components/yoyi-money-detail-item/'

export default {
  data() {
    return {
      index: 0,
      pageSize: 15,
      scrollTop: 0,
      tabList: [
        {
          title: '全部',
          pageIndex: 0,
          loading: false,
          loadComplete: false,
          list: []
        }, {
          title: '支出',
          pageIndex: 0,
          loading: false,
          loadComplete: false,
          list: []
        }, {
          title: '收入',
          pageIndex: 0,
          loading: false,
          loadComplete: false,
          list: []
        }]
    }
  },
  components: { sunTab, moneyDetailItem },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (opt) {
    //加载充值项目
    this.api_333()
  },
  methods: {
    /**
    * Tab点击
    */
    tabClick: function () {
      this.api_333()
    },
    /**
    * 加载交易列表
    */
    api_333: function () {
      let that = this
      let tradeType = 0
      if (that.index == 1) {
        tradeType = -1
      } else if (that.index == 2) {
        tradeType = 1
      }

      //是否加载中，是否加载完成
      if (!that.tabList[that.index].loading && !that.tabList[that.index].loadComplete) {
        that.tabList[that.index].loading = true
        //请求接口数据
        api.post(api.api_333, api.getSign({
          tradeType: tradeType,
          Size: that.pageSize,
          Index: that.tabList[that.index].pageIndex
        }), function (app, res) {
          if (res.data.Basis.State != api.state.state_200) {
            uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          } else {
            that.tabList[that.index].loading = false
            that.tabList[that.index].pageIndex = that.tabList[that.index].pageIndex + 1
            //总页数
            that.tabList[that.index].totalPage = parseInt(res.data.Result.totalRow / that.pageSize) + (res.data.Result.totalRow % that.pageSize == 0 ? 0 : 1)

            //达到总页数
            if (that.tabList[that.index].pageIndex >= that.tabList[that.index].totalPage) {
              that.tabList[that.index].loadComplete = true
              appG.dialog.showToast({ title: '加载完成', icon: 'success', duration: 3000 })
            }

            res.data.Result.list.forEach(function (o, i) {
              that.tabList[that.index].list.push(o)
            })

          }
        })
      }

    },
    /**
    * 局部上拉滚动
    */
    scroll(e) {
      let that = this
      console.log(e.detail.scrollHeight - e.detail.scrollTop)
      //下拉
      if (e.detail.scrollTop > 0 && e.detail.scrollTop - that.scrollTop > 0 && (e.detail.scrollHeight - e.detail.scrollTop) < 700) {
        that.api_333()
        //console.log(e.detail.scrollHeight - e.detail.scrollTop)
      }

      //记录上次滚动位置
      that.scrollTop = e.detail.scrollTop
    }

  }
}
</script>

<style lang="scss">
.wrapper-wallet-detail {
  position: fixed;
  width: 100%;
  height: 100%;
  .top-bar {
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 2 * 44px;
    left: 0;
    top: 0;
  }
  .wallet-detail-list {
    width: 670px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 2 * 44px 0 0 0;
    overflow-y: auto;
    flex: 1;
    height: 100%;
    position: relative;
    overflow-y: hidden;
  }
}
</style>