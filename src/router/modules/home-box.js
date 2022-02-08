/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·小涛
 * @Date: 2020-08-21 12:49:20
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-08-21 12:52:20
 */
const layout = () => import('@/layout')
// 文件预览表
const home = () => import('home-box/home')
const lists = {
  path: '',
  component: layout,
  children: [
    {
      path: '',
      name: 'home',
      component: home,
      meta: {
        title: '主页',
        cache: true
      }
    }
  ]
}

export default lists
