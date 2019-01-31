import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)
window.Vuex = Vuex

export const store = new Vuex.Store({
  modules: {
    app,
    tagsView
  },
  getters
})

export const registerStoreModules = modules => {
  Object.keys(modules).map(item => {
    store.registerModule(item, modules[item])
  })
}
