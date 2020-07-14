/*
 * @Author: yaimeet
 * @Date: 2019-12-15 22:41:36
 * @Last Modified by:   yaimeet
 * @Last Modified time: 2019-09-26 22:41:36
 */
/**
 * 工具集装箱
 */
export { byteToFormat } from './byteToFormat'

export { requestLoading } from './requestLoading'

export { listToTree } from './listToTree'

/**
 * 格式化文件类型
 * @param name  文件名称
 * @returns {number}    0：没有后缀；1：视频；2：音频；3：图片；4：文档；5：其他文件
 */
export const fileTypeFormat = (name) => {
    if (name.includes('.')) {
        const nameArr = name.split('.')
        const ext = nameArr[nameArr.length - 1].toLowerCase()
        if (['wmv', 'flv', 'mp4', 'mpg', 'rmvb', 'avi'].includes(ext)) {
            return 1
        }
        if (['mp3', 'm3u8'].includes(ext)) {
            return 2
        }
        if (['jpg', 'png', 'gif', 'bmp', 'jpeg'].includes(ext)) {
            return 3
        }
        if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'et', 'pdf'].includes(ext)) {
            return 4
        }
        return 5
    }
    return 5
}
