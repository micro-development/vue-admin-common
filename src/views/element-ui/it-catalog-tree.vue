<template>
    <component-container>
        <div slot='content'>
            <h1>这是 it-catalog-tree 组件单独使用效果</h1>
            <div class="tree-demo">
                <it-catalog-tree
                    @onItCatalogTree="onItCatalogTree"
                    :list="list"></it-catalog-tree>
                <it-catalog-tree-form
                    ref="itCatalogTreeForm"></it-catalog-tree-form>
            </div>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-catalog-tree',
        data () {
            return {
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
            }
        },
        mounted () {
            // this.showCatalogForm()
        },
        methods: {
            onItCatalogTree (opts) {
                if (opts.event && opts.event === 'editCatalog') {
                    this.showCatalogForm()
                } else {
                    this.$log.echo(opts, 'example it-catalog-tree onItCatalogTree opts', 'log')
                }
            },
            showCatalogForm () {
                this.$refs.itCatalogTreeForm.show()
            }
        }
    }
</script>

<style lang="less">
    .tree-demo{
        float: left;
        display: inline-block;
        width: 200px;
        height: 100%;
        border: 1px solid #ddd;
        position: relative;
    }
</style>
