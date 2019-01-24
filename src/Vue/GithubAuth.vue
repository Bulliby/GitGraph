<template>
    <div>
        <h1>Auth</h1>
    </div>
</template>

<script>

import axios from 'axios';
import  { requestToken} from './Login.js';

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
        },
        getUserName: function () {
        }
    },
    created: function () {
        
    }
}
</script>

<style>
</style>
