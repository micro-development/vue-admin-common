/**
 * create on   2019-10-06 18:25
 * @author     yaimeet
 */
import Config from './config'

export default class AliOss extends Config {
    /**
     * 获取签名授权
     * @param objectName 文件路径
     * @returns {*}
     */
    getFileUrl (objectName) {
        // 获取文件url
        const url = this.client.signatureUrl(objectName, {
            // 单位秒
            // 1 * 60 * 60 * 24 * 365 * 100 一百年
            process: 'image/auto-orient,1/resize,m_fixed,w_1600,h_600/quality,q_90/bright,1/sharpen,122',
            expires: 10
        })
        return url
    }

    /**
     * 断点续传方式 上传
     * @param options   官方支持的参数
     * @returns {Promise<any>}
     */
    multipartUpload (options = {}) {
        return new Promise((resolve, reject) => {
            this.client.multipartUpload(this.filePath, this.file, options).then((result) => {
                if (result.res.statusCode === 200) {
                    resolve({
                        objectName: result.name,
                        bucket: result.bucket
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }

    /**
     * 取消/暂停 上传
     */
    cancelUpload () {
        this.newClient = new this._OSS(this.aliConfig)
        if (this.prevClient) {
            this.prevClient.cancel()
        } else {
            this.client.cancel()
        }
    }

    /**
     * 重新上传
     * @param checkpoint 上一次上传保存的断点信息
     * @param opts  上一次上传时的参数
     * @returns {Promise<any>}
     */
    resumeUpload (checkpoint, opts = {}) {
        return new Promise((resolve, reject) => {
            this.prevClient = this.newClient
            this.newClient.multipartUpload(this.filePath, this.file, {
                checkpoint,
                ...opts
            }).then((result) => {
                if (result.res.statusCode === 200) {
                    resolve({
                        objectName: result.name,
                        bucket: result.bucket
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }

    /**
     * 获取文件列表
     * @param opts  官方支持的参数
     * @returns {Promise<*>}
     */
    async list (opts = {}) {
        const result = await this.client.list(opts)
        if (result.res.status === 200) {
            return {
                objectList: result.objects,
                dirList: result.prefixes
            }
        }
        console.log('ali-oss.js list : result', result)
        return false
    }

    /**
     * 检测文件是否存在
     * @param objectName    文件路径
     * @returns {Promise<boolean>}
     */
    async checkObject (objectName) {
        const result = await this.client.get(objectName)
        if (result.res.status === 200) {
            return true
        }
        return false
    }

    /**
     * 删除文件
     * @param objectName    文件名或路径
     * @returns {Promise<void>}
     */
    async deleteObject (objectName) {
        const result = await this.client.delete(objectName)
        if (result.res.status === 200) {
            return true
        }
        return false
    }

    /**
     * 批量删除
     * @param objectList 需要删除的文件数组
     * @returns {Promise<boolean>}
     */
    async deleteMulti (objectList = []) {
        const result = await this.client.deleteMulti(objectList, {
            quiet: true
        })
        if (result.res.status === 200) {
            return true
        }
        return false
    }

    /**
     * put 方式上传，多功能如下：
     *      file:
     *          当时一个文件时，代表上传文件
     *          否则：file就需要为 Buffer
     *      objectName:
     *          当以斜杠结尾时，创建目录
     *          当不是斜杠结尾时，以 objectName 为名字创建文件，文件写入内容为：file，重复时，覆盖文件内容
     * @returns {Promise<boolean>}
     */
    async put (objectName, file) {
        let result = await this.client.put(objectName || this.filePath, file || this.file)
        if (result.res.status === 200) {
            return {
                objectName: result.name,
                objectUrl: result.url
            }
        }
        return false
    }

    /**
     * 普通方式使用put上传
     * @param objectName   自定义文件路径
     * @returns {Promise<boolean>}
     */
    async normalUpload (objectName) {
        const normalResult = await this.put(objectName)
        return normalResult
    }

    /**
     * 创建目录
     * @param filePath  目录路径，必须斜杠结尾
     */
    async createDir (filePath, text) {
        if (filePath[filePath.length - 1] !== '/') {
            console.error('目录必须以斜杠 "/" 结尾')
            return false
        }
        const bufferInfo = Buffer.from(text || filePath)
        const result = await this.put(filePath, bufferInfo)
        return result
    }

    /**
     * 创建文件
     * @param filePath  文件名称，不能以斜杠结尾
     * @param content   文件内容
     * @returns {Promise<void>}
     */
    async createFile (filePath, content) {
        if (filePath[filePath.length - 1] === '/') {
            console.error('文件不能以斜杠 "/" 结尾')
            return false
        }
        const bufferInfo = Buffer.from(content || '')
        const result = await this.put(filePath, bufferInfo)
        return result
    }
}
