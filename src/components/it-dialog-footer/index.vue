<style lang="less">
    .dialog-footer{
        padding: 15px 10px;
        text-align: center;
        .el-button{
            width: 100px;
        }
    }
</style>
<template>
    <div
        class="dialog-footer">
        <el-button
            :size='$store.state.layoutSize'
            :type="btn.type"
            :key="index"
            v-for="(btn, index) in showBtnList"
            @click="onBtn({ btn, index })"
            round>{{ btn.name }}</el-button>
    </div>
</template>

<script>
    export default {
        name: 'it-dialog-footer',
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
             * 显示的按钮
             */
            showBtnList () {
                const list = []
                this.btnList.forEach((item) => {
                    if (this.btnCondition(item) === true) {
                        list.push(item)
                    }
                })
                return list
            }
        },
        props: {
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
            onBtn (opts) {
                this.$emit(opts.btn.method, {
                    ...opts
                })
                // if (opts.btn.event && opts.btn.event === 'close') {
                //     this.hide()
                // } else {
                //     this.$emit('onDialog', {
                //         ...opts,
                //         method: opts.btn.method
                //     })
                //     this.$emit(opts.btn.method, {
                //         ...opts,
                //         method: opts.btn.method
                //     })
                // }
            }
        }
    }
</script>
