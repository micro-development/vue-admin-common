/**
 * create on   2019-12-15 09:39
 * @author     yaimeet
 */
/**
 * 字节格式化单位
 * @param bytes 字节大小，单位 B
 * @returns {string}    返回后的格式化
 */
export const byteToFormat = (bytes) => {
    if (bytes === 0) {
        return '0 B'
    }
    let k = 1024
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
