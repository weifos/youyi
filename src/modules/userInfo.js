import store from '@/store'
import api from '@/modules/api'
import app_g from '@/modules/appGlobal'

export default {
    data: {
        user: { token: '' },
        confirmOrder: {},
        historyKeyWord: [],
        hisCourseKeyWord: [],
        historyProduct: [],
        pdtListLayout: 1
    },
    methods: {
        getUser() {
            let env = app_g.util.getEnv()
            switch (env) {
                case 'wxweb':
                    let user1 = window.localStorage.getItem("user_info")
                    if (user1) {
                        return JSON.parse(user1)
                    }
                    return { token: '' }

                case 'wxmini':
                    let user2 = wx.getStorageSync('user_info')
                    if (user2) {
                        return JSON.parse(user2)
                    }

                    return { token: '' }
                default:
                    break
            }
        },
        //登录设置本地数据
        login(result) {
            this.user = result
            let env = app_g.util.getEnv()
            switch (env) {
                case 'wxweb':
                    window.localStorage.setItem("token", result.token)
                    try {
                        //解决用app内嵌的webview打开网站时，localStorage就失效了
                        //如果在app里面嵌入 ws.setDomStorageEnabled(true) 设置该属性
                        window.localStorage.setItem("user_info", JSON.stringify(result))
                    }
                    catch (err) {
                        store.commit('showLoading', { loading: true, title: err, times: 3000 })
                    }
                    break

                case 'wxmini':
                    try {
                        //wx.setStorage 的同步版本
                        wx.setStorageSync("user_info", JSON.stringify(result))
                    } catch (err) {
                        store.commit('showLoading', { loading: true, title: err, times: 3000 })
                    }
                    break

                default:
                    break
            }
        },
        //登录设置本地数据
        loginOut() {
            this.user = { token: '' }
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user_info')
        },//刷新登录
        refreshLogin(cb) {
            let $this = this
            this.post(api.api_300, this.GetSign(),
                function (vue, res) {
                    console.log(res.data.Result)
                    if (res.data.Basis.State == api.state.state_200) {
                        $this.login(res.data.Result)
                        cb(res.data.Result)
                    } else {
                        vue.$vux.toast.text(res.data.Basis.Msg, 'default')
                    }
                }
            )
        },//提交购物
        sumitSCart(result) {
            this.sCartOrder = result
            window.localStorage.removeItem('sCartOrder')
            window.localStorage.setItem("sCartOrder", JSON.stringify(result))
        },//提交立即购买
        buyNow(result) {
            this.buyNowOrder = result
            window.localStorage.removeItem('buyNowOrder')
            window.localStorage.setItem("buyNowOrder", JSON.stringify(result))
        },//设置历史查看商品
        setHistoryProduct(result) {
            if (result == undefined || result == '') return
            let products = window.localStorage.getItem("historyProduct")
            if (products == null) {
                products = []
                products.push(result)
            } else {
                products = JSON.parse(products)
                if (!products.some((ele) => { return ele.id == result.id })) {
                    products.splice(0, 0, result)
                    if (products.length > 10) {
                        products.splice(products.length - 1, 1)
                    }
                }
            }

            window.localStorage.setItem("historyProduct", JSON.stringify(products))
            this.historyProduct = products
        },//设置商品列表页布局
        setPdtListLayout(result) {
            if (result == undefined || result == '') return
            window.localStorage.setItem("pdtListLayout", result)
            this.pdtListLayout = result
        },//设置历史查询关键词
        setHistoryKeyWord(result) {
            if (result == undefined || result == '') return
            let keyWords = window.localStorage.getItem("historyKeyWord")
            if (keyWords == null) {
                keyWords = []
                keyWords.push(result)
            } else {
                keyWords = JSON.parse(keyWords)
                if (!keyWords.some((ele) => { return ele == result })) {
                    keyWords.splice(0, 0, result)
                    if (keyWords.length > 10) {
                        keyWords.splice(keyWords.length - 1, 1)
                    }
                }
            }

            window.localStorage.setItem("historyKeyWord", JSON.stringify(keyWords))
            this.historyKeyWord = keyWords
        },//设置课程查询历史关键词
        setHisCourseKeyWord(result) {
            if (result == undefined || result == '') return
            let keyWords = window.localStorage.getItem("hisCourseKeyWord")
            if (keyWords == null) {
                keyWords = []
                keyWords.push(result)
            } else {
                keyWords = JSON.parse(keyWords)
                if (!keyWords.some((ele) => { return ele == result })) {
                    keyWords.splice(0, 0, result)
                    if (keyWords.length > 10) {
                        keyWords.splice(keyWords.length - 1, 1)
                    }
                }
            }

            window.localStorage.setItem("hisCourseKeyWord", JSON.stringify(keyWords))
            this.hisCourseKeyWord = keyWords
        },//删除单个历史查询关键词
        delHistoryKeyWord(keyword) {
            if (this.historyKeyWord.length == 0) return
            this.historyKeyWord.forEach((ele, index) => {
                if (ele == keyword) {
                    this.historyKeyWord.splice(index, 1)
                }
            })
            window.localStorage.setItem("historyKeyWord", JSON.stringify(this.historyKeyWord))
            this.historyKeyWord = this.historyKeyWord
        },//删除课程单个历史查询关键词
        delHisCourseKeyWord(keyword) {
            if (this.hisCourseKeyWord.length == 0) return
            this.hisCourseKeyWord.forEach((ele, index) => {
                if (ele == keyword) {
                    this.hisCourseKeyWord.splice(index, 1)
                }
            })
            window.localStorage.setItem("hisCourseKeyWord", JSON.stringify(this.hisCourseKeyWord))
            this.hisCourseKeyWord = this.hisCourseKeyWord
        },//清空历史查询关键词
        clearHistoryKeyWord() {
            if (this.historyKeyWord.length == 0) return
            //          this.$vux.confirm.show({
            //              title: '确认清空吗',
            //              onCancel() { },
            //              onConfirm() {
            window.localStorage.setItem("historyKeyWord", JSON.stringify([]))
            this.historyKeyWord = []
            //              }
            //          })

        },//清空历史查询关键词
        clearHisCourseKeyWord() {
            if (this.hisCourseKeyWord.length == 0) return
            this.$vux.confirm.show({
                title: '确认清空吗',
                onCancel() { },
                onConfirm() {
                    window.localStorage.setItem("hisCourseKeyWord", JSON.stringify([]))
                    this.hisCourseKeyWord = []
                }
            })

        },//是否登录
        islogin() {
            if (window.localStorage.getItem("token") == undefined) {
                return false
            } else {
                return true
            }
        },
        openid() {
            return window.localStorage.getItem("openid")
        },
        onLoad: function () {

        }
    },
    created() {
        let that = this
        let env = app_g.util.getEnv()
        switch (env) {
            case 'wxweb':
                //提交购物车
                let sCOrder = window.localStorage.getItem("sCartOrder")
                if (sCOrder) {
                    this.sCartOrder = JSON.parse(sCOrder)
                }

                //立即购买
                let buyNow = window.localStorage.getItem("buyNowOrder")
                if (buyNow) {
                    this.buyNowOrder = JSON.parse(buyNow)
                }

                let keyWords = window.localStorage.getItem("historyKeyWord")
                if (keyWords) {
                    this.historyKeyWord = JSON.parse(keyWords)
                }

                let products = window.localStorage.getItem("historyProduct")
                if (products) {
                    this.historyProduct = JSON.parse(products)
                }

                //商品布局
                let pdtListLayout = window.localStorage.getItem("pdtListLayout")
                if (pdtListLayout) {
                    this.pdtListLayout = pdtListLayout
                }
                break

            case 'wxmini':
                let user = wx.getStorageSync('user_info')
                if (user) {
                    that.user = JSON.parse(user)
                }
                break

            default:
                break
        }

    }
}

