// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store'
import vueNotice from './vue-notice.js'
import config from './config/config.json'
import autoComplete from './components/auto-complete.vue'
import moment from 'moment-timezone'
import vuejsmodal from 'vue-js-modal'
import common from './common'
import wysiwyg from 'vue-wysiwyg'
import VueProgressBar from 'vue-progressbar'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.use(vuejsmodal)
Vue.use(vueNotice)
Vue.use(wysiwyg, {})
Vue.use(VueSocketio, config.targetURL)

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)


Vue.mixin(common)
Vue.prototype.$moment = moment
Vue.component('auto-complete', autoComplete)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
