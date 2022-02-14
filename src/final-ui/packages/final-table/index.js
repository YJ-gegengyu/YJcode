/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-07-02 15:30:39
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-07-02 15:32:27
 */
import finalTable from './src/component'

/* istanbul ignore next */
finalTable.install = function (Vue) {
  Vue.component(finalTable.name, finalTable)
}

export default finalTable
