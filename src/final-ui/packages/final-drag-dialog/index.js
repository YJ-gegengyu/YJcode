/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-11 19:54:50
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-11 19:58:57
 */
import FinalDragDialog from './src/component'

/* istanbul ignore next */
FinalDragDialog.install = function (Vue) {
  Vue.component(FinalDragDialog.name, FinalDragDialog)
}

export default FinalDragDialog
