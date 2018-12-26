<template>
    <v-data-table v-if="user" :headers="headers" :items="reposInfos" :loading="load" class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props"> 
            <td>{{ props.item.name }}</td>
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
        //TODO: Can we place it somewhere else than computed ?
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
                this.load = true;
                Promise.all(pall1).then((value) => { this.clones = value; });
                Promise.all(pall2).then((value) => { this.views = value }).finally(() => {
                    for (var i = 0; i != this.clones.length; i++)
                    {
                        this.load = false
                        let object = {};
                        object.name = this.names[i];
                        object.clone = this.clones[i].data.uniques;
                        object.view = this.views[i].data.uniques;
                        this.reposInfos.push(object);
                    }
                }).catch(() => { this.load = false; console.log('fail')});
                
            }
        },
    },
}
</script>
