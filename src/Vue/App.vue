<template>
    <div id="app">
        {{ repo_names }}
        <h1 class="title">Monitor Github Traffic</h1>
        <img src="../Assets/GitHub.jpg"/>
        <v-data-table v-if="user" :headers="headers" :items="reposInfos" class="elevation-1">
            <template slot="items" slot-scope="props"> 
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.clone }}</td>
                <td>{{ props.item.view }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>

import { REPOSITORIES } from '../Constants/gql.js';
import axios from 'axios';
import dataTable from '../Components/summary.vue';

export default {
    name: 'App',
    components: { 
        dataTable
    },
    data () {
        return {
            reposInfos: [],
            names: [],
            clones: [],
            views: [],
            headers: [
                { text: 'Unique clones', value: 'clones' },
                { text: 'Unique views', value: 'views' }
            ],
        }
    },
    apollo: {
        user : {
            query: REPOSITORIES,
        }
    },
    methods: {
        getClones : function (repo, count) {
            return axios
                .get('https://api.github.com/repos/Bulliby/' + repo + '/traffic/clones', {headers : {'Authorization' : 'token ' + localStorage.token}})
                .then(response => {
                    return {'count' : count, 'reponse' : response };
                })
        },
        getViews: function(repo, count) {
            return axios
                .get('https://api.github.com/repos/Bulliby/'+ repo + '/traffic/views', {headers : {'Authorization' : 'token ' + localStorage.token}})
                .then(response => {
                    return {'count' : count, 'reponse' : response };
                })
        },
    },
    computed: {
        repo_names () {
            if (this.user)
            {
                let repos = this.user.repositories.nodes;
                for (let count in this.user.repositories.nodes)
                {
                    this.reposInfos.push({});
                    this.reposInfos[count].name = repos[count].name;

                    this.getClones(repos[count].name, count).then((response) => {
                        this.reposInfos[response.count].clone = response.response.data.uniques;
                    }).catch(() => {
                        throw 'La recuperation des datas est incomplete';
                    });
                    /*
                    
                    this.getViews(repo.name).then((response, count) => {
                        this.reposInfos[response.count].view = response.response.data.uniques;
                    }).catch(() => {
                        throw 'La recuperation des datas est incomplete';
                    });
                    */
                    count += 1;
                }
            }
        },
    },
}
</script>
