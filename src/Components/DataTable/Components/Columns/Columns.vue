<template>
        <div class="column-name">
            <slot></slot><div class="carret">⌃</div>
        </div>
        <!-- <img class="sort-icon" @click="changeState" :src="selectImage" alt="Arrow oriented to the top"></img> -->
</template>

<script>

import UpArrow from './up-arrow.svg'
import DownArrow from './down-arrow.svg'

export default {
    name: 'Columns',
    components: { 
    },
    props: {
    },
    data () {
        return {
            upArrow: UpArrow,
            downArrow: DownArrow,
            images: ['middle', 'up', 'down'],
            sortStatus: 'middle',
        };
    },
    mounted: function () {
    },
    methods: {
        changeState() {
            //TODO Linked list
            let template = ['middle', 'up', 'down'];
            if (this.images.length == 0) {
                this.images = template;
            }
            this.sortStatus = this.images.shift();
        }
    },
    computed: {
        selectImage() {
            if (this.sortStatus == 'middle' || this.sortStatus == 'up') {
                return this.upArrow;
            }
            return this.downArrow;
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
    }
    .carret {
        font-size: 25px;
        align-self: flex-end;
        padding-left: 5px;
    }
    /*
    img {
        max-width: 20px;
        margin-left: 5px;
        margin-top: 2px;
    }
    */
    .arrows {
        vertical-align: middle;
    }
</style>
