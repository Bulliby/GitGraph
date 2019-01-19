import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueApollo from "vue-apollo"
import Vuetify from 'vuetify'
import Login from './Login.js' 
import GithubAuth from './GithubAuth.vue';


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

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const routes = [
    { path: '/github-auth', name: "auth", component: GithubAuth }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const app = new Vue({
    el: '#app',
    apolloProvider,
    render: h => h(App),
    router
});
