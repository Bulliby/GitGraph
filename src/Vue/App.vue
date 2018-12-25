<template>
    <div id="app">
        <img src="../Assets/GitHub.jpg"/>
        <dataTable></dataTable>
    </div>
</template>

<script>

import dataTable from '../Components/DataTable.vue';

export default {
    name: 'App',
    components: { 
        dataTable
    },
    data () {
        return {
        }
    },
}
</script>
