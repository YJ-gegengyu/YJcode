/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-02 18:10:12
 * @,@LastEditors: ,: MR·小涛
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
    }
  }
}
export default mixin