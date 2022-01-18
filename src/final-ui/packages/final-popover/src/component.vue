<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-22 10:50:40
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-22 11:52:10
 -->
<template>
  <el-popover :placement="placement"
    :width="width"
    :trigger="trigger"
    :append-to-body='appendToBody'
    popper-class="final-popover"
    v-model="visible"
    :visible-arrow="visibleArrow">
    <div class="popover-header">
      <slot name="head">
        <span>
          {{title}}
        </span>
      </slot>
      <i class="el-icon-circle-close" @click="visible = false"></i>
    </div>
    <slot></slot>
    <template slot="reference">
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'final-popover',
  props: {
    title: {
      type: String,
      default: '高级查询'
    },
    trigger: {
      default: 'click',
      type: String
    },
    width: {
      default: '400',
      type: [String, Number]
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    visibleArrow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    close () {
      this.visible = false
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep {
  .final-popover {
    padding: 0;
    border-radius: 7px 7px 0 0;
    border: 0;
    font-size: 14px;
    .popover-header {
      height: 33px;
      background: $--color-primary;
      border-radius: 7px 7px 0 0;
      color: #fff;
      padding: 0 10px;
      line-height: 33px;
      display: flex;
      justify-content: space-between;
      align-content: space-between;
      align-items: center;
      i {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
