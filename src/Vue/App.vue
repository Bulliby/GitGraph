<template>
    <div id="app">
        <h1 class="title">Monitor Github Traffic</h1>
        <img src="../Assets/GitHub.jpg"/>
        {{ reposInfos }}
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
        getClones : function (repo) {
            return axios
                .get('https://api.github.com/repos/Bulliby/' + repo + '/traffic/clones', {headers : {'Authorization' : 'token ' + localStorage.token}})
        },
        getViews: function(repo) {
            return axios
                .get('https://api.github.com/repos/Bulliby/'+ repo + '/traffic/views', {headers : {'Authorization' : 'token ' + localStorage.token}})
        },
    },
    updated() {
        this.repo_names;
    },
    computed: {
        repo_names () {
            if (this.user)
            {
                let pall1 = [];
                let pall2 = [];
                
                for (let repo of this.user.repositories.nodes)
                {
                    pall1.push(this.getClones(repo.name));
                    pall2.push(this.getViews(repo.name));
                    this.names.push(repo.name);
                }
                Promise.all(pall1).then((value) => { this.clones = value; });
                Promise.all(pall2).then((value) => { this.views = value }).finally(() => {
                    for (var i = 0; i != this.clones.length; i++)
                    {
                        let object = {};
                        object.name = this.names[i];
                        object.clone = this.clones[i].data.uniques;
                        object.clone = this.views[i].data.uniques;
                        this.reposInfos.push(object);
                    }
                });

            }
        },
    },
}
</script>
