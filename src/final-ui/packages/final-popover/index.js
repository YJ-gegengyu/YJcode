/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-22 10:50:04
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-22 10:54:42
 */
import finalPopover from './src/component'

/* istanbul ignore next */
finalPopover.install = function (Vue) {
  Vue.component(finalPopover.name, finalPopover)
}

export default finalPopover
