/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-08-21 12:49:20
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-08-21 12:52:20
 */
const layout = () => import('@/layout')
// 赠品管理
const index = () => import('gift-list/index')
const gifts = {
  path: '/gift-list',
  component: layout,
  children: [
    {
      path: 'index',
      name: 'index',
      component: index,
      meta: {
        title: '赠品管理',
        cache: true
      }
    }
  ]
}

export default gifts
