<template>
  <view class="page-select-shop">
    <yoyiLocation v-on:updateSelect="selectByCity"></yoyiLocation>
    <view class="list list-address">
      <view class="list-item" v-for="(item,index) in stores" :key="item" @click="selectAddress(index)">
        <view class="item__title">{{item.name}}</view>
        <view class="item__address text-gray text-size-sm mt10">{{item.province+item.city+item.area+item.address}}</view>
        <view class="item__icon" v-if="index == curIndex">
          <checkbox checked="checked" color="#FFB825" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import yoyiLocation from "@/components/yoyi-location";
export default {
  data() {
    return {
      curIndex: 1,
      stores: []
    }
  },
  props: {

  },
  components: {
    yoyiLocation
  },
  onLoad() {
    this.api_208()
  },
  methods: {
    selectAddress(index) {
      this.curIndex = index
    },
    /**
     * 加载门店列表
     */
    api_208: function () {
      var that = this
      api.post(api.api_208, api.getSign(), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((obj, i) => {
            that.$set(obj, "checked", false)
          })
          that.stores = res.data.Result
        } else {
          uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        }
      })
    },
    /**
     * 根据城市筛选门店
     */
    selectByCity: function (text) {
      console.log(text)
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
