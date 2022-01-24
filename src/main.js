import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './element-ui'
import '../theme/index.css'
import finalUi from './final-ui'
import '@/scss/index.scss'
import ElementUI from 'element-ui'
import mixin from 'mixin'
import * as directive from 'directive'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(finalUi)
Object.keys(mixin).forEach(item => Vue.mixin(mixin[item]))
Object.keys(directive).forEach(item => Vue.directive(item, directive[item]))
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
