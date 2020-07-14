/*
 * @Author: yaimeet
 * @Date: 2019-09-26 22:41:36
 * @Last Modified by:   yaimeet
 * @Last Modified time: 2019-09-26 22:41:36
 */

/**
 * 封装打印日志调试方法
 */
export default class Log {
    /**
     * 输出日志
     * @param {any} data 需要打印的数据
     * @param {string} msg 日志分割文案
     * @param {string} logType console对象支持的属性
     */
    echo (data, msg, logType) {
        if (!msg || typeof msg !== 'string') {
            return
        }
        if (!window.console[logType]) {
            return
        }
        window.console.info(`${msg} <======> start`)
        window.console[logType](data)
        window.console.info(`${msg} <======> end`)
    }
}
