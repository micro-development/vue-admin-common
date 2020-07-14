<template>
    <!-- list table component -->
    <div class="it-list-table">
        <el-table
            class='it-el-table'
            @cell-click="onCellClick"
            v-bind='elTableConfig'
            :size='this.$store.state.layoutSize'
            :data='dataList'>
            <el-table-column
                type='index'
                v-bind='indexConfig.config'
                v-if='indexConfig.show === true'></el-table-column>
            <el-table-column
                v-bind='btnConfig.config'
                v-if='btnConfig.show === true'>
                <template slot-scope='scope'>
                    <operation-btn
                        @onListBtn='onListBtn'
                        :data-item='scope.row'
                        :data-index='scope.$index'
                        :max-show-count='btnConfig.maxShowCount'
                        :btn-list='btnList'></operation-btn>
                </template>
            </el-table-column>
            <template v-for='(fieldItem, fieldIndex) in fieldList'>
                <el-table-column
                    :key='fieldIndex'
                    v-bind='setElColumnProp(fieldItem)'>
                    <template slot-scope="scope">
                        <html-component v-if="fieldItem.htmlComponent === true" :html="formatValue(scope.row, fieldItem)"></html-component>
                        <span :style="fieldItem.style || {}" v-else v-html="formatValue(scope.row, fieldItem)"></span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import OperationBtn from './operation-btn.vue'

    export default {
        name: 'it-list-table',
        components: {
            /**
             * 当插值的字符串中包含组件标签时，需要用这个组件动态渲染
             */
            HtmlComponent: {
                props: {
                    html: String
                },
                render (h) {
                    const cmp = Vue.extend({
                        template: this.html
                    })
                    return h(cmp, {})
                }
            },
            OperationBtn
        },
        data () {
            return {}
        },
        computed: {
            elTableConfig () {
                return {
                    border: true,
                    stripe: true,
                    height: '100%',
                    size: this.$store.state.layoutSize
                }
            },
            indexConfig () {
                return {
                    show: true,
                    config: {
                        width: '58px',
                        align: 'center',
                        index: 1,
                        label: '序号'
                    }
                }
            },
            btnConfig () {
                return {
                    show: true,
                    maxShowCount: 3,
                    config: {
                        align: 'center',
                        label: '操作',
                        fixed: 'right'
                    }
                }
            }
        },
        props: {
            btnList: {
                type: Array,
                default () {
                    return []
                }
            },
            dataList: {
                type: Array,
                default () {
                    return []
                }
            },
            fieldList: {
                type: Array,
                default () {
                    return []
                }
            },
            config: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        methods: {
            /**
             * 表格行配置
             * 设置默认参数和覆盖参数规则
             */
            setElColumnProp (field) {
                if (!field.align) {
                    field.align = 'center'
                }
                return field
            },
            setBtnItemProp (btn) {
                if (!btn.type) {
                    btn.type = 'text'
                }
                return btn
            },
            /**
             * 格式化内容
             * @param dataItem  数据对象
             * @param fieldItem 字段信息
             * @returns {string|*} 格式化后的内容
             */
            formatValue (dataItem = {}, fieldItem = {}) {
                // this.$log.echo({
                //     dataItem,
                //     fieldItem
                // }, 'it-list-table/index.vue formatValue', 'log')
                if (fieldItem.formatter && typeof fieldItem.formatter === 'function') {
                    return fieldItem.formatter({
                        dataItem
                    })
                }
                return dataItem[fieldItem.prop]
            },
            onCellClick (row, column, cell) {
                this.$emit('onListBtn', {
                    row,
                    column,
                    cell,
                    method: 'onElTable',
                    event: 'cell-click'
                })
            },
            onListBtn (opts) {
                this.$emit('onListBtn', {
                    ...opts,
                    method: opts.btnItem.method
                })
                this.$emit(opts.btnItem.method, opts)
            }
        }
    }
</script>

<style lang="less">
    .it-list-table {
        width: 100%;
        height: calc(100% - 140px);
        overflow: hidden;
        // border: 1px solid #eee;
        // padding: 10px;
        .it-el-table{
            width: 100%;
        }
    }
</style>
