import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import router from './router'

const OfflinePlugin = require('offline-plugin/runtime')

OfflinePlugin.install({
  onUpdateReady: function () {
    OfflinePlugin.applyUpdate()
  },
  onUpdated: function () {
    window.location.reload()
  }
})

import { store } from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#App',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
