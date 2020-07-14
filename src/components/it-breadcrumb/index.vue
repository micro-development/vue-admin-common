<style lang="less">
    .breadcrumb-header-fixed{
        padding-right: 10px;
        border-radius: 0;
        width: 100%;
        height: 50px;
        background: #fff;
        line-height: 50px;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        .it-collapse{
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 56px;
            float: left;
            cursor: pointer;
            margin-right: 10px;
            &:hover{
                background: rgba(0,0,0,.025);
            }
            i{
                font-size: 20px;
            }
        }
        .br-right{
            display: inline-block;
            float: right;
        }
        .br-setting{
            display: inline-block;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            .icon-setting{
                font-size: 23px;
            }
        }
    }
</style>
<template>
    <el-breadcrumb
            class="breadcrumb-header-fixed"
            separator-class="el-icon-arrow-right">
                <span
                        class="it-collapse"><i class="el-icon-s-operation"></i></span>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
                :key="index"
                v-for="(item, index) in breadList">{{ item.name }}</el-breadcrumb-item>
        <div class="br-right">
            <it-toggle-project></it-toggle-project>
            <span class="br-setting">
                <el-link :underline="false" class="el-icon-setting icon-setting"></el-link>
            </span>
        </div>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: 'it-breadcrumb',
        data () {
            return {}
        },
        computed: {
            breadList () {
                const breadRoutes = this.$route.matched
                return breadRoutes.filter((item) => {
                    return item.name !== '首页'
                })
            }
        }
    }
</script>
