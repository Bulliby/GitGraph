<template>
    <div>
        <v-alert :value="error" type="error">
            <h3>AccessTokenNeeded</h3>
            <p>Create an api access token from the github interface with public_repo. Put api token in local storage.
                </br>Open the console and type : localStorage.setItem('token', 'yourtoken');
                </br>Add your Github's username too : localStorage.setItem('name', 'MyUserName');
            </p>
        </v-alert>
        <v-layout align-center justify-center>
            <Logo id="logo"></Logo>
        </v-layout>
    </div>
</template>

<script>

import Logo from '../Components/Logo.vue';

export default {
    name: 'AccessTokenNeeded',
    components: { 
        Logo
    },
    data () {
        return {
            error : true //This always true
        }
    },
}
</script>

<style scoped>

</style>
