/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-01 18:11:12
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-03 18:11:54
 */
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rendered: false
    }
  },
  methods: {
    open () {
      this.$emit('open')
    }
  }
}
