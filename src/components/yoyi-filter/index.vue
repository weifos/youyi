<template>
  <view :class="['component-filter','component-filter-'+curIndex]" @click="onFilterClick">
      <slot>
      </slot>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        curIndex:0
      }
    },
    props:{
       
    },
	components: {
		
	},
    onLoad() {

    },
    methods: {
        onFilterClick(){
            if(this.curIndex < 2){
                this.curIndex++;
            }else{
                this.curIndex=1;
            }
        }
    }
  }
</script>

<style lang="scss">
.component-filter{
    font-size: $uni-font-size-sm;
    position: relative;
}
.component-filter:before{
    content: "";
    background: url('~@/static/icon/triangle_1.png') no-repeat 0 0/100% auto;
    width:16px;
    height:10px;
    position: absolute;
    right:-20px;
    top:5px;
}
.component-filter:after{
    content: "";
    background: url('~@/static/icon/triangle.png') no-repeat 0 0/100% auto;
    width:16px;
    height:10px;
    position: absolute;
    right:-20px;
    bottom:5px;
}
.component-filter-1:before{
    background-image: url('~@/static/icon/triangle2.png');
}
.component-filter-2:after{
    background-image: url('~@/static/icon/triangle2_1.png');
}
</style>
