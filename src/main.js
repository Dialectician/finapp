import Vue from 'vue'
import moment from 'moment'
import Notifications from 'vue-notification'
import store from '@/store/store'
import App from '@components/app/App.vue'
import toogleBodyOverflow from '@/plugins/toogleBodyOverflow'
import '@/sw.js'

Vue.config.productionTip = false

moment.locale('en')
moment.updateLocale('en', {
  week: {
    dow: 1
  }
})

// Plugins
Vue.use(Notifications)
Vue.use(toogleBodyOverflow)

// Init application
/* eslint-disable no-new */
new Vue({
  el: '.app',
  store,
  render: h => h(App)
})
