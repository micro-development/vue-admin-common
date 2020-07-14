<template>
    <el-row class="component-container">
        <it-breadcrumb></it-breadcrumb>
        <!--<el-breadcrumb
                class="breadcrumb-header-fixed"
                separator-class="el-icon-arrow-right">
                    <span
                            @click="onToggleAsideMenu"
                            class="it-collapse"><i class="el-icon-s-operation"></i></span>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
                    :key="index"
                    v-for="(item, index) in breadList">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>-->
        <el-scrollbar class="component-scrollbar">
            <slot name='dialog'></slot>
            <slot name='content'>
                <el-col class="component-tree" :span="4" v-if='hideConfig.catalog !== true'>
                    <it-catalog-tree
                        @onItCatalogTree='onEventContainer'
                        :list='catalog.list'></it-catalog-tree>
                </el-col>
                <el-col class="component-content" :span="colWidth">
                    <it-add-search
                        v-if='hideConfig.addSearch !== true'
                        :config='addSearch'
                        :left-btn-list="addSearch.leftBtnList"
                        @onAddSearch="onEventContainer"
                        ref="addSearch"></it-add-search>
                    <it-list-operation
                        v-if='hideConfig.listOperation !== true'
                        :config='listOperation'
                        ref='listOperation'>
                        <slot name="operation_left-text" slot="operation_left-text"></slot>
                    </it-list-operation>
                    <it-list-table
                        v-if='hideConfig.listTable !== true'
                        :data-list='listTable.dataList'
                        :field-list='listTable.fieldList'
                        :btn-list='listTable.btnList'
                        :config='listTable.config'
                        @onListBtn="onEventContainer"
                        ref='listTable'></it-list-table>
                    <it-pagination
                        v-if='hideConfig.pagination !== true'
                        ref='pagination'></it-pagination>
                    <it-drawer-container
                        :config="drawer.config"
                        :btn-list="drawer.btnList"
                        @onDrawer="onEventContainer"
                        ref="drawerContainer">
                        <slot name="drawer-content"></slot>
                    </it-drawer-container>
                </el-col>
            </slot>
        </el-scrollbar>
    </el-row>
</template>

<script>
    import ItCatalogTree from '../it-catalog-tree/index'
    import ItAddSearch from '../it-add-search/index'
    import ItDrawerContainer from '../it-drawer-container/index'
    export default {
        name: 'component-container',
        components: {
            ItDrawerContainer,
            ItAddSearch,
            ItCatalogTree
        },
        data () {
            return {}
        },
        computed: {
            breadList () {
                const breadRoutes = this.$route.matched
                return breadRoutes.filter((item) => {
                    return item.name !== '首页'
                })
            },
            colWidth () {
                return this.hideConfig.catalog === true ? 24 : 20
            }
        },
        props: {
            drawer: {
                type: Object,
                default () {
                    return {}
                }
            },
            catalog: {
                type: Object,
                default () {
                    return {
                        list: []
                    }
                }
            },
            addSearch: {
                type: Object,
                default () {
                    return {
                        hideLeftBtn: false,
                        leftBtnList: [],
                        leftText: '',
                        leftAfterText: '',
                        searchPlaceholder: ''
                    }
                }
            },
            listOperation: {
                type: Object,
                default () {
                    return {
                        leftText: '',
                        leftBeforeText: ''
                    }
                }
            },
            listTable: {
                type: Object,
                default () {
                    return {
                        dataList: [],
                        fieldList: [],
                        btnList: []
                    }
                }
            },
            hideConfig: {
                type: Object,
                default () {
                    return {
                        catalog: false,
                        addSearch: false,
                        listOperation: false,
                        listTable: false,
                        pagination: false
                    }
                }
            }
        },
        methods: {
            /**
             * 统一事件入口
             * 本组件 向下 统一的入口
             * 本组件 向上 统一的出口。
             * @param opts 子组件们向上传递的各种参数
             */
            onEventContainer (opts) {
                this.$emit(opts.method, opts)
            },
            toggleDrawer (flag) {
                if (flag === true) {
                    this.$refs.drawerContainer.show()
                }
                if (flag === false) {
                    this.$refs.drawerContainer.hide()
                }
            },
            onToggleAsideMenu () {
                this.$log.echo('onToggleAsideMenu', 'onToggleAsideMenu', 'log', 'local')
                // this.$refs.asideNavbar.isCollapse = !this.$refs.asideNavbar.isCollapse
            }
        }
    }
</script>

<style lang="less">
    @import "component-container.less";
</style>
