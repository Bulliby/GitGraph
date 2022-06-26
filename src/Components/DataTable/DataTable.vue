<template>
        <div class="table">
            <div class="headers">
                <div v-for="(header, index) of headers" class="header">
                    <Columns @sort="sortStats($event)" :header="header.value">
                        {{ header.value }}
                    </Columns>
                </div>
            </div>
            <div class="datatable">
                <div class="data-row" v-for="(repoStat, row) in reposStats">
                    <a class="column name" :href="seeRepo(repoStat.stats.name)">
                        {{ repoStat.stats.name }} <img width="12" height="12" :src="linkImg" alt="SVG to specify that's a link"></img>
                    </a>
                    <div class="column clones">
                        <div class="tooltip" v-if="repoStat.stats.referrer.length">
                            <div v-for="referrer in repoStat.stats.referrer" >
                                {{ referrer.referrer }}
                            </div>
                        </div>
                        {{ repoStat.stats.clones }}
                    </div>
                    <div class="column views">
                        {{ repoStat.stats.views }}
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

import { RawStats, RepoStats } from '../../Vue/Stats.js';
import Columns from './Components/Columns/Columns.vue';
import Link from './link.svg';

export default {
    name: 'DataTable',
    components: { 
        Columns,
    },
    props: {
        days: Number,
    },
    data () {
        return {
            headers: [
                { text: 'Names', value: 'name' },
                { text: 'Unique clones', value: 'clones' },
                { text: 'Unique views', value: 'views' },
            ],
            reposStats: [],
            rawStats: [],
            currentDate: new Date(),
            linkImg: Link,
            visibility: false,
            enterLeave: 0,
        }
    },
    mounted: function () {
        this.$emit('click')
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.getStats().then(this.filterStatsByDay);
    },
    methods: {
        getStats: function() {
            let stats = [];
            let names = [];
            return this.$apiRequester.getRepositories().then(repos => {
                repos.data.filter((repo) => {
                    return true;
                }).map((repo) => {
                    let name = repo.name;
                    stats.push(this.$stats.getRepoStats(name));
                    names.push(repo.name);
                }); 

                return Promise.all(stats).then((repos) => {
                    repos.map((repo, i) => {
                        let clones, views, referrer = null;
                        [ clones, views, referrer ] = repo;
                        let stat = new RawStats(names[i], clones, views, referrer)
                        this.rawStats.push(stat);
                    });
                });
            });

        },
        filterStatsByDay: function() {
            this.reposStats = [];
            this.rawStats.map((repo) => {
                let stat = new RepoStats(
                    repo.stats.name, 
                    this.$stats.dateFilter(repo.stats.clones, 'clones', this.currentDate),
                    this.$stats.dateFilter(repo.stats.views, 'views', this.currentDate), 
                    repo.stats.referrer)
                this.reposStats.push(stat);
            });
        },
        sortStats: function(event) {
            const header = event.header;
            const sortStatus = event.sortStatus;

            this.reposStats.sort((a, b) => {
                if (sortStatus == '⌄') {
                    if (a.stats[header] > b.stats[header]) {
                        return 1;
                    } else {
                        return - 1;
                    }
                } else if (sortStatus == '⌃') {
                    if (a.stats[header] < b.stats[header]) {
                        return 1;
                    } else {
                        return - 1;
                    }
                }
            });
        },
        seeRepo(name) {
            return `https://github.com/${this.$apiRequester.name}/${name}`
        }
    },
    computed: {
    },
    watch: { 
        days: function(newVal, oldVal) {
            if (oldVal < newVal) {
                this.currentDate.setDate(this.currentDate.getDate() - 1);
                this.filterStatsByDay();
            } else {
                this.currentDate.setDate(this.currentDate.getDate() + 1);
                this.filterStatsByDay();
            }
        }
    }
}

</script>

<style>

.header {
    width: calc(100% / 3);
    font-weight: 700;
    display: flex;
    justify-content: center;
}

.headers {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: rgba(16,16,16,0.16);
    border-bottom: solid black;
}

.data-row {
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: solid rgba(16,16,16,0.16);
}

.data-row:first-child .tooltip{
    bottom: auto;
}

.column.name {
    text-align: start;
    text-decoration: none;         
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.column {
    width: calc(100% / 3);
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
    position: relative;
}

.datatable {
    height: calc(40px * 10);
    overflow-y: auto;
}

.tooltip {
    display: none;
    position: absolute;
    background-color: rgb(120, 120, 120);
    color: white;
    padding: 5px;
    border-radius: 5px;
    line-height: 25px;
    bottom: 0;
}

.data-row:hover .tooltip{
    display: block;
}
</style>
