import Vue from 'vue'
import App from './App.vue'
import { StatsLoader } from './Stats.js'
import { CookiesLoader } from './Cookies.js'
import { ApiRequesterLoader } from '../api/ApiRequester.js'

Vue.use(StatsLoader);
Vue.use(CookiesLoader);
Vue.use(ApiRequesterLoader, {url: 'https://api.github.com'})


const app = new Vue({
    el: '#app',
    render: h => h(App),
});
