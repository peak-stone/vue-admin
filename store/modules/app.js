const getters = {}

let state = {
  routes: [],
  sidebar: {
    opened: !+localStorage.getItem('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  language: localStorage.getItem('language') || 'zh',
  size: localStorage.getItem('size') || 'medium',
  showLogo: localStorage.getItem('logo') || false,
  logo: '',
  showBreadCrumb: localStorage.getItem('breadcrumb') || true,
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.routes = routes
  },
  ADD_ROUTES (state, routes) {
    if (routes) {
      state.routes = state.routes.concat(
        Array.isArray(routes) ? routes : [routes]
      )
    }
  },
  UNSHIFT_ROUTES (state, routes = []) {
    if (routes) {
      state.routes.unshift(...(Array.isArray(routes) ? routes : [routes]))
    }
  },
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    localStorage.setItem('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    localStorage.setItem('size', size)
  },
  TOGGLE_LOGO: (state, showLogo) => {
    state.showLogo = showLogo
    localStorage.setItem('logo', showLogo)
  },
  UPDATE_LOGO: (state, logo) => {
    state.showLogo = true
    state.logo = logo
  },
  TOGGLE_BREADCRUMB: (state, showBreadCrumb) => {
    state.showBreadCrumb = showBreadCrumb
    localStorage.setItem('breadcrumb', showBreadCrumb)
  }
}

const actions = {
  toggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage ({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize ({ commit }, size) {
    commit('SET_SIZE', size)
  },
  toggleLogo ({ commit }, showLogo) {
    commit('TOGGLE_LOGO', showLogo)
  },
  toggleBreadCrumb ({ commit }, showBreadCrumb) {
    commit('TOGGLE_BREADCRUMB', showBreadCrumb)
  },
}

function init(config) {
  Object.keys(state).map(item => {
    if(config[item] !== undefined) {
      state[item] = config[item]
    }
  })
}

export const initApp = config => {
  init(config)
  return {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
}
