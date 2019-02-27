# vue-admin

Admin project lib using Vue.js &amp; ElementUI

## Installation

```bash
$ npm i @peak-stone/vue-admin
```

## Usage

**注：搭配项目模板 [fbi-project-vue-admin-sub](https://github.com/fbi-templates/fbi-project-vue-admin-sub) 更好用哦**

```js
import { initApp, startApp } from '@peak-stone/vue-admin'
import configs from './configs/'

const APP_NAME = 'myapp'
const app = {
  id: `${APP_NAME}`,
  name: `${APP_NAME}-main`,
  meta: {
    icon: 'component'
  }
}

const {
  apolloProvider,
  addApolloClients,
  store,
  router,
  Layout,
  i18nUpdate
} = initApp({
  ...configs,
  app,
  routerConfig: {
    mode: 'history',
    base: `/${APP_NAME}`
  }
})

startApp()
  .then(({ Vue }) => {})
  .catch(err => {
    console.error(err)
  })
```

### 全局插件

使用方法，如:

1. 组件内: `this.$vrm`
2. 非组件内: `Vue.prototype.$vrm`

**`$ajax`**: ajax 请求插件, axios 实例

**`$vrm`**: 角色控制插件 [vue-role-manager](https://www.npmjs.com/package/vue-role-manager). (含异步添加路由能力)

**`$apollo`**: GraphQL 请求客户端. 参考: https://vue-apollo.netlify.com/zh-cn/guide/apollo/#apollo

**`$mStore`**: vuex 插件，等同于组件内 this.\$store. 但插件不限于在组件内使用
