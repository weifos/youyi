<template>
  <view class="page-select-shop" >
     <yoyiLocation></yoyiLocation>
     <view class="list list-address">
         <view class="list-item" v-for="(item,index) in listData" :key="item" @click="selectAddress(index)">
             <view class="item__title">{{item.title}}</view>
             <view class="item__address text-gray text-size-sm mt10">{{item.address}}</view>
             <view class="item__icon" v-if="index == curIndex"><checkbox checked="checked" color="#FFB825"/></view>
         </view>
     </view>
  </view>
</template>

<script>
import yoyiLocation from "@/components/yoyi-location";
  export default {
    data() {
      return {
          curIndex:1,
          listData:[{
              title:"宝安店",
              address:"宝安八区前进一路97号"
          },{
              title:"宝安店",
              address:"宝安八区前进一路97号宝安八区前进一路97号宝安八区前进一路97号宝安八区前进一路97号"
          },{
              title:"宝安店",
              address:"宝安八区前进一路97号"
          }]
      }
    },
    props:{
       
    },
	components: {
		yoyiLocation
	},
    onLoad() {

    },
    methods: {
        selectAddress(index){
            this.curIndex=index;
        }
    }
  }
</script>

<style lang="scss">
.list-address{
    .list-item{
        padding: 2*20px 2*40px 2*20px 2*20px;
        border-bottom:1px solid $yoyi-border-color;
        position: relative;
    }
    .item__icon{
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%)
    }
}
</style>
