/**
 * @author yaimeet
 * @date 2019/3/5
 * @Description
 */
// const moduleList = require.context('.', true, /mixins.js/)
// const moduleInfo = {}
//
// moduleList.keys().forEach((key) => {
//     if (key === './mixins.js') {
//         return
//     }
//     // componentInfo[key] = componentFileList[key].default
//     const k = key.split('/')[1]
//     const md = require(`${key}`).default
//     moduleInfo[k] = md
// })
// export default moduleInfo

import AliOss from './ali-oss/index'
import Http from './http/index'
import Log from './log/index'
import Util from './util/index'

export default {
    AliOss,
    Http,
    Log,
    Util
}
