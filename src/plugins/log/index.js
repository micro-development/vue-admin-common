import Log from './log'

/**
 * 暴露 http.js 安装插件入口
 */
export default {
    install (Vue, options) {
        Vue.prototype.Log = Log
        Vue.prototype.$log = new Log(options)
    }
}
