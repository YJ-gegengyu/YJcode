/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-01 17:52:08
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-01 17:52:36
 */

import FinalDialog from './src/component'

/* istanbul ignore next */
FinalDialog.install = function (Vue) {
  Vue.component(FinalDialog.name, FinalDialog)
}

export default FinalDialog
