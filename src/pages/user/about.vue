<template>
  <view class="wrapper-user-about">
    <view class="user-about-content">
      <view class="user-about-code">
        <image></image>
      </view>
      <view class="user-about-tips">关注友谊书城公众号</view>
    </view>
  </view>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .wrapper-user-about{
    margin-top:200px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    .user-about-code{
      margin:30px auto;
      width:340px;
      height:340px;
      image{
        width:340px;
        height:340px;
      }
    }
    .user-about-tips{
      height:44px;
      font-size:32px;
      font-weight:500;
      color:$yoyi-text-color-basic;
      line-height:44px;
    }
  }
</style>