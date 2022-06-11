<template>
        <div class="column-name" @click="changeState($event)">
            <div class="text"><slot></slot></div>
            <div class="carret" :class="align">{{ sortStatus }}</div>
        </div>
</template>

<script>

import LinkedList from '../../../../Vue/linked-list.js'

export default {
    name: 'Columns',
    components: { 
    },
    props: {
        header: String,
    },
    data () {
        return {
            sortList : new LinkedList(),
            sortStatus: '⌃',
        };
    },
    created: function () {
        this.sortList.add('⌃');
        this.sortList.add('-');
        this.sortList.add('⌄');
    },
    methods: {
        changeState(event) {
            console.log(event);
            this.sortList.walk();
            this.sortStatus = this.sortList.get();
            this.$emit('sort', {sortStatus: this.sortStatus, header: this.header});
        }
    },
    computed: {
        align() {
            if (this.sortStatus == '⌄')
                return 'carret-down';
            else if (this.sortStatus == '-')
                return 'carret-middle';
            else
                return 'carret-up';
        }
    },
    watch: { 
    }
}

</script>

<style scoped>
    .column-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: crosshair;
    }
    .carret {
        font-size: 25px;
        padding-left: 5px;
    }
    .carret-up {
        align-self: flex-end;
    }
    .carret-down {
        align-self: flex-start;
    }
    .carret-middle {
        align-self: center;
    }
</style>
