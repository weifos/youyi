<template>
  <view class="content page-cart">
    <view class="cu-list cart-list menu-avatar">
      <view class="cu-item list-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in result" :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
        <view class="content">
          <view class="cont">
            <view class="check-bar">
              <checkbox :checked="item.checked" color="#FFB825" @click="selectedChange(item)" />
            </view>
            <view class="img-bar">
              <image :src="item.img_url" />
            </view>
            <view class="text-bar">
              <view class="ellipsis">{{item.product_name}}</view>
              <view class="side-bar">
                <text class="text-sub text-size-basic">￥{{item.unit_price}}</text>
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
          <checkbox :checked="checked" @click="checkedAll($event)" color="#FFB825" />
          <text class="dib vam">全选</text>
        </view>
        <view class="dib text-size-basic">
          合计：¥
          <text class="bold text-size-md">{{totalPrice.toFixed(2)}}元</text>
        </view>
      </view>
      <view class="btns-bar">
        <button class="btn text-size-basic text-white bg-sub" @click="submit">去结算</button>
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
  components: { uniNumberBox },
  data() {
    return {
      modalName: null,
      listTouchStart: 0,
      listTouchDirection: null,
      checked: false,
      //运营品牌
      storeBrand: null,
      loading: false,
      //购物车列表
      result: [],
      //总计
      totalPrice: 0
    }
  },
  onLoad(opt) {
    //运营品牌
    this.storeBrand = appG.getCurBrandStore()
    this.api_302()
  },
  methods: {
    //加载购物车
    api_302() {
      let that = this
      api.post(api.api_302, api.getSign({ StoreId: that.storeBrand.id }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((ele, index) => {
            that.$set(ele, "checked", false)
          })
          that.checkUpdate()
          that.result = res.data.Result
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
    },
    //更新购物车
    api_303(num, item) {
      let that = this
      if (!that.loading) {
        that.loading = true
        api.post(api.api_303, api.getSign({ CID: item.id, Count: num, ProductID: item.product_id, SpecSet: item.specset }), (vue, res) => {
          that.result.forEach((ele, index) => {
            if (ele.id == item.id) {
              item.count = num
            }
          })
          that.checkUpdate()
          that.loading = false
        })
      }
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
                      that.result.shift(index, 1)
                    }
                  })
                  that.result = that.result
                  that.checkUpdate()
                  appG.dialog.showToast({ title: "删除成功", duration: 2000 })
                } else {
                  appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
                }
              }
            )
          } else if (res.cancel) { }
        }
      })
    },
    //全选
    checkedAll(e) {
      let that = this
      that.checked = !that.checked
      that.result.forEach((item, index) => {
        item.checked = that.checked
      })
      that.checkUpdate()
    },
    //付款框选中事件
    selectedChange(item) {
      let that = this
      item.checked = !item.checked
      that.totalPrice = 0
      that.result.forEach((ele, index) => {
        if (ele.checked) {
          that.totalPrice += ele.unit_price * ele.count
        }
      })
    },
    //勾选改变更新小计
    checkUpdate(ele) {
      let that = this
      //总计临时变量
      let total = 0
      that.result.map((item, index) => {
        if (item.checked) {
          //更新修改
          if (ele != null && ele != undefined && item.specset == ele.specset && item.product_id == ele.product_id) {
            item = ele
          }
          //当前小计 
          item.subtotal = item.unit_price * item.count
          //更新购物车
          that.result[index] = item
          //总计
          total += item.subtotal
        }
      })

      that.totalPrice = total
      //更新购物车信息
      user.methods.setShoppingCart(that.result)
    },
    //提交
    submit() {
      let that = this
      let tmps = that.result.filter(item => item.checked)
      if (tmps.length > 0) {
        let details = []
        tmps.forEach((item, i) => {
          item.shopping_cart_id = item.id
          //金额
          item.total_amount = item.unit_price * item.count
          details.push(item)
        })

        //加入本地存取立即购买
        user.methods.setBuyNow(details)
        uni.navigateTo({ url: '/pages/user/confirm-order?isShoppingCart=true' })
      }
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