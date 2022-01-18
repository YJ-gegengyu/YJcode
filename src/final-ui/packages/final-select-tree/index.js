/*
 * @,@Description: ,: 组件信息描述
 * @,@version: ,: 3.0.0
 * @,@Author: ,: MR·小涛
 * @,@Date: ,: 2020-12-08 15:36:59
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-12-08 15:37:28
 */
import finalTreeSelect from './src/tree-select.vue'

/* istanbul ignore next */
finalTreeSelect.install = function (Vue) {
  Vue.component(finalTreeSelect.name, finalTreeSelect)
}

export default finalTreeSelect
