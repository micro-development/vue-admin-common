/*
 * @Author: yaimeet
 * @Date: 2019-09-26 20:16:02
 * @Last Modified by: yaimeet
 * @Last Modified time: 2019-09-26 22:20:12
 */

import AliOss from './ali-oss'

/**
 * 暴露 ali-oss.js 安装插件入口
 */
export default {
    install (Vue, opts = {}) {
        Vue.prototype.AliOss = AliOss
        Vue.prototype.$aliOss = new AliOss(opts)
    }
}
