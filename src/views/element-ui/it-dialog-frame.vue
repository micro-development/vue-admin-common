<template>
    <component-container>
        <div slot='content'>
            <h1>frame弹框，比如打开第三方登录</h1>
            <el-button @click="onOpenIframe">测试iframe通信</el-button>
            <el-button @click="onOpenWechat">微信登录</el-button>
            <el-button @click="onOpenQQ">QQ登录</el-button>
            <it-dialog-container
                :native="native"
                :btn-list="btnList"
                ref="itDialogContainer">
                <iframe class="iframe-content" :src="iframeSrc"></iframe>
                <it-dialog-footer slot="it-dialog-footer" :btn-list="btnList" @onSure="onSure" @onCancel="onCancel"></it-dialog-footer>
            </it-dialog-container>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-dialog-frame',
        data () {
            return {
                iframeSrc: '',
                native: {
                    width: '800px',
                    title: '第三方登录'
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
        computed: {},
        mounted () {
            // this.onOpenWechat()
        },
        methods: {
            onOpenIframe () {
                window.testIframeFunc = (msg) => {
                    this.$log.echo(msg, 'onOpenIframe window.testIframeFunc msg', 'log')
                }
                this.iframeSrc = `/localApi/aiApi/wechat/connect/test`
                this.native.title = '测试Iframe通信'
                this.$refs.itDialogContainer.show()
            },
            onOpenWechat () {
                const wechatWindow = window.open(`/localApi/aiApi/wechat/connect/login`, '微信登录')
                window.wechatCallback = (data) => {
                    this.$log.echo(data, 'onOpenWechat window.wechatCallback data', 'log')
                    wechatWindow.close()
                    if (data.errmsg) {
                        this.$message.error(data.errmsg)
                    } else {
                        this.$message.success(data.msg)
                    }
                }
                // this.iframeSrc = `/localApi/aiApi/wechat/connect/login`
                // this.native.title = '微信登录'
                // this.$refs.itDialogContainer.show()
            },
            onOpenQQ () {
                this.iframeSrc = `/localApi/aiApi/tencent/connect/login`
                this.native.title = 'QQ登录'
                this.$refs.itDialogContainer.show()
            },
            onSure () {
                this.$message.info('点击确定关闭弹框')
                this.iframeSrc = ''
                this.$refs.itDialogContainer.hide()
            },
            onCancel () {
                this.$message.info('点击取消按钮')
                this.iframeSrc = ''
                this.$refs.itDialogContainer.hide()
            }
        }
    }
</script>

<style lang="less" scoped>
    .iframe-content{
        width: 100%;
        height: 390px;
        border: 0;
    }
</style>
