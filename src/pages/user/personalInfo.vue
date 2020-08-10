
<template>
  <view class="container page-user-info">
    <view class="user-form bg-white">
      <!-- <view class="cu-form-group">
          <view class="title">电话</view>
          <input placeholder="请输入您的电话" ></input>
      </view>-->
      <view class="cu-form-group">
        <view class="title">昵称</view>
        <input type="text" placeholder="请输入您的昵称" v-model="userInfo.nickname" />
      </view>
      <view class="cu-form-group select-sex">
        <view class="title">性别</view>
        <radio-group class="block" @change="sexChange">
          <radio :checked="userInfo.sex == 1 ? 'true' : ''" :value="1"></radio>
          <text class="dib vam">男</text>
          <radio :checked="userInfo.sex == 0 ? 'true' : ''" :value="0"></radio>
          <text class="dib vam">女</text>
        </radio-group>
      </view>
      <view class="cu-form-group">
        <view class="title">生日</view>
        <view class="uni-list-cell-db">
          <picker mode="date" :value="userInfo.birth" :start="startDate" :end="endDate" @change="dateChange">
            <view class="uni-input">{{userInfo.birth}}</view>
          </picker>
        </view>
      </view>
    </view>
    <view class="side-bar">
      <button class="btn btn-bg-main text-white btn-size-full text-size-lg" @click="api_301">保存资料</button>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import user from '@/modules/userInfo'
import appG from '@/modules/appGlobal'
import passport from "@/modules/passport"
import uniList from '@/components/uni-list/uni-list.vue'

export default {
  components: { uniList },
  data() {
    return {
      //1:非会员 2:普通会员 3:高级会员
      userInfo: {
        id: 0,
        nickname: '',
        birth: '',
        sex: 1
      }
    }
  },
  onLoad() {
    let _user = user.methods.getUser()
    this.bindUser(_user)
  },
  onShow() {
    let that = this
    //检测成功回调
    passport.checkSession(function (openid) {
      let wxUser = user.methods.getUser()
      if (!wxUser.login_name) {
        //加载用户信息
        that.api_106()
      } else {
        that.bindUser(wxUser)
        //检测页面重定向
        that.checkRedirect()
      }
    })
  },
  methods: {
    /**
     * 加载微信用户信息
     */
    bindUser: function (user) {
      if (user.birth) user.birth = appG.util.date.dateFormat(user.birth, 'yyyy-MM-dd')
      else user.birth = ""
      this.userInfo.login_name = appG.util.getHideMobile(user.login_name)
      this.userInfo = user
    },
    /**
     * 加载用户信息
     */
    api_106: function () {
      let that = this
      let userInfo = user.methods.getUser()
      api.post(api.api_106, api.getSign({ OpenID: userInfo.openid }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            if (res.data.Result.login_name != undefined) {
              //昵称
              res.data.Result.nickname = decodeURI(res.data.Result.nickname)
              //登录
              user.methods.login(res.data.Result)
              //绑定用户
              that.bindUser(res.data.Result)
              //检测页面重定向
              that.checkRedirect()
            } else {
              //弹出手机号码授权
              that.isLogin = false
            }
          } else {
            appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
          }
        })
    },
    /**
     * 更新用户信息
     */
    api_301: function () {
      var that = this
      //请求接口
      api.post(api.api_301, api.getSign({
        UserDetails: that.userInfo
      }), function (app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 2000 })
          that.api_106()
        } else {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        }
      })
    },
    /**
     * 路由跳转
     */
    goUrl(url) {
      uni.navigateTo({
        url,
      })
    },
    /**
     * 检测是否需要重定向
     */
    checkRedirect(url) {
      let returl = uni.getStorageSync('returl')
      if (returl != "") {
        uni.removeStorage({ key: 'returl', success: function (res) { } })
        uni.navigateTo({ url: returl })
      }
    },
    /**
     *  日期选择改变
     */
    dateChange(e) {
      let birth = e.detail.value
      this.userInfo.birth = birth
    },
    /**
     *  性别选择改变
     */
    sexChange(e) {
      let sex = e.detail.value
      this.userInfo.sex = sex
    },
    /**
     * 检测是否需要重定向
     */
    open() {
      this.$refs.calendar.open()
    }
  }
}
</script>

<style lang="scss">
.container {
  padding-bottom: 141rpx;
}
.page-user-info input {
  font-size: 27rpx;
  flex: 1;
  font-size: 30rpx;
  color: #555;
  padding-right: 20rpx;
}
.cu-form-group {
  justify-content: flex-start;
  background-color: #ffffff;
  padding: 10rpx 65rpx;
  display: flex;
  align-items: center;
  min-height: 100rpx;
  justify-content: space-between;
}
.cu-form-group .title {
  text-align: justify;
  font-size: 30rpx;
  position: relative;
  height: 60rpx;
  width: 100rpx;
  line-height: 60rpx;
}
.select-sex text {
  font-size: 27rpx;
  margin: 0 45rpx 0 10rpx;
}
.cu-form-group > text[class*="cuIcon-"] {
  font-size: 36rpx;
  padding: 0;
  box-sizing: border-box;
}
.cu-form-group picker .picker {
  text-align: left;
}
.cu-form-group picker:after {
  content: "";
}
.form-btns {
  text-align: center;
  padding: 109rpx 0 0 0;
}
.form-btns .btn-save {
  width: 435rpx;
  height: 80rpx;
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
}
.cu-form-group + .cu-form-group {
  border-top: 1rpx solid #eee;
}
.calendar-button {
  flex: 1;
  font-weight: bold;
  font-size: 32rpx;
}
</style>
