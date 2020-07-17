# ITTLR 管理系统 公共模块

## 依赖

- [微开发官方文档](https://docs.microdevelopment.dev/)
- [it-md shell 脚手架](https://github.com/micro-development/micro-development-sh)

## 全局信息

- 资源 src/assets/
- 组件 src/components/
- 指令 src/directives/
- 过滤器 src/filters/
- 插件 src/plugins/
- 基础样式 src/less/
- 配置 src/config/
- 用于嵌套路由需要的 `<router-view>` 的容器载体 src/layout/

## 初始化信息

- 上面全局信息的自动引入 src/register.js
- 导出上面全局信息给其他模块用 src/output.js
- webpack 封装 webpack.js
- VueRouter 初始化，包含信息如下 src/router/mixins.js
    - 登录页面 src/views/login.vue
    - 注册页面 src/views/register.vue
    - 首页 src/views/dashboard.vue
    - 示例(/example)模块 src/views/example/
- VuexStore 初始化 src/store/mixins.js
