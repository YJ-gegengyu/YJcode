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
const index = () => import('goods-list/index')
const lists = {
  path: '/goods-list',
  component: layout,
  children: [
    {
      path: 'index',
      name: 'index',
      component: index,
      meta: {
        title: '文件预览表',
        cache: true
      }
    }
  ]
}

export default lists
