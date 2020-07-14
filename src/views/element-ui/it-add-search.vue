<template>
    <component-container>
        <it-add-search @onAddSearch="onAddSearch" slot='content'></it-add-search>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-add-search',
        data () {
            return {}
        },
        methods: {
            onAddSearch (opts) {
                this.$log.echo(opts, 'example it-add-search onAddSearch opts', 'log')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
