<!--
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-09-02 16:57:12
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-09-02 21:34:40
 -->
<template>
  <div class="el-input">
    <input class="el-input__inner"
      :value="formatValue"
      ref="input"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @change="onChange" />
  </div>
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
  computed: {
    formatValue () {
      if (this.number) {
        if (this.focused) {
          return this.value
        } else {
          return this.setFormatNumber(this.value)
        }
      } else {
        return this.value
      }
    }
  },

  data () {
    return {
      focused: false
    }
  },
  methods: {
    onInput (e) {
      const formatvalue = e.target.value
      this.$emit('input', formatvalue)
    },
    onChange () {
      this.$emit('change', ...arguments)
    },
    onBlur () {
      this.focused = false
      this.dispatch('ElFormItem', 'el.form.blur', [this.value])
      this.$emit('blur', ...arguments)
    },
    onFocus (e) {
      this.focused = true
      this.$nextTick(() => e.target.select())
      this.$emit('focus', ...arguments)
    },
    dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
</script>
