<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>
<script>
export default {
    name: 'test-router',
    data () {
        return {
            msg: 'this is test router msg'
        }
    },
    created () {
        console.log('created', this.$route)
    }
}
</script>