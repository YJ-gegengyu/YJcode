/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-08-21 12:49:20
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-08-21 12:52:20
 */
const layout = () => import('@/layout')
// 入库管理
const index = () => import('warehousing-management/index')
const warehousings = {
  path: '/warehousing-management',
  component: layout,
  children: [
    {
      path: 'index',
      name: 'index',
      component: index,
      meta: {
        title: '入库管理',
        cache: true
      }
    }
  ]
}

export default warehousings
