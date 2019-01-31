import Layout from '../../components/layout'

export default [
  {
    path: '/',
    component: Layout,
    redirect: {
      name: 'dashboard'
    },
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import('../../views/dashboard' /* webpackChunkName: "dashboard" */)
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () =>
          import('../../views/settings' /* webpackChunkName: "settings" */),
        name: 'settings',
        meta: {
          icon: 'settings'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: 'error-403',
        component: () =>
          import('../../views/error/403' /* webpackChunkName: "error" */),
        name: '403',
        meta: {
          noCache: true
        }
      },
      {
        path: '404',
        component: () =>
          import('../../views/error/404' /* webpackChunkName: "error" */),
        name: '404',
        meta: {
          noCache: true
        }
      }
    ]
  }
]
