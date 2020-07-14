<template>
    <component-container>
        <div slot='content'>
            <el-button @click="onOpen">打开侧弹框</el-button>
            <it-drawer-container
                :native="native"
                :btn-list="btnList"
                ref="itDrawerContainer">
                <div>
                    <p v-for="n in 60" :key="n">{{ n }}</p>
                </div>
            </it-drawer-container>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-drawer-container',
        data () {
            return {
                native: {
                    title: '弹框标题'
                },
                btnList: [
                    {
                        name: '确定',
                        method: 'onSure'
                    },
                    {
                        name: '取消',
                        event: 'close',
                        method: 'onCancel'
                    }
                ]
            }
        },
        mounted () {
            // this.onOpenDialog()
        },
        methods: {
            onOpen () {
                // this.$log.echo('onOpen', 'onOpen', 'log')
                this.$refs.itDrawerContainer.show()
            },
            onSure () {
                this.$message.info('点击确定关闭弹框')
                this.$refs.itDialogContainer.hide()
            },
            onCancel () {
                this.$message.info('点击取消按钮')
                this.$refs.itDialogContainer.hide()
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
