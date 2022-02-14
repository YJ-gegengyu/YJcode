<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-09 12:16:47
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2020-12-24 14:46:08
 -->
<template>
  <transition name="msgbox-fade">
    <section class="final-ui-message-box_wrapper"
      v-show="visible">
      <div class="final-ui-message-container">
        <div class="final-ui-message-box"
          :style="style">
          <div class="message-box_header">
            <template name="title">
              {{title}}
            </template>
            <button type="button"
              class="final-message-box_headerBth"
              aria-label="Close"
              @click="handleClose"
              v-if="showClose">
              <i class="el-message-box__close el-icon-close"></i>
            </button>
          </div>
          <hr class="final-line">
          <div class="message-box_content">
            <div class="message-box_state">
              <template v-if="type">
                <i :class="`el-icon-${type}`"></i>
              </template>
            </div>
            <div class="message-box_container"
              :class="{'no-padding' : !type}">
              <template v-if="render">
                <coustom-slot :render="render"></coustom-slot>
              </template>
              <template v-else>
                {{message}}
                <!-- <template v-if="autoClose">
                  ({{time}}) 秒后自动关闭
                </template> -->
              </template>
            </div>
          </div>
          <!-- <div v-if="autoClose" class="time" ></div> -->
          <div class="message-box_footer"
            v-if="isShowFooter">
            <template>
              <template v-if="autoClose">
                <el-button @click="handleConfirm"
                  type="primary">关闭</el-button>
              </template>
              <template v-else>
                <el-button v-if="showCancelButton"
                  @click="handleCancel">{{cancelButtonText}}</el-button>
                <el-button type="primary"
                  @click="handleConfirm">{{confirmButtonText}}</el-button>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="modal"></div>
    </section>
  </transition>
</template>

<script>
import coustomSlot from './coustom-slot'
export default {
  props: {
    // 是否点击确定关闭
    // isClickConfirmClose: {
    //   default: true,
    //   type: Boolean
    // },
    callback: Function,
    // 显示时间
    duration: {
      default: 3000,
      type: Number
    },
    // 右上角关闭按钮
    showClose: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    type: String,
    // 弹窗内容
    message: {
      type: String,
      default: ''
    },
    // 自动关闭
    autoClose: {
      default: false,
      type: Boolean
    },
    // 取消按钮文字
    cancelButtonText: {
      default: '取消',
      type: String
    },
    // 确定按钮文字
    confirmButtonText: {
      default: '确定',
      type: String
    },
    // 是否显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: false
    },
    // 是否显示底部
    isShowFooter: {
      type: Boolean,
      default: true
    },
    top: {
      default: '28vh',
      type: String
    },
    width: {
      default: '400px',
      type: String
    },
    height: String,
    // 内容渲染函数
    render: Function
  },
  data () {
    return {
      time: 3,
      visible: false
    }
  },
  computed: {
    style () {
      const style = {}
      if (this.width.includes('%')) {
        style.transform = 'translateX(-50%)'
      } else {
        style.transform = `translateX(-${parseFloat(this.width) / 2}px)`
      }
      style.top = this.top
      if (this.width) {
        style.width = this.width
      }
      this.height && (style.height = this.height)
      return style
    }
  },
  components: {
    coustomSlot
  },
  methods: {
    handleCancel () {
      this.reject('reject')
      this.timer()
    },
    handleConfirm () {
      // 如果当前不允许关闭那么直接执行确定事件
      if (this.callback) {
        const _this = this
        this.callback(this.handleCancel, _this)
      } else {
        this.resolve('confirm')
        this.timer()
      }
    },
    showMsgBox () {
      this.time = this.duration / 1000
      this.visible = true
      // 如果开启自动关闭
      if (this.autoClose) {
        const timer = setInterval(() => {
          // 如果当前被手动关闭了 那么需要直接清除定时器
          if (!this.visible) {
            window.clearInterval(timer)
          }
          this.time--
          if (this.time === 0) {
            this.handleConfirm()
            window.clearInterval(timer)
          }
        }, 1000)
      }
      // 创建promise 给实例调用
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      // 如果不显示底部
      if (!this.isShowFooter) {
        const _this = this
        // 并且有callback 函数 那么吧当前的实例直接传递出去
        this.callback && this.callback(this.handleCancel, _this)
      }
      return this.promise
    },
    close () {
      this.visible = false
      this.handleClose()
    },
    handleClose () {
      // this.reject('reject')
      this.timer()
    },
    timer () {
      this.visible = false
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.destroy()
      }, 200)
    },
    destroy () {
      this.$destroy()
      this.$el && document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang='scss' scoped>
.final-ui-message-box_wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 30px;
  z-index: 10000;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .final-ui-message-container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .final-ui-message-box {
    display: inline-block;
    width: 500px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    padding: 10px;
    position: absolute;
    top: 28vh;
    left: 50%;
    z-index: 100;
    transform: translateX(-200px);
    .message-box_header {
      position: relative;
      line-height: 40px;
      font-size: 16px;
      .final-message-box_headerBth {
        position: absolute;
        top: 10px;
        right: 15px;
        padding: 0;
        border: none;
        outline: 0;
        background: 0 0;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .final-line {
      margin: 0;
      margin-bottom: 15px;
    }
    .message-box_footer {
      text-align: right;
      margin-top: 10px;
    }
    .message-box_content {
      position: relative;
      height: 100%;
      .message-box_state {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 40px;
        height: 100%;
        .el-icon-warning {
          color: #e6a23c;
        }
        .el-icon-success {
          color: #67c23a;
        }
        .el-icon-error {
          color: #f56c6c;
        }
      }
      .message-box_container {
        height: 100%;
        padding-left: 50px;
        font-size: 16px;
        color: #333;
        line-height: 20px;
        &.no-padding {
          padding-left: 0;
        }
      }
    }
    .time {
      font-size: 16px;
      margin-top: 10px;
      padding-left: 50px;
      color: #333;
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.5;
    background: #000;
  }
}
</style>
