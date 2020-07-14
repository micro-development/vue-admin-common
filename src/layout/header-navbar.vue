<style lang="less">
    @import url(../less/var.less);

    #ittlr-header {
        width: 100%;
        height: @header_height;
        // background: @header_bg_color;
        background: #fff;;
        padding: 0;;
        border-bottom: 1px solid #f5f5f5;
        box-shadow: 0 3px 8px #f4f4f4;
    }

    .head-left {
        display: inline-block;
        height: 100%;
        .logo-link{
            height: 100%;
            display: inline-block;
            float: left;
        }
        .long-logo {
            height: 35px;
            width: auto;
            float: left;
        }
        .logo-home {
            height: 100%;
            cursor: pointer;
            .logo-title{
                color: #000;
                font-size: 20px;
                font-weight: 700;
                line-height: 64px;
                height: 100%;
                text-align: right;
                float: left;
                padding: 0 10px 0 20px;
            }
            img{
                float: left;
                max-height: 50%;
                max-width: 100%;
                margin-top: 16px;
            }
        }
        .search {
            display: inline-block;
            border-radius: 35px;
            width: 262px;
            height: 100%;
            padding: 15px 20px;
        }

        .search-input {
            height: 35px;
            float: left;

            input {
                height: 32px;
                border-radius: 35px;
            }

            .add-icon{
                position: relative;
                top: 6px;
                color: #409EFF;
                font-weight: bold;
                font-size: 20px;
                cursor: pointer;
            }
        }

        .aside-collapse{
            width: 52px;
            height: 100%;
            float: left;
            // background: @header_bg_color;
            background: #fff;
            border: none;
            font-size: 26px;
            position: relative;
            // top: -12px;
            // margin-left: 10px;
        }
    }

    .head-right {
        display: inline-block;
        float: right;
        height: 100%;
        // color: #ffffff;

        .head-user-info{
            height: 100%;
            padding-top: 12px;
            margin-left: 30px;;
        }

        .user-info {
            height: 100%;
            // padding-top: 12px;
            /*padding: 0 8px;*/
            display: inline-block;
            cursor: pointer;
            // float: left;
            /*margin-right: 16px;*/
            padding-right: 16px;
        }

        .user-avatar {
            float: left;
        }

        .user-name {
            height: 40px;;
            line-height: 40px;
            padding: 0 10px 0 10px;
            // padding: 10px 10px;
            float: left;
            // color: #fff;
            font-size: 16px;
        }

        .nav-list {
            display: inline-block;
            float: left;
            height: 100%;
            // background-color: @header_bg_color;
            // color: #ffffff;
            border: none;
        }

        .nav-li {
            height: 100%;
            line-height: @header_height;
            margin: 0;
            float: left;
            // background-color: @header_bg_color;
            // padding: 0 26px 0 10px;
            &.is-active{
                font-weight: 700;
            }
        }

        .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
            // background: none;
        }
    }

    /*.user-dropdown-list {
        border-radius: 0;
        top: -3px;
        width: 160px;
    }*/
</style>
<template>
    <el-header id="ittlr-header" :style="{height: '64px'}">
        <div class="head-left">
            <!-- <a href="#/">
                <img class="long-logo" src="../assets/common/long-logo.png" alt=""/>
            </a> -->
<!--            <el-button @click="$emit('onToggleAsideMenu')" class="aside-collapse" icon="el-icon-s-operation" type="text"></el-button>-->
            <a class="logo-link" href="#/">
                <div class="logo-home">
                    <span class="logo-title">ITTLR 系统</span>
                    <img src="../assets/logo.png" alt="">
                </div>
            </a>
<!--            <header-project v-show='!$store.state.project.hide'></header-project>-->
        </div>
        <div class="head-right">
            <el-menu
                router
                :default-active="curHeaderNavbar"
                class="nav-list"
                text-color="#333"
                mode="horizontal">
                <template
                    v-for="(nav, index) in navList">
                    <el-menu-item
                        class="nav-li"
                        v-if="!nav.meta || !nav.meta.hideNav"
                        :key="index"
                        :index="nav.path">{{ nav.name }}</el-menu-item>
                </template>
            </el-menu>
            <el-dropdown
                class="head-user-info"
                trigger="click"
                :visible="tempModel.userDrop"
                @command='onDropdownCommand'
                @visible-change="onUserDropdownChange">
                <div class="user-info">
                    <el-avatar class="user-avatar" size="large" icon="user"></el-avatar>
                    <span class="user-name">{{ $store.getters.getUserinfo.user_name || 'NoUserName' }} <i
                        :class="[!tempModel.userDrop ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i></span>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-if="$store.state.project_type !== 'common'"
                        command='account'>个人中心</el-dropdown-item>
                    <el-dropdown-item command='exit'>退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
    // import HeaderProject from './header-project'

    export default {
        name: 'header-navbar',
        components: {
            // HeaderProject
        },
        data () {
            return {
                tempModel: {
                    userDrop: false
                }
            }
        },
        props: {
            curHeaderNavbar: {
                type: String,
                default: ''
            },
            navList: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        computed: {},
        methods: {
            onUserDropdownChange (visible) {
                this.tempModel.userDrop = visible
            },
            async onDropdownCommand (command) {
                // this.$log.echo(command, 'onDropdownCommand', 'log', 'local')
                if (command === 'exit') {
                    await this.$store.dispatch('clearAccount')
                    this.$router.push({
                        path: '/login'
                    })
                }
                if (command === 'account') {
                    this.$router.push({
                        path: '/account'
                    })
                }
            }
        }
    }
</script>
