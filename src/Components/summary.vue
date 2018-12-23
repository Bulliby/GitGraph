
<script>

import axios from 'axios';

export default {
    name: 'dataTable',
    data () {
        return {
            clones: 0,
            views: 0,
        }
    },
    computed: {
    },
    methods: {
        getClones : function (index) {
            axios
                .get('https://api.github.com/repos/Bulliby/' + this.repositories_name[index] + '/traffic/clones', {headers : {'Authorization' : 'token ' + localStorage.token}})
                .then(response => this.clones = response)
        },
        getViews: function(index) {
            axios
                .get('https://api.github.com/repos/Bulliby/'+ this.repositories_name[index] + '/traffic/views', {headers : {'Authorization' : 'token ' + localStorage.token}})
                .then(response => this.views = response)
        }
    },
    mounted() {
        this.getClones();
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
