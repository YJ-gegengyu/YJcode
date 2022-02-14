/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-13 17:11:25
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-13 17:19:03
 */
import finalSelect from './src/select.vue'

/* istanbul ignore next */
finalSelect.install = function (Vue) {
  Vue.component(finalSelect.name, finalSelect)
}

export default finalSelect
