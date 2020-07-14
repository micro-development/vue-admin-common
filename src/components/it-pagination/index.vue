<template>
    <!-- pagination component -->
    <div class="it-pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next"
            :total="400"
            background>
    </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'it-pagination',
        data () {
            return {
                currentPage: 9
            }
        },
        computed: {},
        props: {
            config: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        methods: {
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`)
            }
        }
    }
</script>

<style lang="less">
    .it-pagination {
        width: 100%;
        height: 60px;
        padding-top: 20px;
        text-align: right;
    }
</style>
