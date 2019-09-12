<template>
  <view class="content page-cart">
      <view class="cart-list">
          <view class="list-item" v-for="item in cartList" :key="item">
              <uni-swipe-action :options="options">
                    <view class='cont'>
                        <view class="check-bar"><checkbox :checked="item.checked" color="#FFB825"/></view>
                        <view class="img-bar"><image :src="item.url"></image></view>
                        <view class="text-bar">
                            <view class="ellipsis">{{item.name}}</view>
                            <view class="side-bar">
                                <text class="text-sub text-size-basic">￥{{item.price}}</text>
                                <uni-number-box :value="item.no"  class="number-box-skin-1"></uni-number-box>
                            </view>
                        </view>
                    </view>
                </uni-swipe-action>
          </view>
      </view>
      <view class="operation-bar">
          <view class="text-bar align-center">
              <view class="dib text-size-md"><checkbox :checked="checked" color="#FFB825"/> <text class="dib vam">全选</text></view>
              <view class="dib text-size-basic">合计：¥<text class="bold text-size-md">5.8元</text></view>
          </view>
          <view class="btns-bar">
              <button class="btn text-size-basic text-white bg-sub">去结算</button>
          </view>
      </view>
  </view>
</template>

<script>
import {uniSwipeAction,uniNumberBox} from "@dcloudio/uni-ui"
 export default {
    data() {
        return{
             options: [{
                text: '删除',
                style: {
                    backgroundColor: '#FFB825'
                }
            }],
            cartList:[
                {
                    url:"/static/images/27891160-1_l_2.png",
                    name:"中国少年儿童百科全书(全套共全套共全套共...",
                    price:"96.72",
                    no:2,
                    checked:0
                },
                {
                    url:"/static/images/27891160-1_l_2.png",
                    name:"中国少年儿童百科全书(全套共全套共全套共...",
                    price:"96.72",
                    no:1,
                    checked:1
                }
            ]
        }
    },
    components: {
        uniSwipeAction,
        uniNumberBox
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
.page-cart{
    padding-bottom: 2*48px;
    .cont{
        display: flex;
        align-items: center;
        height: 2*80px;
        justify-content: space-around;
    }
    .cart-list{
        .img-bar{
            image{
                width: 2*80px;
                height: 2*80px;
            }
        }
        .check-bar{
            padding-left: 20px;
        }
        .text-bar{
            width:2*211px;
            padding-right: 10px;
        }
        .side-bar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2*35px;
        }
        .list-item{
            padding: 2*10px 0;
        }
    }
}
.operation-bar{
    background-color: #fff;
    z-index: 1;
    position: fixed;
    width: 100%;
    height: 2*48px;
    box-shadow:0 -1px 0 #EDEDED;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left:0;
    bottom:0;

    .text-bar{
        flex: 1;
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
    }
    checkbox{
        margin-right:20px
    }
    .btn{
        height: 2*48px;
        width: 2*140px;
    }
}

</style>