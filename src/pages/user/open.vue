<template>
  <view class="wrapper-user-open">
    <vipBrand type="1"></vipBrand>
    <yoyiTitle title="开通会员" more="开通会员享更多好礼"></yoyiTitle>
    <view class="user-open-list">
      <vipListItem v-for="(item,index) in rechargeList" :key="index" :class="'open-item'" :title="item.name" :price="item.full_amount" :selected="selected == index || mbr_dis_count == 10 " :disabled="item.disabled" @click="select(index,item.dis_count)"></vipListItem>
    </view>
    <view class="user-agreement">
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <checkbox :checked="checked" color="#FFB825" />
        <view>
          <text>我已阅读并同意</text>
          <navigator class="agreement-link" hover-class url="./m-s-agreement">《友谊书城（付费）会员服务协议》</navigator>
        </view>
      </checkbox-group>
    </view>
    <operationButton :price="rechargeList[selected].amount" @click="api_347()" :disabled="!canSubmit"></operationButton>
  </view>
</template>

<script>

import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import yoyiTitle from '@/components/yoyi-title/'
import vipBrand from '@/components/yoyi-vip-brand/'
import vipListItem from '@/components/yoyi-vip-list-item/'
import operationButton from '@/components/yoyi-operation-button/'

export default {
  components: { yoyiTitle, vipBrand, vipListItem, operationButton },
  data() {
    return {
      //会员折扣
      mbr_dis_count: 1,
      mbr_e_date: '2020-01-01',
      //是否过期
      isOverdue: false,
      price: 0,
      selected: -1,
      checked: false,
      isPaying: false,
      canSubmit: false,
      rechargeList: [],
      aty_store: null
    }
  },
  onLoad(options) {
    let userInfo = user.methods.getUser()
    if (!userInfo.card_no) {
      uni.navigateTo({ url: '/pages/home/userIndex' })
    }

    this.mbr_dis_count = userInfo.mbr_dis_count
    this.mbr_e_date = userInfo.mbr_e_date

    //是否过期 
    let dateNow = appG.util.date.getDateTimeNow()
    this.isOverdue = appG.util.date.compareDate(dateNow, this.mbr_e_date)

    //是否定位过门店
    this.aty_store = user.methods.getAtyStore()
    if (this.aty_store == null) {
      this.api_299()
    }

    this.api_346()
    //this.api_345()
  },
  onShow() {

  },
  methods: {
    select(value, dis_count) {
      this.selected = value
    },
    checkboxChange(e) {
      if (e.detail && e.detail.value && e.detail.value.length > 0) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    /**
     * 定位最近的门店
     */
    api_299() {
      let that = this
      uni.getLocation({
        //wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        type: 'wgs84',
        success: function (res) {
          //将小程序定位转换成百度位置的定位
          let tmp = appG.util.map.qqMapTransBMap(res.longitude, res.latitude)
          //let tmp = appG.util.map.wgs84togcj02(res.longitude, res.latitude)

          tmp.lng = tmp.lng + 0.005137
          tmp.lat = tmp.lat - 0.003237
          //查询最近门店
          api.post(api.api_299, api.getSign({ LngLat: tmp.lng + '#' + tmp.lat }), function (app, res) {
            if (res.data.Basis.State != api.state.state_200) {
              appG.dialog.showToast({ title: res.data.Basis.Msg })
            } else {
              that.aty_store = res.data.Result
              user.methods.setAtyStore(that.aty_store)
              appG.dialog.showToast({ title: '检查到您当前位置已推荐最近门店' })
            }
          })
        }
      })
    },
    /**
     * 判断在老系统是否存在会员
     */
    api_345: function () {
      let that = this
      let userInfo = user.methods.getUser()
      api.post(api.api_345, api.getSign({ Mobile: userInfo.login_name }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //是否存在老会员
            if (res.data.Result == 1) {
              uni.showToast({ title: '检测到您是老会员请先绑定会员卡号', icon: 'none', duration: 3000 })
              setTimeout(() => {
                uni.hideToast()
                uni.navigateTo({ url: '/pages/user/card-transfer' })
              }, 3000)
            }
          } else {
            uni.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          }
        })
    },
    /**
     * 加载付费会员卡购买列表
     */
    api_346: function () {
      let that = this
      api.post(api.api_346, api.getSign({}),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //充值列表
            that.rechargeList = res.data.Result

            //是否过期 
            that.rechargeList.forEach(function (item, index) {
              //已过期
              if (that.isOverdue) { that.$set(item, "disabled", false) }
              else {

                //默认都不可选
                that.$set(item, "disabled", true)

                //如果当前会员大于充值的等级折扣
                if (that.mbr_dis_count <= item.dis_count) {
                  item.name = '已具备该会员权益'
                }
              }

              //如果当前会员为注册会员，否则到期后才能升级
              if (that.mbr_dis_count == 10) {
                that.$set(item, "disabled", false)
              }
            })

            //是否存在可升级会员类型
            let count = that.rechargeList.filter(ele => ele.disabled === false).length
            if (count > 0) {
              that.selected = 0
              that.canSubmit = true
            }
          } else {
            uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 付费购买会员卡
     */
    api_347: function () {
      let that = this

      //请选择购买的会员卡
      let item = that.rechargeList[this.selected]
      if (item == null || undefined == item) {
        //appG.dialog.showToast({ title: '请选择购买的会员卡', icon: 'none', duration: 3000 })
        return
      } else {
        //请同意付费协议
        if (!that.checked) {
          appG.dialog.showToast({ title: '请同意付费协议', icon: 'none', duration: 3000 })
          return
        }

        //如果还未过期
        if (!that.isOverdue) {
          if (that.mbr_dis_count != 10) {
            appG.dialog.showToast({ title: '当前会员卡还未到期', icon: 'none', duration: 3000 })
            return
          }
        } else {
          if (that.mbr_dis_count != 10 && that.mbr_dis_count <= item.dis_count) {
            appG.dialog.showToast({ title: '你已具备该会员权益', icon: 'none', duration: 3000 })
            return
          }
        }
      }

      //   if (that.aty_store == null) {
      //     appG.dialog.showToast({ title: '请退出小程序重新授权定位', icon: 'none', duration: 3000 })
      //     return
      //   }

      //是否支付中
      if (!that.isPaying) {
        that.isPaying = true
        uni.getProvider({
          service: 'payment', success: (res) => {
            let provider = res.provider[0]
            //微信支付
            if (~res.provider.indexOf('wxpay')) {
              //立即购买
              api.post(api.api_347, api.getSign({
                CardID: item.id,
                StoreID: that.aty_store == null ? 0 : that.aty_store.id
              }), function (app, res) {
                if (res.data.Basis.State != api.state.state_200) {
                  setTimeout(function () {
                    uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
                  }, 50)
                  setTimeout(function () { uni.hideToast() }, 3000)
                } else {
                  var memberCard = res.data.Result.member_card
                  //通过uni-app吊起支付
                  uni.requestPayment({
                    provider: provider,
                    appId: res.data.Result.wechatpay.appId,
                    timeStamp: res.data.Result.wechatpay.timeStamp,
                    nonceStr: res.data.Result.wechatpay.nonceStr,
                    package: res.data.Result.wechatpay.package,
                    signType: res.data.Result.wechatpay.signType,
                    paySign: res.data.Result.wechatpay.paySign,
                    success: function (res) {
                      //购卡成功
                      that.api_348(memberCard.card_no)
                    },
                    fail: function (err) {
                      setTimeout(() => { that.isPaying = false }, 500)
                    },
                    complete: () => {
                      setTimeout(() => { that.isPaying = false }, 500)
                    }
                  })
                }
              })
            }
          }
        })
      }

    },

    /**
     * 购卡成功
     */
    api_348: function (card_no) {
      let that = this
      api.post(api.api_348, api.getSign({
        CardNo: card_no,
        StoreID: that.aty_store == null ? 0 : that.aty_store.id
      }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            //登录
            user.methods.login(res.data.Result)
            //跳转到会员卡页面
            //uni.navigateTo({ url: 'card' })
            uni.switchTab({ url: '/pages/home/userIndex' })
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    }
  }
}
</script>

<style lang="scss">
.wrapper-user-open {
  .user-open-list {
    width: 650px;
    margin: 36px auto 0;
    display: flex;
    flex-direction: column;
    .open-item {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .user-agreement {
    position: fixed;
    left: 0;
    bottom: 120px;
    width: 100%;
    font-size: $uni-font-size-sm;
    display: flex;
    justify-content: center;
    .agreement-checkbox {
      display: flex;
      width: auto;
      checkbox {
        margin: -2px 8px 0 0;
      }
    }
    .agreement-link {
      display: inline-block;
      color: #004ea2;
    }
  }
}
</style>
