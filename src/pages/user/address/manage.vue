<template>
  <view class="wrapper-user-address address-manage">
    <view class="user-address-content">
      <view class="list-address">
        <view class="address-item" v-for="(item,index) in addressList" :key="item" v-on:click="select(item)">
          <checkbox disabled="disabled" :checked="item.is_default" :value="item.is_default" class="btn-check" color="#FFB825" />
          <view class="txt-name">
            {{item.contact}}
            <text class="txt-tel">{{getHideMobile(item.mobile)}}</text>
          </view>
          <view class="txt-address">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</view>
        </view>
      </view>
      <view class="btn-add-address" @click="addNewAddress">新增收货地址</view>
      <!-- 弹层 -->
      <view class="setting-pop" v-if="popShow">
        <view class="pop-wrap">
          <view class="pop-item color-main" @click="setDefault">设为默认</view>
          <view class="pop-item" @click="editAddress">编辑</view>
          <view class="pop-item" @click="delAddress">删除</view>
          <view class="pop-item" @click="cancelPopShow">取消</view>
        </view>
      </view>
      <!-- 弹层 -->
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  data() {
    return {
      //是否是选择收货地址
      isSelect: false,
      //默认收货地址框
      popShow: false,
      //收货地址列表
      addressList: [],
      //设置默认时的临时收货地址
      tmpAddress: {}
    }
  },
  onLoad(opt) {
    if (opt.isSelect) {
      this.isSelect = true
    }
    this.api_308(opt.isSelectAuto)
  },
  methods: {
    /**
     * 获取收货地址列表
     */
    api_308: function (isSelectAuto) {
      let that = this
      api.post(api.api_308, api.getSign(),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.addressList = res.data.Result
            if (that.addressList.length > 0) {
              that.addressList.forEach((ele, index) => {
                if (ele.is_default) {
                  that.tmpAddress = ele
                }
              })

              //回到确认订单页面
              if (isSelectAuto) {
                uni.navigateTo({
                  url: "../confirm-order?said=" + that.tmpAddress.id
                })
              }
            }

          }
        })
    },
    /**
     * 设置默认收货地址
     */
    api_310: function (id) {
      let that = this
      api.post(api.api_310, api.getSign({ ID: id }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
            that.popShow = false
            //设置其余收货地址非默认
            that.addressList.forEach((ele, index) => {
              //   if (ele.id != id) {
              //     that.$set(ele, 'is_default', false)
              //   } else {
              //     that.$set(ele, 'is_default', true)
              //   }
              if (ele.id != id) {
                ele.is_default = false
              } else {
                ele.is_default = true
              }
            })
          } else {
            uni.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: 'none' })
          }
        })
    },
    /**
     * 删除收货地址
     */
    api_311: function (id) {
      let that = this
      api.post(api.api_311, api.getSign({ ID: id }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.addressList.splice(that.addressList.findIndex(item => item.id === id), 1)
            that.popShow = false
          }
        })
    },
    /**
     * 隐藏手机号码中间4位
     */
    getHideMobile: function (mobile) {
      return appG.util.getHideMobile(mobile)
    },
    /**
     * 选择收货地址或者
     * 弹出设置默认收货地址框
     */
    select: function (item) {
      let that = this
      if (!that.isSelect) {
        this.popShow = true
        this.tmpAddress = item
      } else {
        uni.navigateTo({
          url: "../confirm-order?said=" + item.id
        })
      }
    },
    /**
     * 关闭弹出框
     */
    cancelPopShow: function () {
      let that = this
      that.popShow = false
    },
    /**
     * 设置默认收货地址
     */
    setDefault: function () {
      let that = this
      that.api_310(this.tmpAddress.id)
    },
    /**
     * 编辑收货地址
     */
    editAddress: function () {
      uni.navigateTo({
        url: "form?id=" + this.tmpAddress.id
      })
    },
    /**
     * 删除收货地址
     */
    delAddress: function () {
      let that = this
      that.api_311(this.tmpAddress.id)
    },
    /**
    * 新增收货地址
    */
    addNewAddress: function () {
      let that = this
      uni.navigateTo({
        url: "form?isSelect=" + this.isSelect
      })
    }
  }
}
</script>


<style lang="scss">
.address-manage {
  background-color: #f1f1f1;
  width: 100%;
  min-height: 100%;
  padding: 10px * 2;
  box-sizing: border-box;

  .address-item {
    border-radius: 20px;
    position: relative;
    padding: 15px * 2 40px * 2 15px * 2 50px * 2;
    background: #fff
      url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAECAYAAABV5LW0AAAAAXNSR0IArs4c6QAAAMlJREFUCB1jnDJlitrv3wzp//8z7iwqyt7FAAT9/VOSGBkZlHl4OHpTUlLeTZ48Wer3b8YCJqb/pwsKclezADUs+v//vzkDw/+cmTNniv348Uf7799/c///Z2D4/PmHINCMrD9/GCYD5YOABv+fOHHGBSag5HuQ6UDwRVBQ8Nffv/8/Atn/QAJA26ByjO9AfKDGX0xMv7+ycHOzRnz79ieQjY3hSFhY2HegzNUJE6ZYATUo6ulprwEpFRDgzv348ftBIPNSbm7WMwCnO1YKeEtwvgAAAABJRU5ErkJggg==")
      no-repeat 2 * 320px center/26px 8px;
    margin-bottom: 20px;
  }
  .btn-check {
    position: absolute;
    left: 40px;
    top: 35%;
    //transform: translateY(-50%) scale(1.2);
  }
  .txt-name {
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 16px;
  }
  .txt-tel {
    display: inline-block;
    margin-left: 20px;
  }
  .text-address {
    font-size: 28px;
    color: #787878;
  }
  .btn-add-address {
    width: 100%;
    height: 48px * 2;
    color: #fff;
    line-height: 48px * 2;
    font-size: 18px * 2;
    text-align: center;
    background-color: #ffb825;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
.setting-pop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);

  .pop-wrap {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .color-main {
    color: #ffb825;
  }
  .pop-item {
    height: 43px * 2;
    background-color: #fff;
    text-align: center;
    line-height: 43px * 2;
    border-bottom: 1px solid #ddd;
    font-size: 34px;

    &:last-child {
      border: none;
    }
  }
}
</style>