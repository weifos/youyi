<template>
  <view class="page-select-shop">
    <!-- <yoyiLocation v-on:updateSelect="selectByCity"></yoyiLocation> -->
    <view class="list list-address">
      <view class="list-item" v-for="(item,index) in stores" :key="item" @click="selectAddress(index)">
        <view class="item__title">{{item.name}}</view>
        <view class="item__address text-gray text-size-sm mt10">{{item.province+item.city+item.area+item.address}}</view>
        <view class="item__icon" v-if="item.id == aty_store.id">
          <checkbox checked="checked" color="#FFB825" />
        </view>
      </view>
    </view>

    <operationButton buttonText="确认选择" @click="selectByCity"></operationButton>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import yoyiLocation from "@/components/yoyi-location";
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { operationButton, yoyiLocation },
  data() {
    return {
      curIndex: 1,
      aty_store: { id: 0 },
      stores: []
    }
  },
  props: {

  },
  components: {
    yoyiLocation
  },
  onLoad() {
    let that = this
    //门店列表
    that.stores = user.methods.getStores()
    //已选门店
    that.aty_store = user.methods.getAtyStore()
    //如果没有加载过门店列表
    if (that.stores == null || that.stores.length == 0) {
      that.api_208()
    }
  },
  methods: {
    selectAddress(index) {
      let that = this
      this.curIndex = index
      that.aty_store = that.stores[index]
    },
    /**
     * 加载门店列表
     */
    api_208: function () {
      var that = this
      api.post(api.api_208, api.getSign(), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((obj, i) => {
            let store = user.methods.getAtyStore()
            debugger
            if (store != null && store.id == obj.id) {
              that.$set(obj, "checked", true)
            } else {
              that.$set(obj, "checked", false)
            }
          })

          that.stores = res.data.Result
          user.methods.setStores(that.stores)
          //默认第一个为活动门店
          user.methods.setAtyStore(that.stores[0])
        } else {
          uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        }
      })
    },
    /**
     * 根据城市筛选门店
     */
    selectByCity: function () {
      let store = this.stores[this.curIndex]
      //将选中的门店写入缓存
      user.methods.setAtyStore(store)
      //uni.navigateTo({ url: '../home/activityIndex' })
      uni.reLaunch({ url: "/pages/home/activityIndex" })
    }
  }
}
</script>

<style lang="scss">
.list-address {
  .list-item {
    padding: 2 * 20px 2 * 40px 2 * 20px 2 * 20px;
    border-bottom: 1px solid $yoyi-border-color;
    position: relative;
  }
  .item__icon {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
