<template>
  <view class="content page-sign-up">
    <view class="sign-up-list" v-for="(item,index) in result">
      <view class="list-title" v-if="item.type===0">{{item.title+'（单选）'}}</view>
      <view class="list-title" v-if="item.type===1">{{item.title+'（多选）'}}</view>
      <view class="list-title" v-if="item.type===2">{{item.title+'（填写）'}}</view>

      <radio-group :data-questId="item.id" @change="checkedChange" class="agreement-checkbox" v-if="item.type===0">
        <view :key="i" class="list-item" v-for="(sItem,i) in item.answer_list">
          <radio :checked="sItem.is_checked" :id="sItem.id" :value="sItem.id+'_䨻_'+sItem.answer_val" color="#FFB825" />
          <text>{{sItem.answer_val}}</text>
          <!-- <input class="yoyi-input-normal" v-if="i === item.answer_list.length-1" :placeholder="'请补充'" placeholder-class="input-placeholder" /> -->
        </view>
      </radio-group>
      <checkbox-group :data-questId="item.id" @change="checkedChange" class="agreement-checkbox" v-if="item.type===1">
        <view :key="i" class="list-item" v-for="(sItem,i) in item.answer_list">
          <checkbox :checked="sItem.is_checked" :id="sItem.id" :value="sItem.id+'_䨻_'+sItem.answer_val" color="#FFB825" />
          <text>{{sItem.answer_val}}</text>
          <!-- <input class="yoyi-input-normal" v-if="i === item.answer_list.length-1" :placeholder="'请补充'" placeholder-class="input-placeholder" /> -->
        </view>
      </checkbox-group>

      <checkbox-group :data-questId="item.id" class="agreement-checkbox" v-if="item.type===2">
        <view :key="i" class="list-item">
          <textarea :data-questId="item.id" :placeholder="'请补充'" @input="inputChange" class="yoyi-area-normal" maxlength="300" placeholder-class="input-placeholder" />
        </view>
      </checkbox-group>
    </view>

    <!--
    <view class="sign-up-list mt20">
      <view class="list-title">{{formData[1].type}}</view>
      <checkbox-group class="agreement-checkbox" @change="checkboxChange">
        <view class="list-item" v-for="sItem in formData[1].list" :key="sItem">
          <checkbox :checked="checked" color="#FFB825" />
          <text>{{sItem.name}}</text>
          <input v-if="sItem.type =='other'" class="yoyi-input-normal" :placeholder="sItem.text" placeholder-class="input-placeholder" />
        </view>
      </checkbox-group>
    </view>
    -->

    <view class="btns-bar">
      <operationButton @click="api_326" buttonText="确定"></operationButton>
    </view>
  </view>
</template>

<script>

import api from '@/modules/api'
import appG from '@/modules/appGlobal'
import user from '@/modules/userInfo'
import operationButton from '@/components/yoyi-operation-button/'
export default {
  data () {
    return {
      id: 0,
      no: '',
      //结果
      result: [],
      //订单信息
      orderInfo: { id: 0 },
      //请求中
      requestIng: false,
      //用户调查问卷
      questionnaire: []
    }
  },
  onLoad (opt) {
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
     * 选择答案事件
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
     * 输入答案事件
     */
    inputChange: function (e) {
      let that = this
      //问题ID
      var questId = e.currentTarget.dataset.questid
      //重置当前问题选项
      that.result.filter(ele => ele.type === 2 && ele.id == questId).forEach((ele, i) => {
        ele.answer_list = e.detail.value
      })
    },
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
          if (that.result.length == 0) {
            that.api_326()
          } else {
            //当为用户输入答案，默认为空字符串
            that.result.forEach((o, i) => {
              if (o.type == 2) {
                o.answer_list = ''
              }
            })
          }
        }
      })
    },
    /**
     * 提交课程订单
     */
    api_326: function () {
      let that = this
      //是否请求中
      if (that.requestIng) { return }
      that.requestIng = true

      var order = {
        course_id: that.id,
        details: [{ num: 1 }]
      }

      for (let i = 0; i < that.num; i++) {
        order.details.push({
          id: 0
        })
      }

      api.post(api.api_326, api.getSign({ Order: order }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          appG.dialog.showToast({ title: res.data.Basis.Msg })
        } else {
          //订单ID
          that.orderInfo = res.data.Result
          //提交调查问卷
          that.api_359()
        }

        setTimeout(() => { that.requestIng = false }, 1000)
      })
    },
    /**
     * 提交调查问卷
     */
    api_359: function () {
      let that = this
      let q_count = 0
      let course_answers = []
      that.result.forEach((o, i) => {
        let exist = false
        //此处只需要处理非文本输入的场景
        //不为用户输入答案，必须勾选答案
        if (o.type != 2) {
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
        } else {
          let item = {
            answer_id: 0,
            title: o.title,
            question_id: o.id,
            answer_val: o.answer_list
          }
          course_answers.push(item)
        }

        if (exist) { q_count++ }
      })

      //排除用户自定义输入
      if (q_count < that.result.filter(ele => ele.type !== 2).length) {
        appG.dialog.showToast({ title: '存在未选中的问题', icon: 'none', duration: 3000 })
        return
      }

      //写入本地缓存
      course_answers.forEach((o, i) => {
        o.order_id = that.orderInfo.id
      })

      api.post(api.api_359, api.getSign({
        CourseAnswers: course_answers
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          appG.dialog.showToast({ title: res.data.Basis.Msg, icon: 'none', duration: 3000 })
        } else {
          //活动
          if (that.orderInfo.type == 1) {
            appG.dialog.showToast({ title: '报名成功', icon: 'none', duration: 3000 })
            setTimeout(() => {
              uni.navigateTo({ url: '/userPackages/activity' })
            }, 1000)
            //课程
          } else {
            uni.navigateTo({ url: 'pay?no=' + that.orderInfo.serial_no })
          }
        }
      })


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
  .yoyi-area-normal {
    width: 2 * 291px;
    height: 200rpx;
  }
}
</style>
