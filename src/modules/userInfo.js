import api from '@/modules/api'

export default {
    data: {
        store: null,
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
        },//是否登录
        isLogin() {
            let user = this.getUser()
            if (user.token.length) { return true }
            return false
        },//登录设置本地数据
        login(result) {
            this.user = result
            //同步设置用户信息
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
            uni.setStorage('sCartOrder', JSON.stringify(result))
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
        },
        //设置门店列表在本地缓存
        setStores(result) {
            this.store = result
            uni.setStorageSync('store', JSON.stringify(result))
        },
        //获取门店列表
        getStores() {
            let entity = uni.getStorageSync('store')
            if (entity) {
                return JSON.parse(entity)
            }
            return null
        },
        //设置选择活动的门店信息
        setAtyStore(result) {
            uni.setStorageSync('aty_store', JSON.stringify(result))
        },
        //获取活动门的门店信息
        getAtyStore() {
            let entity = uni.getStorageSync('aty_store')
            if (entity) {
                return JSON.parse(entity)
            }
            return null
        },
        //设置历史查询关键词
        setHistoryKeyWord(result) {
            if (result == undefined || result == '') return
            let keyWords = uni.getStorageSync('historyKeyWord')
            if (!keyWords.length) {
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
            uni.setStorageSync('historyKeyWord', JSON.stringify(keyWords))
            this.historyKeyWord = keyWords
        },//获取历史查询关键词
        getHistoryKeyWord() {
            let keyWords = uni.getStorageSync('historyKeyWord')
            if (keyWords.length) {
                return JSON.parse(keyWords)
            }
            return []
        },
        //删除单个历史查询关键词
        delHistoryKeyWord(keyword) {
            if (this.historyKeyWord.length == 0) return
            this.historyKeyWord.forEach((ele, index) => {
                if (ele == keyword) {
                    this.historyKeyWord.splice(index, 1)
                }
            })
            window.localStorage.setItem("historyKeyWord", JSON.stringify(this.historyKeyWord))
            this.historyKeyWord = this.historyKeyWord
        },//清空历史查询关键词
        clearHistoryKeyWord() {
            uni.removeStorageSync('historyKeyWord')
            this.historyKeyWord = []
        },//设置课程调查问卷
        setOrderCourseAnswer(result) {
            uni.setStorageSync('course_answer', JSON.stringify(result))
        },
        //获取课程调查问卷
        getOrderCourseAnswer() {
            let entity = uni.getStorageSync('course_answer')
            if (entity) {
                return JSON.parse(entity)
            }
            return null
        }
    }
}

