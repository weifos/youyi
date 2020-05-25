<template>
  <view class="content page-cart">
    <view class="cu-list cart-list menu-avatar">
      <view class="cu-item list-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in result" :key="item" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
        <view class="content">
          <view class="cont">
            <view class="check-bar">
              <checkbox :checked="item.checked" color="#FFB825" />
            </view>
            <view class="img-bar">
              <image :src="item.img_url" />
            </view>
            <view class="text-bar">
              <view class="ellipsis">{{item.product_name}}</view>
              <view class="side-bar">
                <text class="text-sub text-size-basic">￥{{item.product_price}}</text>
                <uni-number-box :value="item.count" :min="1" @change="api_303($event,item)" class="number-box-skin-1"></uni-number-box>
              </view>
            </view>
          </view>
        </view>
        <view class="move" @click="api_304(item)">
          <view class="btn-del">删除</view>
        </view>
      </view>
    </view>
    <view class="operation-bar">
      <view class="text-bar align-center">
        <view class="dib text-size-md">
          <checkbox :checked="checked" color="#FFB825" />
          <text class="dib vam">全选</text>
        </view>
        <view class="dib text-size-basic">
          合计：¥
          <text class="bold text-size-md">5.8元</text>
        </view>
      </view>
      <view class="btns-bar">
        <button class="btn text-size-basic text-white bg-sub">去结算</button>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import { uniNumberBox } from "@dcloudio/uni-ui";
export default {
  components: {
    uniNumberBox
  },
  data() {
    return {
      modalName: null,
      listTouchStart: 0,
      listTouchDirection: null,
      //对应的门店信息
      store_id: 0,
      //订单信息
      order: {
        store_id: 0,
        remarks: '',
        details: []
      },
      //购物车列表
      result: [],
      //总计
      totalPrice: 0
    }
  },
  onLoad(opt) {
    this.api_302()
  },
  methods: {
    //加载购物车
    api_302() {
      let that = this
      api.post(api.api_302, api.getSign(), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((ele, index) => {
            that.$set(ele, "checked", false)
          })
          that.checkUpdate()
          that.result = res.data.Result
        } else {
          uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
    },
    //更新购物车
    api_303(num, item) {
      let that = this
      api.post(api.api_303,
        api.getSign({ CID: item.id, Count: num, ProductID: item.product_id, SpecSet: item.specset }), (vue, res) => {
          console.log(res)
        }
      )
    },
    //删除购物车
    api_304(item) {
      let that = this
      uni.showModal({
        title: '提示',
        content: '确认删除吗',
        success: function (res) {
          if (res.confirm) {
            //请求接口删除
            api.post(api.api_304, api.getSign({ Id: item.id }),
              function (wx, res) {
                if (res.data.Basis.State == api.state.state_200) {
                  that.result.forEach((ele, index) => {
                    if (ele.id === item.id) {
                      that.result.shift(index, 1);
                    }
                  })
                  that.result = that.result
                  that.checkUpdate()
                  uni.showToast({ title: "删除成功", duration: 2000 })
                } else {
                  uni.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
                }
              }
            )
          } else if (res.cancel) { }
        }
      })
    },
    //勾选改变更新小计
    checkUpdate(ele) {
      let that = this
      //总计临时变量
      let total = 0
      this.result.map((item, index) => {
        //更新修改
        if (ele != null && ele != undefined && item.specset == ele.specset && item.product_id == ele.product_id) {
          item = ele
        }
        //当前小计 
        item.subtotal = item.product_price * item.count
        //更新购物车
        that.result[index] = item
        //总计
        total += item.subtotal
      })
      that.totalPrice = total
      //更新购物车信息
      user.methods.setShoppingCart(that.result)
    },
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.listTouchStart = e.touches[0].pageX;
    },
    // ListTouch计算方向
    ListTouchMove(e) {
      this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? "right" : "left";
    },
    // ListTouch计算滚动
    ListTouchEnd(e) {
      //console.log(this.listTouchDirection,e.currentTarget.dataset.target)
      if (this.listTouchDirection == "left") {
        console.log("aaa", e.currentTarget.dataset.target);
        this.modalName = e.currentTarget.dataset.target;
      } else {
        this.modalName = null;
      }
      //this.listTouchDirection = null;
    }
  }
};
</script>

<style lang="scss">
.page-cart {
  padding-bottom: 2 * 48px;
  .cont {
    display: flex;
    align-items: center;
    height: 2 * 80px;
    justify-content: space-around;
  }
  .cart-list {
    .img-bar {
      image {
        width: 2 * 80px;
        height: 2 * 80px;
      }
    }
    .check-bar {
      padding-left: 20px;
    }
    .text-bar {
      width: 2 * 211px;
      padding-right: 10px;
    }
    .side-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2 * 35px;
    }
    .list-item {
      padding: 2 * 10px 0;
    }
  }
}
.operation-bar {
  background-color: #fff;
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 2 * 48px;
  box-shadow: 0 -1px 0 #ededed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  bottom: 0;

  .text-bar {
    flex: 1;
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
  }
  checkbox {
    margin-right: 20px;
  }
  .btn {
    height: 2 * 48px;
    width: 2 * 140px;
  }
}
///////
.btn-del {
  background-color: #ffb825;
  color: #fff;
}

.cu-list + .cu-list {
  margin-top: 30rpx;
}

.cu-list > .cu-item {
  transition: all 0.6s ease-in-out 0s;
  transform: translateX(0rpx);
}

.cu-list > .cu-item.move-cur {
  transform: translateX(-100rpx);
}

.cu-list > .cu-item .move {
  position: absolute;
  right: 0;
  display: flex;
  width: 100rpx;
  height: 100%;
  transform: translateX(100%);
  top: 0;
}

.cu-list > .cu-item .move view {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>