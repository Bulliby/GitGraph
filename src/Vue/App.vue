<template>
    <div id="app">
        {{ info }}
        <h1 class="title">Monitor Github Traffic</h1>
        <img src="../Assets/GitHub.jpg"/>
        <ApolloQuery :query="query">
            <template slot-scope="{ result: { loading, error, data } }">
                <div v-if="data">
                    {{ data.user.id }}
                    <div v-for="repository in data.user.repositories.nodes">
                        <summaryRepo :name="repository.name"></summaryRepo>
                    </div>
                </div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>

import { REPOSITORIES } from '../Constants/gql.js';
import axios from 'axios';
import summaryRepo from '../Components/summary.vue';

export default {
    name: 'App',
    components: { 
        summaryRepo
    },
    data () {
        return {
            query: REPOSITORIES,
            info: 'not'
        }
    },
    computed: {
    },
    methods: {
        referrers () {
            return 
        }
    },
    mounted() {
    }
}
</script>
