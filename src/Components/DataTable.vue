<template>
    <v-data-table v-if="user" :headers="headers" :pagination.sync="pagination" :items="reposInfos" :loading="load" class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props"> 
            <a :href="seeRepo(props.item)" target="_blank" class="link"><td>{{ props.item.name }}</td></a>
            <td>{{ props.item.clone }}</td>
            <td>{{ props.item.view }}</td>
        </template>
    </v-data-table>
</template>

<script>

import axios from 'axios';
import { REPOSITORIES } from '../Constants/gql.js';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


export default {
    name: 'DataTable',
    components: { 
    },
    data () {
        return {
            reposInfos: [],
            clones: [],
            names: [],
            views: [],
            load: false,
            headers: [
                { text: 'Names', value: 'name' },
                { text: 'Unique clones', value: 'clone' },
                { text: 'Unique views', value: 'view' }
            ],
            pagination: {
                rowsPerPage: 10
            }
        }
    },
    apollo: {
        user : {
            query: REPOSITORIES,
            result ({ data, loading, networkStatus }) {
                this.getAxiosPromises(data.user.repositories.nodes);
            },
    },
        },
    methods: {
        getClones : function (repo) {
            return axios
                .get('https://api.github.com/repos/' + localStorage.name + '/' + repo + '/traffic/clones', {headers : {'Authorization' : 'token ' + localStorage.token}})
        },
        getViews: function(repo) {
            return axios
                .get('https://api.github.com/repos/' + localStorage.name + '/'+ repo + '/traffic/views', {headers : {'Authorization' : 'token ' + localStorage.token}})
        },
        getAxiosPromises: function(repos) {
            for (let repo of repos)
            {
                this.clones.push(this.getClones(repo.name));
                this.views.push(this.getViews(repo.name));
                this.names.push(repo.name);
            }
            this.getReposStats();
        },
        getReposStats: function () {
            this.load = true;

            Promise.all(this.clones).then((value) => { 

                this.clones = value; 
                return Promise.all(this.views).then((value) => { 
                    this.views = value 

                })
            }).finally(() => {

                //this.clones.pop();
                if (this.clones.length != this.views.length)
                    throw new Error("There is disparity between views and clones array lenth", 'DataTable.vue', Number(75));

                for (let repo = 0; repo != this.clones.length; repo++)
                {
                    this.load = false

                    let stats = {};
                    stats.name = this.names[repo];
                    stats.clone = this.clones[repo].data.uniques;
                    stats.view = this.views[repo].data.uniques;
                    this.reposInfos.push(stats);
                }

            }).catch((error) => { 

                this.load = false; 
                this.$emit('dataFetchingFailed');
                throw new Error(error);
            });
        },
        seeRepo: function(dataTableItem) {
            return `https://github.com/${localStorage.name}/${dataTableItem.name}`
        }
    },
    computed: {
    },
}
</script>

<style>
.link {
    text-decoration: none;         
    vertical-align: middle;
}
</style>
