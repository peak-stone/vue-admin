import Vue from 'vue'
import VueRouter from 'vue-router'
import hook from './hook'
import Layout from '../components/layout'
import basicRoutes from './modules/basic'

Vue.use(VueRouter)
window.VueRouter = VueRouter

const defaultsRoutes = basicRoutes
let routerIns

export function routerInit (routes, appInfo) {
  const customRoutes = routes
    ? [
      {
        path: `/${appInfo.id}`,
        name: appInfo.name || 'app',
        meta: appInfo.meta || {},
        component: Layout,
        children: routes
      }
    ]
    : []

  routerIns = new VueRouter({
    routes: [...defaultsRoutes, ...customRoutes],
    scrollBehavior: () => ({
      y: 0
    })
  })

  hook(routerIns)

  return routerIns
}

export const router = routerIns
