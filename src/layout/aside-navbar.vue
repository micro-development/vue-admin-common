<style lang="less">
    @import url(../less/var.less);
    .aside-menu{
        height: 100%;
        overflow: hidden;
        float: left;
        background: @header_bg_color;
        .el-menu{
            border-right: none;
        }
        .el-menu-item.is-active{
            &:hover{
                background: #e1e1e1 !important;
            }
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
        }
        .el-scrollbar__wrap{
            background: #fff;
            overflow-x: hidden;
            .el-scrollbar__view{
                background: #fff;
                /*height: 100%;*/
            }
        }
    }
    .el-menu--vertical{
        .el-menu--popup-right-start{
            margin-left: 0px !important;
            margin-right: 0px !important;
        }
    }
</style>
<template>
    <el-aside
        :style="asideStyle"
        class="aside-menu">
        <el-scrollbar style="height:100%">
<!--
      background-color="#1e384c"
      active-text-color="rgb(24, 144, 255)"
      -->
            <el-menu
                ref='elAsideMenu'
                router
                :collapse="isCollapse"
                :default-active="curMenuNavbar"
                class="el-menu-vertical-demo"
                background-color="#fff"
                active-text-color="rgb(66, 185, 131)"
                text-color="rgb(102, 102, 102)">
                <template v-for="(menu) in menuList">
                    <el-submenu :key='`${curHeaderNavbar}/${menu.path}`' :index="`${curHeaderNavbar}/${menu.path}`" v-if="menu.children && menu.children.length">
                    <template slot="title">
                            <i v-if='menu.meta && menu.meta.iconClass' :class="menu.meta.iconClass"></i>
                            <span slot="title">{{ menu.name }}</span>
                        </template>
                        <el-menu-item
                            :index="`${curHeaderNavbar}/${menu.path}/${childMenu.path}`"
                            :key="childMenuIndex"
                            v-for="(childMenu, childMenuIndex) in menu.children">
                            <!-- <i class="el-icon-location"></i> -->
                            <i v-if='childMenu.meta && childMenu.meta.iconClass' :class="childMenu.meta.iconClass"></i>
<!--                            {{ childMenu.name }}-->
                            <span slot="title">{{ childMenu.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item :key='`${curHeaderNavbar}/${menu.path}`' :index="`${curHeaderNavbar}/${menu.path}`" v-else>
                        <i v-if='menu.meta && menu.meta.iconClass' :class="menu.meta.iconClass"></i>
                        <span slot='title'>{{ menu.name }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script>
    export default {
        name: 'aside-navbar',
        data () {
            return {
                isCollapse: false
            }
        },
        props: {
            menuList: {
                type: Array,
                default () {
                    return []
                }
            },
            curMenuNavbar: {
                type: String,
                default: ''
            },
            curHeaderNavbar: {
                type: String,
                default: ''
            }
        },
        computed: {
            asideStyle () {
                let width = '200px'
                if (this.isCollapse) {
                    width = '64px'
                }
                return {
                    width,
                    transition: 'width 0.5s'
                }
            }
        },
        watch: {
            $route () {
                this.$nextTick(() => {
                    this.$refs.elAsideMenu.activeIndex = this.curMenuNavbar
                })
            }
        },
        created () {
            // this.$log.echo(this.menuList, 'aside-menu.vue', 'log')
        }
    }
</script>
