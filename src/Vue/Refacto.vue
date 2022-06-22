<template>
    <div>
        <header>
            <img class="github-img" alt="Brand Logo Github" :src="githublogo" />
            <img class="github-img-mob" alt="Brand Logo Github" :src="githublogomob" />
            <Calendar v-if="connected" @days="updateDate($event)"/>
        </header>
        <Login v-if="!connected" />
        <DataTable v-if="connected" :days="days"/>
    </div>
</template>

<script>

import GitHubLogo from '../assets/github.svg'
import GitHubLogoMob from '../assets/github-mob.svg'
import Calendar from '../Components/Calendar/Calendar.vue'
import DataTable from '../Components/DataTable/DataTable.vue'
import Login from '../Components/Login/Login.vue'

export default {
    name: 'Refacto',
    components: { 
        Calendar,
        DataTable,
        Login
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
    },
    computed: {
        connected() {
            if (this.$cookies.getCookie('oauth') == undefined) {
                return false;
            }
            return true;
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
