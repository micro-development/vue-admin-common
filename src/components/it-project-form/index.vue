<style lang="less">
    .dialog-footer{
        .el-button{
            width: 100px;
        }
    }
</style>
<template>
    <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="labelConfig.name" prop="name">
            <el-input v-model="formData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="labelConfig.description" prop="description">
            <el-input type="textarea" v-model="formData.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="labelConfig.color" prop="color">
            <el-color-picker v-model="formData.color"></el-color-picker>
        </el-form-item>
        <el-form-item :label="labelConfig.permission" prop="permission">
            <el-radio v-model="formData.permission" :label="1">公有</el-radio>
            <el-radio v-model="formData.permission" :label="2">私有</el-radio>
            <el-radio v-model="formData.permission" :label="3">团队内使用</el-radio>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'it-project-form',
        data () {
            return {
                rules: {
                    name: [
                        {
                            required: true,
                            message: '名称必填'
                        }
                    ],
                    description: [
                        {
                            required: true,
                            message: '描述必填'
                        }
                    ],
                    color: [
                        {
                            required: true,
                            message: '颜色必选'
                        }
                    ],
                    permission: [
                        {
                            required: true,
                            message: '权限必选'
                        }
                    ]
                }
            }
        },
        computed: {},
        props: {
            labelConfig: {
                type: Object,
                default () {
                    return {
                        name: '项目名称',
                        description: '项目描述',
                        color: '项目背景',
                        permission: '项目权限'
                    }
                }
            },
            formData: {
                type: Object,
                default () {
                    return {
                        name: '',
                        description: '',
                        color: '',
                        permission: 1
                    }
                }
            }
        },
        methods: {
            validateForm () {
                let flag = true
                this.$refs.formData.validate((volid) => {
                    flag = volid
                })
                return flag
            },
            resetForm () {
                this.$refs.formData.resetFields()
            }
        }
    }
</script>
