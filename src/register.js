/**
 * @author yaimeet
 * @date 2019/3/3
 * @Description
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './less/common.less'
import * as output from './output'
import plugins from './configs/plugin'
Vue.use(ElementUI)
const { moduleInfo, components } = output

// console.log('output', output)
// console.log('plugins', plugins)
// console.log('moduleInfo.mixins', moduleInfo.mixins)

/**
 * 安装全局插件
 */
Object.keys(plugins).forEach((name) => {
    Vue.use(plugins[name].plugin, plugins[name].options)
})

// 自动注册插件
Vue.use({
    install (Vue, options = {}) {
        // 注册全局混合
        Vue.mixin(moduleInfo.mixins || {})

        // 注册全局指令
        Object.keys(moduleInfo.directives).forEach((directiveName) => {
            Vue.directive(directiveName, moduleInfo.directives[directiveName])
        })

        // 注册全局过滤器
        Object.keys(moduleInfo.filters).forEach((filterName) => {
            // console.log('register filter', filterName, filters[filterName])
            Vue.filter(filterName, moduleInfo.filters[filterName])
        })

        // 注册全局组件
        Object.keys(components).forEach((componentName) => {
            Vue.component(components[componentName].name, components[componentName])
        })
    }
})
