<template>
  <view class="content page-activity-detail">
    <view class="section">
        <view class="section-titlebar">
            <image :src="articleInfo.url"></image>
        </view>
        <view class="section-content">
            <view class="article-title">{{articleInfo.title}}</view>
            <view class="article-price text-sub mt10">￥{{articleInfo.price}}</view>
            <view class="mt10 text-size-sm text-gray ">{{articleInfo.time}}</view>
            <view class="text-size-sm text-gray">嘉宾：{{articleInfo.guest}}</view>
            <view class="text-size-sm text-gray">地点：{{articleInfo.address}}</view>   
        </view>
         <view class="section-detail">
            <image :src="articleInfo.content" style="height:1304rpx;"></image>
        </view>
    </view>
    <view class="side-bar">
        <view><image src="/static/icon/home.png" class="icon"></image><text class="db">首页</text></view>
        <view :class="collected == 1 ? 'active' : ''">
            <image src="/static/icon/collect.png" class="icon icon--normal"></image>
            <image src="/static/icon/collect_a.png" class="icon icon--actived"></image>
            <text class="db">收藏</text></view>
        <view><button class="btn btn-bg-main text-white round btn-size-big" @click="openPopup">立即报名</button></view>
    </view>
   <view>
    <uniPopup ref="popup" type="bottom" >
        <view class="pop-content">
            <view class="con-title ellipsis2">{{articleInfo.title}}</view>
            <view class="con-price"><text>票价</text><text class="text-sub text-price">￥{{articleInfo.price}}</text></view>
            <view class="con-no mt20 mb20">
                <text>参加人数</text>
                <view>
                    <uni-number-box @change="bindChange" class="number-box-skin-1"></uni-number-box>
                </view>
            </view>
        </view>
        <view class="pop-btns">
            <view class="text-total">合计：￥<text>88元</text></view>
            <view class="btn-close"><button class="btn btn-bg-main text-white" @click="closePopup">确认支付</button></view>
        </view>
        
    </uniPopup>
    </view>
  </view>
</template>

<script>
import {uniPopup,uniNumberBox} from "@dcloudio/uni-ui"

  export default {
    data() {
      return {
        title: '活动',
        articleInfo:{
            url:"/static/images/80345754996997.png",
            title:"实物编程机器人，实现孩子创新启蒙，爱上编程爱上编程",
            price:88,
            time:"2019年8月10日 9:00 ～ 2019年9月15日 20:00",
            guest:"毛俊程老师",
            address:"罗湖店",
            content:"/static/images/dt.png"
        },
        collected:0,
        show:false,
      }
	},
	components: {
        uniPopup,
        uniNumberBox
	},
    onLoad() {

    },
    methods: {
        openPopup(){
            this.$refs.popup.open()
        },
        closePopup(){
            this.$refs.popup.close()
        },
        bindChange(){
            
        }
    }
  }
</script>

<style lang="scss">
.page-activity-detail{
    .section-titlebar image{
        width: 750px;
        height: 2*210px;
    }
    .section-content{
        padding: 2*20px;
    }
    .article-title{
        font-size:2*18px;
        font-weight: bold;
    }
    .article-price{
        font-size: 2*20px;
    }
    .text-gray{
        line-height: 1.5;
    }
    .section-detail{
        border-top:12px solid $yoyi-border-color
    }
}
.side-bar{
    position: fixed;
    display: flex;
    width: 100%;
    height: 2*48px;
    background-color: #fff;
    box-shadow: 0 -2px 4px #EDEDED;
    z-index: 2;
    left:0;
    bottom:0;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    view{
        font-size: 2*11px;
        color: #4F4F4F;
        line-height: 1;
    }
    .icon{
        width: 2*22px;
        height: 2*22px;
        margin-bottom:3px;

        
        &--actived{
            display: none;
        }
    }
    .active .icon--normal{
        display: none;
    }
    .active .icon--actived{
        display: block;
    }
    
}
.pop-content{
    padding:30px;
    .con-title{
        font-size: 2*16px;
        margin-bottom: 2*11px;
    }
    .con-price,.con-no{
        display: flex;
        justify-content:space-between;
        font-size: 2*13px;
    }
    .text-price {
        font-size: 2*18px;
    }
    .con-no text{
        font-size: 2*13px;
    }
}
.pop-btns{
    display: flex;
    height: 2*48px;
    align-items: center;
    justify-content: space-around;
    
    .text-total{
        flex: 1;
        padding-left:2*20px;
        border-top:1px solid $yoyi-border-color;
        height: 2*48px;
        line-height: 2*48px;

        text{
            font-size: 2*18px;
        }
    }
    .btn-close .btn{
        font-size: 2*18px;
        height: 2*48px;
        border-radius: 0;
        width: 2*140px;
    }
}
.uni-popup .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
    padding: 0;
}
</style>
