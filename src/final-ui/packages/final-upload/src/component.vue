<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-10-12 10:13:26
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-10-12 10:34:50
 -->
<template>
  <section>
    <el-upload class="upload-demo"
      :auto-upload="false"
      action="#"
      v-bind="$attrs"
      v-on="$listeners">
      <slot></slot>
    </el-upload>
  </section>
</template>

<script>
export default {
  name: 'final-upload',
  data () {
    return {}
  },
  components: {}
}
</script>
