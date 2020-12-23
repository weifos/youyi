<template>
  <view class="wrapper-activity-item" @click="handleClick('item')">
    <view class="hidden">
      <view class="item-img fl">
        <image :src="src" />
      </view>
      <view class="item-info">
        <view class="item-title ellipsis2 text-size-basic">{{title}}</view>
        <!-- <view class="item-guest text-gray text-size-sm mt10">嘉宾：{{guest}}</view> -->
        <view class="item-bar flex text-size-sm mt10">
          <text class="text-gray">嘉宾：{{guest}}</text>
          <text class="text-gray item-address">&nbsp;</text>
          <text class="text-gray">{{address}}</text>
        </view>
        <view class="item-bar flex text-size-sm mt10">
          <text class="text-gray">{{time}}</text>
          <text class="text-gray item-address">&nbsp;</text>
          <text class="text-sub" v-if="status == 1 || status == 4">&yen;{{price}}</text>
        </view>
      </view>
    </view>
    <view class="item-btns mt10 align-right">
      <button class="btn btn-line-yellow text-sub btn-size-sm" v-if="isPay || type==1" @click.stop="handleClick('button')">{{buttonText}}</button>
      <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20" v-if="!isPay && type==5" @click.stop="handleClick('goPay')">去支付</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'activityItem',
  props: {
    src: {
      type: [String],
      default: require('@/static/images/wallet-recharge-card.png'),
    }, // 海报
    title: {
      type: String,
      default: '',
    }, // 名称
    guest: {
      type: String,
      default: '',
    }, // 嘉宾
    time: {
      type: String,
      default: '',
    }, // 日期
    address: {
      type: String,
      default: '',
    }, // 地址
    price: {
      type: [String, Number],
      default: '',
    }, // 价格
    status: {
      type: [Number, String],
      default: 1,
    }, // 是否支付
    isPay: {
      type: Boolean,
      default: false
    }, // 课程、活动
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    buttonText() {
      let text = ''
      switch (parseInt(this.status)) {
        case 1:
          text = '去报名'
          break;
        case 2:
          text = '票券'
          break;
        case 3:
          text = '查看'
          break;
        case 4:
          text = '查看'
          break;
      }
      return text
    }
  },
  methods: {
    handleClick(value) {
      switch (value) {
        case 'item':
          this.$emit('click')
          break;
        case 'button':
          this.$emit('buttonClick')
          break;
        case 'goPay':
          this.$emit('goPay')
          break;
      }
    },
    goPay() {
      console.log(goPay)
    }
  },
}
</script>

<style scoped lang="scss">
.wrapper-activity-item {
  .item-img {
    margin-right: 2 * 10px;
  }
  .item-img image {
    // width: 2 * 136px;
    max-width: 2 * 86px;
    max-height: 2 * 86px;
  }
  .item-title {
    height: 2 * 42px;
  }
  .item-address {
    flex: 1;
    text-align: center;
  }
  .item-btns .btn {
    border-radius: 8px;
    height: 2 * 24px;
  }
}
</style>