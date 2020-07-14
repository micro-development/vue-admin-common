import * as Util from './util'

/**
 * 暴露 http.js 安装插件入口
 */
export default {
    install (Vue, options) {
        Vue.prototype.Util = Util
    }
}
