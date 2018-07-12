// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store'
import vueNotice from './vue-notice.js'
import config from './config/config.json'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.use(vueNotice);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
