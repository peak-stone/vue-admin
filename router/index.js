import Vue from 'vue'
import VueRouter from 'vue-router'
import hook from './hook'
import Layout from '../components/layout'
import basicRoutes from './modules/basic'

Vue.use(VueRouter)
window.VueRouter = VueRouter

const defaultsRoutes = basicRoutes
let routerIns

export function routerInit (routes, app, routerConfig = {}) {
  const customRoutes = routes
    ? [
      {
        path: `/${app.id}`,
        name: app.name || 'app',
        meta: app.meta || {},
        component: Layout,
        children: routes
      }
    ]
    : []

  routerIns = new VueRouter({
    routes: [...defaultsRoutes, ...customRoutes],
    scrollBehavior (to, from, savedPosition) {
      // keep-alive 返回缓存页面后记录浏览位置
      if (savedPosition && to.meta.keepAlive) {
        return savedPosition
      }
      // 异步滚动操作
      return new Promise(resolve => {
        setTimeout(() => {
          document.querySelectorAll('body')[0].scrollTop = 0

          resolve({
            x: 0,
            y: 1
          })
        }, 0)
      })
    },
    ...routerConfig
  })

  hook(routerIns)

  return routerIns
}

export const router = routerIns
