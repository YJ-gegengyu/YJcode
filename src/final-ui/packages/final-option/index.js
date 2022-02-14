/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-13 17:20:08
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-13 17:20:51
 */
import FinalOption from '../final-select/src/option'

/* istanbul ignore next */
FinalOption.install = function (Vue) {
  Vue.component(FinalOption.name, FinalOption)
}

export default FinalOption
