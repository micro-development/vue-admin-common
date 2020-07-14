/**
 * @author yaimeet
 * @date 2019/3/4
 * @Description
 */

// const moduleList = require.context('.', false, /\.js/)
// const moduleInfo = {}
// moduleList.keys().forEach((key) => {
//     if (key === './mixins.js') {
//         return
//     }
//     const k = key.split('/')[1].split('.')[0]
//     const md = require(`${key}`)
//     moduleInfo[k] = md.default || md
// })
// export default moduleInfo

import autofocus from './autofocus'

export default {
    autofocus
}
