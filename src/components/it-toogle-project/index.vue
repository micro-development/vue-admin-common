<style lang="less">
    @import url(../../less/var.less);
    @border-radius: 5px;
    .search {
        float: left;
        display: inline-block;
        border-radius: @border-radius;
        /*margin-right: 10px;*/
        /*width: 262px;*/
        /*height: 50px;*/
        /*padding: 1px 0px;*/
    }

    .search-input {
        width: 230px;
        /*height: 50px;*/
        float: left;

        input {
            height: 32px;
            border-radius: @border-radius;
        }

        .add-icon{
            position: relative;
            top: 3px;
            color: #409EFF;
            font-weight: bold;
            font-size: 20px;
            cursor: pointer;
        }
    }

    .aside-collapse{
        width: 52px;
        height: 100%;
        float: left;
        // background: @header_bg_color;
        background: #fff;
        border: none;
        font-size: 26px;
        position: relative;
        // top: -12px;
        // margin-left: 10px;
    }
</style>
<template>
    <div class="search">
        <el-autocomplete
            class="search-input"
            @select='onChangeProject'
            :fetch-suggestions="filterProjectList"
            v-model='tempModel.project'
            placeholder="搜索所有项目">
            <i
                @click='onOpenProjectDialog'
                class="el-icon-circle-plus-outline add-icon"
                slot="suffix">
            </i>
            <template slot-scope="{ item }">
                <div class="name" v-html='item.name'></div>
            </template>
        </el-autocomplete>
        <it-dialog-container
            :native='dialogInfo'
            ref="itDialogContainer">
            <it-project-form
                :form-data='formData'
                ref="itProjectForm"></it-project-form>
            <it-dialog-footer
                slot="it-dialog-footer"
                :btn-list="btnList"
                @onCancel="onCancel"
                @onSure="onSure"></it-dialog-footer>
        </it-dialog-container>
    </div>
</template>

<script>
    const getFormData = () => {
        return {
            name: '',
            description: '',
            color: '',
            permission: 1
        }
    }
    export default {
        name: 'it-toggle-project',
        data () {
            return {
                dialogInfo: {
                    visible: false,
                    title: '添加项目'
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
                ],
                formData: getFormData(),
                projectInfo: {},
                tempModel: {
                    project: ''
                }
            }
        },
        mounted () {
            // this.$log.echo(this.$route, 'header-navbar.vue mounted', 'log')
            this.setProjectList(true)
        },
        watch: {
            $route (to, from) {
                /* this.$log.echo({
                    to,
                    from
                }, 'header-navbar.vue watch $route', 'log') */
                this.setProjectList(true)
            }
        },
        props: {},
        computed: {},
        methods: {
            // async setCurrentProject ({ payload, state }) {
            //     // this.$log.echo(payload, 'entry.vue setCurrentProject', 'log')
            //     this.tempModel.project = payload.name
            // },
            async filterProjectList (qs, cb) {
                // this.$log.echo(qs, 'header-project.vue filterProjectList', 'log')
                // const list = this.$store.getters.getProjectList.filter((item) => {
                //     return item.name.includes(qs)
                // })
                cb(this.$store.getters.getProjectList)
            },
            /**
             * 全局挂载项目
             * @param   route   当前路由
             */
            async setProjectList (init) {
                const route = this.$route
                // this.$log.echo(route, 'header-project.vue setProjectList route', 'log')
                if (route.matched.length) {
                    const matchFirst = route.matched[0]
                    if (matchFirst.meta.project && matchFirst.meta.project.type) {
                        this.projectInfo = matchFirst.meta.project
                        await this.$store.dispatch('setProject', {
                            projectInfo: matchFirst.meta.project,
                            $http: this.$http,
                            init
                        })
                    }
                }
            },
            async onChangeProject (item) {
                this.$log.echo(item, 'header-navbar.vue onChangeProject item', 'log')
                this.tempModel.project = item.name
                await this.$store.dispatch('setCurrentProject', item)
            },
            async saveProjectByWrite () {
                const result = await this.$http.fetch({
                    method: 'post',
                    url: '/write/project',
                    data: this.formData
                })
                if (result) {
                    await this.setProjectList()
                    this.$message.success('添加写作项目成功')
                    this.onCancel()
                }
            },
            async saveProjectByCi () {
                const result = await this.$http.fetch({
                    method: 'post',
                    url: '/ci/project',
                    data: this.formData
                })
                if (result) {
                    await this.setProjectList()
                    this.$message.success('添加CI空间成功')
                    this.onCancel()
                }
            },
            async saveProjectByInfo () {
                const result = await this.$http.fetch({
                    method: 'post',
                    url: '/info/project',
                    data: this.formData
                })
                if (result) {
                    await this.setProjectList()
                    this.$message.success('添加板块成功')
                    this.onCancel()
                }
            },
            async onOpenProjectDialog () {
                // this.$message.info('onOpenProjectDialog')
                this.formData = getFormData()
                this.$refs.itDialogContainer.show()
                this.dialogInfo.visible = true
            },
            async onSure () {
                // this.$message.info('点击确定关闭弹框')
                if (this.$refs.itProjectForm.validateForm() === true) {
                    if (this.projectInfo.type === 1) {
                        await this.saveProjectByWrite()
                    }
                    if (this.projectInfo.type === 2) {
                        await this.saveProjectByCi()
                    }
                    if (this.projectInfo.type === 3) {
                        await this.saveProjectByInfo()
                    }
                }
            },
            onCancel () {
                // this.$message.info('点击取消按钮')
                this.$refs.itProjectForm.resetForm()
                this.dialogInfo.visible = false
            }
        }
    }
</script>
