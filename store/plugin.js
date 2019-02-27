import { store } from './index'

export default {
  store,
  install (Vue, options) {
    Vue.prototype.$mStore = store
  }
}
