<style lang="less">
    .it-element-drawer{
        .el-drawer__header{
            margin-bottom: 0;
            padding: 15px;
            box-shadow: 0 3px 8px #f4f4f4;
        }
        .el-drawer__body{
            height: 100%;
            /*height: calc(100% - 56px);;*/
            overflow: hidden;
            /*background: red;*/
        }
        .it-drawer-content{
            width: 100%;
            /*height: 100%;*/
            height: calc(100% - 56px);
            overflow: auto;
            .drawer-body{
                width: 100%;
                height: 100%;
                overflow: auto;
                /*background: #cccccc;*/
                padding: 20px;
                /*> div{
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                }*/
            }
            .drawer-footer{
                display: inline-block;
                width: 100%;
                height: 56px;
                box-shadow: 0 3px 12px #999;
                text-align: center;
                position: absolute;
                bottom: 0;
                right: 0;
                /*background: blue;*/
                .btn-content{
                    display: inline-block;
                    height: 100%;
                    padding: 12px;
                    .el-button{
                        width: 100px;
                    }
                }
            }
        }
    }
</style>
<template>
    <el-drawer
        class="it-element-drawer"
        v-bind='native'
        :visible.sync="visible"
        :destroy-on-close="destroyOnClose"
        :wrapperClosable="wrapperClosable"
        :size="size"
        ref="elDrawer">
        <div class="it-drawer-content">
            <div class="drawer-body">
                <slot></slot>
            </div>
            <div class="drawer-footer">
                <div class="btn-content">
                    <el-button
                            :size='$store.state.layoutSize'
                            :key="index"
                            v-bind="btn.native"
                            v-for="(btn, index) in showBtnList"
                            @click="onBtn({ btn, index })"
                            round>{{ btn.name }}</el-button>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    export default {
        name: 'it-drawer-container',
        data () {
            return {
                visible: false
            }
        },
        computed: {
            /**
             * 控制是否在关闭 Drawer 之后将子元素全部销毁，默认为 false，这里修改下默认值
             * @returns {boolean}
             */
            destroyOnClose () {
                if (this.native['destroy-on-close'] === false) {
                    return false
                }
                return true
            },
            /**
             * 点击遮罩层是否可以关闭 Drawer,默认为 true，这里修改下默认值
             * @returns {boolean}
             */
            wrapperClosable () {
                if (this.native['wrapperClosable'] === true) {
                    return true
                }
                return false
            },

            /**
             * 默认大小 900px
             * @returns {string}
             */
            size () {
                if (this.native.size) {
                    return this.native.size
                }
                return '1280px'
            },

            /**
             * 显示的按钮
             */
            showBtnList () {
                if (this.btnShowList.length && Array.isArray(this.btnShowList)) {
                    return this.btnList.filter((btnItem) => {
                        return this.btnShowList.includes(btnItem.event)
                    })
                }
                return this.btnList
            }
        },
        props: {
            /**
             * el-drawer 原生属性
             */
            native: {
                type: Object,
                default () {
                    return {
                        title: 'drawer title'
                    }
                }
            },

            /**
             * 如果很多按钮需要按不同情况显示
             * 可以在每个按钮对象中新增一个 event 属性，这个数组传 需要显示的 event
             * 然后动态更新这个数组即可
             * 为空数组时，全部显示
             */
            btnShowList: {
                type: Array,
                default () {
                    return []
                }
            },

            /**
             * 底部按钮配置，每个按钮对象支持 el-button 原生属性
             */
            btnList: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        methods: {
            show () {
                this.visible = true
            },
            hide () {
                this.visible = false
            },
            btnCondition (btn) {
                if (btn) {
                    if (!btn.condition) {
                        return true
                    }
                    if (btn.condition && typeof btn.condition === 'function' && btn.condition() === true) {
                        return true
                    }
                }
                return false
            },
            /**
             * 侧弹框底部按钮派发事件
             * @param opts  暴露出去的参数
             */
            onBtn (opts) {
                this.$emit('onDrawer', {
                    ...opts,
                    method: opts.btn.method
                })
                if (opts.btn.method) {
                    this.$emit(opts.btn.method, {
                        ...opts
                    })
                }
            }
        }
    }
</script>
