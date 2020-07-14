<style lang="less">
    .it-dropdown {
        display: inline-block;
        /*background: #ccc;*/
        position: relative;
        .dropdown-select{
            width: 230px;
            display: block;
            position: absolute;
            top: 26px;
            left: 0;
        }
    }
</style>
<template>
    <!-- 带搜索的下拉菜单 -->
    <div class="it-dropdown">
        <el-link @click="onShowDropdown" :underline="false">{{ config.defaultText }}</el-link>
        <div
            class="dropdown-select"
            v-show="visibleDropdown">
            <el-select
                ref="elSelectDropdown"
                @change="onChangeSelect"
                :value-key="valueProp"
                v-bind="elSelectNativeProp"
                v-model="value">
                <el-option
                    v-for="item in dropdownList"
                    :key="item[valueProp]"
                    :label="item[labelProp]"
                    :value="item">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'it-simple-dropdown',
        data () {
            return {
                value: '',
                visibleDropdown: false
            }
        },
        computed: {
            elSelectNativeProp () {
                const defaultSetting = {
                    size: 'small',
                    filterable: true
                }
                return Object.assign(this.native, defaultSetting, {})
            },
            labelProp () {
                return this.itemProp.label || 'label'
            },
            valueProp () {
                return this.itemProp.value || 'value'
            }
        },
        props: {
            native: {
                type: Object,
                default () {
                    return {
                        placeholder: '请输入搜索内容'
                    }
                }
            },
            dropdownList: {
                type: Array,
                default () {
                    return []
                }
            },
            itemProp: {
                type: Object,
                default () {
                    return {}
                }
            },
            config: {
                type: Object,
                default () {
                    return {
                        closeAutoSettingValue: false, // true 时，不自动更新默认文本
                        defaultText: '默认展示文本'
                    }
                }
            }
        },
        mounted () {
            // this.$log.echo(this.$refs.elSelectDropdown, 'mounted this.$refs.elSelectDropdown', 'log')
        },
        methods: {
            /**
             * 下拉框改变事件
             * @param val 选中的item
             */
            onChangeSelect (val) {
                this.onHideDropdown()
                if (this.config.closeAutoSettingValue !== true) {
                    this.config.defaultText = val[this.labelProp]
                }
                this.$emit('onChangeDropdown', {
                    value: val
                })
            },
            /**
             * 打开下拉框
             */
            onShowDropdown () {
                this.visibleDropdown = true
                this.$refs.elSelectDropdown.toggleMenu()
            },
            /**
             * 关闭下拉框
             */
            onHideDropdown () {
                this.visibleDropdown = false
            }
        }
    }
</script>
