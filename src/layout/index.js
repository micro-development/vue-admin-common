/**
 * @author yaimeet
 * @date 2019/3/5
 * @Description
 */
// const fileList = require.context('.', false, /\.vue$/)
// const moduleInfo = {}
//
// fileList.keys().forEach((key) => {
//     if (key === 'mixins.js') {
//         return
//     }
//     // componentInfo[key] = componentFileList[key].default
//     const md = require(`${key}`).default
//     moduleInfo[md.name] = md
// })
//
// export default moduleInfo

import AsideNavbar from './aside-navbar'
import HeaderNavbar from './header-navbar'
import RootLayout from './root-layout'
import TwoLayout from './two-layout'

export default {
    'aside-navbar': AsideNavbar,
    'header-navbar': HeaderNavbar,
    'root-layout': RootLayout,
    'two-layout': TwoLayout
}
