<template>
    <component-container
        :catalog='catalog'
        :add-search='addSearch'
        :list-operation='listOperation'
        :list-table='listTable'
        ref='componentContainer'>
    </component-container>
</template>

<script>
    export default {
        name: 'example-component-container',
        data () {
            return {
                catalog: {
                    list: [{
                        id: 1,
                        label: '一级 111',
                        children: [{
                            id: 4,
                            label: '二级 1-1'
                        }]
                    }, {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                    }, {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                    }]
                },
                addSearch: {
                    // leftText: '添加default',
                    leftAfterText: '后缀文案'
                },
                listOperation: {
                    leftBeforeText: '前缀文案'
                },
                listTable: {
                    dataList: [
                        {
                            name: 'yy',
                            status: 1,
                            content: '123',
                            click: '点击',
                            create_time: new Date().getTime()
                        },
                        {
                            name: 'aa',
                            status: 2,
                            create_time: new Date().getTime()
                        },
                        {
                            name: 'ii',
                            status: 3,
                            create_time: new Date().getTime()
                        },
                        {
                            name: 'mm',
                            status: 4,
                            create_time: new Date().getTime()
                        }
                    ],
                    fieldList: [
                        {
                            label: '名称',
                            prop: 'name',
                            // 默认居中
                            align: 'left'
                        },
                        {
                            label: '输出HTML内容',
                            prop: 'content',
                            formatter () {
                                return `<span>afdf</span>`
                            }
                        },
                        {
                            label: '可点击',
                            prop: 'click'
                        },
                        {
                            label: '状态',
                            prop: 'status'
                        },
                        {
                            label: '创建时间',
                            prop: 'create_time'
                        }
                    ],
                    btnList: [
                        {
                            name: '查看',
                            condition () {
                                return true
                            }
                        },
                        {
                            name: '删除',
                            style: {
                                color: this.$store.state.colorInfo.warning
                            },
                            condition ({ dataItem }) {
                                return dataItem.status === 2
                            }
                        },
                        {
                            name: '修改',
                            condition ({ dataItem }) {
                                return dataItem.status === 3
                            }
                        },
                        {
                            name: '查看222',
                            condition () {
                                return true
                            }
                        },
                        {
                            name: '查看333',
                            condition () {
                                return true
                            }
                        },
                        {
                            name: '查看444',
                            condition () {
                                return true
                            }
                        }
                    ]
                }
            }
        },
        mounted () {
            // this.test()
        },
        methods: {
            test () {
                for (let index = 1; index <= 30; index++) {
                    this.listTable.dataList.push({
                        name: `test - ${index}`,
                        status: index % 4,
                        html: `html - ${index}`,
                        click: `点击 - ${index}`,
                        create_time: new Date().getTime()
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
