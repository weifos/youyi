import Vue from 'vue'
import Vuex from 'vuex'
import storeG from './storeG'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: { storeG },
    state: {
        textColor: '#FFFFFF',
        bgColor: '#004EA2',
    },
    mutations: {},
    actions: {},
    getters: {
        textColor: state => state.textColor,
        bgColor: state => state.bgColor,
    },
})

export default store
