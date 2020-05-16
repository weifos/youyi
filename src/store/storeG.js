import appG from '@/modules/appGlobal'

const global = {
    dialog: {
        title: '请求中',
        //上中下 1，2，3
        layout: 3,
        //显示时间
        times: 2500,
        //加载状态
        loading: false
    },
    //底部导航图片索引
    bottomNav: {
        index: 0
    }
}

// mutations
const mutations = {
    showLoading(state, item = {}) {
        if (item.title) {
            global.dialog.title = item.title
        }
        if (item.layout) {
            global.dialog.layout = item.layout
        }

        //加载状态
        global.dialog.loading = item.loading == undefined ? true : item.loading

        let env = appG.util.getEnv()
        switch (env) {
            case 'wxweb':
                global.dialog.loading = item.loading == undefined ? true : item.loading
            case 'wxmini':
                if (global.dialog.loading) {
                    if (item.times == undefined) {
                        wx.showLoading({
                            title: global.dialog.title,
                            mask: global.dialog.loading
                        })
                    } else {
                        wx.showToast({
                            title: global.dialog.title,
                            icon: 'none',
                            duration: item.times
                        })
                    }
                } else {
                    wx.hideLoading()
                }
            default:
                break
        }
    },
    setBottomNav(item = {}) {
        global.dialog.index = item.index == undefined ? 0 : item.index
    }
}

export default {
    global,
    mutations
}