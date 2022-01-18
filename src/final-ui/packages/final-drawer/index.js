/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-09-10 11:08:47
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-09-10 11:09:09
 */
import FinalDrawer from './src/component'

FinalDrawer.install = function (Vue) {
  Vue.component(FinalDrawer.name, FinalDrawer)
}

export default FinalDrawer
