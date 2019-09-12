<template>
  <view class="wrapper-point">
    <view class="point-content">
      <view class="point-summary">
        <view class="summary-count">
          <text>824</text>
        </view>
        <view class="summary-title">当前积分</view>
      </view>
      <view class="point-button">
        <navigator class="point-button-1" hover-class="" url="/pages/user/point-detail">
          <view></view>
          <view>积分明细</view>
        </navigator>
        <navigator class="point-button-2" hover-class="" url="/pages/user/point-rule">
          <view></view>
          <view>积分规则</view>
        </navigator>
      </view>
      <view class="point-title">
        <yoyiTitle title="会员积分兑换专区"></yoyiTitle>
      </view>
    </view>
    <view class="pay-coupon-list">
      <view class="pay-coupon-item" v-for="(value, key) in [1,2,3,4,5,6,7,8]" :key="key">
        <yoyiCoupon
          type="2"
          :shopName="`友谊书城${key}`"
          title="图书8折优惠券"
          amount="3"
          unit="张"
          rule="线上、门店通用"
          point="500"
          @click="jump(value)"></yoyiCoupon>
      </view>
    </view>
  </view>
</template>
<script>
  import yoyiTitle from '@/components/yoyi-title/'
  import yoyiCoupon from '@/components/yoyi-coupon/'

  export default {
    components: {yoyiTitle, yoyiCoupon},
    methods: {
      jump(item) {
        uni.navigateTo({
          url: `/pages/user/point-convert?id=${item}`,
        })
      },
    },
  }
</script>
<style lang="scss">
  page{ background-color:$yoyi-page-bg-color; }

  .wrapper-point{
    .point-content{
      /*width:750px;
      margin:0 auto;
      position:fixed;
      left:0;
      height:520px;
      z-index:2;
      background:#fff;*/
    }
    .point-summary{
      width:100%;
      position:relative;
      height:300px;
      background:$yoyi-bg-color;
      color:#fff;
      display:flex;
      flex-direction:column;
      justify-content:center;
      text-align:center;
      .summary-count{
        font-size:80px;
      }
      .summary-title{
        font-size:24px;
      }
      .summary-detail{
        position:absolute;
        right:-2px;
        bottom:30px;
        border-radius:200px 0px 0px 200px;
        border:1px solid rgba(255, 255, 255, 1);
        width:96px;
        height:34px;
        padding:7px 20px;
        font-size:24px;
        font-weight:400;
        color:rgba(255, 255, 255, 1);
        line-height:34px;
      }
    }
    .point-button{
      padding:30px 0;
      height:60px;
      line-height:60px;
      display:flex;
      font-weight:400;
      color:rgba(0, 86, 178, 1);
      width:750px;
      background:#f1f5fa;
      text-align:center;
      font-size:28px;
      .point-button-1,
      .point-button-2{
        view:first-child{
          margin:10px 10px 0 0;
          height:40px;
          width:40px;
        }
        view:nth-child(2){
          height:60px;
          line-height:60px;
        }
      }
      .point-button-1{
        width:100%;
        display:flex;
        justify-content:center;
        view:first-child{
          background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAMAAAAhD3VJAAAAilBMVEUAAAAAT6MAUaUAT6MAUacATqIAZLQATqMATqIAT6MAUqYAT6MAUKQAUaYATqIAbbkATqMAT6MAT6MAT6MAT6QAT6MAT6MAT6MATqMAU6sAV6gAT6MAT6MAT6MATqMAT6MATqMAT6MAT6MAT6QAUKQATqMATqMAT6IATqMAUKQATqIATqIATqUATqIw6ALtAAAALXRSTlMAqzX0JrMIcuz8IrQsGvkD5+PAa0TUx19YEgygr5SFN968eFFM2sukizCXfz72AxJpAAACNklEQVRYw82Xb4+iMBCHR9EKLAUU5L8gu66uuvP9v95dtaThShnkLrl93pXkidOZMfkVzATRp7WLYRbxHgWV+7q6WqPEr4vX1OLLF97nGgVh+oqbhsKx3llXe9JMVZszCkr+7JqtTiT8goJzA5L84HR1ELC7pd/Sa1Fw/Bh3P46P/n4Vg9+x9cyqt0PB2wo02PujIueQD6v5zXmM5zTaCzsKhnbRptrSJCjYx4ZdLDk1f31j3XU3HoKi9tXGql2cuoRuhYJtKisOe+Mh6TZWzOTbkuMh0Hprc4CzNh4SubF3AB9xx+BVYtF0AERc/FHWlYGG12/J6re2HpBZgkcX+rAWbXeK3IhJ9G0mln4zRS5CafddZ0nKAs9WtnIz8s66rVxK1m3lUrJuK5eUdVu5pKzbnnIpWbcdzSVkHm0elPhk9zxG1wkyC3EY50rLLppIaTnYGdyQU7KwvaUkRcRDd7gy6s59lv3/0s+Wa9vqQETfktgVo2WOJjJazn2THNMynBZvkgQR992h2vyzhrl/Iwc24m2uDN/tgs+QFf9HPoV7F8AyBCRC3iKWAJUhIMlhpgY5QawB3LALSDqln+QGmR/uTOxjieZIT7NMVKSfQbqdFOnZqTGkMzrSZ1vEaCyd4YWPXu5iTmfm7MplWzMinYlIr8dtOVAqnclIrwd9exPAKF6LMtJrn245EKifiQK9GBp1Qa0NNKq1VTY2AOo9gebHA/2eECRLIDBu7DaDefC6jBj8SH4B5rGZ6drTFjMAAAAASUVORK5CYII=) 0 0 no-repeat;
          background-size:contain;
        }
      }
      .point-button-2{
        width:100%;
        border-left:2px solid rgba(0, 86, 178, 1);
        display:flex;
        justify-content:center;
        view:first-child{
          background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAaVBMVEUAAAAATqQAT6MAT6MATqMAUKYATqMAT6MATqMAT6MAT6QAT6MAUKQAU6YAW7UATqMAVKsAT6MAT6MAU6YAVqYAWbMATqMAT6IAT6MATqIATqQAT6IAUKQAUagAT6MAT6IAWqUAUqQATqJYWCUIAAAAInRSTlMAJ/nCbzzI66ObeFBFKwjNFLlfHxcF7t+xsKCScCT0hBE7GCGergAAAepJREFUSMeUklmSgzAMRBVjzG72HVI1uv8hB+SQzQLC+6JKNBLdDTw6DgfVekJ4rRrCWMPPZNIR+IFwZPaT1O0EMojOPZc6uItzLK983PDycSqiqJjG3MMNv9rXxg0alEzgjUQqNDTxnlYKXBHBbM9uwWMoWWkdINEnwJL0SAQ1k49xKnUPzEyNb5m112j9wzpo36i/d5ubQzghNJd/eYUL9whOie64ID8yIittbVnaavL8LbGqYW8uFaIq2cubV1t88spaoqgvsMG/7VJG2lqMhLVaU2JbpJTSH5yKP5Y5b8892NCGFGz61+putY/r5Jwu2plr6hpOR70Uz9ht+VNqV0pkWz9muMRta4pDeVxEGcu0oI9cg84VGmJcSIClLoqanySrKqa2ecCTI+Y7I4/6PODuGxUuVLvfxYF+fTzw9MbPRrK5RcTpunhCxJaOL66LC7JqTSq6Lo7WrP5LL5MUAGEgCI7oPxLy/0eKl740Uoe6iVggyUwvCla/rQ7MXVWGhOEekownwz2eWQyGezGykgz3SkYMGG4xmCefANwyFAFkuAUw0ktwS2+JPsAt+nPnGeCymzI6gGN0YLH7e71/LJbMfdY5a8DcRawQgUZEKRHiZHz0wbUj8wWRWYR1URNkQfHVyJcyVQdfnxdr54pPgOQAAAAASUVORK5CYII=) 0 0 no-repeat;
          background-size:contain;
        }
      }
    }
    .point-title{
      padding:0 30px;
      width:690px;
      height:100px;
      line-height:100px;
      margin:0 auto;
      font-size:32px;
      font-weight:400;
      color:$yoyi-text-color-basic;
      background:#fff;
    }
    .pay-coupon-list{
      /*padding-top:540px;*/
      padding:20px 0;
      .pay-coupon-item{
        margin-bottom:28px;
        transform:scale(0.9);
        &:last-child{
          margin-bottom:0;
        }
      }

    }
  }
</style>