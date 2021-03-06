<template>
  <view class="page-select-shop">
    <view class="list list-address">
      <view class="list-item" v-for="(item,index) in storeBrands" :key="item" @click="selectBrand(index)">
        <view class="item__title">{{item.name}}</view>
        <view class="item__address text-gray text-size-sm mt10">{{item.name}}</view>
        <view class="item__icon" v-if="item.selected">
          <checkbox checked="checked" color="#FFB825" />
        </view>
      </view>
    </view>

    <operationButton buttonText="确认选择" @click="selectTo"></operationButton>
  </view>
</template>
<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import yoyiLocation from "@/components/yoyi-location";
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { operationButton, yoyiLocation },
  data() {
    return {
      curIndex: 1,
      storeBrands: []
    }
  },
  props: {},
  components: {
    yoyiLocation
  },
  onLoad() {
    let that = this
    //门店列表
    let sBrands = appG.getBrandStore()
    if (sBrands == null) {
      that.api_215()
    } else {
      that.storeBrands = sBrands
    }
  },
  methods: {
    /**
     * 选择
     */
    selectBrand(index) {
      let that = this
      this.curIndex = index
      that.storeBrands.forEach((o, i) => {
        if (i == that.curIndex) {
          o.selected = true
        } else {
          o.selected = false
        }
      })
    },
    /**
     * 确定选择
     */
    selectTo: function () {
      let that = this
      that.storeBrands.forEach((o, i) => {
        if (i == that.curIndex) {
          o.selected = true
        } else {
          o.selected = false
        }
      })
      appG.setBrandStore(that.storeBrands)

      let returl = uni.getStorageSync('returl')
      if (returl) {
        uni.removeStorage({ key: 'returl', success: function (res) { } })
        //重定向
        uni.navigateTo({ url: returl })
      } else {
        uni.reLaunch({ url: "/pages/home/index" })
      }
    },
    //加载运营品牌信息
    api_215() {
      let that = this
      api.post(api.api_215, api.getSign(), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((o, i) => {
            if (i == 0) {
              that.$set(o, "selected", true)
            } else {
              that.$set(o, "selected", false)
            }
          })
          //运营品牌写入缓存
          appG.setBrandStore(res.data.Result)
          that.storeBrands = res.data.Result
          that.name = res.data.Result.filter(item => item.selected)[0].name
        }
      })
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
