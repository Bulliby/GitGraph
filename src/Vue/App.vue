<template>
    <div id="app">
        <h1 class="title">Monitor Github Traffic</h1>
        <img src="../Assets/GitHub.jpg"/>
        {{ user }}
    </div>
</template>

<script>
import axios from 'axios';
import gql from 'graphql-tag'

export default {
    name: 'App',
    data () {
        return {
            info : null
        }
    },
    computed: {
    },
    methods: {
    },
    mounted () {
        /*
        axios
            .get('https://api.github.com', {headers : {'Authorization' : 'token ' + localStorage.token}})
            .then(response => this.info = response)
         */
    },
    apollo: {
        user : gql`{
            user(login: "bulliby")
            {
                name
                repositories(first:10){
                    nodes {
                        name
                    }
                }
            }
        }`
    }
}
</script>

<style scoped>
.title {
    color: red;
}
</style>
