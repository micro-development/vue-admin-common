<template>
    <component-container>
        <div slot='content'>
            <el-button @click="onOpenDialog">打开Dialog弹框</el-button>
            <it-dialog-container
                :native="native"
                :btn-list="btnList"
                ref="itDialogContainer">
                this is body content
                <it-dialog-footer slot="it-dialog-footer" :btn-list="btnList" @onSure="onSure" @onCancel="onCancel"></it-dialog-footer>
            </it-dialog-container>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-dialog-container',
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
            onOpenDialog () {
                this.$log.echo('onOpenDialog', 'onOpenDialog', 'log')
                this.$refs.itDialogContainer.show()
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
