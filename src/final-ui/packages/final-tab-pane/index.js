/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-08 19:43:58
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-08 19:44:33
 */
import tabPane from '../final-tabs/src/tab-pane.vue'

/* istanbul ignore next */
tabPane.install = function (Vue) {
  Vue.component(tabPane.name, tabPane)
}

export default tabPane
