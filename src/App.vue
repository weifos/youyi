<script>

//身份认证脚本
import passport from '@/modules/passport'
//用户信息脚本
import userInfo from '@/modules/userInfo'

export default {
  onLaunch() {
    //检查登录态是否过期
    passport.checkSession(() => { })
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  onResize(res) {
    console.log(res.size.windowWidth, res.size.windowHeight) // 新的显示区域宽度和高度
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/uni.css";
@import "./styles/index.scss";

* {
  font-family: PingFangSC;
}

/*checkbox 整体大小  */
checkbox {
  width: $uni-font-size-base;
  height: $uni-font-size-base;
}

/*checkbox 选项框大小  */
checkbox .wx-checkbox-input {
  width: $uni-font-size-base;
  height: $uni-font-size-base;
  border-radius: $uni-font-size-base;
}

/*checkbox选中后样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  background: $yoyi-button-color;
  border-color: transparent;
}

/*checkbox选中后图标样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: $uni-font-size-base;
  height: $uni-font-size-base;
  line-height: $uni-font-size-base;
  text-align: center;
  font-size: $uni-font-size-sm;
  color: #fff;
  background: transparent;
  transform-origin: 0 0;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}

uni-checkbox {
  width: $uni-font-size-base;
  height: $uni-font-size-base;
  .uni-checkbox-input {
    width: $uni-font-size-base;
    height: $uni-font-size-base;
    border-radius: 50%;
    &.uni-checkbox-input-checked {
      background: $yoyi-button-color;
      border-color: $yoyi-button-color;
      &:before {
        color: #fff;
        font-size: $uni-font-size-sm;
      }
    }
  }
}
</style>