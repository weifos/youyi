<template>
  <view class="wrapper-user-address add-address">
    <view class="user-address-content">
      <view class="evan-form-show">
        <evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="form" :model="info">
          <evan-form-item label="收货人：" prop="name">
            <input class="form-input" placeholder-class="form-input-placeholder" v-model="info.contact" placeholder="姓名" />
          </evan-form-item>
          <evan-form-item label="手机号：">
            <input class="form-input" placeholder-class="form-input-placeholder" v-model="info.mobile" maxlength="11" placeholder=" 11位手机号" />
          </evan-form-item>
          <evan-form-item label="所在地区：" prop="regionsName">
            <pick-regions :defaultRegion="defaultRegions" @getRegion="handleGetRegions" style="width:100%">
              <input class="form-input" placeholder-class="form-input-placeholder" v-model="regionsName" placeholder="请选择 >" />
            </pick-regions>
          </evan-form-item>
          <evan-form-item label="详细地址：" prop="address">
            <input class="form-input" placeholder-class="form-input-placeholder" v-model="info.address" placeholder="道路、小区、单元室、门牌号等" />
          </evan-form-item>
          <evan-form-item label="邮编：" prop="postal_code">
            <input class="form-input" placeholder-class="form-input-placeholder" v-model="info.postal_code" placeholder="邮政编码" />
          </evan-form-item>
          <evan-form-item label="默认收货地址：">
            <checkbox :checked="info.is_default" :disabled="isCanCheck" @click="checkDefault(info.is_default)" class="btn-check" style="height:38rpx;width:38rpx;" color="#FFB825;" />
          </evan-form-item>
        </evan-form>
        <button @click="save" class="evan-form-show__button">保存</button>
      </view>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'

import EvanForm from "@/components/evan-form/evan-form.vue";
import EvanFormItem from "@/components/evan-form/evan-form-item.vue";
import utils from "@/components/evan-form/utils.js";
import pickRegions from "@/components/pick-regions/pick-regions.vue";
export default {
  components: {
    EvanForm,
    EvanFormItem,
    pickRegions
  },
  data() {
    return {
      isSelect: false,
      regions: [],
      defaultRegions: ["广东省", "广州市", "番禺区"],
      hideRequiredAsterisk: true,
      //如果是默认，则不能选中
      isCanCheck: false,
      sexes: [
        {
          name: "男",
          value: "man"
        },
        {
          name: "女",
          value: "woman"
        }
      ],
      //表单的内容
      info: {
        id: 0,
        contact: "",
        mobile: "",
        postal_code: "",
        province: "",
        city: "",
        area: "",
        address: "",
        is_default: false,
        sex: 0
      },
      rules: {
        contact: {
          required: true,
          message: "请输入姓名"
        },
        regions:
        {
          required: true,
          message: "请输选择省市区",
          validator: (rule, value, callback) => {
            if (this.regions.length) {
              callback()
            }
          }
        },
        address: {
          required: true,
          message: "请选输入详细地址"
        }
      }
    };
  },
  onLoad(opt) {
    if (opt.isSelect) {
      this.isSelect = true
    }

    if (opt.id) {
      this.api_316(opt.id)
    }
  },
  computed: {
    regionsName() {
      // 转为字符串
      return this.regions.map(item => item.name).join(" ");
    }
  },
  mounted() {
    // 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    // 获取选择的地区
    handleGetRegions(regions) {
      this.regions = regions
    },
    /**
     * 根据ID获取收货地址
     */
    api_316: function (id) {
      let that = this
      api.post(api.api_316, api.getSign({ ID: id }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            that.info = res.data.Result
            //设置省 市 区
            that.defaultRegions = [res.data.Result.province, res.data.Result.city, res.data.Result.area]
            that.regions = [{ name: res.data.Result.province }, { name: res.data.Result.city }, { name: res.data.Result.area }]
            that.isCanCheck = that.info.is_default
          }
        })
    },
    /**
     * 保存收货地址
     */
    api_309: function () {
      let that = this
      let regionList = that.regions
      that.info.province = regionList[0].name
      that.info.city = regionList[1].name
      that.info.area = regionList[2].name

      api.post(api.api_309, api.getSign(that.info),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            let url = 'manage'
            if (that.isSelect) {
              url += '?isSelectAuto=true'
            }

            uni.navigateTo({ url: url })
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, duration: 2000 })
          }
        })
    },
    /**
     * 保存收货地址
     */
    save() {
      let that = this
      let is_check = false
      let s = this.$refs.form.validate(res => {
        if (res) {

          if (!appG.verifyStr.isPhone(this.info.mobile)) {
            appG.dialog.showToast({
              title: '手机号码输入有误',
              icon: 'none'
            })
            return
          }

          //保存收货地址
          that.api_309()
        }
      })
    },
    /**
     * 修改性别
     */
    sexChange(e) {
      this.info.sex = e.detail.value
    },
    /**
     * 设置默认收货地址
     */
    checkDefault(val) {
      this.info.is_default = !val
    }

  }
};
</script>

<style lang="scss">
.add-address {
  background-color: #f1f1f1;
  width: 100%;
  min-height: 100%;
  padding: 10px * 2 0;
  box-sizing: border-box;

  uni-picker {
    width: 100%;
  }

  .evan-form-show__button {
    background-color: #ffb825;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
  }
}
.evan-form-show {
  padding: 0 30rpx;
  background-color: #fff;
  .form-input {
    font-size: 28rpx;
    color: #333;
    text-align: right;
    width: 100%;
    box-sizing: border-box;
    height: 60rpx;
    &.textarea {
      height: 240rpx;
      padding: 24rpx 0;
    }
  }
  .form-input-placeholder {
    font-size: 28rpx;
    color: #999;
  }
  &__button {
    width: 100%;
    height: 88rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 36rpx;
    color: #fff;
    margin-top: 20rpx;
    background-color: #2d87d5;
    &::before,
    &::after {
      border: none;
    }
  }
  .customize-form-item {
    &__label {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 16rpx;
    }
    &__radio {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      &__text {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}
</style>