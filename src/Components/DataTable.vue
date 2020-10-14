<template>
    <v-data-table :headers="headers" :pagination.sync="pagination" :items="reposInfos" :loading="load" class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props"> 
                <a :href="seeRepo(props.item)" target="_blank" class="link"><td>{{ props.item.name }}</td></a>
                <td>{{ props.item.clone }}</td>
                <v-tooltip :disabled="props.item.referrers.length == 0" bottom>
                    <template v-slot:activator="{ on }">
                        <td v-on="on">{{ props.item.view }}</td>
                    </template>
                    <div class="toto" v-for="referrer in props.item.referrers">{{ referrer }}</div>
                </v-tooltip>
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
    props: {
        name: {
            type: String
        }
    },
    data () {
        return {
            reposInfos: [],
            clones: [],
            names: [],
            views: [],
            stars: [],
            referrers: [],
            load: false,
            headers: [
                { text: 'Names', value: 'name' },
                { text: 'Unique clones', value: 'clone' },
                { text: 'Unique views', value: 'view' },
            ],
            pagination: {
                rowsPerPage: 7
            },
            apiRequester: null
        }
    },
    created: function() {
        this.$apiRequester.getRepositories().then((response) => {
            this.getAxiosPromises(response.data);
        }); 
    },
    methods: {
        getClones : function (repo) {
            return this.$apiRequester.getClones(repo);
        },
        getViews: function(repo) {
            return this.$apiRequester.getViews(repo);
        },
        getReferrers: function(repo) {
            return this.$apiRequester.getReferrers(repo);
        },

        getAxiosPromises: function(repos) {
            for (let repo of repos)
            {
                this.clones.push(this.getClones(repo.name));
                this.views.push(this.getViews(repo.name));
                this.referrers.push(this.getReferrers(repo.name));
                this.names.push(repo.name);
            }

            this.getReposStats();
        },

        getReposStats: function () {
            this.load = true;

            Promise.all(this.clones).then((value) => { 
                this.clones = value; 
                return Promise.all(this.views);
            }).then((value) => {
                this.views = value; 
                return Promise.all(this.referrers);
            }).then((value) => {
                this.referrers = value;
            }).finally(() => {
                if (this.clones.length != this.views.length) {
                    throw new Error("There is disparity between views and clones array lenth"); 
                }
                for(const key in this.clones) {
                    this.load = false

                    let stats = {};
                    let uniqueReferrer = [];
                    stats.name = this.names[key];
                    stats.clone = this.clones[key].data.uniques;
                    stats.view = this.views[key].data.uniques;
                    stats.referrers = this.referrers[key].data.map(el => el.referrer);
                    stats.stars = this.stars[key];
                    this.reposInfos.push(stats);
                }

            }).catch((error) => { 
                this.load = false; 
                this.$emit('dataFetchingFailed');
                throw new Error(error);
            });
        },
        seeRepo: function(dataTableItem) {
            return `https://github.com/${this.$apiRequester.username}/${dataTableItem.name}`
        },
    },
    computed: {
    }
}
</script>

<style>
.link {
    text-decoration: none;         
    vertical-align: middle;
}
</style>
