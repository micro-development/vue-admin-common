<style lang="less">
    .it-normal-list {
        width: 100%;
        .item-normal{
            float: left;
            width: 100%;
        }
        .item-tag-list{
            float: right;
        }
        .item-time{
            margin: 0 16px;
            font-size: 14px;
        }
    }
</style>
<template>
    <!-- card component -->
    <el-row class="it-normal-list">
        <div
            class="item-normal clearfix"
            :key="index"
            v-for="(item, index) in list">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-time">2019-6-12</span>
            <span class="item-tag-list">
                <el-tag size="mini">雨纷纷</el-tag>
                <el-divider direction="vertical"></el-divider>
                <el-tag size="mini">旧故里</el-tag>
                <el-divider direction="vertical"></el-divider>
                <el-tag size="mini">草木深</el-tag>
            </span>
            <el-divider content-position="right">作者阿里云</el-divider>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: 'it-normal-list',
        data () {
            return {}
        },
        computed: {},
        props: {
            config: {
                type: Object,
                default () {
                    return {}
                }
            },
            list: {
                type: Array,
                default () {
                    return [
                        {
                            name: '项目名称',
                            description: '项目描述',
                            logo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            color: '#ddd'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            logo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            color: '#ddd'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            logo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            color: '#ddd'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            color: '#ddd'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            logo: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
                        },
                        {
                            name: '项目名称',
                            description: '项目描述',
                            color: '#ddd'
                        }
                    ]
                }
            }
        },
        methods: {}
    }
</script>
