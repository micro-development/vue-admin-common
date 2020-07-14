<template>
    <!-- add and search component -->
    <it-dialog-container ref="dialogContainer" :native="native">
        <div>
            <el-form ref="elForm" label-width="80px">
                <el-form-item :label="form.label">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <it-dialog-footer
            slot="it-dialog-footer"
            :btn-list="btnList"
            @onCancel="onCancel"
            @onSure="onSure"></it-dialog-footer>
    </it-dialog-container>
</template>

<script>
    export default {
        name: 'it-add-catalog',
        data () {
            return {}
        },
        computed: {
            leftBtnText () {
                return this.config.leftText || `新增${this.config.leftAfterText}`
            },
            searchPlaceholder () {
                if (this.config.searchPlaceholder) {
                    return this.config.searchPlaceholder
                }
                return '请输入搜索内容'
            }
        },
        props: {
            native: {
                type: Object,
                default () {
                    return {
                        title: '新增',
                        visible: false,
                        event: 'add'
                    }
                }
            },
            configs: {
                type: Object,
                default () {
                    return {
                        event: 'add'
                    }
                }
            },
            form: {
                type: Object,
                default () {
                    return {
                        label: '子目录名称',
                        name: ''
                    }
                }
            },
            btnList: {
                type: Array,
                default () {
                    return [
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
            }
        },
        methods: {
            onSure () {
                this.$emit('onSure')
            },
            onCancel () {
                this.$emit('onCancel')
            }
        }
    }
</script>

<style lang="less">
    .it-add-search {
        width: 100%;
        height: 36px;

        .upload-btn{
            display: inline-block;
            float: left;
        }
        .top-btn{
            margin-right: 10px;
        }

        .left-content,
        .right-content {
            display: inline-block;
        }

        .left-content {
            float: left;
        }

        .right-content {
            float: right;
            input{
                width: 260px;
                border-radius: 40px;
            }
        }
        .icon-btn{
            font-size: 14px;
            /*float: left;*/
        }
    }

</style>
