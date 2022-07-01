<template>
    <div>
        <header>
            <img class="github-img" alt="Brand Logo Github" :src="githublogo" />
            <img class="github-img-mob" alt="Brand Logo Github" :src="githublogomob" />
            <Calendar v-if="connected()" @days="updateDate($event)"/>
        </header>
        <Login v-if="!connected()" />
        <Logout v-if="connected()" />
        <DataTable v-if="connected()" :days="days"/>
    </div>
</template>

<script>

import axios from 'axios';
import GitHubLogo from '../assets/github.svg'
import GitHubLogoMob from '../assets/github-mob.svg'
import Calendar from '../Components/Calendar/Calendar.vue'
import DataTable from '../Components/DataTable/DataTable.vue'
import Login from '../Components/Login/Login.vue'
import Logout from '../Components/Logout/Logout.vue'

export default {
    name: 'App',
    components: { 
        Calendar,
        DataTable,
        Login,
        Logout
    },
    data () {
        return {
            githublogo: GitHubLogo,
            githublogomob: GitHubLogoMob,
            days: 1
        }
    },
    methods: {
        updateDate(days) {
            this.days = days; 
        },
        connected() {
            if (this.$cookies.getCookie('oauth') == undefined) {
                return false;
            }
            return true;
        }
    },
    computed: {
    },
    created: function() {
        const params = (new URL(document.location)).searchParams;
        const code = params.get("code");
        const state = params.get("state");;

        if (!this.connected() && code && state) {
            axios.post(process.env.OAUTH_URL, { code, state }, {withCredentials: true})
                .then((r) => {
                    this.$cookies.parseCookies();
                    this.$apiRequester.setName(this.$cookies.getCookie('name'));
                    this.$apiRequester.setToken(this.$cookies.getCookie('oauth'));
                    location.href = process.env.REDIRECT_URL;
            });
        }
    }
}

</script>

<style>

header {
    text-align: center;
}

body {
}

@media (max-width: 650px)
{
    .github-img-mob {
        display: inline-block;
        width: 150px;
        height: 150px;
        padding-bottom: 50px;
    }

    .github-img {
        /* ratio 1/2 */
        width: 600px;
        height: 300px;
        display: none;
    }
}

@media (min-width: 650px)
{
    .github-img-mob {
        display: none;
    }

    .github-img {
        /* ratio 1/2 */
        width: 600px;
        height: 300px;
        display: inline-block;
    }
}
</style>
