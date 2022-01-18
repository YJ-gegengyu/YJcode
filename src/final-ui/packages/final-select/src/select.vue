<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-13 17:11:35
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-13 17:35:22
 -->
<template>
  <div class="select-wrapper">

      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'final-select',
  data () {
    return {}
  },
  methods: {
    getOptions () {
      // 使用$children遍历子组件，得到所有的option组件
      return this.$children.filter((item) => item.$options.name === 'final-option')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
