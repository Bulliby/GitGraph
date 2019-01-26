<template>
    <v-app id="app">
        <div v-if="getToken()">
            <v-layout align-center justify-center>
                <img src="../Assets/GitHub.jpg"/>
            </v-layout>
            <v-content>
                <v-alert :value="error" type="error">
                    The app can't get stats from your github account.
                </v-alert>
                <button @click="logout()"><v-icon>exit_to_app</v-icon>Log out</button>
                <dataTable v-on:dataFetchingFailed="onDataFetchingFailed"></dataTable>
            </v-content>
        </div>
        <div v-else>
            <v-layout align-center justify-center>
                <img src="../Assets/GitHub.jpg"/>
            </v-layout>
            <v-layout align-center justify-center>
                <v-progress-circular v-if="gettingToken" :size="70" :width="7" color="black" indeterminate ></v-progress-circular>
                <div v-else class="login" @click="githubConnect">
                    <button class="login-github-button" type="button">
                        <div class="login-github-icon"></div>
                        <div class="login-github-text">Log in with Github</div>
                    </button>
                </div>
            </v-layout>
        </div>
    </v-app>
</template>

<script>

import dataTable from '../Components/DataTable.vue';
import AccessTokenNeeded from '../Components/AccessTokenNeeded.vue';
import axios from 'axios';
import ApiRequester from './ApiRequester.js';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default {
    name: 'App',
    components: { 
        dataTable, AccessTokenNeeded
    },
    data () {
        return {
            error: false,
            gettingToken: false,
            apiRequester: null,
            state: null
        }
    },
    computed: {
        getLink() {
            return 'https://github.com/login/oauth/authorize?connection=github&scope=public_repo&response_type=code&client_id=3c47a9a8faf9b82f5634&state=' + this.state + '&redirect_uri=https://gitgraph.wellsguillaume.fr';
        }
    },
    methods: {
        onDataFetchingFailed: function () {
            this.error = true;
        },
        githubConnect: function () {
            location.assign(this.getLink);
        },
        getToken: function () {
            if (localStorage.token == '' || localStorage.token == undefined 
                || localStorage.name == '' || localStorage.name == undefined)
                return false;
            return true;
        },
        logout: function () {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            this.$forceUpdate();
        },
        getState () {
            return Math.random().toString(36);
        },

    },
    created : function () {
        let code = this.$route.query.code;
        this.state = this.getState();
        console.log(process.env.BASE_URL);
        if (code != undefined)
        {
            this.gettingToken = true;
            axios.post('https://oauth.wellsguillaume.fr/auth.php?code=' + code + '&state=' + this.state)
                .then((r) => { 
                    localStorage.token = r.data.access_token; 
                    this.apiRequester = new ApiRequester(localStorage.token, 'https://api.github.com');
                    this.apiRequester.getUser().then((r) => {
                        localStorage.setItem('name', r.data.login);
                    }).finally(() => {
                        this.$router.push("/");
                        this.gettingToken = false;
                    });
                }).catch((e) => { 
                    this.$router.push("/");
                    this.gettingToken = false;
                    console.log("The access token can't be requested") 
                });
        }
        else
            this.$router.push("/");

    }
}
</script>

<style scope>
    .theme--light.application {
       background: white;
    }
    .login {
        width: 300px;
        background-color: black;
    }
    .login-github-text {
        box-sizing: border-box;
        display: block;
        overflow: hidden;
        width: calc(100% - 40px);
        padding-left: 54px;
        padding-right: 15px;
        line-height: 40px;
        text-align: center;
        text-transform: uppercase;
        text-overflow: ellipsis;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.7px;
        color: #fff;
        white-space: nowrap;
        transition: background 0.3s;
        -webkit-transition: background 0.3s;
    }
    .login-github-button {
        background-color: black;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 3px;
        position: relative;
        width: 100%;
        height: 40px;
        -webkit-transition: background-color 0.2s ease-in-out;
        transition: background-color 0.2s ease-in-out;
    }
    .login-github-icon {
        background-color: rgba(0,0,0,0.3);
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        transition: background-color 0.3s;
        -webkit-transition: background-color 0.3s;
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDY0IDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Z2l0aHViPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImdpdGh1YiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjQzNzY5NDk5ZS0xNSwzMi4yNSBDOC40Mzc2OTQ5OWUtMTUsMzYuNTYzIDAuODc1LDQwLjc1IDIuNTYzLDQ0LjYyNSBDNS45MzgsNTIuNjI1IDExLjU2Myw1OC4zMTMgMTkuNTAxLDYxLjc1IEMyMy40MzksNjMuNDM4IDI3LjU2NCw2NC4zMTMgMzEuOTM5LDY0LjMxMyBDMzYuMzE0LDY0LjMxMyA0MC40MzksNjMuNDM4IDQ0LjM3Nyw2MS43NSBDNTIuMTksNTguMzc1IDU3Ljg3Nyw1Mi42ODcgNjEuMzE1LDQ0LjYyNSBDNjMuMDAzLDQwLjYyNSA2My44NzgsMzYuNDM3IDYzLjg3OCwzMi4yNSBDNjMuODc4LDI4IDYzLjAwMywyMy44NzUgNjEuMzE1LDE5LjgxMiBDNTcuODc3LDExLjgxMiA1Mi4xOSw2LjE4NyA0NC4zNzcsMi44NzQgQzQwLjQzOSwxLjEyNCAzNi4zMTQsMC4zMTEgMzEuOTM5LDAuMzExIEMyNy41NjQsMC4zMTEgMjMuNDM5LDEuMTI0IDE5LjUwMSwyLjg3NCBDMTEuNTYzLDYuMjQ5IDUuOTM4LDExLjg3NCAyLjU2MywxOS44MTIgQzAuODc1LDIzLjc1IDAsMjcuODc1IDAsMzIuMjUgTDguNDM3Njk0OTllLTE1LDMyLjI1IFogTTUsMzIuMjUgQzUsMjguNjI1IDUuNjg4LDI1LjEyNSA3LjEyNSwyMS43NSBDOC41NjMsMTguNSAxMC41LDE1LjYyNSAxMi44NzUsMTMuMTg3IEMxNS4zNzUsMTAuNzQ5IDE4LjI1LDguODEyIDIxLjQzOCw3LjQzNyBDMjQuOTM4LDUuOTk5IDI4LjQzOCw1LjMxMiAzMS45MzgsNS4zMTIgQzM1LjUwMSw1LjMxMiAzOC45MzgsNiA0Mi4zNzYsNy40MzcgQzQ1LjY4OSw4Ljg3NSA0OC41NjQsMTAuNzUgNTAuOTM5LDEzLjE4NyBDNTMuNDM5LDE1LjYyNSA1NS4zMTQsMTguNSA1Ni42ODksMjEuNzUgQzU4LjEyNywyNS4xMjUgNTguODE0LDI4LjYyNSA1OC44MTQsMzIuMjUgQzU4LjgxNCwzOC4xODggNTcuMDY0LDQzLjU2MyA1My41NjQsNDguMjUgQzUwLjAwMSw1MyA0NS40MzksNTYuMzEzIDM5LjkzOSw1OC4zMTMgTDM5LjkzOSw1My4xODggQzM5LjkzOSw1MC42ODggMzkuMDY0LDQ4LjgxMyAzNy4zMTQsNDcuNjI1IEMzOS40MzksNDcuNDM3IDQxLjM3Nyw0NyA0My4xMjcsNDYuMzc1IEM0NS4yNTIsNDUuNjI1IDQ2Ljk0LDQ0LjU2MiA0OC4xOSw0My4xODcgQzUwLjU2NSw0MC43NDkgNTEuNjksMzcuMTI0IDUxLjY5LDMyLjM3NCBDNTEuNjksMjkuMTg2IDUwLjYyNywyNi40MzYgNDguNTAyLDI0LjE4NiBDNDkuNDQsMjEuNjIzIDQ5LjM3NywxOC45MzYgNDguMTg5LDE1Ljk5OCBMNDcuNDM5LDE1LjkzNSBDNDYuODE0LDE1LjgxIDQ1Ljg3NiwxNi4wNiA0NC41MDEsMTYuNTYgQzQzLjAwMSwxNy4xMjMgNDEuNTAxLDE3Ljk5OCAzOS44MTMsMTkuMTIzIEMzNy4xODgsMTguNDM1IDM0LjU2MywxOC4wNiAzMi4wNjMsMTguMDYgQzI5LjU2MywxOC4wNiAyNywxOC40MzUgMjQuMzc1LDE5LjEyMyBDMjIuMzEyLDE3Ljc0OCAyMC41LDE2LjgxIDE4LjgxMiwxNi4zMSBDMTguMTg3LDE2LjA2IDE3LjYyNCwxNS45OTcgMTcuMTg3LDE1Ljk5NyBMMTUuOTM3LDE1Ljk5NyBDMTQuNzQ5LDE4LjkzNSAxNC42MjQsMjEuNjIyIDE1LjYyNCwyNC4xODUgQzEzLjQ5OSwyNi40MzUgMTIuNDM2LDI5LjE4NSAxMi40MzYsMzIuMzczIEMxMi40MzYsMzguNDk4IDE0LjM3NCw0Mi43NDggMTguMjQ5LDQ1LjEyMyBDMTkuNzQ5LDQ2LjA2MSAyMS42MjQsNDYuNzQ4IDIzLjgxMiw0Ny4xMjMgQzI0LjkzNyw0Ny4zNzMgMjUuOTM3LDQ3LjU2MSAyNi44MTIsNDcuNjIzIEMyNS4xMjQsNDguNzQ4IDI0LjI0OSw1MC42MjMgMjQuMjQ5LDUzLjE4NiBMMjQuMjQ5LDU4LjMxMSBDMTguNTYxLDU2LjMxMSAxMy45MzYsNTIuOTk4IDEwLjM3NCw0OC4zNzMgQzYuODExLDQzLjYyMyA0Ljk5OSwzOC4yNDggNC45OTksMzIuMjQ4IEw1LDMyLjI1IFoiIGlkPSJTaGFwZSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
        text-shadow: 0 0 black;
        background-repeat: no-repeat;
        background-size: 50%;
        background-position: center center;
    }
</style>
