<template>
    <div>
        <h1>Auth</h1>
    </div>
</template>

<script>

import axios from 'axios';
import  { requestToken, getCode } from './Login.js';

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
            getCode();
        },
        getUserName: function () {
        }
    },
    created: function () {
        /*
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
        localStorage.setItem('name', this.getUserName());
        */
        this.getToken();
    }
}
</script>

<style>
</style>
