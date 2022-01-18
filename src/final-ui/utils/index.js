/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-07-03 18:11:51
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-10 15:55:40
 */
// 节流函数
export function debounce (func, wait = 100) {
  let timeout
  return function (event) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(this, event)
    }, wait)
  }
}
