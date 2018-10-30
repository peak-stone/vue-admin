import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

let apolloProvider

export function initApollo (Vue) {
  apolloProvider = new VueApollo({})

  Vue.use(VueApollo)

  return apolloProvider
}

export function addApolloClients (clients) {
  const _clients = Array.isArray(clients) ? clients : [clients]
  for (let client of _clients) {
    apolloProvider.clients[client.name] = new ApolloClient({
      link: new HttpLink({
        uri: client.uri
      }),
      cache: new InMemoryCache(),
      connectToDevTools: true
    })
  }
}
