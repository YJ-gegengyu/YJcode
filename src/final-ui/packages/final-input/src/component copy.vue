<!--
 * @Description: 针对Element重新封装的input组件重写监听器
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-04 22:16:46
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-09-02 11:35:15
 -->
<template>
  <el-input :value="formatValue"
    v-bind="$attrs"
    @focus="focus"
    @input="input"
    @blur="blur"
    @change="change" />
</template>

<script>
export default {
  name: 'final-input',
  inheritAttrs: false,
  props: {
    number: {
      default: false,
      type: Boolean
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data: () => {
    return {
      formatValue: '',
      methodsType: null
    }
  },
  methods: {
    focus () {
      if (this.number) {
        this.formatValue = this.getFormatNumber(this.value) === 0 ? '' : this.getFormatNumber(this.value)
      }
      this.methodsType = 'focus'
      this.$emit('focus')
    },
    change () {
      this.$emit('change', arguments)
    },
    input (event) {
      this.formatValue = event
      this.$emit('input', event)
    },
    blur () {
      this.number && (this.formatValue = this.setFormatNumber(this.value))
      this.methodsType = 'blur'
      this.$emit('blur')
    }
  },
  created () {
    if (this.number) {
      this.formatValue = this.setFormatNumber(this.value)
    } else {
      this.formatValue = this.value
    }
  }
}
</script>
