<template>
    <div>
    <header>
        <img class="github-img" alt="Brand Logo Github" :src="githublogo" />
        <Calendar />
    </header>
    <DataTable />
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
            githublogo: GitHubLogo
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
