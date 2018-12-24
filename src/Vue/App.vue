<template>
    <div id="app">
        <v-layout align-center justify-center row fill-height>
            <img src="../Assets/GitHub.jpg"/>
        </v-layout>
        <dataTable></dataTable>
    </div>
</template>

<script>

import dataTable from '../Components/DataTable.vue';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default {
    name: 'App',
    components: { 
        dataTable
    },
    data () {
        return {
        }
    },
}
</script>
