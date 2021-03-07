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
        Type: "MSAgreement"
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
</style>