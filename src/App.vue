<script>

//身份认证脚本
import passport from '@/modules/passport'
import appG from '@/modules/appGlobal'

export default {
  onLaunch() {
    //检查登录态是否过期
    passport.checkSession(() => { })
    //版本更新对象
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });

    });

    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失败
    })

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