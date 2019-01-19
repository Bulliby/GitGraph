<template>
    <div>
        <h1>Auth</h1>
    </div>
</template>

<script>
import axios from 'axios';
import  { requestToken } from './Login.js';

export default {
    data () {
        return {
            code: null,
            state: null
        }
    },
    computed: {
    },
    methods: {
        getToken: function () {
            requestToken(this.code);
        }
    },
    created: function () {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
        this.getToken();
    }
}
</script>

<style>
</style>
