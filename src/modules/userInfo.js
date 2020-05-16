import api from '@/modules/api'

export default {
    data: {
        user: { token: '' },
        //购物车信息
        sCartOrder: {},
        //立即购买临时数据
        buyNowOrder: {},
        historyKeyWord: [],
        hisCourseKeyWord: [],
        historyProduct: [],
        pdtListLayout: 1
    },
    methods: {
        //获取用户信息
        getUser() {
            //同步获取token
            let user1 = uni.getStorageSync('user_info')
            if (user1) {
                return JSON.parse(user1)
            }
            return { token: '' }
        },//登录设置本地数据
        login(result) {
            this.user = result
            //同步步设置用户信息
            uni.setStorageSync('user_info', JSON.stringify(result))
        },//登录设置本地数据
        loginOut() {
            this.user = { token: '' }
            uni.removeStorage({
                key: 'token',
                success: function (res) { }
            })
            uni.removeStorage({
                key: 'user_info',
                success: function (res) { }
            })

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
        },//清空购物
        clearShoppingCart(result) {
            this.sCartOrder = []
            //同步清空购物
            uni.removeStorageSync({
                key: 'sCartOrder',
                data: result.token,
                success: function () { }
            })
        },//设置购物车
        setShoppingCart(result) {
            this.sCartOrder = result
            //异步设置购物车
            uni.setStorageSync({
                key: 'sCartOrder',
                data: JSON.stringify(result),
                success: function () { }
            })
        },//设置立即购买
        setBuyNow(result) {
            this.buyNowOrder = result
            //同步设置提交立即购买
            uni.setStorageSync('buyNowOrder', JSON.stringify(result))
        },//获取立即购买
        getBuyNow(result) {
            let entity = uni.getStorageSync('buyNowOrder')
            if (entity) {
                return JSON.parse(entity)
            }
            return null
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
            window.localStorage.setItem("historyKeyWord", JSON.stringify([]))
            this.historyKeyWord = []
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
        isLogin() {
            let user = this.getUser()
            if (user.token.length) { return true }
            return false
        }
    }
}

