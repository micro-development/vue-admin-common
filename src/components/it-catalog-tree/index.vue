<style lang='less'>
    .it-catalog-tree{
        width: 100%;
        height: 100%;

        .tree-content {
            width: 100%;
            height: 100%;
            overflow: auto;
            .el-tree{
                .el-tree-node{
                    min-width: 100%;
                    display: inline-block;
                    float: left;
                }
            }
        }
        .el-tree-node__expand-icon.is-leaf{
            color: #C0C4CC;
        }
    }

    #menu {
        background: #fff;
        position: fixed;
        z-index: 11;
        display: inline-block;
        border: 1px solid #EBEEF5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        padding: 0;

        div {
            float: left;
            width: 100%;
            line-height: 36px;
            text-align: center;
            font-size: 13px;
            color: #606266;
            cursor: pointer;

            &:hover {
                background-color: #ecf5ff;
                color: #66b1ff;
            }
        }
    }
</style>
<template>
    <div class="it-catalog-tree">
        <div v-show='menuVisible'>
            <div id='menu' ref='menu'>
                <div class='menu_item' @click='onAddNode'>添加</div>
                <div class='menu_item' @click='onUpdateNode'>修改</div>
                <div class='menu_item' @click='onDeleteNode'>删除</div>
            </div>
        </div>
        <div class='tree-content'>
            <el-tree
                @node-click="onNodeClick"
                @node-contextmenu="onNodeContextmenu"
                :props='treeProps'
                :draggable="true"
                :expand-on-click-node="false"
                :default-expand-all="true"
                :data="list"></el-tree>
        </div>
    </div>
</template>

<script>
    // import mixins from './mixin'

    export default {
        name: 'it-catalog-tree',
        mixins: [],
        data () {
            return {
                treeProps: {
                    label: 'name'
                },
                menuVisible: false,
                curNode: {}
            }
        },
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        mounted () {
            document.addEventListener('click', this.menuHide, false)
        },
        methods: {
            /**
             * 右键添加
             */
            onAddNode () {
                this.menuVisible = false
                this.$emit('onItCatalogTree', {
                    curNode: this.curNode,
                    event: 'editCatalog',
                    method: 'onAddNode'
                })
                this.$emit('onAddNode', {
                    event: 'editCatalog',
                    curNode: this.curNode
                })
                // this.addCatalog(this.curNode)
            },
            /**
             * 右键修改
             */
            onUpdateNode () {
                this.menuVisible = false
                this.$emit('onItCatalogTree', {
                    curNode: this.curNode,
                    event: 'editCatalog',
                    method: 'onUpdateNode'
                })
                this.$emit('onUpdateNode', {
                    event: 'editCatalog',
                    curNode: this.curNode
                })
                // this.updateCatalog(this.curNode)
            },
            /**
             * 右键删除
             */
            onDeleteNode () {
                this.menuVisible = false
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.$emit('onItCatalogTree', {
                        curNode: this.curNode,
                        method: 'onDeleteNode'
                    })
                    this.$emit('onDeleteNode', {
                        curNode: this.curNode
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
                // this.deleteCatalog(this.curNode)
            },
            /**
             * 左键普通点击事件
             * @param opts
             */
            onNodeClick (opts) {
                this.menuVisible = false
                this.$emit('onItCatalogTree', {
                    method: 'onNodeClick',
                    ...opts
                })
                this.$emit('onNodeClick', {
                    curNode: this.curNode,
                    ...opts
                })
            },
            /**
             * 右键事件
             * @param event
             * @param object
             * @param value
             */
            onNodeContextmenu (event, object, value) {
                this.menuVisible = true
                this.curNode = value
                let menu = document.querySelector('#menu')
                menu.style.left = event.clientX + 5 + 'px'
                menu.style.top = event.clientY + 'px'
            },
            /**
             * 隐藏右键菜单
             * @param e
             */
            menuHide (e) {
                if (this.$refs.menu) {
                    if (!this.$refs.menu.contains(e.target)) {
                        this.menuVisible = false
                    }
                }
            }
        }
    }
</script>
