/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-08 17:16:28
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-08 17:17:26
 */
import finalTabs from './src/component'

/* istanbul ignore next */
finalTabs.install = function (Vue) {
  Vue.component(finalTabs.name, finalTabs)
}

export default finalTabs
