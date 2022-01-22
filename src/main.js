import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './element-ui'
import finalUi from './final-ui'
import '@/scss/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(finalUi)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
