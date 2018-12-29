<template>
    <div>
        <h3>AccessTokenNeeded</h3>
        <div>Create an api access token from the github interface with public_repo scope</div>
        <div>Put api token in local storage. Open the console and type : localStorage.setItem('token', 'yourtoken');</div>
        <div>Add your Github's username too : localStorage.setItem('name', 'MyUserName');</div>
    </div>
</template>

<script>


export default {
    data () {
        return {
        }
    },
}
</script>
