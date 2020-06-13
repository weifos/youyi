<template>
  <view class="content page-category-search">
    <view class="top-bar">
      <searchBar type="buttons" @search="search" ref="searchBar"></searchBar>
    </view>
    <view class="section-search">
      <view class="search-title">热门搜索</view>
      <view class="search-list">
        <view class="list-item" v-for="item in hotList" :key="item" @click="selectKey(item)">{{item}}</view>
      </view>
    </view>
    <view class="section-search">
      <view class="search-title">
        <text>最近搜索</text>
        <text class="btn-clear" @click="clearKeywords">清除</text>
      </view>
      <view class="search-list">
        <view class="list-item" v-for="item in nearList" :key="item">{{item}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import { uniTag } from "@dcloudio/uni-ui"
import searchBar from "@/components/yoyi-search-bar"

export default {
  data() {
    return {
      hotList: [],
      nearList: []
    }
  },
  components: {
    searchBar,
    uniTag
  },
  onLoad() {
    this.api_211()
    this.nearList = user.methods.getHistoryKeyWord()
  },
  methods: {
    onClickList() {
      this.nearList = []
    },
    //加载查询关键词
    api_211() {
      let that = this
      api.post(api.api_211, api.getSign(), function (vue, res) {
        if (res.data.Basis.State == api.state.state_200) {
          that.hotList = res.data.Result
        } else {
          uni.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        }
      })
    },
    //设置查询关键词
    selectKey(params) {
      this.$refs.searchBar.selectKey(params)
    },
    //立即搜索
    search(keyword) {
      let k = keyword
      user.methods.setHistoryKeyWord(k)
      let url = 'search-result'
      if (k != '') { url += '?k=' + k }
      uni.navigateTo({ url })
    },
    //清空搜索关键词
    clearKeywords() {
      uni.showModal({
        title: '提示',
        content: '确认删除吗',
        success: function (res) {
          if (res.confirm) {
            this.hotList = []
            user.methods.clearHistoryKeyWord()
          }
        }
      })

    }
  }
}
</script>

<style lang="scss">
.section-search {
  padding: 2 * 20px 2 * 20px 0 2 * 20px;

  .search-title {
    margin-bottom: 2 * 10px;
    font-size: 2 * 14px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
.search-list {
  font-size: 0;
  .list-item {
    display: inline-block;
    font-size: 2 * 14px;
    background-color: $yoyi-border-color;
    height: 2 * 30px;
    line-height: 2 * 30px;
    padding: 0 20px;
    border-radius: 2 * 5px;
    margin: 0 2 * 10px 2 * 10px 0;
  }
}
</style>
