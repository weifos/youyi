<template>
  <view class="wrapper-user-about">
    <view class="user-about-content">
      <!-- <view class="user-about-code">
        <image />
      </view>-->
      <view class="user-about-tips">
        <jyf-parser :html="entity.context"></jyf-parser>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  components: {
  },
  data() {
    return {
      entity: {
        context: ''
      },
    }
  },
  onLoad() {
    this.api_218()
  },
  methods: {
    api_218() {
      let that = this
      api.post(api.api_218, api.getSign({
        Type: "AboutUs"
      }), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          if (res.data.Result != null) {
            that.entity = res.data.Result
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.wrapper-user-about {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .user-about-code {
    margin: 30px auto;
    width: 340px;
    height: 340px;
    image {
      width: 340px;
      height: 340px;
    }
  }
  .user-about-tips {
    height: 44px;
    font-size: 32px;
    font-weight: 500;
    color: $yoyi-text-color-basic;
    line-height: 44px;
  }
}
</style>