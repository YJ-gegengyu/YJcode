/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-08 19:43:58
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-08 22:06:22
 */
import tabNav from '../final-tabs/src/tab-nav'

/* istanbul ignore next */
tabNav.install = function (Vue) {
  Vue.component(tabNav.name, tabNav)
}

export default tabNav
