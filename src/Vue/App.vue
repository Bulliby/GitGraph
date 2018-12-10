<template>
    <div id="app">
        <h1 class="title">Monitor Github Traffic</h1>
        <img src="../Assets/GitHub.jpg"/>
    </div>
</template>

<script>
import axios from 'axios';

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
  }
}
</script>

<style scoped>
.title {
    color: red;
}
</style>
