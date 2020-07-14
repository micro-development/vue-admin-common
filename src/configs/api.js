/**
 * @author yaimeet
 * @date 2019/10/3
 * @Description http.js config
 */
import { Message, Loading } from 'element-ui'
import store from '../store/index'
import { router } from '../output'

let loadingInstance = null

/**
 *  接口返回的消息字段名
 * @type {string}
 */
export const msgField = 'msg'

/**
 * 接口返回的状态字段名
 * @type {string}
 */
export const codeField = 'code'

/**
 * 接口返回存储数据的字段名
 * @type {string}
 */
export const dataField = 'data'

/**
 * 反向代理接口的虚拟路径 or ApiBasePath
 * // process.env.VUE_APP_API_ROOT_PATH
 * @type {string}
 */
export const proxyPath = `${process.env.VUE_APP_API_ROOT_PATH}/aiApi`

/**
 * 接口返回的状态成功值
 * @type {number}
 */
export const successCodeValue = 0

/**
 * 接口返回的状态失败值
 * @type {number}
 */
export const errorCodeValue = 1

/**
 * 接口请求成功，但返回不等于成功时的回调
 * @param code 错误码
 * @param msg  错误消息
 */
export const apiErrorCallback = (code, msg) => {
    // console.error(`${code} : ${msg}`)
    Message.error(`${code} : ${msg}`)
}

/**
 * 接口请求异常回调 意思是 HTTP 请求不是200时的回调
 * @param status HTTP状态码
 * @param statusText HTTP状态消息
 */
export const networkErrorCallback = async (status, statusText, response) => {
    // console.error(`${status} : ${statusText}`, '服务器异常')
    console.log('networkErrorCallback response', response)
    const errorCode = response.headers['error-code'] || ''
    const errorMsg = response.headers['error-msg'] ? decodeURI(response.headers['error-msg']) : ''
    console.log('errorMsg', errorMsg)
    const code = errorCode || status
    const text = errorMsg || statusText
    Message.error(`${code} : ${text}`)
    if ([401, 403].includes(status)) {
        await store.dispatch('clearAccount')
        router.push({
            path: '/login'
        })
    }
}

/**
 * 请求拦截器配置
 * @param config  axios的请求配置信息
 * @returns {*} object
 */
export const requestInterceptorsReslove = (config) => {
    // console.log('requestInterceptorsReslove', store)
    loadingInstance = Loading.service({
        fullscreen: true,
        body: true,
        lock: true,
        background: 'rgba(0,0,0,.85)',
        text: '光速传输中呢...'
    })
    if (store.getters.getToken) {
        config.headers['Auth-Token'] = store.getters.getToken
    }
    return config
}

/**
 * 响应成功拦截器配置
 * @param {object} res
 */
export const responseInterceptorsReslove = (res) => {
    loadingInstance.close()
    return res
}

/**
 * 响应错误拦截器配置
 * @param {object} res
 */
export const responseInterceptorsReject = (err) => {
    loadingInstance.close()
    // console.log('responseInterceptorsReject', err)
    const statusCode = err.response.status
    const statusText = err.response.statusText
    console.warn(`${statusCode} : ${statusText}`)
    // console.log(res.request)
    // console.log(res.config)
    return err
}
