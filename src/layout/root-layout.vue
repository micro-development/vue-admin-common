<style lang="less">
    @import '../less/var.less';
    #ittlr-container{
        width: 100%;
        // height: calc(100% - 64px);
        height: 100%;
        /*clear: both;*/
        background: @bg_color;
    }
    #ittlr-content{
        display: block;
        width: 100%;
        /*height: 100%;*/
        height: calc(100% - 64px);
        background: #f5f5f5;
        /*float: left;*/
        padding: 0;
    }
    .router-view-container{
        /*background: #fff;*/
        /*height: calc(100% - 114px); // header banner 和 header bread*/
        height: calc(100% - 2px);
        /*height: 100%;*/
        padding: 0px;
        overflow: hidden;
    }
    // .el-scrollbar__wrap{
    //     min-height: 100%;
    //     overflow-x: hidden;
    //     .el-scrollbar__view{
    //         min-height: 100%;
    //     }
    // }
</style>
<template>
    <div style="width: 100%;height: 100%;">
        <div id="ittlr-container">
            <header-navbar
                    @onToggleAsideMenu="onToggleAsideMenu"
                    :cur-header-navbar="curHeaderNavbar"
                    :nav-list="navList"></header-navbar>
            <el-container id="ittlr-content">
                <aside-navbar
                        v-if='menuList.length'
                        :cur-header-navbar="curHeaderNavbar"
                        :cur-menu-navbar="curMenuNavbar"
                        :menu-list="menuList"
                        ref="asideNavbar"></aside-navbar>
                <!--<el-breadcrumb
                        class="breadcrumb-header-fixed"
                        separator-class="el-icon-arrow-right">
                    <span
                            @click="onToggleAsideMenu"
                            class="it-collapse"><i class="el-icon-s-operation"></i></span>
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item
                            :key="index"
                            v-for="(item, index) in breadList">{{ item.name }}</el-breadcrumb-item>
                </el-breadcrumb>-->
                <el-main class='router-view-container'>
                    <el-col
                            style="height: 100%;background: #fff;border-radius: 5px;"
                            :span='menuList.length ? 24 : 24'
                            :offset="menuList.length ? 0 : 0">
                        <router-view></router-view>
                    </el-col>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    import HeaderNavbar from './header-navbar'
    import AsideNavbar from './aside-navbar'

    export default {
        name: 'root-layout',
        components: {
            HeaderNavbar,
            AsideNavbar
        },
        data () {
            return {}
        },
        computed: {
            breadList () {
                const breadRoutes = this.$route.matched
                return breadRoutes.filter((item) => {
                    return item.name !== '首页'
                })
            },
            curHeaderNavbar () {
                if (this.$route &&
                    this.$route.matched &&
                    this.$route.matched.length
                ) {
                    return this.$route.matched[0].path
                }
                return ''
            },
            vuexRoutes () {
                return this.$store.getters.getRoutes
            },
            navList () {
                // return this.$router.options.routes.filter((route) => {
                //     return !route.meta || !route.meta.hideNav
                // })
                // return this.$router.options.routes
                return this.$store.getters.getRoutes
            },
            curMenuNavbar () {
                return this.$route.path
            },
            menuList () {
                let list = []
                for (let i = 0; i < this.navList.length; i++) {
                    if (this.navList[i].path === this.curHeaderNavbar) {
                        if (this.navList[i].meta && this.navList[i].meta.hideMenu === true) {
                            break
                        }
                        list = this.navList[i].children || []
                        break
                    }
                }
                return list
            }
        },
        methods: {
            onToggleAsideMenu () {
                this.$log.echo('onToggleAsideMenu', 'onToggleAsideMenu', 'log', 'local')
                this.$refs.asideNavbar.isCollapse = !this.$refs.asideNavbar.isCollapse
            }
        }
    }
</script>
