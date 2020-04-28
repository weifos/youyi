<template>
  <view class="wrapper-wallet-gift-buy">
    <view class="wallet-gift-buy-tab">
      <sun-tab :value.sync="index" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    </view>
    <view class="wallet-gift-buy-content wallet-gift-buy-content-1" v-show="index == 0">
      <yoyiTitle title="选择卡面"></yoyiTitle>
      <view class="gift-buy-swiper">
        <swiper class="swiper" next-margin="30rpx" :indicator-dots="true" @change="swiperChange">
          <swiper-item v-for="(value,key) in [1,2,3,4,5]" :key="key" @click="swiperItemClick(`${value}`)">
            <view class="swiper-item" :class="{'swiper-item-selected':selectedSwiper==value}">
              <image :src="require('@/static/images/wallet-recharge-card.png')" />
              <view class="swiper-item-icon"></view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <yoyiTitle title="选择充值金额" more="使用须知" url="/pages/wallet/notice"></yoyiTitle>
      <view class="money-list">
        <view class="money-item" v-for="(value, key) in [1,2,3,4,5,6]" :key="key">
          <moneyItem :price="100*value" :present="60*(value%2)" :selected="value == selected" @click="selectMoney(`${value}`)"></moneyItem>
        </view>
      </view>
      <operationButton :price="100"></operationButton>
    </view>
    <view class="wallet-gift-buy-content wallet-gift-buy-content-2" v-show="index == 1">
      <view class="wallet-gift-card-list">
        <view class="gift-card-item" v-for="(value, key) in [1,2,3,4,5]" :key="key">
          <giftCardItem :price="100*key" :image="require('@/static/images/wallet-recharge-card.png')" number="NO.12345678908765423" :date="`2019-0${key+1}-29 11:13:06`" :showSendButton="key%2==0" @use="useGiftCard(key)" @send="sendGiftCard(key)"></giftCardItem>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import sunTab from '@/components/sun-tab/sun-tab.vue'
import yoyiTitle from '@/components/yoyi-title/'
import moneyItem from '@/components/yoyi-money-item/'
import giftCardItem from '@/components/yoyi-gift-card-item/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  data() {
    return {
      index: 0,
      tabList: ['购卡', '卡包'],
      selectedSwiper: 1,
      selected: 1,
    }
  },
  components: { sunTab, yoyiTitle, moneyItem, giftCardItem, operationButton },
  methods: {
    swiperChange(event) {
      console.log(event.detail)
    },
    swiperItemClick(value) {
      this.selectedSwiper = value
    },
    selectMoney(value) {
      this.selected = value
    },
    useGiftCard(value) {
      console.log('use', value)
    },
    sendGiftCard(value) {
      console.log('send', value)
      uni.navigateTo({
        url: `/pages/wallet/gift-send?id=1`,
      })
    },
  },
}
</script>

<style lang="scss">
.wrapper-wallet-gift-buy {
  .wallet-gift-buy-tab {
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 2;
  }
  .wallet-gift-buy-content {
    padding-top: 65px;
  }
  .wallet-gift-buy-content-2 {
    background: $yoyi-page-bg-color;
  }
  .gift-buy-swiper {
  }
  .swiper {
    position: relative;
    width: 646px;
    height: 330px;
    margin: 0 auto;
    .swiper-item {
      position: relative;
      width: 560px !important;
      height: 294px !important;
      border-radius: 24px;
      border: 4px solid #fff;
      background: $yoyi-button-color;
      image {
        width: 560px !important;
        height: 294px !important;
      }
      .swiper-item-icon {
        display: none;
        position: absolute;
        right: -4px;
        top: -4px;
        background: url(data:image/png;base64,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)
          0 0 no-repeat;
        width: 94px;
        height: 82px;
        background-size: contain;
      }
    }
    .swiper-item-selected {
      border-color: $yoyi-button-color;
      .swiper-item-icon {
        display: block;
      }
    }
  }
  .swiper .wx-swiper-dots.wx-swiper-dots-horizontal,
  .swiper .uni-swiper-dots.uni-swiper-dots-horizontal {
    position: absolute;
    bottom: 0px;
    left: 0;
    transform: translate(0);
  }
  .swiper .wx-swiper-dot,
  .swiper .uni-swiper-dot {
    width: 32px;
    height: 8px;
    display: inline-flex;
    margin-left: 6px;
    justify-content: space-between;
  }
  .swiper .wx-swiper-dot::before,
  .swiper .uni-swiper-dot::before {
    content: "";
    flex-grow: 1;
    background: $yoyi-border-color;
  }
  .swiper .wx-swiper-dot-active::before,
  .swiper .uni-swiper-dot-active::before {
    background: $yoyi-text-color-grey;
  }
  .money-list {
    position: relative;
    overflow: hidden;
    width: 682px;
    margin: 0 auto;
    .money-item {
      float: left;
      margin: 0 16px 16px 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .wallet-gift-card-list {
    width: 710px;
    margin: 0 auto;
    .gift-card-item {
      margin-top: 20px;
    }
  }
}
</style>