<template>
    <div>
        <header>
            <img class="github-img" alt="Brand Logo Github" :src="githublogo" />
            <Calendar  @days="updateDate($event)"/>
        </header>
        <DataTable :days="days"/>
    </div>
</template>

<script>

import GitHubLogo from '../assets/github.svg'
import Calendar from '../Components/Calendar/Calendar.vue'
import DataTable from '../Components/DataTable/DataTable.vue'

export default {
    name: 'Refacto',
    components: { 
        Calendar,
        DataTable
    },
    data () {
        return {
            githublogo: GitHubLogo,
            days: 1
        }
    },
    methods: {
        updateDate(days) {
            this.days = days; 
        }
    }
}

</script>

<style>

header {
    text-align: center;
}

.github-img {
    /* ratio 1/2 */
    width: 600px;
    height: 300px;
}

body {
}

</style>
