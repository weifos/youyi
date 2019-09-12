<template>
  <view class="component-location" >
      <view :class="['city-cur',show == true ? 'show' : '']" @click="showLayout">所选城市：<text>{{selected}}</text>
      </view>
      <view class="city-list" v-if="show">
          <view @click="selectItem(item)" :class="['list-item',selected == item ? 'cur' : '']" v-for="item in cityList" :key="item"><view class="yoyi-tag">{{item}}</view></view>
      </view>
  </view>
</template>

<script>
import {uniTag} from "@dcloudio/uni-ui"
  export default {
    data() {
      return {
        selected:"深圳",
        cityList:["深圳","广州","东莞","广州1","东莞2","广州2"],
        show:false
      }
    },
    props:{
       
    },
	components: {
		uniTag
	},
    onLoad() {

    },
    methods: {
        showLayout(){
            if(this.show){
                this.show=false;
            }else{
                this.show=true;
            }
        },
        selectItem(text){
            this.selected=text;
            this.show=false;
        }
    }
  }
</script>

<style lang="scss">
.component-location{
    position: relative;
    .city-cur{
        background-color: #F5F5F5;
        height:2*44px ;
        line-height: 2*44px;
        padding: 0 40px;
        position: relative;

        &:after{
            content:"";
            background: url("~@/static/icon/icon_select.png") no-repeat 0 0 /100% auto;
            width: 2*14px;
            height: 2*12px;
            right:40px;
            top:50%;
            position: absolute;
            transform: translateY(-50%);
            transition: 0.3s all;
        }
        &.show:after{
            transform: translateY(-50%) rotate(180deg)
        }
    }
    .city-list{
        background-color: #fff;
        width:100%;
        padding:2*20px 2*20px 0 2*20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        position: absolute;
        top:2*44px;
        left:0;
        display: flex;
        flex-flow: wrap;
        text-align: center;box-sizing: border-box;
        z-index: 1;
    }
    .list-item{
        width: 25%;
        margin-bottom: 2*20px;

        &.cur .yoyi-tag{
            background-color: $yoyi-bg-color;
            color: #fff;
        }
    }
    .yoyi-tag{
        width:2*70px;
        height: 2*30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border:1px solid $yoyi-bg-color;
        border-radius: 2*6px;
    }
}
</style>
