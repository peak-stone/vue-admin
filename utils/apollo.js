import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getToken, goToLogin, goTo403 } from './auth'

let apolloProvider
let router

export function initApollo (Vue, _router) {
  router = _router
  apolloProvider = new VueApollo({})

  Vue.use(VueApollo)

  return apolloProvider
}

const authLink = setContext((_, { headers }) => {
  const token = getToken()
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(
  ({ operation, response, graphQLErrors, networkError }) => {
    const status =
      networkError && networkError.statusCode ? networkError.statusCode : null
    let networkErrorMessage = ''
    switch (status) {
      case 401:
        networkErrorMessage = '请先登录!'
        goToLogin(router)
        break
      case 403:
        networkErrorMessage = '抱歉! 您无权限访问!'
        goTo403(router)
        break
      case 404:
        networkErrorMessage = '抱歉，该服务目前不可用!'
        break
      case 500:
        networkErrorMessage = '抱歉，服务器内部错误!'
        break
      case 504:
        networkErrorMessage = '抱歉，服务暂时不可用!'
        break
      default:
        break
    }

    if (networkErrorMessage && response) {
      response.errors = {
        message: networkErrorMessage
      }
    }

    if (networkError) {
      Vue.prototype.$message.error(
        networkErrorMessage || `网络错误! ${networkError.message}`
      )
      console.error(
        '[Network error]:',
        `Status: ${status}`,
        'Operation:',
        operation,
        networkError
      )
    }

    if (Array.isArray(graphQLErrors)) {
      graphQLErrors.map(err => console.error('[GraphQL error]:', err))
    }
  }
)

export function addApolloClients (clients) {
  const _clients = Array.isArray(clients) ? clients : [clients]
  for (let client of _clients) {
    const APILink = client.upload
      ? createUploadLink({
        uri: client.uri,
        ...client.upload
      })
      : createHttpLink({
        uri: client.uri
      })

    if (!apolloProvider.clients[client.name]) {
      apolloProvider.clients[client.name] = new ApolloClient({
        link: authLink.concat(errorLink).concat(APILink),
        cache: new InMemoryCache(),
        connectToDevTools: process.env.NODE_ENV === 'development'
      })
    }
  }
}
