<template>
        <div class="table">
            <div class="headers">
                <div v-for="(header, index) of headers" class="header">
                    {{ header.value }}
                </div>
            </div>
            <div class="datatable">
                <div class="data-row" v-for="x in 20">
                    <div class="column" v-for="y in 3">
                        TOFO
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

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
        }
    },
    computed: {
    },
    methods: {
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

.datatable {
    height: calc(40px * 10);
    overflow-y: auto;
}
</style>
