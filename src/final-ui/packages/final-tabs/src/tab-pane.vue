<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-08 19:34:56
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-16 15:51:31
 -->
<template>
  <div class="pane"
    v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'final-tab-pane',
  props: {
    // 用来标识点击的哪个标签
    name: {
      type: String
    },
    // 标签的标题内容
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return { show: true }
  },
  methods: {
    updateNav () {
      this.$parent.updateNave()
    }
  },
  watch: {
    label () {
      this.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  }
}
</script>
