<template>
  <view class="search-bar">
    <!-- 选择门店搜索框 -->
    <view class="search-bar--location">
      <view class="location text-main search-item__text" @click="selectBrand">
        <text class="icon icon-location" style="background-image: url(https://res67.yoyibook.com:20185/DefaultRes/Images/VUE/static/icon/icon_location.png);"></text>
        <text class="location-text">{{name}}</text>
        <text class="icon icon-select" style="background-image: url(https://res67.yoyibook.com:20185/DefaultRes/Images/VUE/static/icon/icon_select.png);"></text>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/modules/api'
import appG from '@/modules/appGlobal'

export default {
  data() {
    return {
      keyword: "",
      name: "--"
    }
  },
  props: {
    type: String,
    brandName: {
      type: String,
      default: ''
    }
  },
  components: {},
  created() {
    let items = appG.getBrandStore()
    if (items == null) {
      this.api_215()
    } else {
      this.name = items.filter(item => item.selected)[0].name
    }
  },
  methods: {
    //选择
    selectBrand() {
      uni.navigateTo({
        url: "./selectShopBrand"
      })
    },
    //取消选择
    cancelClick() {
      this.keyword = ''
    },
    //设置选择查询的关键词
    selectKey(params) {
      this.keyword = params
    },
    //加载运营品牌信息
    api_215(cb) {
      let that = this
      api.post(api.api_215, api.getSign(), function (ele, res) {
        if (res.data.Basis.State == api.state.state_200) {
          res.data.Result.forEach((o, i) => {
            if (i == 0) {
              that.$set(o, "selected", true)
            } else {
              that.$set(o, "selected", false)
            }
          })
          //运营品牌写入缓存
          appG.setBrandStore(res.data.Result)
          that.name = res.data.Result.filter(item => item.selected)[0].name
          if (cb != undefined) {
            cb()
          }

        }
      })
    }

  }
}
</script>

<style lang="scss">
.search-bar {
  .icon-select-brand {
    display: inline-flex;
    width: 34px;
    height: 20px;
  }
  font-size: 28px;
  &--location {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 2 * 6px 2 * 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    .search-item__text {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
    }
    .location-text {
      margin: 0 10px;
      font-size: 34rpx;
    }
  }
  &--buttons {
    display: flex;
    align-items: center;
    background: #f4f4f4;
    padding: 2 * 6px 2 * 10px;
    .search-item__text {
      display: flex;
      align-items: center;
    }
    .location-text {
      margin: 0 10px;
    }
    .search-item__btns {
      margin-left: 10px;
    }
    .search-item__input {
      flex: 1;
      display: flex;
      align-items: center;
      height: 2 * 32px;
      background: #fff;
      border-radius: 2 * 17px;
      border: 1px solid #979797;
    }
  }
  &--normal {
    display: flex;
    align-items: center;
    background: #f4f4f4;
    padding: 2 * 6px 2 * 10px;
    .search-item__input {
      flex: 1;
      display: flex;
      align-items: center;
      height: 2 * 32px;
      background: #fff;
      border-radius: 2 * 17px;
      border: 1px solid #979797;
      input {
        flex: 1;
      }
      .icon-search {
        margin: 0 20px;
      }
    }
  }
}
</style>
