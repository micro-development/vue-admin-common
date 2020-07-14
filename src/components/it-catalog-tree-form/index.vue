<style lang="less">
    .it-catalog-tree-form{
    }
</style>
<template>
    <it-dialog-container
        @onSaveCatalogTree="onSaveCatalogTree"
        :native="native"
        :btn-list="btnList"
        ref="itDialogContainer">
        <el-form
            ref="formData"
            size="medium"
            label-width="80px"
            :rules="formRule"
            :model="formData">
            <el-form-item
                prop="name"
                required
                label="分类名称">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
        </el-form>
    </it-dialog-container>
</template>

<script>
    export default {
        name: 'it-catalog-tree-form',
        data () {
            return {
                btnList: [
                    {
                        name: '确定',
                        type: 'success',
                        method: 'onSaveCatalogTree'
                    },
                    {
                        name: '取消',
                        event: 'close'
                    }
                ],
                formData: {
                    project_uuid: '',
                    p_uuid: '',
                    uuid: '',
                    name: ''
                },
                formRule: {
                    name: [
                        {
                            required: true,
                            message: '分类名称必填'
                        }
                    ]
                }
            }
        },
        computed: {
            native () {
                return {
                    width: '500px',
                    title: '操作分类'
                }
            }
        },
        props: {},
        methods: {
            onSaveCatalogTree () {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        console.log('onSaveCatalogTree')
                    }
                })
            },
            setModel (model) {
                if (model && model.constructor === Object) {
                    Object.keys(this.formData).forEach((field) => {
                        this.formData[field] = model[field]
                    })
                }
            },
            show (model) {
                this.setModel(model)
                this.$refs.itDialogContainer.show()
            }
        }
    }
</script>
