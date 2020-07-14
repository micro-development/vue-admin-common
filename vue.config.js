/**
 * @author yaimeet
 * @date 2019/11/13
 * @Description
 */
const webpack = require('./webpack')

// console.log('common module vue.config.js webpack', webpack)

module.exports = webpack.init({
    port: 8101,
    sgPage: {
        title: '-公共模块'
    }
}).setProxyApi('./proxyTarget.js').setProxyList().run()
