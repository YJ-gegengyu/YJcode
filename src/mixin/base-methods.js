/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-02 18:10:12
 * @,@LastEditors: ,: MR·ggy
 * @,@LastEditTime: ,: 2021-02-07 17:28:36
 */
import numeral from 'numeral'

const mixin = {
  methods: {
    //  设置格式化金额
    setFormatNumber (prop) {
      return numeral(prop).format('0,0.00')
    },
    // 获取格式化金额
    getFormatNumber (prop) {
      return numeral(prop).value()
    },
    confirm ({ top, showClose = false, height, isShowFooter = true, callback, title = '提示', width = '400px', render, autoClose = true, message, showCancelButton = false, confirmButtonText = '确定', type = 'warning', cancelButtonText = '取消' }) {
      return this.$msgBox({
        top,
        showClose,
        isShowFooter,
        callback,
        width,
        height,
        type,
        title,
        message,
        render,
        cancelButtonText,
        confirmButtonText,
        showCancelButton,
        autoClose
      })
    }
  }
}
export default mixin
