<template>
        <div class="table">
            {{ days }}
            <div class="headers">
                <div v-for="(header, index) of headers" class="header">
                    {{ header.value }}
                </div>
            </div>
            <div class="datatable">
                <div class="data-row" v-for="(repoStat in reposStats">
                    <div class="column  name">
                        {{ repoStat.stats.name }}
                    </div>
                    <div class="column  clones">
                        {{ repoStat.stats.clones }}
                    </div>
                    <div class="column  views">
                        {{ repoStat.stats.views }}
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

import { RawStats, RepoStats } from '../../Vue/Stats.js'

export default {
    name: 'DataTable',
    components: { 
    },
    props: {
        days: Number
    },
    data () {
        return {
            headers: [
                { text: 'Names', value: 'name' },
                { text: 'Unique clones', value: 'clone' },
                { text: 'Unique views', value: 'view' },
            ],
            reposStats: [],
            rawStats: [],
            reposNames: [],
            allStats: [],
            currentDate: new Date(),
        }
    },
    mounted: function () {
        this.getStats().then(this.filterStatsByDay).then(() => {
        });
    },
    methods: {
        getStats: function() {
            let stats = [];
            let names = [];
            return this.$apiRequester.getRepositories().then((repos) => {
                repos.data.filter((repo) => {
                    return true;
                }).map((repo) => {
                    let name = repo.name;
                    stats.push(this.$stats.getRepoStats(name));
                    names.push(repo.name);
                })
            }).then(() => {
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
                let clones, views, referrer;
                clones = this.$stats.dateFilter(repo.stats.clones, 'clones', this.currentDate);
                views = this.$stats.dateFilter(repo.stats.views, 'views', this.currentDate);
                let stat = new RepoStats(repo.stats.name, clones, views, referrer)
                this.reposStats.push(stat);
            });
        },
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

.table {
    padding-top: 50px;
}

.header {
    width: calc(100% / 3);
    font-weight: 700;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
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

.column {
    width: calc(100% / 3);
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
}

.column.name {
    text-align: start;
}

.datatable {
    height: calc(40px * 10);
    overflow-y: auto;
}
</style>
