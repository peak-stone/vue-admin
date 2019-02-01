import Vue from 'vue'
import ElementUI from 'element-ui'
import VRM from 'vue-role-manager'
import { routerInit } from './router'
import { store, registerStoreModules } from './store'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import App from './App.vue'

import './common/icons'
import * as filters from './common/filters'
import { i18nInit, i18nUpdate } from './common/lang'

import ajax from './utils/ajax'
import { initApollo, addApolloClients } from './utils/apollo'
import Layout from './components/layout'

window.Vue = Vue
window.ElementUI = ElementUI

// Vue config
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

let router
let i18n
let apolloProvider

export const initApp = ({
  routes,
  stores,
  langs,
  clients,
  app,
  routerConfig
}) => {
  try {
    i18n = i18nInit(langs)
    router = routerInit(routes, app, routerConfig)
    store.commit('app/ADD_ROUTES', router.options.routes)
    apolloProvider = initApollo(Vue, router)

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

    // Global filters
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })

    // Global methods
    Vue.prototype.$ajax = ajax

    if (stores) {
      registerStoreModules(stores)
    }

    if (clients) {
      addApolloClients(clients)
    }

    return {
      store,
      router,
      Layout,
      i18nUpdate,
      apolloProvider,
      addApolloClients
    }
  } catch (err) {
    throw err
  }
}

export const startApp = () => {
  return new Promise((resolve, reject) => {
    try {
      new Vue({
        router,
        store,
        i18n,
        apolloProvider,
        render: h => h(App)
      }).$mount('#app')

      resolve({
        Vue,
        router,
        store,
        i18nUpdate,
        addApolloClients
      })
    } catch (err) {
      reject(err)
    }
  })
}
