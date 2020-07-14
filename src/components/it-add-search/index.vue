<template>
    <!-- add and search component -->
    <div class="it-add-search">
        <div class="left-content">
            <el-button v-if="config.hideLeftBtn !== true" :size='$store.state.layoutSize' type="primary" round @click="onAdd">{{ leftBtnText }}</el-button>
            <template
                    v-for='(btnItem, btnIndex) in leftBtnList'>
                <el-upload
                        class="upload-btn top-btn"
                        action=""
                        :show-file-list="false"
                        :auto-upload="false"
                        v-bind="getUploadNative(btnItem.uploadNative, btnItem)"
                        :key="btnIndex"
                        v-if="btnItem.isUpload === true">
                    <el-button
                            @click="onLeftBtn(btnItem, btnIndex)"
                            v-bind="btnItem.native"
                            :size='$store.state.layoutSize'>
                        <i
                                v-if="btnItem.iconClass"
                                :class="[btnItem.iconClass, ' icon-btn']"></i>
                        {{ btnItem.name }}</el-button>
                </el-upload>
                <el-button
                        class="top-btn"
                        v-else
                        @click="onLeftBtn(btnItem, btnIndex)"
                        :key="btnIndex"
                        v-bind="btnItem.native"
                        :size='$store.state.layoutSize'>
                    <i
                            v-if="btnItem.iconClass"
                            :class="[btnItem.iconClass, ' icon-btn']"></i>
                    {{ btnItem.name }}
                </el-button>
            </template>
        </div>
        <div class="right-content">
            <el-input :size='this.$store.state.layoutSize' type="text" suffix-icon="el-icon-search" @keyup="onSearch" :placeholder="searchPlaceholder"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'it-add-search',
        data () {
            return {}
        },
        computed: {
            leftBtnText () {
                return this.config.leftText || `新增${this.config.leftAfterText}`
            },
            searchPlaceholder () {
                if (this.config.searchPlaceholder) {
                    return this.config.searchPlaceholder
                }
                return '请输入搜索内容'
            }
        },
        props: {
            leftBtnList: {
                type: Array,
                default () {
                    return []
                }
            },
            config: {
                type: Object,
                default () {
                    return {
                        hideLeftBtn: false,
                        leftText: '',
                        leftAfterText: '',
                        searchPlaceholder: ''
                    }
                }
            }
        },
        methods: {
            getUploadNative (native, btnItem) {
                if (btnItem.accept && typeof btnItem.accept === 'function') {
                    return {
                        ...native,
                        accept: btnItem.accept()
                    }
                }
                return native
            },
            /**
             * 默认添加按钮事件
             */
            onAdd () {
                this.$emit('onAddSearch', {
                    method: 'onAdd'
                })
                this.$emit('onAdd')
            },
            /**
             * 默认搜索事件
             */
            onSearch () {
                this.$emit('onAddSearch', {
                    method: 'onSearch'
                })
                this.$emit('onSearch')
            },
            /**
             * 左侧自定义按钮事件
             * @param btnItem
             * @param btnIndex
             */
            onLeftBtn (btnItem, btnIndex) {
                this.$emit('onAddSearch', {
                    method: btnItem.method,
                    btnIndex,
                    btnItem
                })
                if (btnItem.method) {
                    this.$emit(btnItem.method, {
                        btnIndex,
                        btnItem
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    .it-add-search {
        width: 100%;
        height: 36px;

        .upload-btn{
            display: inline-block;
            float: left;
        }
        .top-btn{
            margin-right: 10px;
        }

        .left-content,
        .right-content {
            display: inline-block;
        }

        .left-content {
            float: left;
        }

        .right-content {
            float: right;
            input{
                width: 260px;
                border-radius: 40px;
            }
        }
        .icon-btn{
            font-size: 14px;
            /*float: left;*/
        }
    }

</style>
