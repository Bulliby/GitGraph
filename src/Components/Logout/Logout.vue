<template>
    <div class="logout">
        <span @click="logout()"> ⎋ Logout </span>
    </div>
</template>

<script>

export default {
    name: 'Logout',
    components: { 
    },
    data () {
        return {
        }
    },
    computed: {
    },
    methods: {
        logout() {
            this.$cookies.eraseCookie('oauth', '', process.env.DOMAIN);
            this.$cookies.eraseCookie('name', '', process.env.DOMAIN);
            location.reload();
        }
    }
}

</script>

<style>
    .logout {
        padding-top: 40px;
    }
</style>
