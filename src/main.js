import Vue from 'vue'
import App from './App'
import store from './store'
import user from "@/modules/userInfo"
import axios from 'axios'

Vue.prototype.$ajax = axios
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})

//用户数据
Vue.prototype.UserInfo = new Vue(user)

app.$mount()
