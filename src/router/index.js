/*
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·小涛
 * @Date: 2020-06-22 09:06:14
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2021-01-02 20:43:38
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 公用部分
const routerModulesFiles = require.context('./modules', false, /\.js$/)
export const routerModules = routerModulesFiles.keys().reduce((modules, modulePath) => {
  const value = routerModulesFiles(modulePath)
  modules.push(value.default)
  return modules
}, [])
Vue.use(VueRouter)
const childDate = [
  {
    path: '',
    name: 'layout',
    component: {
      render () {
        return (
          <router-view></router-view>
        )
      }
    },
    children: [...routerModules],
    meta: {
      title: '公用'
    }
  }
]
const routes = [
  ...childDate
]
const createRouter = () => new VueRouter({
  // 子项目设置history，base设置为父项目的一级路由。
  // base: ROUTER_BASE_URL,
  mode: 'history',
  routes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}
// 跳转相同路由
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
