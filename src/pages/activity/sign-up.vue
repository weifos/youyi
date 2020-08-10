<template>
  <view class="content page-sign-up">
    <view class="sign-up-list" v-for="(item,index) in result">
      <view v-if="item.type===0" class="list-title">{{item.title+'（单选）'}}</view>
      <view v-if="item.type===1" class="list-title">{{item.title+'（多选）'}}</view>

      <radio-group v-if="item.type===0" class="agreement-checkbox" :data-questId="item.id" @change="checkedChange">
        <view class="list-item" v-for="(sItem,i) in item.answer_list" :key="i">
          <radio :checked="sItem.is_checked" :value="sItem.id+'_䨻_'+sItem.answer_val" :id="sItem.id" color="#FFB825" />
          <text>{{sItem.answer_val}}</text>
          <!-- <input class="yoyi-input-normal" v-if="i === item.answer_list.length-1" :placeholder="'请补充'" placeholder-class="input-placeholder" /> -->
        </view>
      </radio-group>
      <checkbox-group v-if="item.type===1" class="agreement-checkbox" :data-questId="item.id" @change="checkedChange">
        <view class="list-item" v-for="(sItem,i) in item.answer_list" :key="i">
          <checkbox :checked="sItem.is_checked" :value="sItem.id+'_䨻_'+sItem.answer_val" :id="sItem.id" color="#FFB825" />
          <text>{{sItem.answer_val}}</text>
          <!-- <input class="yoyi-input-normal" v-if="i === item.answer_list.length-1" :placeholder="'请补充'" placeholder-class="input-placeholder" /> -->
        </view>
      </checkbox-group>
    </view>

    <!-- <view class="sign-up-list mt20">
      <view class="list-title">{{formData[1].type}}</view>
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <view class="list-item" v-for="sItem in formData[1].list" :key="sItem">
          <checkbox :checked="checked" color="#FFB825" />
          <text>{{sItem.name}}</text>
          <input v-if="sItem.type =='other'" class="yoyi-input-normal" :placeholder="sItem.text" placeholder-class="input-placeholder" />
        </view>
      </checkbox-group>
    </view>-->
    <view class="btns-bar">
      <operationButton buttonText="确定" @click="api_359"></operationButton>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import operationButton from '@/components/yoyi-operation-button/'
export default {
  data() {
    return {
      id: 0,
      no: '',
      //结果
      result: [],
      //用户调查问卷
      questionnaire: []
    }
  },
  onLoad(opt) {
    user.methods.setOrderCourseAnswer(null)
    this.id = opt.id
    this.no = opt.no
    this.api_213(opt.id)
  },
  components: {
    operationButton
  },
  methods: {
    /**
     * 加载课堂调查问卷
     */
    api_213: function (id) {
      var that = this
      api.post(api.api_213, api.getSign({ Id: id }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        } else {
          that.result = res.data.Result
        }
      })
    },
    /**
     * 加载课堂调查问卷
     */
    checkedChange: function (e) {
      let that = this
      //问题ID
      var questId = e.currentTarget.dataset.questid
      //重置当前问题选项
      that.result.filter(ele => ele.type === 1 && ele.id == questId).forEach((ele, i) => {
        ele.answer_list.forEach((oo, ii) => {
          oo.is_checked = false
        })
      })

      //处理多选情况
      if (appG.util.isArray(e.detail.value)) {
        e.detail.value.forEach((ele, i) => {
          //答案ID
          let id = ele.split('_䨻_')[0]
          //答案value
          let val = ele.split('_䨻_')[1]
          //选中对象
          let item = {
            question_id: questId,
            answer_id: id,
            is_checked: false,
            answer_val: val
          }

          that.result.filter(ele => ele.type === 1 && ele.id == questId).forEach((ele, i) => {
            ele.answer_list.forEach((oo, ii) => {
              if (oo.quest_id == item.question_id && oo.answer_val == item.answer_val) {
                oo.is_checked = true
              }
            })
          })
        })
      } else {
        //答案ID
        let id = e.detail.value.split('_䨻_')[0]
        //答案value
        let val = e.detail.value.split('_䨻_')[1]
        //选中对象
        let item = {
          question_id: questId,
          answer_id: id,
          is_checked: false,
          answer_val: val
        }

        that.result.filter(ele => ele.type === 0 && ele.id == item.question_id).forEach((ele, i) => {
          ele.answer_list.forEach((oo, ii) => {
            if (oo.quest_id == item.question_id && oo.answer_val == item.answer_val) {
              oo.is_checked = true
            } else {
              oo.is_checked = false
            }
          })
        })
      }
    },
    /**
     * 提交调查问卷
     */
    api_359: function (id) {
      var that = this
      let q_count = 0
      let course_answers = []
      that.result.forEach((o, i) => {
        let exist = false
        o.answer_list.forEach((oo, ii) => {
          if (oo.is_checked) {
            exist = true
            let item = {
              answer_id: oo.id,
              title: o.title,
              question_id: oo.quest_id,
              answer_val: oo.answer_val
            }
            course_answers.push(item)
          }
        })
        if (exist) { q_count++ }
      })

      if (q_count < that.result.length) {
        appG.dialog.showToast({ title: '存在未选中的问题', icon: 'none', duration: 3000 })
        return
      }

      //写入本地缓存
      user.methods.setOrderCourseAnswer(course_answers)
      uni.navigateTo({ url: 'pay?no=' + that.no })
    }
  }
}
</script>

<style lang="scss">
.page-sign-up {
  padding-bottom: 2 * 48px;
}
.sign-up-list {
  .list-title {
    height: 2 * 50px;
    line-height: 2 * 50px;
    padding: 0 0 0 2 * 20px;
  }
  .list-item {
    // height: 2*36px;
    line-height: 2 * 36px;
    padding-left: 2 * 24px;

    text {
      margin-left: 20px;
    }
  }
  .yoyi-input-normal {
    width: 2 * 291px;
    margin-left: 50px;
  }
}
</style>
