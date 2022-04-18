<template>
    <div>
        <v-data-table :headers="headers" :pagination.sync="pagination" :items="reposInfos2" :loading="load" class="elevation-1">
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
        <v-date-picker
            v-model="date"
            @input="getByDate()"
            :min=dateMin
            :max=dateMax
        ></v-date-picker>
    </div>
</template>

<script>

import axios from 'axios';
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
            reposInfos2: [],
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
            apiRequester: null,
            min: null,
            max: null,
            date: null,
        }
    },
    created: function() {
        this.min = new Date();
        this.max = new Date();
        this.date = new Date();
        this.date.setDate(this.date.getDate() - 1);
        this.date = this.date.toISOString().split('T')[0];
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

        getByDate: function() {
            this.reposInfos2 = [];
            for(const key in this.reposInfos) {
                let stats = {};
                let repoInfos = this.reposInfos[key];
                if (repoInfos.clone.length) {
                    let clones = this.filterByDate(repoInfos.clone);
                    if (clones.length) {
                        stats.clone = clones[0].uniques;
                    } else {
                        stats.clone = 0;
                    }
                } else {
                    stats.clone = 0;
                }
                if (repoInfos.view.length) {
                    let views = this.filterByDate(repoInfos.view);
                    if (views.length) {
                        stats.view = views[0].uniques;
                    } else {
                        stats.view = 0;
                    }
                } else {
                    stats.view = 0;
                }
                stats.referrers = repoInfos.referrers;
                stats.name = repoInfos.name;
                this.reposInfos2.push(stats);
            }

            console.log(this.reposInfos2);
            console.log(this.reposInfos);
        },

        filterByDate: function(stats) {
            return stats.filter((el) => {
                let dateEl = el.timestamp.split('T')[0];
                return dateEl == this.date;
            });
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
                for(const key in this.clones) {
                    this.load = false
                    let uniqueReferrer = [];
                    let stats = {};
                    stats.name = this.names[key];
                    stats.clone = this.clones[key].data.clones;
                    stats.view = this.views[key].data.views;
                    stats.referrers = this.referrers[key].data.map(el => el.referrer);
                    this.reposInfos.push(stats);
                }
               this.getByDate();
            }).catch((error) => { 
                this.load = false; 
                this.$emit('dataFetchingFailed');
                throw new Error(error);
            });
        },
        seeRepo: function(dataTableItem) {
            return `https://github.com/${this.$apiRequester.name}/${dataTableItem.name}`
        },
    },
    computed: {
        dateMax() {
            this.max.setDate(this.max.getDate() - 1);
            return this.max.toISOString().split('T')[0];
        },
        dateMin() {
            this.min.setDate(this.min.getDate() - 15);
            return this.min.toISOString().split('T')[0];
        }
    }
}
</script>

<style>
.link {
    text-decoration: none;         
    vertical-align: middle;
}
</style>
