<template>
  <view class="content page-cart">
    <view class="cu-list cart-list menu-avatar">
      <view class="cu-item list-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in result" :key="item" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
        <view class="content">
          <view class="cont">
            <view class="check-bar">
              <checkbox :checked="item.checked" color="#FFB825" @click="selectedChange(item)" />
            </view>
            <view class="img-bar">
              <image :src="item.img_url" />
            </view>
            <view class="text-bar">
              <view class="ellipsis">{{item.name}}</view>
              <view class="side-bar">
                <text class="text-sub text-size-basic">￥{{item.price}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="move" @click="cancel(item)">
          <view class="btn-del">删除</view>
        </view>
      </view>
    </view>
    <view class="operation-bar">
      <view class="text-bar align-center">
        <view class="dib text-size-md" @click="checkAll">
          <checkbox :checked="checked" color="#FFB825" />
          <text class="dib vam">全选</text>
        </view>
      </view>
      <view class="btns-bar">
        <button class="btn text-size-basic text-white bg-sub" @click="cancelSelect">删除选中</button>
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
      //对应的门店信息
      store_id: 0,
      //每页大小
      pageSize: 6,
      //当前类别索引
      pageIndex: 0,
      //全选
      isCheckAll: false,
      //购物车列表
      result: [],
      //取消收藏的商品
      ids: [],
      //总计
      totalPrice: 0
    }
  },
  onLoad(opt) {
    this.api_344()
  },
  methods: {
    //加载商品收藏
    api_344() {
      let that = this
      api.post(api.api_344, api.getSign({
        BizType: 0,
        Size: that.pageSize,
        Index: that.pageIndex
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.result = res.data.Result
        } else {
          uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
        }
      })
    },
    //取消收藏
    cancel(item) {
      let that = this
      that.ids = [item.id]
      that.api_343()
    },
    //取消选中收藏
    cancelSelect() {
      let that = this
      that.ids = that.result.filter(item => item.checked).map(function (ele, index) {
        return ele.id
      })

      that.api_343()
    },
    //取消收藏
    api_343() {
      let that = this
      let idStr = ''
      that.ids.forEach((ele, index) => {
        if (idStr.length == 0) {
          idStr += ele
        } else {
          idStr += ',' + ele
        }
      })
      uni.showModal({
        title: '提示',
        content: '确认取消收藏吗',
        success: function (res) {
          if (res.confirm) {
            api.post(api.api_343, api.getSign({ Ids: idStr }),
              function (wx, res) {
                if (res.data.Basis.State == api.state.state_200) {
                  let tmp = []
                  that.ids.forEach((ele, index) => {
                    that.result.forEach((ele1, index1) => {
                      if (ele === ele1.id) {
                        that.result.shift(index, 1)
                        return
                      }
                    })
                  })

                  that.result = that.result
                  uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
                } else {
                  uni.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
                }
              }
            )
          } else if (res.cancel) { }
        }
      })
    },
    //局部上拉滚动
    scroll(e) {
      let that = this
      //下拉
      if (e.detail.scrollTop > 0 && e.detail.scrollTop - that.scrollTop > 0 && (e.detail.scrollHeight - e.detail.scrollTop) < 505) {
        //当前加载数据的分类
        let catg = this.cateInfo[this.curIndex]
        that.api_202(catg)
      }
      //记录上次滚动位置
      that.scrollTop = e.detail.scrollTop
    },
    //全选
    checkAll() {
      let that = this
      if (that.isCheckAll) {
        that.isCheckAll = false
      } else {
        that.isCheckAll = true
      }

      that.result.forEach((ele, index) => {
        if (that.isCheckAll) {
          ele.checked = true
        } else {
          ele.checked = false
        }
      })
      that.result = that.result
    },
    //付款框选中事件
    selectedChange(item) {
      let that = this
      item.checked = !item.checked
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
    width: 4 * 140px;
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