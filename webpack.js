/**
 * @author yaimeet
 * @date 2019/11/12
 * @Description
 */
const path = require('path')

// function resolve (dir) {
//     return path.join(__dirname, dir)
// }

/**
 * Use：obj.init(options).setProxyApi(path).setProxyList().run()
 */
module.exports = {
    resolve (dir) {
        return path.join(__dirname, dir)
    },
    run () {
        return this.start()
    },
    options: {
        sgPage: {},
        port: '',
        alias: {},
        chainWebpack: (config) => {
            config.resolve.alias.set('@', this.resolve('src'))
        }
    },
    init (options = {}) {
        for (let opt in options) {
            if (opt !== 'sgPage') {
                this.options[opt] = options[opt]
            } else if (options[opt]) {
                if (options[opt].baseTitle) {
                    this.options.sgPage.baseTitle = options[opt].baseTitle
                }
                if (options[opt].title) {
                    this.options.sgPage.title = options[opt].title
                }
            }
        }
        return this
    },
    proxyApi: {},
    setProxyApi (path) {
        if (process.env.NODE_ENV === 'development') {
            try {
                this.proxyApi = require(`${path}`)
            } catch (e) {
                console.error('setProxyApi catch e', e)
            }
        }
        return this
    },
    proxyList: {},
    setProxyList () {
        // console.log('setProxyList this.proxyApi', this.proxyApi)
        Object.keys(this.proxyApi).forEach((path) => {
            this.proxyList[`/${path}`] = {
                target: this.proxyApi[path],
                secure: false,
                pathRewrite: {
                    [`^/${path}`]: ''
                },
                changeOrigin: true
            }
        })
        return this
    },
    start () {
        return {
            baseUrl: './',
            publicPath: '',
            runtimeCompiler: true,
            lintOnSave: true,
            pages: {
                index: {
                    entry: 'src/main.js',
                    template: this.options.sgPage.template || 'public/index.html',
                    baseTitle: this.options.sgPage.baseTitle || 'ITTLR 管理平台',
                    title: this.options.sgPage.title || ''
                }
            },
            devServer: {
                open: true,
                host: '127.0.0.1',
                port: this.options.port || '8001',
                hot: true,
                proxy: {
                    '/prodApi': {
                        target: 'https://api.ittlr.com',
                        secure: false,
                        pathRewrite: {
                            '^/prodApi': ''
                        },
                        changeOrigin: true
                    },
                    ...this.proxyList
                },
                overlay: {
                    warnings: true,
                    errors: true
                },
                before: (app) => {
                    // console.log('config.js devServer.before', app)
                }
            },
            chainWebpack: (config) => {
                let chain = config.resolve.alias.set('@', this.resolve('src'))
                const alias = this.options.alias
                // console.log('chainWebpack', alias)
                if (alias && alias.constructor === Object) {
                    // console.log('alias star foreach', alias)
                    // console.log('alias star foreach before chain', chain)
                    Object.keys(alias).forEach((aliasPath) => {
                        chain = chain.set(`${aliasPath}`, `${alias[aliasPath]}`)
                    })
                    // console.log('alias star foreach after chain', chain)
                }
            },
            css: {
                loaderOptions: {}
            }
        }
    }
}
