/**
 * @author yaimeet
 * @date 2019/3/5
 * @Description
 */
// import ComponentContainer from './component-container/index'
// import ItDialogContainer from './it-dialog-container/index'
// const componentFileList = require.context('.', true, /\.vue$/)
// const componentInfo = {}
//
// componentFileList.keys().forEach((key) => {
//     if (key === 'mixins.js') {
//         return
//     }
//     const component = require(`${key}`).default
//     componentInfo[component.name] = component
// })
//
// export default {
//     ...componentInfo,
//     ItDialogContainer,
//     ComponentContainer
// }

import ComponentContainer from './component-container/index'
// 弹框
import ItDialogContainer from './it-dialog-container/index'
import ItDialogFooter from './it-dialog-footer/index'
// 侧弹框
import ItDrawerContainer from './it-drawer-container/index'
import ItBreadcrumb from './it-breadcrumb/index'
import ItCatalogTree from './it-catalog-tree/index'
import ItCatalogTreeForm from './it-catalog-tree-form/index'
import ItAddSearch from './it-add-search/index'
import ItListOperation from './it-list-operation/index'
import ItListTable from './it-list-table/index'
import ItPagination from './it-pagination/index'
import ItCardList from './it-card-list/index'
import ItNormalList from './it-normal-list/index'
import ItEditorMd from './it-editor-md/index.vue'
import ItProjectForm from './it-project-form/index'
import ItToggleProject from './it-toogle-project/index'
import ItSimpleDropdown from './it-simple-dropdown/index'

export default {
    ComponentContainer,
    ItBreadcrumb,
    ItDialogContainer,
    ItDialogFooter,
    ItCatalogTree,
    ItCatalogTreeForm,
    ItAddSearch,
    ItListOperation,
    ItListTable,
    ItDrawerContainer,
    ItPagination,
    ItCardList,
    ItNormalList,
    ItEditorMd,
    ItProjectForm,
    ItToggleProject,
    ItSimpleDropdown
}
