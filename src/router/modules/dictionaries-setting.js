/*
 * @Description: 组件信息描述
 * @version: 3.0.0
 * @Author: MR·ggy
 * @Date: 2020-08-21 12:49:20
 * @LastEditors: MR·ggy
 * @LastEditTime: 2020-08-21 12:52:20
 */
const layout = () => import('@/layout')
// 字典管理
const dictionariesList = () => import('dictionaries-setting/dictionaries-list')
const dictionaries = {
  path: '/dictionaries-setting',
  component: layout,
  children: [
    {
      path: 'dictionariesList',
      name: 'dictionariesList',
      component: dictionariesList,
      meta: {
        title: '字典管理',
        cache: true
      }
    }
  ]
}

export default dictionaries
