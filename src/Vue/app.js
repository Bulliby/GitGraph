import Vue from 'vue'
import App from './App.vue'
import VueApollo from "vue-apollo"
import Vuetify from 'vuetify'
import router from './routing.js'
import ApiRequester from '../api/ApiRequester'
import { VueRouter } from './routing.js'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';


const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})


Vue.use(VueApollo)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(ApiRequester, {url: 'https://api.github.com'})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const app = new Vue({
    el: '#app',
    apolloProvider,
    render: h => h(App),
    router
});
