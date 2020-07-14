import TreeOperation from './tree-operation'
export default {
    components: {
        TreeOperation
    },
    data () {
        return {
            catalogMixins: 'test'
        }
    },
    methods: {
        addCatalog (curNode) {
            // this.$log.echo(this.$refs.treeOperation, 'onAddnode this.$refs.treeOperation', 'log', 'local')
            this.$log.echo(curNode, 'addCatalog curNode', 'util.js')
            this.$refs.treeOperation.show({
            }, curNode, 'add')
        },
        updateCatalog (curNode) {
            this.$log.echo(curNode, 'updateCatalog curNode', 'util.js')
            this.$refs.treeOperation.show({
            }, curNode, 'update')
        },
        deleteCatalog (curNode) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    }
}
