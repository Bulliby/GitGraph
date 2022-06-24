<template>
    <div class="calendar-flex-container"> 
        <img class="behind" @click="decrement" :src="leftArrow" alt="Arrow oriented to the left"></img>
        <span id="date-picker-js" class="date-picker">{{ daysString }}</span>
        <img class="after" @click="increment" :src="rightArrow" alt="Arrow oriented to the right"></img>
    </div>
</template>

<script>

import LeftArrow from './left-arrow.svg'
import RightArrow from './right-arrow.svg'

export default {
    name: 'Calendar',
    components: { 
    },
    data () {
        return {
            leftArrow: LeftArrow,
            rightArrow: RightArrow,
            days: 1
        }
    },
    computed: {
        daysString: function () {
            return '- ' + this.days + ' jour' + ((this.days > 1) ? 's': '');
        }
    },
    methods: {
        increment: function () {
            if (this.days > 1) {
                this.days -= 1;
            } 
            this.$emit('days', this.days);
        },
        decrement: function () {
            if (this.days < 14) {
                this.days += 1;
            } 
            this.$emit('days', this.days);
        }

    }
}

</script>

<style>

.calendar-flex-container {
    display: flex;
    align-items: center;
    width: max-content;
    margin: 0 auto;
}

.behind, .after {
    height: 20px;
    width: 20px;
}

.date-picker {
    text-align: center;
}

</style>
