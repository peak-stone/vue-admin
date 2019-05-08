export default {
  store: require('./index').store,
  install (Vue, options) {
    Vue.prototype.$mStore = require('./index').store
  }
}
