<template>
    <!-- add and search component -->
    <div class="it-list-operation">
        <slot name="operation_left-text">
            <span class='left-text'>{{ leftText }}</span>
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'it-list-operation',
        data () {
            return {}
        },
        computed: {
            leftText () {
                return this.config.leftText || `${this.config.leftBeforeText}列表`
            }
        },
        props: {
            config: {
                type: Object,
                default () {
                    return {
                        leftText: '',
                        leftBeforeText: ''
                    }
                }
            }
        },
        methods: {
            onAdd () {
                this.$emit('onAddSearch', {
                    method: 'onAdd'
                })
                this.$emit('onAdd')
            },
            onSearch () {
                this.$emit('onAddSearch', {
                    method: 'onSearch'
                })
                this.$emit('onSearch')
            }
        }
    }
</script>

<style lang="less">
    .it-list-operation {
        width: 100%;
        height: 46px;
        line-height: 46px;
    }
</style>
