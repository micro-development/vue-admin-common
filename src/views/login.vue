<template>
    <div class="login-container">
        <div class="form-content">
            <div class="logo">
                <img src="../assets/common/logo.png" alt=""/>
            </div>
            <p class="title">IT同路人{{ $store.getters.getProjectType }}系统登录</p>
            <div class="input-group">
                <el-input
                    autocomplete="off"
                    placeholder="用户名 / 邮箱 / 手机号"
                    size="large"
                    v-model="formData.account"></el-input>
            </div>
            <div class="input-group">
                <el-input
                    placeholder="密码"
                    size="large"
                    type="password"
                    v-model="formData.password"></el-input>
            </div>
            <div class="input-group">
                <el-button class="login-btn" type="primary" size="large" block @click="onLoginApi">登录</el-button>
            </div>
            <div class="input-group input-text link-text">
                <span class="fl mobile-verycode">手机验证码登录</span>
                <span class="fr forget-password">忘记密码?</span>
            </div>
            <div class="line"></div>
            <div class="input-group link-text">
                <a href="#/register"><el-button class="register-btn" type="default" size="large">还没有账号？免费注册</el-button></a>
            </div>
            <div class="input-group input-text input-group-open">或使用第三方账号登录</div>
            <div class="input-group group-icon">
                <span class="open-icon" @click="loginWechat">
                    <img src="../assets/common/account-wechat.png" alt="">
                </span>
                <span class="open-icon" @click="loginTencentConnect">
                    <img src="../assets/common/account-tencent.png" alt="">
                </span>
                <span class="open-icon">
                    <img src="../assets/common/account-github.png" alt="">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { loginTencentConnect, loginWechatConnect } from '../service/account'
    export default {
        name: 'login',
        components: {},
        data () {
            return {
                formData: {
                    account: '',
                    password: ''
                }
            }
        },
        methods: {
            /**
             * 登录
             * @returns {Promise<void>}
             */
            async onLoginApi () {
                // const data = await this.$http.fetch(login(this.formData))
                const data = {
                    info: {
                        token: '这是假的token'
                    },
                    detail: {
                        uuid: 'this is user uuid',
                        user_name: 'yaimeet',
                        nickName: '老君'
                    }
                }
                this.$log.echo(data, 'login.vue onLoginApi data', 'log', 'local')
                if (data) {
                    await this.setLoginInfo(data)
                }
            },
            /**
             * 微信登录
             */
            async loginWechat () {
                const wechatWindow = window.open(`${process.env.VUE_APP_API_ROOT_PATH}/aiApi/wechat/connect/login`, '微信登录')
                window.wechatCallback = async (data) => {
                    this.$log.echo(data, 'onOpenWechat window.wechatCallback data', 'log')
                    wechatWindow.close()
                    if (data.errmsg) {
                        this.$message.error(data.errmsg)
                        return
                    }
                    if (data.account_user_uuid) {
                        const result = await this.$http.fetch(loginWechatConnect({
                            account_user_uuid: data.account_user_uuid
                        }))
                        if (result) {
                            await this.setLoginInfo(result)
                        }
                    } else {
                        this.$message.error(data.msg)
                    }
                }
            },
            /**
             * 微信登录
             */
            async loginTencentConnect () {
                const qqWindow = window.open(`${process.env.VUE_APP_API_ROOT_PATH}/aiApi/tencent/connect/login`, 'QQ登录')
                window.qqCallback = async (data) => {
                    this.$log.echo(data, 'loginQQ window.qqCallback data', 'log')
                    qqWindow.close()
                    if (data.errmsg) {
                        this.$message.error(data.errmsg)
                        return
                    }
                    if (data.account_user_uuid) {
                        const result = await this.$http.fetch(loginTencentConnect({
                            account_user_uuid: data.account_user_uuid
                        }))
                        if (result) {
                            await this.setLoginInfo(result)
                        }
                    } else {
                        this.$message.error(data.msg)
                    }
                }
            },
            /**
             * 设置登录信息
             */
            async setLoginInfo (data) {
                await this.$store.dispatch('setAccount', {
                    token: data.info.token,
                    userinfo: data.detail
                })
                if (data.detail.user_name) {
                    this.$router.push({
                        path: '/home'
                    })
                } else {
                    this.$router.push({
                        path: '/account/profile'
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    @import url("../less/var.less");

    .login-container {
        width: 100%;
        height: 100%;

        .form-content {
            width: 500px;
            height: 690px;
            margin: 60px auto;
            border: 1px solid #e2e2e2;
            background-color: #fff;
            padding: 60px 80px;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;

            img {
                width: 200px;
                height: auto;
            }
        }

        .input-group {
            height: 60px;
            line-height: 60px;
        }

        .title {
            text-align: center;
            line-height: 32px;
        }

        .login-btn{
            width: 100%;
        }

        .input-group-open {
            margin-top: 20px;
            margin-bottom: 20px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            position: relative;

            &:before,
            &:after{
                position: absolute;
                background: #e7e6e7;
                content: "";
                width: 11%;
                height: 1px;
            }

            &:before{
                top: 15px;
                left: 30px;
            }

            &:after{
                top: 15px;
                right: 30px;
            }
        }

        .group-icon{
            text-align: center;
            .open-icon{
                display: inline-block;
                padding: 5px 15px;
                cursor: pointer;
            }
        }

        .register-btn{
            width: 100%;
        }
    }
</style>
