<template>
    <v-app id="app">
        <div v-if="getToken">
            <v-content>
                <v-layout align-center justify-center>
                    <img src="../Assets/GitHub.jpg"/>
                </v-layout>
                <dataTable></dataTable>
            </v-content>
        </div>
        <div v-else>
            <AccessTokenNeeded></AccessTokenNeeded>
        </div>
    </v-app>
</template>

<script>

import dataTable from '../Components/DataTable.vue';
import AccessTokenNeeded from '../Components/AccessTokenNeeded.vue';

export default {
    name: 'App',
    components: { 
        dataTable, AccessTokenNeeded
    },
    data () {
        return {
        }
    },
    computed: {
        getToken () {
            console.log(localStorage.token);
            if (localStorage.token == '' || localStorage.token == undefined)
                return false;
            return localStorage.token;
        }
    }
}
</script>

<style scope>
.theme--light.application {
   background: white;
}
</style>
