<template>
    <div id="app">
        <h1 class="title">Monitor Github Traffic</h1>
        <img src="../Assets/GitHub.jpg"/>
        <ApolloQuery :query="query">
            <template slot-scope="{ result: { loading, error, data } }">
                <div v-if="data">
                    <span v-for="repository in data.user.repositories.nodes">
                        {{ repository.name }}
                    </span>
                </div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>

import { REPOSITORIES } from '../Constants/gql.js';

export default {
    name: 'App',
    data () {
        return {
            query: REPOSITORIES
        }
    },
    computed: {
    },
    methods: {
    },
}
</script>

<style scoped>
.title {
    color: red;
}
</style>
