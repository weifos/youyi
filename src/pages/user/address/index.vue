<template>
  <view class="wrapper-user-address">
    <view class="user-address-content">
      <view class="btn-add-address" @click="addAddress">新增收货地址</view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  data() {
    return {
      title: '收货地址'
    }
  },
  onLoad() {
    //this.api_200()
  },
  methods: {
    api_200() {
      let that = this
      api.post(api.api_200, api.getSign(), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.banners = res.data.Result.banners
          that.banners0 = res.data.Result.banners0
        }
      })
    },
    /**
     * 新增收货地址
     */
    addAddress(item) {
      uni.navigateTo({
        url: 'form'
      })

    }
  }
}
</script>
<style lang="scss">
.wrapper-user-address {
  background-color: #f1f1f1;
  width: 100%;
  min-height: 100%;
  padding: 10px * 2;
  box-sizing: border-box;

  .user-address-content {
    padding: 26px * 2 15px * 2;
    background-color: #fff;
  }
  .btn-add-address {
    width: 100%;
    height: 48px * 2;
    color: #fff;
    line-height: 48px * 2;
    font-size: 18px * 2;
    text-align: center;
    background-color: #ffb825;
  }
}
</style>