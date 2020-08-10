<template>
  <view class="content page-category-details">
    <view class="product-banner-bar">
      <swiper class="swiper" indicator-dots="true" autoplay="false">
        <swiper-item v-for="item in pResult.imgs" :key="item">
          <image :src="item" />
        </swiper-item>
      </swiper>
    </view>
    <view class="product-info-bar section">
      <view class="product-price text-sub">￥{{pResult.product.sale_price}}</view>
      <view class="product-title mt15 text-size-lg bold">{{pResult.product.name}}</view>
      <view class="product-intro text-gray text-size-sm mt15 ellipsis2">{{pResult.product.introduction}}</view>
      <view class="product-info text-size-sm mt15">
        {{pResult.product.field1==null?'':pResult.product.field1}} 著/
        {{pResult.product.field2==null?'':pResult.product.field2}} /
        {{pResult.product.field3==null?'':pResult.product.field3}}
      </view>
    </view>
    <!-- <view class="product-discount-bar section" v-if="discountInfo.length > 0">
      <view class="section-title">促销</view>
      <view class="discount-item ellipsis" v-for="item in discountInfo" :key="item">
        <text class="discount-tag">{{item.type}}</text>
        <text class="discount-title">{{item.name}}</text>
      </view>
      <view class="icon-arrow"></view>
    </view>-->
    <!-- <view class="product-address-bar section">
      <view class="text-address">
        <text class="text-gray">送至</text>
        <text class="ml20">广东 深圳 南山</text>
      </view>
      <view class="icon-arrow"></view>
      <view class="text-freight mt10">运费：6元</view>
    </view>-->
    <view class="product-detail-bar section">
      <!-- style="width:100%;height:1358rpx;" -->
      <jyf-parser :html="pResult.product.details"></jyf-parser>
    </view>
    <!-- product-side-bar s -->
    <view class="product-side-bar">
      <view class="icon-bar">
        <view class="item btn-home" @click="switchTab('/pages/home/index')">
          <view class="icon-home"></view>
          <view class="text text-size-sm">首页</view>
        </view>
        <view :class="['item btn-collect',collected == true ? 'active' : '']" @click="onClickCollect">
          <view class="icon-collect"></view>
          <view class="text text-size-sm">收藏</view>
        </view>
        <view class="item btn-cart" @click="navigateTo('/pages/user/shopping-cart')">
          <view class="icon-cart"></view>
          <view class="text text-size-sm">购物车</view>
        </view>
      </view>
      <view class="btns-bar">
        <button class="btn bg-sub text-white text-size-basic" @click="popupOpen(false)">立即购买</button>
        <button class="btn bg-main text-white text-size-basic" @click="popupOpen(true)">加入购物车</button>
      </view>
    </view>
    <!-- product-side-bar e -->
    <!-- popup s -->
    <uniPopup ref="popup" type="bottom" class="pop-product yoyi-pop">
      <view class="pop-content">
        <view class="hidden border-bottom">
          <view class="con-img">
            <image :src="pResult.product.img_url" />
          </view>
          <view class="con-info">
            <view class="con-price">
              <text class="text-sub text-price">￥{{unitPrice}}</text>
            </view>
            <view class="con-select-info mt10">{{pResult.product.name}}</view>
          </view>
        </view>
        <view class="parameter-list mt20 border-bottom" v-for="(item,index) in pResult.specNames" :key="index">
          <view class="parameter-title">{{item.name}}</view>
          <view :class="['parameter-item',citem.is_enable?'':'disable',citem.checked? 'active' : '']" v-for="(citem,index) in pResult.specValues" v-if="citem.specname_id == item.id" :key="citem" @click="check(citem)">{{pResult.specCustoms,item.id,citem.id,citem.val | getCustomName}}</view>
        </view>
        <view class="con-no mt40">
          <text>数量</text>
          <view>
            <uni-number-box class="number-box-skin-1" :value="buyCount" :min="1" @change="updateNum"></uni-number-box>
          </view>
        </view>
      </view>
      <view class="pop-btns">
        <button v-if="isAddToCart" class="btn btn-bg-main text-white btn-size-full text-size-lg" @click="submit">加入购物车</button>
        <button v-else class="btn btn-bg-main text-white btn-size-full text-size-lg" @click="submit">确定购买</button>
      </view>
      <view class="btn-close-pop" @click="closePopup">
        <view class="icon-close"></view>
      </view>
    </uniPopup>
    <!-- popup e -->
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import { uniPopup, uniNumberBox } from "@dcloudio/uni-ui"
import operationButton from '@/components/yoyi-operation-button/'
import parser from "@/components/jyf-parser/jyf-parser"

export default {
  data() {
    return {
      imgUrl: '',
      collect_id: 0,
      isShow: false,
      //是否能够购买
      isCanSubmit: false,
      store_id: 0,
      //是否加入购物车
      isAddToCart: false,
      //显示sku模态框
      showDialog: false,
      //购买数量
      buyCount: 1,
      //选择的sku
      selectSku: null,
      //单价
      unitPrice: 0,
      //总计
      totalPrice: 0,
      //商品详情
      pResult: {
        product: {
          id: 0,
          name: '',
          details: ''
        },
        skus: [],
        imgs: []
      },
      //是否收藏
      collected: false,
      discountInfo: [{
        type: "优惠购",
        name: "现在购买享受 ¥ 27.50，限购10件…"
      }
      ],
      html: '<div>Hello World!</div>',
      //小图封面
      coverUrl: ''
    }
  },
  components: {
    parser,
    uniPopup,
    uniNumberBox,
    operationButton
  },
  filters: {
    getCustomName: function (specCustoms, name_id, val_id, val) {
      var custom_name = val
      specCustoms.forEach(function (item, index) {
        if (name_id == item.specname_id && val_id == item.specvalue_id && item.custom_value != '') {
          custom_name = item.custom_value
          return
        }
      })
      return custom_name
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function (newData, oldData) {
      this.isShow = newData
    }
  },
  onLoad(opt) {
    this.api_203(opt.id)
    //如果已登录
    if (user.methods.isLogin()) {
      this.api_341(opt.id)
    }
  },
  methods: {
    //收藏商品
    onClickCollect() {
      //如果没有收藏
      if (this.collected) {
        //取消收藏
        this.api_343()
      } else {
        //立即收藏
        this.api_342()
      }
    },
    //购买或加入购物车
    popupOpen(isAddToCart) {
      this.isAddToCart = isAddToCart
      if (this.pResult.skus.length > 0) {
        this.$refs.popup.open()
      } else {
        appG.dialog.showToast({ title: '库存不足', duration: 2000, icon: 'none' })
      }
    },
    closePopup() {
      this.$refs.popup.close()
    },
    //数量更新
    updateNum(value) {
      this.buyCount = value
    },
    //规格选中事件
    check(item) {
      let that = this
      //是否可用点击
      if (!item.is_enable) return
      //当前索引      
      var i = that.pResult.specNames.findIndex((val) => val.id == item.specname_id)
      //设置点击状态
      that.pResult.specValues.map((obj, index, arr) => {
        if (obj.specname_id == item.specname_id) {
          obj.checked = false
          if (item.id == obj.id) {
            obj.checked = true
          }
        }
      })

      //判断下一行索引是否大于数组总长度 
      if (i + 1 > that.pResult.specNames.length - 1) {
        //全部选中
        that.getSelectSkuVal()
      } else {
        //清除未选择的状态
        let clearSpecNames = that.pResult.specNames.filter((val, index) => index > i)
        clearSpecNames.forEach(function (item, index) {
          that.pResult.specValues.map(function (obj, i) {
            if (obj.specname_id == item.id) {
              obj.checked = false
              obj.is_enable = false
            }
          })
        })

        //绑定下一行
        that.bindSKU(that.pResult.specNames[i + 1].id, item)
      }
    },
    //绑定每行sku状态
    bindSKU(spec_name_id, specVal) {
      //SKU集合
      let skus = this.pResult.skus
      let checkedVal = this.pResult.specValues.filter(val => val.checked).map(item => item.specname_id + "_" + item.id).join(',')
      //处理规格值
      this.pResult.specValues.filter(val => val.specname_id == spec_name_id).map((obj, index) => {
        //在sku集合里面获取首行可点的规格
        skus.forEach(function (item, index) {
          if (item.stock_num <= 0) {
            obj.is_enable = false
            return
          }
          let exist = 0
          let pass = false
          let arr = checkedVal.split(',')
          let arr1 = item.specset.split(',')
          arr.forEach(function (o, i) {
            arr1.forEach(function (oo, ii) {
              if (oo == o) {
                exist++
              }
            })
          })

          //是否是第一次加载
          if (checkedVal.length) {
            pass = exist == arr.length
          } else {
            pass = true
          }

          item.specset.split(',').forEach(function (o, i) {
            if (pass && o.split('_')[0] == spec_name_id && obj.specname_id + "_" + obj.id == o) {
              obj.is_enable = true
              return
            }
          })
        })

        if (specVal != undefined && specVal.id == obj.id) {
          obj.checked = true
        }
      })
    },
    //获取选中完成的sku
    getSelectSkuVal() {
      let that = this
      let items = that.pResult.specValues.filter(val => val.checked == true)
      if (items.length < that.pResult.specNames.length) {
        let name = that.pResult.specNames[items.length].name
        appG.dialog.showToast({ title: "请选择" + name, duration: 2000, icon: "none" })
        return null
      }

      let data = null
      if (that.pResult.product.is_open_spec) {
        //获取选中数据
        let sku_id = items.map(item => item.specname_id + "_" + item.id).join(',')
        //在当前sku集合中获取
        that.pResult.skus.forEach(function (item, index) {
          if (appG.util.compareSku(sku_id, item.specset)) {
            data = item
            return
          }
        })
      } else {
        data = that.selectSku
      }

      that.selectSku = data
      that.selectSku.unit_price = that.selectSku.sale_price
      that.checkUpdate()
      return data
    },
    //提交
    submit() {
      let that = this
      //初始化是否能够提交
      if (!this.isCanSubmit) return
      //选中的商品SKU
      let tmp = this.getSelectSkuVal()
      if (tmp == null) return
      //封面图片
      tmp.img_url = this.pResult.product.img_url
      if (tmp != null) {
        //门店商品ID
        //tmp.sto_product_id = this.selectSku.product.id
        //平台商品ID
        tmp.product_id = this.selectSku.product_id
        //加入购物车的数量
        tmp.count = this.buyCount
        //加入购物车
        if (this.isAddToCart) {
          that.api_306()
        } else {
          //加入本地存取立即购买
          user.methods.setBuyNow([tmp])
          //关闭弹框
          that.$refs.popup.close()
          uni.navigateTo({ url: '/pages/user/confirm-order' })
        }
      }
    },
    //关闭当前页
    close() {
      this.selectSku.specset = ''
      this.selectSku.sale_price = 0
      this.selectSku.product_id = 0
      this.$emit('cancelSKU')
    },
    //加
    add() {
      if (this.buyCount >= 99) return
      this.buyCount = this.buyCount + 1
      this.checkUpdate()
    },
    //减
    sub() {
      if (this.buyCount <= 1) return
      this.buyCount = this.buyCount - 1
      this.checkUpdate()
    },
    //勾选改变更新小计
    checkUpdate() {
      this.unitPrice = this.selectSku.sale_price
      //设置总计
      this.totalPrice = this.selectSku.sale_price * this.buyCount
    },
    //处理输入方式
    handleInput() {
      let value = this.validateNumber(e.detail.value)
      val.replace(/\D/g, '')
    },
    /**
     * 加载商品详情
     */
    api_203(id) {
      let that = this
      api.post(api.api_203, api.getSign({
        ID: id
      }), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.specValues.forEach((obj, i) => {
            that.$set(obj, "checked", false)
            that.$set(obj, "is_enable", false)
          })

          that.pResult = res.data.Result

          if (that.pResult.product.is_open_spec) {
            if (that.pResult.specNames.length == 0) return
            that.totalPrice = 0
            //获购买数量
            that.buyCount = 1
            //获取首行规格名称id
            let one_name_id = that.pResult.specNames[0].id
            //绑定首行状态
            that.bindSKU(one_name_id)
          } else {
            if (that.pResult.skus[0] != undefined) {
              that.selectSku = that.pResult.skus[0]
              that.totalPrice = that.selectSku.sale_price
              that.checkUpdate()
            }
          }

          that.isCanSubmit = that.pResult.skus.filter(sku => sku.is_enable).length > 0

        } else {
          appG.dialog.showToast({ title: res.data.Msg, duration: 2000 })
        }
      })
    },
    /**
     * 提交订单
     */
    api_314: function () {
      var that = this;
      api.post(api.api_314, api.getSign({}), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        } else {

        }
      })
    },
    /**
     * 加入购物车
     */
    api_306(e) {
      let that = this
      api.post(api.api_306,
        api.getSign({
          ProductID: that.selectSku.product_id,
          SpecSet: that.selectSku.specset,
          Count: that.buyCount
        }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //关闭弹框
            that.$refs.popup.close()
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
          }
        }
      )
    },
    /**
     * 是否收藏
     */
    api_341(id) {
      let that = this
      api.post(api.api_341, api.getSign({ StoreID: 0, BizID: id, BizType: 0 }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.collected = res.data.Result > 0
            that.collect_id = res.data.Result
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
          }
        }
      )
    },
    /**
     * 立即收藏
     */
    api_342() {
      let that = this
      api.post(api.api_342, api.getSign({ StoreID: 0, BizID: that.pResult.product.id, BizType: 0 }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
            that.collected = true
            that.collect_id = res.data.Result
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
          }
        }
      )
    },
    /**
     * 取消收藏
     */
    api_343() {
      let that = this
      api.post(api.api_343, api.getSign({ Ids: that.collect_id }),
        function (vue, res) {
          if (res.data.Basis.State == api.state.state_200) {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
            that.collected = false
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000, icon: "none" })
          }
        }
      )
    },
    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     */
    switchTab(url) {
      //重新跳转到用户中心 
      uni.switchTab({
        url: url
      })
    },
    /**
     * 保留当前页面，跳转到应用内的某个页面
     */
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    }

  }
}
</script>

<style lang="scss">
.page-category-details {
  padding-bottom: 2 * 48px;
  .section {
    border-top: 8px solid $yoyi-border-color;
    background-color: #fff;
    padding: 2 * 10px 2 * 20px;
    position: relative;
  }
  .product-price {
    font-size: 2 * 20px;
  }
  .product-discount-bar .icon-arrow {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .product-address-bar .icon-arrow {
    position: absolute;
    right: 20px;
    top: 30px;
  }
  .section-title {
    position: absolute;
    left: 0px;
    top: 0px;
    color: $yoyi-text-color-red;
    font-size: $uni-font-size-base;
  }
  .discount-item {
    padding: 0 2 * 40px;
    display: flex;
    margin-bottom: 10px;
    .discount-tag {
      display: inline-flex;
      height: 2 * 19px;
      width: 2 * 50px;
      align-items: center;
      justify-content: center;
      color: $yoyi-text-color-red;
      border: 1px solid $yoyi-text-color-red;
      font-size: $uni-font-size-sm;
      margin-right: 10px;
    }
    .discount-title {
      display: inline-flex;
      font-size: 2 * 13px;
    }
  }
}
.product-banner-bar {
  .swiper {
    height: 2 * 375px;
  }
  swiper-item {
    display: flex;
    align-items: center;
  }
  image {
    width: 100%;
  }
}
.product-side-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2 * 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 -1px 2px $yoyi-border-color;

  .icon-bar,
  .btns-bar {
    display: inline-flex;
    justify-content: space-around;
    width: 50%;
    align-items: center;
  }
  .icon-cart,
  .icon-collect,
  .icon-home {
    margin: 0 auto;
  }
  .btns-bar {
    height: 100%;
    .btn {
      width: 50%;
      height: 100%;
    }
  }
}
.uni-popup .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
  padding: 0;
}
.btn-close-pop {
  position: absolute;
  right: 20px;
  top: 20px;
}
.pop-product {
  .pop-content {
    padding: 2 * 20px;
    background-color: #fff;
  }
  .con-info {
    padding-top: 30px;
  }
  .border-bottom {
    border-bottom: 1px solid $yoyi-border-color;
  }
  .con-img {
    float: left;
    margin-right: 2 * 20px;
    image {
      width: 2 * 80px;
      height: 2 * 80px;
    }
  }
  .parameter-list {
    .parameter-title {
      font-size: 2 * 13px;
      margin-bottom: 20px;
    }
    .parameter-item {
      display: inline-block;
      //   width: 2 * 60px;
      height: 2 * 30px;
      padding: 0 2vw 0 2vw;
      line-height: 2 * 30px;
      text-align: center;
      background-color: #f5f5f5;
      border: 1px solid #f5f5f5;
      color: #4f4f4f;
      font-size: 28px;
      border-radius: 12px;
      margin: 0 30px 40px 0;
      box-sizing: border-box;

      &.active {
        background-color: #fff;
        border: 1px solid $yoyi-text-color-sub;
        color: $yoyi-text-color-sub;
      }

      &.disable {
        background: #acacac;
        border: 1px solid #acacac;
        color: #ffffff;
      }
    }
  }
  .con-no {
    display: flex;
    justify-content: space-between;
  }
}
</style>
