<template>
    <div class="tree-operation" v-if="visible">
        <el-dialog
            width="500px"
            :title="title"
            v-bind="config"
            :visible.sync="visible">
            <el-form
                :model="formData"
                label-width="80px">
                <el-form-item
                    prop="name"
                    label="分类名称">
                    <el-input
                        v-model="formData.name"
                        placeholder="请输入分类名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div class="btn-content">
                    <el-button
                        :type="btn.type"
                        :key="index"
                        v-for="(btn, index) in btnList"
                        @click="onBtn({ btn, index })"
                        round>{{ btn.name }}</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'tree-operation',
        data () {
            return {
                visible: false,
                tempModel: {},
                formData: {
                    uuid: '',
                    name: ''
                },
                type: 'add'
            }
        },
        computed: {
            title () {
                let str = ''
                if (this.type === 'add') {
                    str = `添加分类 ( 上级分类：${this.tempModel.data.label} )`
                }
                if (this.type === 'update') {
                    str = `修改分类 ( 上级分类：${this.tempModel.parent.data.label} )`
                }
                return str
            }
        },
        props: {
            config: {
                type: Object,
                default () {
                    return {}
                }
            },
            btnList: {
                type: Array,
                default () {
                    return [
                        {
                            name: '确定',
                            method: 'onOk',
                            type: 'primary'
                        },
                        {
                            name: '取消',
                            method: 'onCancel'
                        }
                    ]
                }
            }
        },
        methods: {
            show (config = {}, curNode = {}, type = 'add') {
                Object.keys(config).forEach((key) => {
                    this.config[key] = config[key]
                })
                this.tempModel = curNode
                this.type = type
                this.visible = true
            },
            hide () {
                this.visible = false
            },
            onBtn ({ btn, index } = {}) {
                if (btn.method === 'onCancel') {
                    this.hide()
                    return
                }
                this.$emit('onBtn', {
                    type: this.type,
                    model: this.formData,
                    method: btn.method,
                    index,
                    btn
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
