<template>
    <div>
        <h4>{{ printName }}</h4>
        <div>clones : {{ printClones }}</div>
        <div>views : {{ printViews }}</div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'summaryRepo',
    data () {
        return {
            clones: 0,
            views: 0
        }
    },
    props: {
        name: {
            type: String
        }
    },
    computed: {
    },
    methods: {
        getClones : function () {
            axios
                .get('https://api.github.com/repos/Bulliby/' + this.name + '/traffic/clones', {headers : {'Authorization' : 'token ' + localStorage.token}})
                .then(response => this.clones = response)
        },
        getViews: function() {
            axios
                .get('https://api.github.com/repos/Bulliby/'+ this.name + '/traffic/views', {headers : {'Authorization' : 'token ' + localStorage.token}})
                .then(response => this.views = response)
        }
    },
    mounted() {
        this.getClones();
        this.getViews();
    },
    computed:  {
        printClones() {
            if (this.clones.data)
                return this.clones.data.uniques;
        },
        printViews() {
            if (this.views.data) 
                return this.views.data.uniques; 
        }, 
        printName() { 
            return this.name; 
        } 
    } 
} 
</script>
