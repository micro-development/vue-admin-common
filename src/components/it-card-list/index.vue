<style lang="less">
    .it-card-list {
        width: 100%;
        height: 200px;
        .item-card{
            padding: 10px;
        }
        .item-body{
            width: 100%;
            height: 160px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .item-name{
            font-weight: 500;
            text-align: center;
        }
        .item-description{
            font-size: 14px;
            line-height: 32px;
            text-align: center;
        }
        .item-footer{
            padding: 10px;
        }
    }
</style>
<template>
    <!-- card component -->
    <el-row class="it-card-list">
        <el-col
            class="item-card"
            v-for="(item, index) in list" :key="index"
            :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <div
                    :style="{background: item.color}"
                    class="item-body">
                    <img
                        v-if="item.logo"
                        :src="item.logo"
                        class="image">
                </div>
                <div class="item-footer">
                    <div class="item-name">{{ item.name }} -- {{ index }}</div>
                    <div class="item-description clearfix">{{ item.description }}</div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'it-card-list',
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
