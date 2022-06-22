<template>
    <div class="login" @click="githubConnect">
        <img class="login-github-icon" :src="loginSvg" alt="github login button's svg"></img>
        <div class="login-github-text">Log in with Github</div>
    </div>
</template>

<script>

import LoginSvg from './login.svg';

export default {
    name: 'Login',
    components: { 
    },
    data () {
        return {
			loginSvg: LoginSvg,
        }
    },
    computed: {
    },
    methods: {
        githubConnect: function () {
            location.assign(`https://github.com/login/oauth/authorize?connection=github&scope=public_repo&response_type=code&client_id=${process.env.CLIENT_ID}&state=${Math.random().toString(36)}&redirect_uri=${process.env.REDIRECT_URL}`);
        },
    }
}

</script>

<style>
    .login {
        width: 200px;
        background-color: black;
        margin: auto;
        color:#FFFFFF;
		display: flex;
		height: 30px;
		padding: 10px;
    }
    .login-github-text {
		align-self: center;
		margin-left: 10px;
    }
	.login-github-icon {
		width: 30px;
	}
</style>
