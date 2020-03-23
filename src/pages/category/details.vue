<template>
  <view class="content page-category-details">
      <view class="product-banner-bar">
          <swiper class="swiper" indicator-dots="true" autoplay="false">
            <swiper-item v-for="item in bannerImg" :key="item">
                <image :src="item"></image>
            </swiper-item>
        </swiper>
      </view>
      <view class="product-info-bar section">
          <view class="product-price text-sub">￥{{productInfo.price}}</view>
          <view class="product-title mt15 text-size-lg bold">{{productInfo.title}}</view>
          <view class="product-intro text-gray text-size-sm mt15 ellipsis2">{{productInfo.intro}}</view>
          <view class="product-info text-size-sm mt15">{{productInfo.info}}</view>
      </view>
      <view class="product-discount-bar section" v-if="discountInfo.length > 0">
          <view class="section-title">促销</view>
          <view class="discount-item ellipsis" v-for="item in discountInfo" :key="item">
              <text class="discount-tag">{{item.type}}</text>
              <text class="discount-title ">{{item.name}}</text>
          </view>
          <view class="icon-arrow"></view>
      </view>
      <view class="product-address-bar section">
          <view class="text-address"><text class="text-gray">送至</text> <text class="ml20">广东 深圳 南山</text></view>
           <view class="icon-arrow"></view>
          <view class="text-freight mt10">运费：6元</view>
      </view>
      <view class="product-detail-bar section">
          <image src="/static/images/dt.png" style="width:100%;height:1358rpx;"></image>
      </view>
      <!-- product-side-bar s -->
      <view class="product-side-bar">
          <view class="icon-bar">
              <view class="item btn-home">
                  <view class="icon-home"></view>
                  <view class="text text-size-sm">首页</view>
              </view>
              <view :class="['item btn-collect',collected == true ? 'active' : '']" @click="onClickCollect">
                  <view class="icon-collect"></view>
                  <view class="text text-size-sm">收藏</view>
              </view>
              <view class="item btn-cart">
                  <view class="icon-cart"></view>
                  <view class="text text-size-sm">购物车</view>
              </view>
          </view>
          <view class="btns-bar">
              <button class="btn bg-sub text-white text-size-basic" @click="openPopup">立即购买</button>
              <button class="btn bg-main text-white text-size-basic">加入购物车</button>
          </view>
      </view>
      <!-- product-side-bar e -->
      <!-- popup s -->
      <uniPopup ref="popup" type="bottom" class="pop-product yoyi-pop" >
        <view class="pop-content">
            <view class="hidden border-bottom">
                <view class="con-img"><image :src="orderInfo.url"></image></view>
                <view class="con-info">
                    <view class="con-price"><text class="text-sub text-price">￥{{orderInfo.price}}</text></view>
                    <view class="con-select-info mt10">
                        已选 黑色 大号
                    </view>
                </view>
            </view>
            <view class="parameter-list mt20  border-bottom" v-for="item in orderInfo.parameter" :key="item">
                <view class="parameter-title">{{item.type}}</view>
                <view :class="['parameter-item',sItem.selected == 1 ? 'active' : '']" v-for="sItem in item.value" :key="sItem">
                    {{sItem.name}}
                </view>
            </view>
            <view class="con-no mt40">
                <text>数量</text>
                <view>
                    <uni-number-box  class="number-box-skin-1"></uni-number-box>
                </view>
            </view>
        </view>
        <view class="pop-btns">
            <button class="btn btn-bg-main text-white btn-size-full text-size-lg" @click="closePopup">确定</button>
        </view>
        <view class="btn-close-pop" @click="closePopup"><view class="icon-close"></view></view>
    </uniPopup>
    <!-- popup e -->
  </view>
</template>

<script>
import {uniPopup,uniNumberBox} from "@dcloudio/uni-ui"
import operationButton from '@/components/yoyi-operation-button/'
  export default {
    data() {
      return {
        collected:false,
        bannerImg:[
          "/static/images/c2177d86a8199176802cd6.png",
          "/static/images/c2177d86a8199176802cd6.png",
          "/static/images/c2177d86a8199176802cd6.png"
        ],
        productInfo:{
            title:"中国少年儿童百科全书(全套共10册)",
            intro:"专业百科社打造少年儿童百科权威版本；大量二维码视频打造立体式情景阅读体验，全套共10册，包含地球...",
            info:"贺晓兴 著／中国大百科全书出版社／2016.09.15",
            price:88
        },
        discountInfo:[{
            type:"优惠购",
            name:"现在购买享受 ¥ 27.50，限购10件…"
        },
        {
            type:"加价购",
            name:"现在购买享受 ¥ 27.50，限购10件…"
        }
        ],
        orderInfo:{
            url:"/static/images/27891160-1_l_2.png",
            price:88,
            parameter:[
            {
                type:"颜色",
                value:[{
                    name:"黑色",
                    selected:1,
                },{
                    name:"蓝色",
                    selected:0,
                },{
                    name:"白色",
                    selected:0,
                }]
            },{
                type:"规格",
                value:[{
                    name:"大",
                    selected:1,
                },{
                    name:"中",
                    selected:0,
                },{
                    name:"小",
                    selected:0,
                }]
            }]
        }
      }
    },
    components: {
       uniPopup,
       uniNumberBox,
       operationButton
    },
    onLoad() {

    },
    methods: {
        onClickCollect(){
            this.collected=true;
        },
        openPopup(){
            this.$refs.popup.open()
        },
        closePopup(){
            this.$refs.popup.close()
        },
    }
  }
</script>

<style lang="scss">
.page-category-details{
    padding-bottom: 2*48px;
    .section{
        border-top:8px solid $yoyi-border-color;
        background-color: #fff;
        padding: 2*10px 2*20px;
        position: relative;
    }
    .product-price{
        font-size: 2*20px;
    }
    .product-discount-bar .icon-arrow{
        position: absolute;
        right:20px;
        top:50%;
        transform:translateY(-50%);
    }
    .product-address-bar .icon-arrow{
        position: absolute;
        right: 20px;
        top:30px;
    }
    .section-title{
        position: absolute;
        left: 0px;
        top:0px;
        color: $yoyi-text-color-red;
        font-size: $uni-font-size-base;
    }
    .discount-item{
        padding:0 2*40px; 
        display: flex;
        margin-bottom: 10px;
        .discount-tag{
            display: inline-flex;
            height: 2*19px;
            width: 2*50px;
            align-items: center;
            justify-content: center;
            color: $yoyi-text-color-red;
            border:1px solid $yoyi-text-color-red;
            font-size: $uni-font-size-sm;
            margin-right: 10px;
        }
        .discount-title{
            display: inline-flex;
            font-size: 2*13px;
        }
    }
}
.product-banner-bar{
    .swiper{
        height: 2*375px;
    }
    swiper-item{
        display: flex;
        align-items: center;
    }
    image{
        width: 100%;
    }
}
.product-side-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2*48px;
    display: flex;
    align-items:center;
    justify-content:space-between;
    background-color: #fff;
    box-shadow:0 -1px 2px $yoyi-border-color;

    .icon-bar,.btns-bar{
        display: inline-flex;
        justify-content:space-around;
        width: 50%;
        align-items: center;
    }
    .icon-cart,.icon-collect,.icon-home{
        margin:0 auto;
    }
    .btns-bar{
        height: 100%;
        .btn{
            width: 50%;
            height: 100%;
        }
    }
}
.uni-popup .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
    padding: 0;
}
.btn-close-pop{
    position: absolute;
    right: 20px;
    top: 20px;
}
.pop-product{
    .pop-content{
        padding: 2*20px;
    }
    .con-info{
        padding-top: 30px;
    }
    .border-bottom{
        border-bottom:1px solid $yoyi-border-color;
    }
    .con-img{
        float: left;
        margin-right:2*20px;
        image{
            width: 2*80px;
            height: 2*80px;
        }
    }
    .parameter-list{
        .parameter-title{
            font-size: 2*13px;
            margin-bottom: 20px;
        }
        .parameter-item{
            display: inline-block;
            width: 2*60px;
            height: 2*30px;
            line-height: 2*30px;
            text-align: center;
            background-color: #F5F5F5;
            color: #4F4F4F;
            font-size: 28px;
            border-radius: 12px;
            margin: 0 40px 40px 0;
            box-sizing: border-box;

            &.active{
                background-color: #fff;
                border:1px solid $yoyi-text-color-sub;
                color: $yoyi-text-color-sub;
            }
        }
    }
    .con-no{
            display: flex;
        justify-content:space-between;
    }
}
</style>
