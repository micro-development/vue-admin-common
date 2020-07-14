<template>
    <component-container>
        <div slot='content'>
            <el-button @click="onOpenDialog">打开项目表单弹框</el-button>
            <it-dialog-container ref="itDialogContainer">
                <it-project-form ref="itProjectForm"></it-project-form>
                <it-dialog-footer
                    slot="it-dialog-footer"
                    :btn-list="btnList"
                    @onCancel="onCancel"
                    @onSure="onSure"></it-dialog-footer>
            </it-dialog-container>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-project-form',
        data () {
            return {
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
