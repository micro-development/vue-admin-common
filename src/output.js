/**
 * create on   2019-11-03 10:24
 * @author     yaimeet
 */
import {
    router,
    routerHooks
} from './router/index'

import components from './components/index'

import store from './store/index'

const moduleFileList = [
    'filters',
    'directives',
    'plugins',
    'mixins',
    'layout'
]
const moduleInfo = {}

moduleFileList.forEach((key) => {
    const md = require(`./${key}/index.js`)
    moduleInfo[key] = md.default
})

export {
    store,
    router,
    routerHooks,
    moduleInfo,
    components
}
