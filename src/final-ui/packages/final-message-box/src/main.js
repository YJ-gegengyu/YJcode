/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-09 12:16:33
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2020-12-24 14:41:29
 */
import msgboxVue from './index.vue'
import Vue from 'vue'
const MessageBoxConstructor = Vue.extend(msgboxVue)
let instance
const initInstance = (options) => {
  // 创建实例
  instance = new MessageBoxConstructor()
  // 获取虚拟dom节点
  const msgBoxEl = instance.$mount().$el
  // 放入body
  document.body.appendChild(msgBoxEl)
  // 合并选项
  Object.assign(instance, options)
  return showMessageBox()
}
const showMessageBox = (options) => {
  return instance.showMsgBox()
}
const showMessage = (options) => {
  // if (!instance) {
  //   return initInstance(options)
  // }
  return initInstance(options)
}
const MessageBox = function (options) {
  return showMessage(options).then((val) => {
    instance = null
    return Promise.resolve(val)
  }).catch(err => {
    instance = null
    return Promise.reject(err)
  })
}
export default MessageBox
