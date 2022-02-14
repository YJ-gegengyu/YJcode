/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-09-07 15:40:20
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-09-07 15:44:10
 */
import finalProgress from './src/progress'

finalProgress.install = function (Vue) {
  Vue.component(finalProgress.name, finalProgress)
}

export default finalProgress
