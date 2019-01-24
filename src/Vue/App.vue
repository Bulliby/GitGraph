<template>
    <v-app id="app">
        <!--button  @click="handleLogin()">Log In</button!-->
        <a :href="getLink">LogIn</a>
        <router-view></router-view>
        <!--div v-if="getToken">
            <v-layout align-center justify-center>
                <img src="../Assets/GitHub.jpg"/>
            </v-layout>
            <v-content>
                <v-alert :value="error" type="error">
                    The app can't get stats from your github account. Check that you have put your username and token in localStorage
                </v-alert>
                <dataTable v-on:dataFetchingFailed="onDataFetchingFailed"></dataTable>
            </v-content>
        </div>
        <div v-else>
            <AccessTokenNeeded></AccessTokenNeeded>
        </div!-->
    </v-app>
</template>

<script>

import dataTable from '../Components/DataTable.vue';
import Logo from '../Components/Logo.vue';
import AccessTokenNeeded from '../Components/AccessTokenNeeded.vue';
import { login } from './Login.js'

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
            return 'https://github.com/login/oauth/authorize?connection=github&scope=public_repo&response_type=code&client_id=3c47a9a8faf9b82f5634&redirect_uri=http://oauth/auth.php';
        }
    },
    methods: {
        onDataFetchingFailed: function () {
            this.error = true;
        },
        handleLogin: function () {
            login();
        }
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
