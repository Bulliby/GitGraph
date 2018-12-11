import Vue from 'vue'
import App from './App.vue'
import VueApollo from "vue-apollo"

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';


// HTTP connexion to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://api.github.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  console.log(token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const app = new Vue({
    el: '#app',
    // inject apolloProvider here like vue-router or vuex
    apolloProvider,
    render: h => h(App),
});
