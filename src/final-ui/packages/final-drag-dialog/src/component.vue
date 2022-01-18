<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-11 19:55:03
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-12-30 17:04:35
 -->
<template>
  <transition name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <section class="final-ui-drag-dialog_wrapper"
      :style="style"
      v-dialog-drag
      v-show="visible"
      ref="finalDragDialog">
      <div class="final-drag-dialog_header">
        <slot name="title">
          <div class="final-drag-dialog_title">{{ title }}</div>
        </slot>
        <button type="button"
          class="final-drag-dialog_header_btn"
          aria-label="Close"
          v-if="showClose"
          @click.stop="handleClose">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="final-drag-dialog_content">
        <slot></slot>
      </div>
    </section>
  </transition>
</template>

<script>
import Popup from 'final-ui/utils/popup'
import { dialogDrag } from 'final-ui/src/directives'
export default {
  mixins: [Popup],
  name: 'final-drag-dialog',
  props: {
    // 设置dialog bodyClass
    customBodyClass: String,
    // 设置dialog Footer Class
    customFooterClass: String,
    // 自定义Class
    customClass: {
      type: String
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
    // dialog距离顶部位置
    top: {
      type: String,
      default: '15vh'
    },
    // 宽度
    width: String,
    left: String
  },
  directives: {
    dialogDrag
  },
  data () {
    return {}
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
      if (this.width) {
        style.width = this.width
      }
      if (this.left) {
        style.left = this.left
      }
      return style
    }
  },
  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
    }
  },
  methods: {
    afterEnter () {
      this.$emit('opened')
    },
    afterLeave () {
      this.$emit('closed')
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        // this.$emit('close')
        this.closed = true
      }
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.final-ui-drag-dialog_wrapper {
  background-color: #fff;
  box-shadow: 0 0 2px 3px #ccc;
  padding: 10px;
  width: 500px;
  border-radius: 3px;
  position: fixed;
//   margin-left: -250px;
  margin-top: -300px;
  top: 550px;
  left: 350px;
  box-sizing: border-box;
  z-index: 99;
  .final-drag-dialog_header {
    position: relative;
    border-bottom: 1px solid #eee;
    line-height: 30px;
    cursor: grab;
    .final-drag-dialog_header_btn {
      position: absolute;
      top: 2px;
      right: 20px;
      padding: 0;
      background: #fff;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
      color: $--font-color;
      width: 25px;
      height: 25px;
      line-height: 22px;
      border-radius: 50%;
      color: #333;
    }
  }
  .final-drag-dialog_content {
    padding: 10px 0;
  }
}
</style>
