import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import WXBizDataCrypt from '@/modules/WXBizDataCrypt'

module.exports = {
    /**
      * 检查登录态是否过期
      */
    checkSession(func) {
        let that = this
        //获取用户信息
        let userInfo = user.methods.getUser()
        //检查登录
        wx.checkSession({
            //未过期，处于登录态
            success() {
                wx.getSetting({
                    success: res => {
                        if (!wx.getStorageSync('session_key') || !userInfo.openid) {
                            that.wxLogin(func)
                        } else {
                            func(userInfo.openid)
                        }
                    },
                    fail: res => {
                        console.log(res, "失败回调")
                    }
                })
            },
            //已经过期
            fail() {
                that.wxLogin(func)
            }
        })
    },

    /**
     * 用户数据初始化
     */
    wxLogin(func) {
        let wxuser = user.methods.getUser()
        wx.login({
            //调用接口获取登录凭证（code），包含openid，session_key
            success: function (res) {
                if (res.code) {
                    //小程序初始化微信用户
                    api.post(api.api_103, api.getSign({
                        Code: res.code
                    }), function (app, res) {
                        if (res.data.Basis.State == api.state.state_200) {
                            //session_key 写入缓存 
                            uni.setStorageSync('session_key', res.data.Result.session_key);
                            wxuser.openid = res.data.Result.openid
                            user.methods.login(wxuser)
                            func(res.data.Result.openid)
                        } else {
                            wx.showToast({
                                title: '网络错误',
                                icon: 'none',
                                duration: 3000
                            })
                        }
                    })
                }
            }
        })
    },

    /**
      * 绑定手机号码
      */
    bindMobile: function (e, func) {
        let this_ = this
        let userInfo = user.methods.getUser()
        if (e.detail.errMsg === "getPhoneNumber:ok") {
            //小程序appId
            let appId = wx.getAccountInfoSync().miniProgram.appId
            //解密数据
            let pc = new WXBizDataCrypt(appId, wx.getStorageSync('session_key'))
            //获取手机号码数据包
            let wx_result = pc.decryptData(e.detail.encryptedData, e.detail.iv)
            //获取手机号码
            let mobile = wx_result.phoneNumber
            let store_id = 0
            //当前定位的门店
            let aty_store = user.methods.getAtyStore()
            if (aty_store != null) {
                store_id = aty_store.id
            }

            //请求服务器
            api.post(api.api_104,
                api.getSign({ StoreId: store_id, OpenID: userInfo.openid, Mobile: mobile }),
                function (app, res) {
                    if (res.data.Basis.State == api.state.state_200) {
                        userInfo = res.data.Result
                        user.methods.login(userInfo)
                        appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 2000 })
                    } else {
                        appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 2000 })
                    }
                    func(res.data.Basis.State, userInfo)
                })
        }
    },


    /**
     * 获取小程序用户信息
     */
    getWxUser(e, func) {
        let that = this
        var userInfo = user.methods.getUser()
        if (e.detail.errMsg == 'getUserInfo:ok') {
            var wxuser = {}
            wxuser.openid = userInfo.openid
            wxuser.headimgurl = e.detail.userInfo.avatarUrl
            wxuser.nickname = e.detail.userInfo.nickName
            //wxuser.nickname = encodeURI(wxuser.nickname)
            wxuser.language = e.detail.userInfo.language
            wxuser.country = e.detail.userInfo.country
            wxuser.province = e.detail.userInfo.province
            wxuser.city = e.detail.userInfo.city
            wxuser.sex = e.detail.userInfo.gender
            api.post(api.api_105, api.getSign({
                WeChatUser: wxuser
            }),
                function (app, res) {
                    if (res.data.Basis.State == api.state.state_200) {
                        userInfo.img = wxuser.headimgurl
                        userInfo.nickname = decodeURI(wxuser.nickname)
                        user.methods.login(userInfo)
                        wx.showToast({
                            title: res.data.Basis.Msg,
                            duration: 2000
                        })

                    } else {
                        wx.showToast({
                            title: res.data.Basis.Msg,
                            icon: 'none',
                            duration: 3000
                        })
                    }
                    func(res.data.Basis.State, e.detail.userInfo)
                })
        }
    },

    /**
     * 用户授权页面
     */
    toAuth() {
        wx.redirectTo({
            url: '../../passport/authorize/authorize'
        })
    }

}