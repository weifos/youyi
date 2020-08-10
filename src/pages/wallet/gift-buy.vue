<template>
  <view class="wrapper-wallet-gift-buy">
    <view class="wallet-gift-buy-tab">
      <sun-tab :value.sync="tabIndex" activeColor="#0056B2" :tabList="tabList"></sun-tab>
    </view>
    <view class="wallet-gift-buy-content wallet-gift-buy-content-1" v-show="tabIndex == 0">
      <yoyiTitle title="选择卡面"></yoyiTitle>
      <view class="gift-buy-swiper">
        <swiper class="swiper" next-margin="30rpx" :indicator-dots="true" @change="swiperChange">
          <swiper-item v-for="(value,key) in settings.banners" :key="key" @click="swiperItemClick(`${value}`)">
            <view class="swiper-item" :class="{'swiper-item-selected':selectedSwiper==value}">
              <image :src="value" />
              <view class="swiper-item-icon"></view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <yoyiTitle title="选择充值金额" more="使用须知" url="/pages/wallet/notice"></yoyiTitle>
      <view class="money-list">
        <view class="money-item" v-for="(item, index) in settings.items" :key="index">
          <moneyItem :price="item.amount" :present="'赠'+item.give_amount" :selected="index == selected" @click="selectMoney(`${index}`)"></moneyItem>
        </view>
      </view>
      <operationButton :price="selectedItem.amount" @click="api_350"></operationButton>
    </view>
    <view class="wallet-gift-buy-content wallet-gift-buy-content-2" v-show="tabIndex == 1">
      <view class="wallet-gift-card-list">
        <view class="gift-card-item" v-for="(item, index) in cardList" :key="index">
          <giftCardItem :price="item.amount" :image="item.img_url" :number="'NO.'+item.serial_no" :date="item.created_date" :showUseButton="!item.is_used" :sendStatus="item.send_status" @use="api_353(item)" @send="sendGiftCard(item)"></giftCardItem>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import sunTab from '@/components/sun-tab/sun-tab.vue'
import yoyiTitle from '@/components/yoyi-title/'
import moneyItem from '@/components/yoyi-money-item/'
import giftCardItem from '@/components/yoyi-gift-card-item/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  data() {
    return {
      tabIndex: 0,
      tabList: ['购卡', '卡包'],
      selectedSwiper: '',
      selected: -1,
      selectedItem: {
        amount: 0
      },
      //每页大小
      pageSize: 6,
      //当前类别索引
      pageIndex: 0,
      loading: false,
      loadComplete: false,
      totalPage: 0,
      //项目配置
      settings: {
        banners: [],
        items: []
      },
      cardList: []
    }
  },
  components: { sunTab, yoyiTitle, moneyItem, giftCardItem, operationButton },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    if (opt.tab == 1) {
      that.tabIndex = 1
    }

    //查看收到的礼品卡
    if (opt.count > 0) {
      uni.navigateTo({ url: 'gift-accept' })
    } else {
      this.api_349()
      this.api_352()
    }
  },
  methods: {
    swiperChange(event) {
      console.log(event.detail)
    },
    /**
     * 选择礼品卡封面
     */
    swiperItemClick(value) {
      this.selectedSwiper = value
    },
    /**
     * 选择礼品卡金额
     */
    selectMoney(value) {
      this.selected = value
      let item = this.settings.items[value]
      if (item != null) {
        this.selectedItem = item
      }
    },
    /**
     * 使用礼品卡
     */
    useGiftCard(value) {
      console.log('use', value)
    },
    /**
     * 赠送礼品卡
     */
    sendGiftCard(item) {
      uni.navigateTo({
        url: `/pages/wallet/gift-send?no=` + item.serial_no,
        //url: `/pages/wallet/gift-accept?no=` + item.serial_no,
      })
    },
    /**
     * 礼品卡配置
     */
    api_349: function () {
      let that = this
      api.post(api.api_349, api.getSign({}),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.settings = res.data.Result
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 购买礼品卡
     */
    api_350: function () {
      let that = this
      if (!that.selectedSwiper.length) {
        appG.dialog.showToast({ title: '请选择礼品卡封面', icon: 'none', duration: 3000 })
        return
      }

      if (that.selectedItem.amount == 0) {
        appG.dialog.showToast({ title: '请选择礼品卡金额', icon: 'none', duration: 3000 })
        return
      }

      uni.getProvider({
        service: 'payment', success: (res) => {
          let provider = res.provider[0]
          //微信支付
          if (~res.provider.indexOf('wxpay')) {
            api.post(api.api_350, api.getSign({
              rece_amount: that.selectedItem.amount,
              actual_amount: that.selectedItem.amount,
              total_amount: parseInt(that.selectedItem.amount) + parseInt(that.selectedItem.give_amount),
              remarks: that.selectedSwiper
            }), function (app, res) {
              if (res.data.Basis.State == api.state.state_200) {
                //通过uni-app吊起支付
                uni.requestPayment({
                  provider: provider,
                  appId: res.data.Result.wechatpay.appId,
                  timeStamp: res.data.Result.wechatpay.timeStamp,
                  nonceStr: res.data.Result.wechatpay.nonceStr,
                  package: res.data.Result.wechatpay.package,
                  signType: res.data.Result.wechatpay.signType,
                  paySign: res.data.Result.wechatpay.paySign,
                  success: function (res1) {
                    //购卡成功
                    that.api_351(res.data.Result.user_give_card.serial_no)
                  },
                  fail: function (err) {
                    setTimeout(() => { that.isPaying = false }, 500)
                  },
                  complete: () => {
                    setTimeout(() => { that.isPaying = false }, 500)
                  }
                })

              } else {
                appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
              }
            })

          }
        }
      })

    },
    /**
     * 购买礼品卡成功
     */
    api_351: function (card_no) {
      let that = this
      api.post(api.api_351, api.getSign({ CardNo: card_no }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.tabIndex = 1
            that.loadComplete = false
            that.cardList = []
            that.api_352()
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 我的礼品卡包
     */
    api_352: function () {
      let that = this
      if (!that.loading && !that.loadComplete) {
        that.loading = true
        api.post(api.api_352, api.getSign({ Size: that.pageSize, Index: that.pageIndex }), function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.pageIndex++
            that.loading = false
            that.loadComplete = false
            that.totalPage = parseInt(res.data.Result.totalRow / that.pageSize) + (res.data.Result.totalRow % that.pageSize == 0 ? 0 : 1)

            //达到总页数
            if (that.pageIndex >= that.totalPage) {
              that.loadComplete = true
            }

            res.data.Result.give_card_list.forEach(function (item, index) {
              that.cardList.push(item)
            })

          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
      }

    },
    /**
     * 使用礼品卡
     */
    api_353: function (item) {
      let that = this
      uni.showModal({
        title: '提示',
        content: '确认使用吗',
        success: function (res) {
          if (res.confirm) {
            //确认删除吗
            api.post(api.api_353, api.getSign({ CardNo: item.serial_no }),
              function (app, res) {
                if (res.data.Basis.State == api.state.state_200) {
                  that.cardList.forEach((ele, index) => {
                    if (ele.id == item.id) {
                      ele.is_used = true
                    }
                  })

                  let wxUser = user.methods.getUser()
                  wxUser.balance += item.amount
                  user.methods.login(wxUser)
                } else {
                  appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
                }
              })
          } else if (res.cancel) { }
        }
      })
    }
  }
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