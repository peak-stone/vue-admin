import Layout from '../../components/layout'

export default [
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
