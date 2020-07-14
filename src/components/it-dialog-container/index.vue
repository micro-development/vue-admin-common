<style lang="less">
    .it-element-dialog{
        .el-dialog__header{
            margin-bottom: 0;
            padding: 15px 15px;
        }
        .el-dialog__header,
        .el-dialog__footer{
            border: 1px solid #e5e5e5 !important;
        }
        .el-dialog__footer{
            padding: 0;
        }
        .el-dialog__body{
            height: 100%;
        }
        .it-dialog-content{
            width: 100%;
            height: 100%;
            .dialog-body{
                height: calc(100% - 64px);
                /*background: #cccccc;*/
                > div{
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    overflow: auto;
                }
            }
        }
        .dialog-footer{
            .el-button{
                width: 100px;
            }
        }
    }
</style>
<template>
    <el-dialog
        class="it-element-dialog"
        v-bind='native'
        :visible.sync="native.visible"
        :destroy-on-close="destroyOnClose"
        ref="elDialog">
        <div class="it-dialog-content">
            <div class="dialog-body">
                <slot></slot>
            </div>
        </div>
        <slot slot="footer" name="it-dialog-footer"></slot>
    </el-dialog>
</template>

<script>
    export default {
        name: 'it-dialog-container',
        data () {
            return {}
        },
        computed: {
            /**
             * 控制是否在关闭 Drawer 之后将子元素全部销毁，默认为 false，这里修改下默认值
             * @returns {boolean}
             */
            destroyOnClose () {
                if (this.native['destroy-on-close'] === false) {
                    return false
                }
                return true
            }
        },
        props: {
            /**
             * el-dialog 原生属性
             */
            native: {
                type: Object,
                default () {
                    return {
                        title: 'dialog title',
                        visible: false,
                        event: 'add'
                    }
                }
            }
        },
        methods: {
            show () {
                this.native.visible = true
            },
            hide () {
                this.native.visible = false
            }
        }
    }
</script>
