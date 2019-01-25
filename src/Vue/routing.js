import GithubOAuth from '../Components/GithubOAuth.vue';
import VueRouter from 'vue-router'

const routes = [
    { path: '/github-auth', name: "auth", component: GithubOAuth }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export { VueRouter };

export default router;
