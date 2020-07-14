<template>
    <span class='it-table-operation-btn'>
        <template
            v-for='(btnItem, btnIndex) in btnStatusList.defaultBtnList'>
            <el-button
                @click='onListBtn({ dataItem, dataIndex, btnItem, btnIndex })'
                v-bind='setBtnItemProp(btnItem)'
                v-if='btnItem.condition({dataItem, dataIndex}) === true'
                :key='btnIndex'>{{ btnItem.name }}</el-button>
        </template>
        <el-dropdown
            class='btn-more-list'
            trigger="click"
            @command='onDropdownBtn'
            v-if='btnStatusList.selectBtnList.length'>
            <span class="btn-more-icon">
                <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    :key='btnIndex'
                    :command="btnIndex"
                    v-for='(btnItem, btnIndex) in btnStatusList.selectBtnList'>
                    {{ btnItem.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </span>
</template>

<script>
    export default {
        name: 'operation-btn',
        data () {
            return {}
        },
        computed: {
            btnStatusList () {
                const defaultBtnList = []
                const selectBtnList = []
                let i = 0
                this.btnList.forEach((btnItem, btnIndex) => {
                    btnItem.show = false
                    if (btnItem.condition && typeof btnItem.condition === 'function' && btnItem.condition({
                        dataItem: this.dataItem,
                        dataIndex: this.dataIndex,
                        btnItem: btnItem,
                        btnIndex: btnIndex
                    }) === true) {
                        btnItem.show = true
                    }
                    if (btnItem.show) {
                        i++
                        if (i > this.maxShowCount) {
                            selectBtnList.push(btnItem)
                        } else {
                            defaultBtnList.push(btnItem)
                        }
                    }
                })
                return {
                    defaultBtnList,
                    selectBtnList
                }
            }
        },
        props: {
            maxShowCount: {
                type: Number,
                default: 3
            },
            dataIndex: {
                type: Number,
                default: -1
            },
            dataItem: {
                type: Object,
                default () {
                    return {}
                }
            },
            btnList: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        methods: {
            setBtnItemProp (btn) {
                if (!btn.type) {
                    btn.type = 'text'
                }
                return btn
            },
            onListBtn (opts) {
                this.$emit('onListBtn', opts)
            },
            onDropdownBtn (commandIndex) {
                this.$emit('onListBtn', {
                    dataItem: this.dataItem,
                    dataIndex: this.dataIndex,
                    btnIndex: commandIndex,
                    btnItem: this.btnStatusList.selectBtnList[commandIndex]
                })
            }
        }
    }
</script>

<style lang="less">
    .it-table-operation-btn{
        .btn-more-list{
            margin-left: 10px;
        }
        .btn-more-icon{
            cursor: pointer;
        }
    }
</style>
