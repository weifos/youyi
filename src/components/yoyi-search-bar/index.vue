<template>
  <view class="search-bar">
    <!-- 选择门店搜索框 -->
    <view class="search-bar--location" v-if="type == 'location'">
      <view class="location text-main search-item__text" @click="selectClick">
        <text class="icon icon-location" style="background-image: url(/static/icon/icon_location.png);"></text>
        <text class="location-text">{{city+" "+storeName}}</text>
        <text class="icon icon-select" style="background-image: url(/static/icon/icon_select.png);"></text>
      </view>
      <view class="search-item__input">
        <text class="icon icon-search" style="background-image: url(/static/icon/icon_search.png);"></text>
        <input type="text" placeholder-class="input-placeholder" :placeholder="placeholderText" v-model="keyword" />
      </view>
      <view class="search-item__btns">
        <button class="btn-noborder">搜索</button>
      </view>
    </view>
    <view class="search-bar--buttons" v-else-if="type == 'buttons'">
      <view class="search-item__input">
        <text class="icon icon-search" style="background-image: url(/static/icon/icon_search.png);" @click="search"></text>
        <input type="text" maxlength="30" placeholder-class="input-placeholder" :placeholder="placeholderText" v-model="keyword" @change="keyChange($event)" />
      </view>
      <view class="search-item__btns">
        <button class="btn-noborder">取消</button>
      </view>
    </view>
    <view class="search-bar--normal" v-else>
      <view class="search-item__input">
        <text class="icon icon-search" style="background-image: url(/static/icon/icon_search.png);"></text>
        <input type="text" placeholder-class="input-placeholder" :placeholder="placeholderText" v-model="keyword" @click="goSearch" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      city: "深圳市",
      storeName: "罗湖店"
    }
  },
  props: {
    type: String,
    placeholderText: {
      type: String,
      default: '搜索您想要的商品'
    }
  },
  components: {},
  onLoad() {
  },
  methods: {
    //选择
    selectClick() {
      uni.navigateTo({
        url: "../activity/select-shop"
      })
    },
    //设置选择查询的关键词
    selectKey(params) {
      this.keyword = params
    },
    //去搜索
    goSearch() {
      this.$emit('goSearch')
    },
    //立即搜索
    search() {
      this.$emit('search', this.keyword)
    },
    //输入改变事件
    keyChange(e) { }
  }
}
</script>

<style lang="scss">
.search-bar {
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
    }
    .location-text {
      margin: 0 10px;
    }
    .search-item__input {
      flex: 1;
      display: flex;
      align-items: center;
      height: 2 * 32px;
      background: #f0f0f0;
      border-radius: 2 * 17px;
      margin: 0 20px;

      input {
        flex: 1;
      }
      .icon-search {
        margin: 0 20px;
      }
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

      input {
        flex: 1;
      }
      .icon-search {
        margin: 0 20px;
      }
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
