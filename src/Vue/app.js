import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './routing.js'
import ApiRequester from '../api/ApiRequester'
import { VueRouter } from './routing.js'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(ApiRequester, {url: 'https://api.github.com'})

const app = new Vue({
    el: '#app',
    apolloProvider,
    render: h => h(App),
    router
});
