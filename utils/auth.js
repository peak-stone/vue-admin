import configs from '../configs'

export function getToken () {
  return localStorage.getItem(configs.authTokenKey)
}

export function setToken (token) {
  return localStorage.setItem(configs.authTokenKey, token)
}

export function delToken () {
  return localStorage.removeItem(configs.authTokenKey)
}

export function goToLogin (router) {
  console.log('router:', router)
  if (!window.location.pathname.includes('/login')) {
    const redirect = window.location.pathname + window.location.search
    router.replace({
      name: 'login',
      query: {
        redirect: ROUTE_BASE ? redirect.replace(ROUTE_BASE, '/') : redirect
      }
    })
  }

  return Promise.resolve()
}

export function goTo403 (router) {
  if (!window.location.pathname.includes('/403')) {
    const redirect = window.location.pathname + window.location.search
    router.replace({
      name: '403',
      query: {
        redirect: ROUTE_BASE ? redirect.replace(ROUTE_BASE, '/') : redirect
      }
    })
  }

  return Promise.resolve()
}
