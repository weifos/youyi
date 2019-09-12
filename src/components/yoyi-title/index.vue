<template>
  <view class="wrapper-title">
    <view class="title-main">{{title}}</view>
    <template v-if="url == ''">
      <view class="title-more">{{more}}</view>
    </template>
    <template v-else>
      <navigator class="title-more" hover-class="" :url="url">{{more}}&gt;</navigator>
    </template>
  </view>
</template>
<script>
  export default {
    name: 'title',
    props: {
      title: {
        type: [String],
        default: '',
      }, // 类型
      more: {
        type: String,
        default: '',
      }, // 名称
      url: {
        type: String,
        default: '',
      }, // 跳转链接
    },
  }
</script>
<style scoped lang="scss">
  .wrapper-title{
    width:646px;
    height:100px;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    .title-main{
      font-size:$uni-font-size-lg;
      color:$yoyi-text-color-basic;
      line-height:100px;
    }
    .title-more{
      font-size:$uni-font-size-base;
      color:$yoyi-text-color-grey;
      line-height:100px;
    }
  }
</style>