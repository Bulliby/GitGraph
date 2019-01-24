<template>
    <div>
        <h1>Auth</h1>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data () {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    created: function () {
        let code = this.$route.query.code;
        if (code != undefined)
        {
            axios.post('http://oauth/auth.php?code=' + code)
                .then((r) => { 
                    localStorage.token = r.data.access_token; 
                }).catch((e) => { 
                    console.log("The access token can't be requested") 
                });
        }
    }
}
</script>

<style>
</style>
