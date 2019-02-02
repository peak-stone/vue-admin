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
  .then(({ Vue }) => {
    Vue.prototype.$appName = APP_NAME
  })
  .catch(err => {
    console.error(err)
  })
```
