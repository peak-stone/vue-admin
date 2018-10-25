import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)
window.Vuex = Vuex

const store = new Vuex.Store({
  modules: {
    app,
    tagsView,
    user
  },
  getters
})

export default store