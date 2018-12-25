<template>
    <v-app id="app">
    <v-content>
        <v-layout align-center justify-center>
            <img src="../Assets/GitHub.jpg"/>
        </v-layout>
        <dataTable></dataTable>
    </v-content>
    </v-app>
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

<style scope>
.theme--light.application {
   background: white;
}
</style>
