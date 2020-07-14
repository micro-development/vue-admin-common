<template>
    <component-container>
        <h1>欢迎你来到这个神奇的系统</h1>
        <p>CurRouter：{{ $route.fullPath }}</p>
        <ul>
            <li :key=n v-for='n in 100'>{{ n }} --- {{ n }}</li>
        </ul>
    </component-container>
</template>

<script>
    export default {
        name: 'dashboard',
        data () {
            return {}
        },
        methods: {
            // setCurrentProject ({ payload, state }) {
            //     this.$log.echo(payload, 'entry.vue setCurrentProject', 'log')
            // }
        }
    }
</script>

<style lang="less" scoped>

</style>
