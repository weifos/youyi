<template>
  <view class="content page-sign-up">
    <view class="sign-up-list">
      <view class="list-title">
        {{formData[0].type}}
      </view>
      <radio-group class="agreement-checkbox" @change="checkboxChange">
      <view class="list-item" v-for="sItem in formData[0].list" :key="sItem">
        <radio :checked="checked" :value="sItem.name" color="#FFB825"/>
        <text>{{sItem.name}}</text>
        <input v-if="sItem.type =='other'" class="yoyi-input-normal" :placeholder="sItem.text" placeholder-class="input-placeholder" />
      </view>
      </radio-group>
    </view>
     <view class="sign-up-list mt20" >
      <view class="list-title">
        {{formData[1].type}}
      </view>
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
      <view class="list-item" v-for="sItem in formData[1].list" :key="sItem">
        <checkbox :checked="checked" color="#FFB825"/>
        <text>{{sItem.name}}</text>
        <input v-if="sItem.type =='other'" class="yoyi-input-normal" :placeholder="sItem.text" placeholder-class="input-placeholder" />
      </view>
      </checkbox-group>
    </view>
    <view class="btns-bar">
     <operationButton buttonText="确定"></operationButton>
    </view>
  </view>
</template>

<script>
  import operationButton from '@/components/yoyi-operation-button/'
  export default {
    data() {
      return {
        formData:[
          {
            type:"您的职业",
            list:[
              {
                id:"0",
                name:"创业者",
                type:"normal"
              },
              {
                id:"1",
                name:"自由职业者",
                type:"normal"
              },
              {
                id:"2",
                name:"公司管理者",
                type:"normal"
              },
              {
                id:"3",
                name:"全职妈妈",
                type:"normal"
              },
              {
                id:"4",
                name:"其他（请补充）",
                type:"other",
                text:"请输入您的职业"
              }
            ]
          },
          {
            type:"喜欢领域（可多选）",
            list:[
              {
                id:"0",
                name:"生活美学",
                type:"normal"
              },
              {
                id:"1",
                name:"艺文阅读",
                type:"normal"
              },
              {
                id:"2",
                name:"亲子互动",
                type:"normal"
              },
              {
                id:"3",
                name:"职场技能",
                type:"normal"
              },
              {
                id:"4",
                name:"其他（请补充）",
                type:"other",
                text:"请输入您喜欢的领域"
              }
            ]
          }
        ]
      }
    },
    onLoad() {

    },
    components: {
      operationButton
    },
    methods: {

    }
  }
</script>

<style lang="scss">
.page-sign-up{
  padding-bottom:2*48px;
}
.sign-up-list{
  .list-title{
    height: 2*50px;
    line-height: 2*50px;
    padding: 0 0 0 2*20px;
  }
  .list-item{
    // height: 2*36px;
    line-height: 2*36px;
    padding-left:2*24px;

    text{
      margin-left:20px;
    }
  }
  .yoyi-input-normal{
    width: 2*291px;
    margin-left:50px;
  }
}
</style>
