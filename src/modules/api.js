import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import md5 from 'blueimp-md5'
import store from '../store'

//测试环境  
let domain = "http://yy.api.youyi.com/"
let res_domain = "http://yy.res.youyi.com/"
//测试环境配置
if (process.env.NODE_ENV !== 'production') {
    domain = "http://yy.api.youyi.com/"
    res_domain = "http://yy.res.youyi.com/"
}

/// <summary>
/// 全局配置类
/// @author   叶委  
/// @date     2014-05-23         
/// </summary>
module.exports = {
    //资源站点
    res: res_domain,
    //微信授权
    api_100: domain + "100",
    //根据openid自动登录
    api_101: domain + "101",
    //获取微信wxconfig
    api_102: domain + "102",
    // 103 注册，小程序初始化微信用户 第一步 
    api_103: domain + "103",
    //注册，第二步绑定手机号码
    api_104: domain + "104",
    //第三步，小程序注册，授权完善微信用户数据 
    api_105: domain + "105",
    //加载用户数据
    api_106: domain + "106",
    //发送验证码
    api_110: domain + "110",
    //用户登录
    api_120: domain + "120",
    //用户注册
    api_121: domain + "121",
    //找回密码
    api_122: domain + "122",
    //更新密码
    api_123: domain + "123",
    //绑定新手机号
    api_124: domain + "124",
    //首页接口
    api_200: domain + "200",
    //分类列表页-获取分类
    api_201: domain + "201",
    //分类列表页-获取商品列表
    api_202: domain + "202",
    //加载商品详情
    api_203: domain + "203",
    // 扫码点单
    api_204: domain + "204",
    // 课堂页数据
    api_205: domain + "205",
    // 
    api_206: domain + "206",
    // 
    api_207: domain + "207",
    // 
    api_208: domain + "208",
    //
    api_209: domain + "209",
    //
    api_210: domain + "210",
    //
    api_211: domain + "211",
    //
    api_212: domain + "212",
    //
    api_213: domain + "213",
    //
    api_300: domain + "300",
    //
    api_301: domain + "301",
    //获取购物车
    api_302: domain + "302",
    //更新购物车
    api_303: domain + "303",
    //删除购物车
    api_304: domain + "304",
    //
    api_305: domain + "305",
    //加入购物车
    api_306: domain + "306",
    //
    api_307: domain + "307",
    //
    api_308: domain + "308",
    //
    api_309: domain + "309",
    //
    api_310: domain + "310",
    //
    api_311: domain + "311",
    //
    api_312: domain + "312",
    //
    api_313: domain + "313",
    //创建咖啡订单
    api_314: domain + "314",
    //微信小程序预支付订单
    api_317: domain + "317",
    //订单列表
    api_318: domain + "318",
    //获取签名
    getSign(obj = {}) {
        let { token } = user.methods.getUser()
        function sort(obj) {
            if (obj instanceof Array) {
                //如果数组里面存放的为对象,通过map更改数组结构，排序
                obj = obj.map((ele, index) => {
                    if (ele instanceof Object) {
                        var newObj = {}
                        Object.keys(ele).sort().forEach(function (key) {
                            var o = ele[key]
                            if (o instanceof Object) {
                                o = sort(o)
                            }
                            newObj[key] = o
                        })
                        ele = newObj
                    }
                    return ele
                })
                return obj
            }

            var newObj = {}
            //默认情况下，对字符串排序，是按照ASCII的大小比较的，现在，我们提出排序应该忽略大小写，按照字母序排序。要实现这个算法，
            //不必对现有代码大加改动，只要我们能定义出忽略大小写的比较算法就可以
            Object.keys(obj).sort((s1, s2) => {
                let x1 = s1.toUpperCase()
                let x2 = s2.toUpperCase()
                if (x1 < x2) {
                    return -1
                }
                if (x1 > x2) {
                    return 1
                }
                return 0
            }).forEach(function (key) {
                var o = obj[key]
                if (o instanceof Object) {
                    o = sort(o)
                }
                newObj[key] = o
            })
            return newObj
        }

        const sign_data = {
            Data: obj,
            Global: { IMEI: "", IMSI: "", IP: "", OS: 3, Sign: "", Token: token }
        }

        return {
            Data: obj,
            Global: {
                IMEI: "", IMSI: "", IP: "", OS: 3,
                Sign: md5(JSON.stringify(sort(sign_data)) + ')(4AzEdr5J6a`@#$*%'),
                Token: token
            }
        }
    },
    //请求对象
    post(url, data, cb, ch) {
        uni.showLoading({
            title: '加载中'
        })
        uni.request({
            url: url,
            method: "post",
            data: data,
            header: {
                //'custom-header': 'hello' 
            },
            //请求成功回调
            success: (res) => {
                //如果登录失效
                if (res.data.Basis != undefined && res.data.Basis.State == 205 || res.data.Basis.State == 211) {
                    //主动注销用户信息
                    this.UserInfo.loginOut()
                    //弹出登录失效错误信息
                    uni.showToast({ title: res.data.Basis.Msg, duration: 2000 })
                    //删除用户信息
                    wx.removeStorageSync('user_info')
                    //当前页面路径
                    var returl = appG.util.getUrl()
                    //存储到缓存
                    wx.setStorageSync("returl", returl)
                    //重新跳转到用户中心
                    router.goUrl({ url: "/pages/user/index?backUrl=" + returl })
                } else {
                    cb(this, res)
                }
            },
            //请求失败的回调
            fail: (res) => {
                console.log("错误来自于err" + res)
            },
            //接口调用结束的回调函数（调用成功、失败都会执行）
            complete: (res) => {
                uni.hideLoading()
            }
        })
    },
    //状态码
    state: {
        // 系统错误
        state_500: 500,
        // 响应成功 
        state_200: 200,
        // 验证通过 
        state_0: 0,
        // 验证未通过
        state_1: 1,
        // 用户未登陆
        state_30045: 30045
    }
}