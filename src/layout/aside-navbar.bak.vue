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
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
        }
    }
    .el-menu--vertical{
        .el-menu--popup-right-start{
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
    }
</style>
<template>
    <el-aside
        :style="asideStyle"
        class="aside-menu">
        <el-menu
            ref='elAsideMenu'
            router
            :collapse="isCollapse"
            :default-active="curMenuNavbar"
            class="el-menu-vertical-demo"
            background-color="#1e384c"
            active-text-color="rgb(24, 144, 255)"
            text-color="#fff">
            <el-submenu :key="menuIndex" v-for="(menu, menuIndex) in menuList" :index="`${curHeaderNavbar}/${menu.path}`">
                <span  v-if="menu.children && menu.children.length">
                    <!-- <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot='title'>1{{ menu.name }}</span>
                    </template> -->
                    <el-menu-item>
                        <!-- <i class="el-icon-location"></i> -->
                        <span slot='title'>1{{ menu.name }}</span>
                    </el-menu-item>
                    <el-menu-item-group :key="childMenuIndex" v-for="(childMenu, childMenuIndex) in menu.children">
                        <span v-if="childMenu.children && childMenu.children.length">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot='title'>{{ childMenu.name }}</span>
                            </template>
                            <el-menu-item
                                :index="groupMenu.path"
                                :key="groupIndex"
                                v-for="(groupMenu, groupIndex) in childMenu.children">
                                <i class="el-icon-location"></i>
                                {{ groupMenu.name }}
                            </el-menu-item>
                        </span>
                        <el-menu-item v-else :index="`${curHeaderNavbar}/${menu.path}/${childMenu.path}`">
                            <i class="el-icon-location"></i>
                            {{ childMenu.name }}
                        </el-menu-item>
                    </el-menu-item-group>
                </span>
                <el-menu-item :index="`${curHeaderNavbar}/${menu.path}`" v-else>
                    <i class="el-icon-location"></i>
                    <span slot='title'>2{{ menu.name }}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
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
