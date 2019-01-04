<template>
<div>
    <td>{{ item.name }}</a></td>
    <td>{{ item.clone }}</td>
    <td>{{ item.view }}</td>
</div>
</template>

<script>

export default {
    name: 'test',
    data () {
        return {
        }
    },
    methods: {
    },
    computed: {
        link() {
            return `https://github.com/${localStorage.name}/${item.name}`
        }
    },
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
}
</script>
