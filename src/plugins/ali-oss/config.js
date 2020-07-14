/*
 * @Author: yaimeet
 * @Date: 2019-09-26 20:56:15
 * @Last Modified time: 2019-10-03 16:15:38
 */
import OSS from 'ali-oss'

export default class Config {
    aliConfig = {
        accessKeyId: '',
        accessKeySecret: '',
        // stsToken: '',
        bucket: '',
        // endpoint: '',
        region: '',
        // internal: false,
        // cname: false,
        // isRequestPay: false,
        secure: true,
        timeout: 60 * 1000 * 24
    }
    options = {
        prefix: '',
        onlyPath: '',
        fileUrl: ''
    }
    _file = null
    _OSS = OSS
    set file (file) {
        this._file = file
    }
    get file () {
        return this._file
    }
    client = null
    newClient = null
    prevClient = null
    constructor ({ aliConfig = {}, options = {} } = {}) {
        this.setAliConfig(aliConfig).setOptions(options).initAliOss()
    }
    initAliOss () {
        this.client = new OSS(this.aliConfig)
        return this
    }
    setAliOss (aliConfig = {}) {
        this.client = new OSS(aliConfig)
        return this
    }
    setAliConfig (aliConfig) {
        if (aliConfig && aliConfig.constructor === Object) {
            Object.keys(aliConfig).forEach((key) => {
                this.aliConfig[key] = aliConfig[key]
            })
        } else {
            console.warn('ali-oss config.js params aliConfig is not object')
        }
        return this
    }
    setOptions (options) {
        if (options && options.constructor === Object) {
            Object.keys(options).forEach((key) => {
                this.options[key] = options[key]
            })
        } else {
            console.warn('ali-oss config.js params options is not object')
        }
        return this
    }
    get fileName () {
        if (this.file && this.file.name) {
            return this.file.name
        }
        return ''
    }
    get fileNamePrefix () {
        if (this.fileName && this.fileName.includes('.')) {
            let nameArr = this.fileName.split('.')
            nameArr = nameArr.splice(nameArr.length - 1, 1)
            return nameArr.join('.')
        }
        return ''
    }
    get fileNameSuffix () {
        if (this.fileName && this.fileName.includes('.')) {
            const nameArr = this.fileName.split('.')
            return nameArr[nameArr.length - 1]
        }
        return ''
    }
    get filePath () {
        if (this.options.fileUrl) {
            return `${this.options.prefix}${this.options.fileUrl}`
        }
        const date = new Date()
        const datePath = `${date.getFullYear()}${(date.getMonth() + 1)}${date.getDate()}/`
        const timePath = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
        const fileName = `${timePath}${this.generateMixed(32)}.${this.fileNameSuffix}`
        return `${this.options.prefix}${this.options.onlyPath}${datePath}${fileName}`
    }
    generateMixed (n) {
        let chars = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
        let res = ''
        for (let i = 0; i < n; i++) {
            let id = Math.floor(Math.random() * 36)
            res += chars[id]
        }
        return res
    }
}
