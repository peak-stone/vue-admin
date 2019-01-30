import Layout from '../components/layout'

export default [
  {
    path: '/example',
    component: Layout,
    name: 'example',
    redirect: '/example/icon',
    alwaysShow: true, // will always show the root menu
    meta: {
      icon: 'component'
    },
    children: [
      {
        path: 'icon',
        name: 'icon',
        component: () => import('./icon' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'icon'
        }
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('./form' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'form'
        }
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('./table' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'table'
        }
      },
      {
        path: 'draggable',
        name: 'draggable',
        component: () =>
          import('./draggable' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'drag'
        }
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('./editor' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'edit'
        }
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () =>
          import('./markdown' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'markdown'
        }
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('./upload' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'upload'
        }
      },
      {
        path: 'nested',
        name: 'nested',
        component: () => import('./nested' /* webpackChunkName: "examples" */),
        meta: {
          icon: 'nested',
          // 该菜单项是否路由 (适用于菜单分组标题强制生成链接)
          route: true
        },
        children: [
          {
            path: 'level-1',
            name: 'level-1',
            component: () =>
              import('./nested/menu1-1' /* webpackChunkName: "examples" */),
            meta: {},
            children: []
          },
          {
            path: 'level-2',
            name: 'level-2',
            component: () =>
              import('./nested/menu1-2' /* webpackChunkName: "examples" */),
            meta: {},
            children: [
              {
                path: 'level-2-1',
                name: 'level-2-1',
                component: () =>
                  import('./nested/menu1-2/menu1-2-1' /* webpackChunkName: "examples" */),
                meta: {},
                children: []
              },
              {
                path: 'level-2-2',
                name: 'level-2-2',
                component: () =>
                  import('./nested/menu1-2/menu1-2-2' /* webpackChunkName: "examples" */),
                meta: {},
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]
