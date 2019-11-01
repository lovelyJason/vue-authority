import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import _axios from './lib/_axios'
import router from './router/index'
import store from './store'

Vue.use(ElementUI)
Vue.use(Router)
Vue.use(_axios)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
