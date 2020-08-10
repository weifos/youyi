<template>
  <view class="content page-activity-detail">
    <view class="section">
      <view class="section-titlebar">
        <image :src="imgurl" />
      </view>
      <view class="section-content">
        <view class="article-title">{{result.name}}</view>
        <view class="article-price text-sub mt10">￥{{result.sale_price}}</view>
        <view class="mt10 text-size-sm text-gray">{{result.start_date +"至"+result.end_date}}</view>
        <view class="text-size-sm text-gray">嘉宾：{{result.teacher_name}}</view>
        <view class="text-size-sm text-gray">地点：{{result.address}}</view>
      </view>
      <view class="section-detail">
        <jyf-parser :html="result.details"></jyf-parser>
      </view>
    </view>
    <view class="side-bar" v-if="!isOverdue">
      <button class="btn btn-bg-main text-white btn-size-full text-size-lg" @click="api_326">立即报名</button>
      <!-- <view>
        <image src="/static/icon/home.png" class="icon" />
        <text class="db">首页</text>
      </view>
      <view :class="collected == 1 ? 'active' : ''">
        <image src="/static/icon/collect.png" class="icon icon--normal" />
        <image src="/static/icon/collect_a.png" class="icon icon--actived" />
        <text class="db">收藏</text>
      </view>
      <view>
        <button class="btn btn-bg-main text-white round btn-size-big" @click="openPopup">立即报名</button>
      </view>-->
    </view>
    <view>
      <uniPopup ref="popup" type="bottom">
        <view class="pop-content">
          <view class="con-title ellipsis2">{{result.name}}</view>
          <view class="con-price">
            <text>票价</text>
            <text class="text-sub text-price">￥{{result.sale_price}}</text>
          </view>
          <view class="con-no mt20 mb20">
            <text>参加人数</text>
            <view>
              <uni-number-box @change="updateNum" :value="num" :min="1" class="number-box-skin-1"></uni-number-box>
            </view>
          </view>
        </view>
        <view class="pop-btns">
          <view class="text-total">
            合计：￥
            <text>{{totalPrice}}元</text>
          </view>
          <view class="btn-close">
            <button class="btn btn-bg-main text-white" @click="closePopup">确认支付</button>
          </view>
        </view>
      </uniPopup>

      <!-- popup s -->
      <uniPopup ref="popupPay" type="bottom" class="pop-pay yoyi-pop">
        <view class="pop-title text-size-md align-center">支付方式</view>
        <view class="pop-content">
          <radio-group class="agreement-checkbox" @change="changePay">
            <view class="pay-item mt20">
              <view class="text-size-basic">
                <radio :checked="order.pay_method == 31" color="#FFB825" value="31" />
                <text class="dib vam ml20">钱包支付</text>
              </view>
              <view class="text-gray text-size-sm text-desc">钱包余额 ¥{{userInfo.balance}}，尚需 ¥{{order.actual_amount}}</view>
              <view class="btns-bar mt20">
                <button class="btn btn-round btn-size-full text-size-md btn-bg-main text-white">立即充值 ¥{{order.actual_amount}}</button>
                <button class="btn btn-round btn-size-full btn-line-main text-size-md bg-white text-sub mt20">其他充值优惠</button>
              </view>
            </view>
            <view class="pay-item mt20">
              <view class="text-size-basic">
                <radio :checked="order.pay_method== 13" color="#FFB825" value="13" />
                <text class="dib vam ml20">微信支付</text>
              </view>
            </view>
          </radio-group>
        </view>
        <button class="btn btn-bg-main text-white btn-size-full text-size-lg btn-sure" style="margin-bottom:0px" @click="buyNow">确定购买</button>
      </uniPopup>
      <!-- popup e -->
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import { uniPopup, uniNumberBox } from "@dcloudio/uni-ui"

export default {
  data() {
    return {
      title: '活动',
      //提交中
      requestIng: false,
      //封面图片
      imgurl: "",
      //购买数量
      num: 1,
      //已报名数量
      reg_num: 0,
      //单价
      price: 0,
      totalPrice: 0,
      ladder_prices: [],
      isOverdue: false,
      store_name: "",
      result: {
        title: "",
        startTime: "",
        endTime: "",
        address: "",
        sale_price: 0,
        up_limit: 0,
        detail: ""
      },
      collected: 0,
      show: false,
    }
  },
  components: {
    uniPopup,
    uniNumberBox
  },
  onLoad(opt) {
    this.api_206(opt)
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    },
    //数量更新
    updateNum(value) {
      //不能大于99,或者当前报名人数加上已报名人数大于该课程报名上限
      if (value > 99 || parseInt(value) + 1 + parseInt(this.reg_num) > this.result.up_limit) return
      //更新数量
      this.num = value
      this.checkUpdate()
    },
    //勾选改变更新小计
    checkUpdate() {
      let total = 0
      let that = this
      //开启阶梯价
      if (that.result.is_ladder) {
        //购买数量
        let num = that.num
        //阶梯最大数量
        let max_num = that.ladder_prices[0].count
        //阶梯最大金额
        let max_amount = that.ladder_prices[0].amount

        if (num > 1) {
          //超出最大数量，根据规则计算
          if (num > max_num) {
            that.totalPrice = parseFloat(max_amount / max_num).toFixed(2) * num
          } else {
            for (var i = 0; i < that.ladder_prices.length; i++) {
              var o = that.ladder_prices[i]
              if (num > o.count) {
                that.totalPrice = parseFloat(o.amount / o.count).toFixed(2) * num
                return
              } else if (num == o.count) {
                that.totalPrice = o.amount
                return
              }
            }
          }
        } else {
          that.totalPrice = that.result.sale_price
        }
      } else {
        that.totalPrice = that.result.sale_price * that.num
      }
    },
    /**
     * 数组降序
     */
    desc(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1
      }
    },
    /**
     * 数组升序
     */
    asc(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2
      }
    },
    /**
     * 加载课堂详情页数据
     */
    api_206: function (opt) {
      var that = this
      let id = 0
      if (opt.id != undefined) {
        id = opt.id
      } else {
        const scene = decodeURIComponent(opt.scene)
        id = appG.util.getRequestId(scene, "id")
      }

      api.post(api.api_206, api.getSign({
        ID: id
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        } else {
          //封面图
          that.imgurl = res.data.Result.imgurl
          //是否过期
          let dateNow = appG.util.date.getDateTimeNow()

          if (appG.util.date.compareDate(dateNow, res.data.Result.course.start_date)) {
            that.isOverdue = true
          }
          //已报名人数
          that.reg_num = res.data.Result.reg_num
          res.data.Result.course.start_date = appG.util.date.dateFormat(res.data.Result.course.start_date, 'yyyy-MM-dd hh:mm')
          res.data.Result.course.end_date = appG.util.date.dateFormat(res.data.Result.course.end_date, 'yyyy-MM-dd hh:mm')
          that.result = res.data.Result.course
          that.store_name = res.data.Result.store_name
          //阶梯价
          let arr = JSON.parse(res.data.Result.course.ladder_prices)
          //如果开启阶梯价
          if (res.data.Result.course.is_ladder) {
            that.ladder_prices = arr.sort(that.desc("count"))
          }
          //小计
          that.totalPrice = res.data.Result.course.sale_price
        }
      })
    },
    /**
     * 提交课程订单
     */
    api_326: function () {

      //剩余可报名人数
      let residue_num = this.result.up_limit - this.reg_num
      if (this.num - residue_num > 0) {
        return
      }

      var that = this
      var order = {
        course_id: that.result.id,
        details: []
      }

      for (let i = 0; i < that.num; i++) {
        order.details.push({
          id: 0
        })
      }

      if (that.num > that.result.single_limit) {
        uni.showToast({
          title: '每人报名人数不能超过' + that.result.single_limit,
          icon: 'none',
          duration: 3000
        })
        return
      }

      if (that.requestIng) { return }
      that.requestIng = true

      api.post(api.api_326, api.getSign({
        Order: order
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          uni.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        } else {
          let param = '?no=' + res.data.Result.serial_no + '&store_id=' + res.data.Result.store_id
          if (that.result.type == 1) {
            uni.navigateTo({
              url: '../user/activity' + param
            })
          } else {
            uni.navigateTo({
              url: 'sign-up' + param + "&tid=" + that.result.type + "&id=" + that.result.id
            })
            // uni.navigateTo({
            //   url: 'pay' + param + "&tid=" + that.result.type
            // })
          }
        }

        setTimeout(() => { that.requestIng = false }, 1000)
      })
    }

  }
}
</script>

<style lang="scss">
.page-activity-detail {
  .section-titlebar image {
    width: 750px;
    height: 2 * 210px;
  }
  .section-content {
    padding: 2 * 20px;
  }
  .article-title {
    font-size: 2 * 18px;
    font-weight: bold;
  }
  .article-price {
    font-size: 2 * 20px;
  }
  .text-gray {
    line-height: 1.5;
  }
  .section-detail {
    border-top: 12px solid $yoyi-border-color;
    padding-bottom: 100px;
  }
}
.side-bar {
  position: fixed;
  display: flex;
  width: 100%;
  height: 2 * 48px;
  background-color: #fff;
  box-shadow: 0 -2px 4px #ededed;
  z-index: 2;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  view {
    font-size: 2 * 11px;
    color: #4f4f4f;
    line-height: 1;
  }
  .icon {
    width: 2 * 22px;
    height: 2 * 22px;
    margin-bottom: 3px;

    &--actived {
      display: none;
    }
  }
  .active .icon--normal {
    display: none;
  }
  .active .icon--actived {
    display: block;
  }
}
.pop-content {
  padding: 30px;
  .con-title {
    font-size: 2 * 16px;
    margin-bottom: 2 * 11px;
  }
  .con-price,
  .con-no {
    display: flex;
    justify-content: space-between;
    font-size: 2 * 13px;
  }
  .text-price {
    font-size: 2 * 18px;
  }
  .con-no text {
    font-size: 2 * 13px;
  }
}
.pop-btns {
  display: flex;
  height: 2 * 48px;
  align-items: center;
  justify-content: space-around;

  .text-total {
    flex: 1;
    padding-left: 2 * 20px;
    border-top: 1px solid $yoyi-border-color;
    height: 2 * 48px;
    line-height: 2 * 48px;

    text {
      font-size: 2 * 18px;
    }
  }
  .btn-close .btn {
    font-size: 2 * 18px;
    height: 2 * 48px;
    border-radius: 0;
    width: 2 * 140px;
  }
}
.uni-popup .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
  padding: 0;
}
</style>
