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
      <button class="btn btn-line-yellow text-sub btn-size-sm" style="margin-right:5px;" @click.prevent="openMap">导航</button>
      <button class="btn btn-line-yellow text-sub btn-size-sm" v-if="isPay || type==1" @click.stop="handleClick('button')">{{buttonText}}</button>
      <button class="btn btn-size-sm btn-line-yellow btn-round-sm text-sub ml20" v-if="!isPay && type==5" @click.stop="handleClick('goPay')">去支付</button>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  name: 'activityItem',
  data() {
    return {
      store: { id: 0 },
    }
  },
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
    }, // 门店ID
    storeId: {
      type: Number,
      default: 0
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
    },
    // 打开map地图
    // 没有在登录的时候获取自己的定位 而是点击事件 调用viewMapLocation()这个方法时获取了自己的定位 
    // 因考虑到用户拒绝获取自己的定位所以当用户再次点击后会唤起设置让用户打开定位 
    // 这里传入的三个参数分别是  要去的  经度 纬度 以及 地址信息
    openMap() {
      let that = this
      //加载门店详情、经纬度
      that.api_371()
    },
    /**
     * 加载门店详情、经纬度
     * 并且导航
     */
    api_371() {
      let that = this
      //查询最近门店
      api.post(api.api_371, api.getSign({ StoreId: that.storeId }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          appG.dialog.showToast({ title: res.data.Basis.Msg })
        } else {
          that.store = res.data.Result
          // 获取定位信息
          uni.getLocation({
            type: 'wgs84', //返回可以用于uni.openLocation的经纬度
            // 用户允许获取定位
            success: function (res) {
              console.log(res, '经纬度')
              if (res.errMsg == "getLocation:ok") {
                //转换成腾讯地图
                let tmp = appG.util.map.BMapTransqqMap(that.store.lng, that.store.lat)
                uni.openLocation({
                  // 位置名
                  name: that.store.name,
                  // 纬度
                  latitude: tmp.lat,
                  // 经度
                  longitude: tmp.lng,
                  // 传入你要去的地址信息 不填则为空
                  address: that.store.address,
                  // 缩放大小
                  scale: 18,
                  success: function () {
                    console.log('success')
                  }
                });
              }
            },
            // 用户拒绝获取定位后 再次点击触发
            fail: function (res) {
              console.log(res)
              if (res.errMsg == "getLocation:fail auth deny") {
                uni.showModal({
                  content: '检测到您没打开获取信息功能权限，是否去设置打开？',
                  confirmText: "确认",
                  cancelText: '取消',
                  success: (res) => {
                    if (res.confirm) {
                      uni.openSetting({
                        success: (res) => {
                          console.log('确定');
                        }
                      })
                    } else {
                      console.log('取消');
                      return false;
                    }
                  }
                })
              }
            }
          })

        }
      })
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