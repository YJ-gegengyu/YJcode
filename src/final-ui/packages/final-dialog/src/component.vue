<!--
 * @Description: dialog组件
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-01 17:40:18
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-11-16 15:30:35
 -->
<template>
  <transition name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div v-show="visible"
      class="final-ui-dialog_wrapper"
      :class="[{'final-dialog_fixed': fixed},customClass]">
      <div class="final-dialog"
        :style="style">
        <div class="final-dialog_header">
          <template name="title">
            <div class="final-dialog_title">{{ title }}</div>
          </template>
          <button type="button"
            class="final-dialog_headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="final-dialog__body"
          v-if="rendered"
          :class="[customBodyClass,{'auto-height': autoHeight}]">
          <slot></slot>
        </div>
        <div class="final-dialog__footer"
          v-if="$slots.footer"
          :class="[customFooterClass]">
          <template name="footer"></template>
        </div>
      </div>
      <div v-if="modal"
        class="final-modal"
        :class="{'modal-fixed': isPageModal}"></div>
    </div>
  </transition>
</template>
<script>
import Popup from 'final-ui/utils/popup'
export default {
  name: 'final-dialog',
  mixins: [Popup],
  props: {
    // 自动高度
    autoHeight: {
      default: false,
      type: Boolean
    },
    // 设置dialog bodyClass
    customBodyClass: String,
    // 设置dialog Footer Class
    customFooterClass: String,
    // 自定义Class
    customClass: {
      type: String
    },
    // 是否是页面背景
    isPageModal: {
      default: false,
      type: Boolean
    },
    // 标题名称
    title: {
      type: String,
      default: '提示'
    },
    // 是否全屏定位
    fixed: {
      default: false,
      type: Boolean
    },
    // 背景是否显示
    modal: {
      default: true,
      type: Boolean
    },
    // 是否显示右上角关闭按钮
    showClose: {
      default: true,
      type: Boolean
    },
    // 关闭之前
    beforeClose: {
      type: Function
    },
    bodyHeight: String,
    // dialog距离顶部位置
    top: {
      type: String,
      default: '15vh'
    },
    // 宽度
    width: String
  },
  watch: {
    visible (val) {
      if (val) {
        this.$emit('open')
        this.rendered = true
      } else {
        this.$emit('close')
      }
    }
  },
  computed: {
    style () {
      const style = {}
      style.top = this.top
      if (this.autoHeight) {
        style.height = `calc(100% - ${parseInt(this.top) + 8}vh)`
      }
      if (this.width) {
        style.width = this.width
      }
      return style
    }
  },
  methods: {
    afterEnter () {
      this.$emit('opened')
    },
    afterLeave () {
      this.$emit('closed')
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        // this.$emit('close')
        this.closed = true
      }
    }
  },
  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
    }
  }
}
</script>

<style lang='scss' >
.final-ui-dialog_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  &.final-dialog_fixed {
    position: fixed;
    z-index: 99;
  }
  .final-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 50%;
    z-index: 1;
    border-radius: 8px;
    z-index: 3;
    .final-dialog_header {
      position: relative;
      .final-dialog_title {
        padding: 15px;
        color: #fff;
        line-height: 24px;
        font-size: 16px;
        background: $--color-primary;
        border-radius: 8px 8px 0 0;
        text-align: left;
      }
      .final-dialog_headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        color: $--font-color;
        width: 20px;
        height: 20px;
        line-height: 22px;
        border-radius: 50%;
      }
    }
    .final-dialog__body {
      padding: 10px 20px;
      padding-bottom: 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      &.auto-height {
        height: inherit;
        overflow: hidden;
        overflow-y: auto;
      }
    }
    .final-dialog__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
    }
  }
  .final-modal {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 2;
    &.modal-fixed {
      position: absolute;
    }
  }
}
</style>
