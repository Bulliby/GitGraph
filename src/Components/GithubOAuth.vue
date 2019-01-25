<template>
    <div>
        <h1>The authentication is on progress!!</h1>
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
        //TODO: handle the case
        if (code != undefined)
        {
            axios.post('http://oauth/auth.php?code=' + code)
                .then((r) => { 
                    localStorage.token = r.data.access_token; 
                    console.log(r.data);
                }).catch((e) => { 
                    console.log("The access token can't be requested") 
                });
        }
    }
}
</script>

<style>
</style>
