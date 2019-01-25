<template>
    <v-app id="app">
        <v-layout align-center justify-center>
            <img src="../Assets/GitHub.jpg"/>
        </v-layout>
        <div v-if="getToken">
            <v-content>
                <v-alert :value="error" type="error">
                    The app can't get stats from your github account.
                </v-alert>
                <dataTable v-on:dataFetchingFailed="onDataFetchingFailed"></dataTable>
            </v-content>
        </div>
        <div v-else>
            <a :href="getLink">LogIn</a>
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script>

import dataTable from '../Components/DataTable.vue';
import Logo from '../Components/Logo.vue';
import AccessTokenNeeded from '../Components/AccessTokenNeeded.vue';

export default {
    name: 'App',
    components: { 
        dataTable, AccessTokenNeeded, Logo
    },
    data () {
        return {
            error: false
        }
    },
    computed: {
        getToken () {
            if (localStorage.token == '' || localStorage.token == undefined 
                || localStorage.name == '' || localStorage.name == undefined)
                return false;
            return true;
        },
        getLink() {
            return 'https://github.com/login/oauth/authorize?connection=github&scope=public_repo&response_type=code&client_id=3c47a9a8faf9b82f5634&redirect_uri=http://gitgraph/github-auth';
        }
    },
    methods: {
        onDataFetchingFailed: function () {
            this.error = true;
        },
    },
    created : function () {
    }
}
</script>

<style scope>
.theme--light.application {
   background: white;
}
</style>
