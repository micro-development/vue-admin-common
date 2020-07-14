<style lang="less">
    @import url("../less/var.less");

    .register-container {
        width: 100%;
        height: 100%;

        .el-select .el-input {
            width: 100px;
        }

        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }

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

        .register-btn {
            width: 100%;
        }

        .toggle-type-btn {
            width: 100%;
        }
        .get-verify-code{
            width: 120px;
            background: #000;
            &.disabled{
                cursor: not-allowed;
            }
        }
    }
</style>
<template>
    <div class="register-container">
        <div class="form-content">
            <div class="logo">
                <img src="../assets/common/logo.png" alt=""/>
            </div>
            <p class="title">IT同路人系统注册</p>
            <div class="input-group" v-if="registerType === 'mobile'">
                <el-input
                    placeholder="手机号"
                    size="large"
                    v-model="formData.mobile">
                    <el-select v-model="formData.mobile_type" slot="prepend" placeholder="国家">
                        <el-option label="中国+86" value="+86"></el-option>
                        <el-option label="美国+1" value="+1"></el-option>
                    </el-select>
                </el-input>
            </div>
            <div class="input-group" v-if="registerType === 'email'">
                <el-input
                    placeholder="邮箱"
                    size="large"
                    v-model="formData.email">
                </el-input>
            </div>
            <div class="input-group">
                <el-input
                    :placeholder="getValidateCodeText"
                    size="large"
                    v-model="formData.verify_code">
                    <el-button
                        class="get-verify-code"
                        :class="{disabled: verifying}"
                        @click="sendVerifyCode"
                        slot="append">{{ verifyText }}</el-button>
                </el-input>
            </div>
            <div class="input-group">
                <el-input
                    placeholder="请输入密码"
                    size="large"
                    type="password"
                    v-model="formData.password"></el-input>
            </div>
            <div class="input-group">
                <el-input
                    placeholder="请验证密码"
                    size="large"
                    type="password"
                    v-model="formData.confirm_password"></el-input>
            </div>
            <div class="input-group">
                <el-button class="register-btn" type="primary" @click="onRegisterApi">注册</el-button>
            </div>
            <div class="input-group input-text link-text">
                <!--                <span class="fl mobile-verycode">手机验证码登录</span>-->
                <a href="#/login">
                    <span class="fr forget-password">已有账号？马上登陆</span>
                </a>
            </div>
            <div class="line"></div>
            <!--<div class="input-group link-text">
                <a href="#/login">
                    <el-button class="register-btn" type="default" size="large">已有账号？马上登陆</el-button>
                </a>
            </div>-->
            <div class="input-group">
                <el-button class="toggle-type-btn" type="default" @click="onToggleRegisterType">{{ registerToggleText
                    }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        sendEmailCodeByRegister,
        sendMobileCodeByRegister,
        register
    } from '../service/account'

    export default {
        name: 'register',
        components: {},
        data () {
            return {
                registerType: 'email',
                formData: {
                    mobile_type: '+86',
                    mobile: '',
                    email: '',
                    verify_code: '',
                    password: '',
                    confirm_password: ''
                },
                verifyCount: 0,
                verifying: false,
                timer: null
            }
        },
        mounted () {
            this.init()
        },
        computed: {
            registerToggleText () {
                let text = '手机'
                if (this.registerType === 'mobile') {
                    text = '邮箱'
                }
                return `使用${text}注册`
            },
            getValidateCodeText () {
                let text = '邮箱'
                if (this.registerType === 'mobile') {
                    text = '手机'
                }
                return `请输入${text}验证码`
            },
            verifyText () {
                if (this.verifying) {
                    return `${this.verifyCount} 秒后重试`
                }
                return '获取验证码'
            }
        },
        methods: {
            init () {
                this.resetVerify()
            },
            /**
             * 重置验证码
             */
            resetVerify () {
                this.verifying = false
                this.verifyCount = 120
            },
            /**
             * 发送验证码
             */
            async sendVerifyCode () {
                // this.$log.echo(this.registerType, 'sendVerifyCode registerType', 'log')
                if (this.verifying === true) {
                    return
                }
                if (this.registerType === 'mobile') {
                    this.sendMobileCode()
                } else {
                    this.sendEmailCode()
                }
            },
            /**
             * 验证邮箱
             */
            validateEmail () {
                if (!this.formData.email) {
                    this.$message.error('邮箱必填')
                    return false
                }
                if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.formData.email) === false) {
                    this.$message.error('邮箱格式不正确，请输入正确的邮箱')
                    return false
                }
                return true
            },
            /**
             * 发送邮箱验证码
             */
            async sendEmailCode () {
                // this.$log.echo(this.registerType, 'sendEmailCode', 'log')
                if (this.validateEmail() !== true) {
                    return false
                }
                const data = await this.$http.fetch(sendEmailCodeByRegister({
                    email: this.formData.email
                }))
                if (data) {
                    this.verifying = true
                    this.$message.success('邮箱验证码发送成功，请注意查收')
                    this.timer = setInterval(() => {
                        this.verifyCount--
                        if (this.verifyCount === 0) {
                            this.resetVerify()
                            clearInterval(this.timer)
                        }
                    }, 1000)
                }
            },
            /**
             * 验证手机号
             */
            validateMobile () {
                if (!this.formData.mobile) {
                    this.$message.error('手机号必填')
                    return false
                }
                if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.formData.mobile) === false) {
                    this.$message.error('手机号码不正确，请输入正确的手机号')
                    return false
                }
                return true
            },
            /**
             * 发送短信验证码
             */
            async sendMobileCode () {
                // this.$log.echo(this.registerType, 'sendMobileCode', 'log')
                if (this.validateMobile() !== true) {
                    return false
                }
                const data = await this.$http.fetch(sendMobileCodeByRegister({
                    mobile: this.formData.mobile
                }))
                if (data) {
                    this.verifying = true
                    this.$message.success('手机验证码发送成功，请注意查收')
                    this.timer = setInterval(() => {
                        this.verifyCount--
                        if (this.verifyCount === 0) {
                            this.resetVerify()
                            clearInterval(this.timer)
                        }
                    }, 1000)
                }
            },

            /**
             * 验证表单
             */
            validateForm () {
                if (this.registerType === 'mobile') {
                    if (this.validateMobile() === false) {
                        return false
                    }
                }
                if (this.registerType === 'email') {
                    if (this.validateEmail() === false) {
                        return false
                    }
                }
                if (!this.formData.verify_code) {
                    this.$message.error('验证码必填')
                    return false
                }
                if (!this.formData.password) {
                    this.$message.error('密码必填')
                    return false
                }
                if (this.formData.password !== this.formData.confirm_password) {
                    this.$message.error('两次密码不一致')
                    return false
                }
                return true
            },

            /**
             * 注册
             * @returns {Promise<void>}
             */
            async onRegisterApi () {
                // this.$log.echo('onRegisterApi', 'register.vue', 'log', 'local')
                if (this.validateForm() === false) {
                    return false
                }
                const data = await this.$http.fetch(register(this.formData))
                if (data) {
                    this.$message.success('注册成功，请重新登录')
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1000)
                }
            },

            /**
             * 切换注册账号类型
             */
            onToggleRegisterType () {
                if (this.registerType === 'mobile') {
                    this.registerType = 'email'
                    this.formData.mobile = ''
                } else {
                    this.registerType = 'mobile'
                    this.formData.email = ''
                }
                this.resetVerify()
            }
        }
    }
</script>
