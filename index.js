import Vue from 'vue'
import ElementUI from 'element-ui'
import VRM from 'vue-role-manager'
import { routerInit } from './router'
import store from './store'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import App from './App.vue'

import './common/icons'
import * as filters from './common/filters'
import { i18nInit, i18nUpdate } from './common/lang'
import ajax from './utils/ajax'
import { initApollo } from './utils/apollo'

window.Vue = Vue
window.ElementUI = ElementUI

// Vue config
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

// Global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Global methods
Vue.prototype.$ajax = ajax

export default (routes, langs, appInfo) => {
  return new Promise((resolve, reject) => {
    try {
      const router = routerInit(routes, appInfo)
      const i18n = i18nInit(langs)

      // Vue role manager
      Vue.use(VRM, {
        router,
        redirect: 'login',
        metaName: 'roles',
        whitelist: ['login', '401', '404'],
        debug: process.env.NODE_ENV === 'development'
      })

      // ElementUI
      Vue.use(ElementUI, {
        size: window.localStorage.getItem('size') || 'small',
        i18n: (key, value) => i18n.t(key, value)
      })

      store.dispatch('user/current').then(userinfo => {
        // Important!!
        Vue.prototype.$vrm.setRoles(userinfo ? userinfo.roles : null)

        new Vue({
          el: '#app',
          router,
          store,
          i18n,
          apolloProvider: initApollo(Vue),
          render: h => h(App)
        })

        resolve({
          Vue,
          router,
          store,
          i18nUpdate
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}
