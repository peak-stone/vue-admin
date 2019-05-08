import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { initApp } from './modules/app'
import { initTagsView } from './modules/tagsView'

Vue.use(Vuex)
window.Vuex = Vuex

export let store

export const initStore = config => {
  const app = initApp(config)
  const tagsView= initTagsView(config)
  store = new Vuex.Store({
    modules: {
      app,
      tagsView
    },
    getters
  })
  return store
}

// export const store = new Vuex.Store({
//   modules: {
//     app,
//     tagsView
//   },
//   getters
// })

export const registerStoreModules = modules => {
  Object.keys(modules).map(item => {
    store.registerModule(item, modules[item])
  })
}
