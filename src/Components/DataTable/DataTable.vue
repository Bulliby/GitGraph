<template>
        <div class="table">
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

import { RepoStats } from '../../Vue/Stats.js'

export default {
    name: 'DataTable',
    components: { 
    },
    data () {
        return {
            headers: [
                { text: 'Names', value: 'name' },
                { text: 'Unique clones', value: 'clone' },
                { text: 'Unique views', value: 'view' },
            ],
            reposStats: [],
            reposNames: [],
        }
    },
    mounted: function () {
        this.$apiRequester.getRepositories().then((repos) => {
            repos.data.filter((repo) => {
                //return repo.name == 'libft' || repo.name == 'shell.py';
                return true;
            }).map((repo) => {
                let name = repo.name;
                return this.$stats.getRepoStats(name).then((response) => {
                    let clones, views, referrer = null;
                    [ clones, views, referrer] = response;

                    clones = this.$stats.dateFilter(clones, 'clones', new Date());
                    views = this.$stats.dateFilter(views, 'views', new Date());

                    let stats = new RepoStats(name, clones, views, referrer)
                    this.reposStats.push(stats);
                });
            });
        });
    },
    methods: {
        getStatsForView: function(repoName) {
            return this.$stats.getRepoStats(repoName).then((response) => { 

                let clones, views, referrer = null;
                [ clones, views, referrer] = response;

                clones = this.$stats.dateFilter(clones, 'clones', new Date());
                views = this.$stats.dateFilter(views, 'views', new Date());

                let stats = new RepoStats(repoName, clones, views, referrer)
                this.reposStats.push(stats);
                return stats;
            });
        }
    },
    computed: {
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
