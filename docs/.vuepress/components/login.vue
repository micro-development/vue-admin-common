<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            msg: 'this is login msg'
        }
    },
    created () {
        console.log('created', this.$route)
    }
}
</script>