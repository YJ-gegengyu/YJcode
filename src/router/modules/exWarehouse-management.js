/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-08-21 12:49:20
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-08-21 12:52:20
 */
const layout = () => import('@/layout')
// 出库管理
// 正装出库
const goodsList = () => import('exWarehouse-management/goods-list')
// 赠品出库
const giftList = () => import('exWarehouse-management/gift-list')
const exWarehouses = {
  path: '/exWarehouse-management',
  component: layout,
  children: [
    {
      path: 'giftList',
      name: 'giftList',
      component: giftList,
      meta: {
        title: '赠品出库',
        cache: true
      }
    },
    {
      path: 'goodsList',
      name: 'goodsList',
      component: goodsList,
      meta: {
        title: '正装出库',
        cache: true
      }
    }
  ]
}

export default exWarehouses
