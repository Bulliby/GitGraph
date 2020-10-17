import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './routing.js'
import ApiRequester from '../api/ApiRequester'
import { CookiesLoader } from './Cookies.js'
import { VueRouter } from './routing.js'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(ApiRequester, {url: 'https://api.github.com'})
Vue.use(CookiesLoader)

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router
});
