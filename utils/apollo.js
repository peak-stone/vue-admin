import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { createUploadLink } from 'apollo-upload-client'

let apolloProvider

export function initApollo (Vue) {
  apolloProvider = new VueApollo({})

  Vue.use(VueApollo)

  return apolloProvider
}

export function addApolloClients (clients) {
  const _clients = Array.isArray(clients) ? clients : [clients]
  for (let client of _clients) {
    apolloProvider.clients[client.name] = client.upload
      ? new ApolloClient({
        link: createUploadLink({
          uri: client.uri,
          ...client.upload
        }),
        cache: new InMemoryCache(),
        connectToDevTools: true
      })
      : new ApolloClient({
        link: new HttpLink({
          uri: client.uri
        }),
        cache: new InMemoryCache(),
        connectToDevTools: true
      })
  }
}
