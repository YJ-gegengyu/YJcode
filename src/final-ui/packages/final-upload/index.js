/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-09-07 15:40:20
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-10-12 10:12:31
 */
import finalUpload from './src/component'

finalUpload.install = function (Vue) {
  Vue.component(finalUpload.name, finalUpload)
}

export default finalUpload
