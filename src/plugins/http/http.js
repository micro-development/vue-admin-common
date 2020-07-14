/*
 * @Author: yaimeet
 * @Date: 2019-09-26 20:16:02
 * @Last Modified time: 2019-10-03 16:25:35
 */

import Config from './config'
// import qs from 'qs'

export default class Http extends Config {
    /**
     * ajax post 增量更新
     * @param {string} url 请求URL
     * @param {object} data 请求的参数
     * @param {object} options 请求拓展参数
     */
    async post (url, data, options) {
        const result = await this.fetch({
            url,
            method: 'post',
            data
        }, options)
        return result
    }

    /**
     * ajax get
     * @param {string} url 请求URL
     * @param {object} data 请求的参数
     * @param {object} options 请求拓展参数
     */
    async get (url, data, options) {
        const result = await this.fetch({
            url,
            method: 'get',
            data
        }, options)
        return result
    }

    /**
     * ajax patch 全量更新
     * @param {string} url 请求URL
     * @param {object} data 请求的参数
     * @param {object} options 请求拓展参数
     */
    async put (url, data, options) {
        const result = await this.fetch({
            url,
            method: 'put',
            data
        }, options)
        return result
    }

    /**
     * ajax patch 增量更新
     * @param {string} url 请求URL
     * @param {object} data 请求的参数
     * @param {object} options 请求拓展参数
     */
    async patch (url, data, options) {
        const result = await this.fetch({
            url,
            method: 'patch',
            data
        }, options)
        return result
    }

    /**
     * ajax delete
     * @param {string} url 请求URL
     * @param {object} data 请求的参数
     * @param {object} options 请求拓展参数
     */
    async delete (url, data, options) {
        const result = await this.fetch({
            url,
            method: 'delete',
            data
        }, options)
        return result
    }

    /**
     * 统一请求入口
     * @param {object} param0 http config
     * @param {object} options http extend
     */
    async fetch ({ method, url, data } = {}, options = {}) {
        const paramKey = method === 'get' ? 'params' : 'data'
        const response = await this.axios({
            method,
            url: `${this.proxyPath}${url}`,
            [`${paramKey}`]: data,
            ...options
        })
        return this.formatData(response)
    }

    /**
     * 格式化响应的参数
     * @param {object} response
     */
    async formatData (response) {
        if (response.status === 200) {
            const result = response.data
            if (this.isConfig) {
                if (result[this.config.codeField] === this.config.successCodeValue) {
                    if (this.config.dataField && result[this.config.dataField]) {
                        const data = result[this.config.dataField]
                        data.code = result[this.config.codeField]
                        data.msg = result[this.config.msgField]
                        return data
                    }
                    return result
                }
                if (result[this.config.msgField]) {
                    this.config.apiErrorCallback(result[this.config.codeField], result[this.config.msgField], result)
                }
            } else {
                return result
            }
        } else {
            // console.log('response', typeof response, Object.keys(response), response.response)
            const resp = response.response
            this.config.networkErrorCallback(resp.status, resp.statusText, resp)
        }
    }
}
