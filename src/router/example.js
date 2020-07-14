export default {
    path: '/example',
    name: '组件示例',
    redirect: '/example/element-ui/default',
    meta: {
        // project: {
        //     type: 1
        // }
        // hideNav: true
    },
    component: () => {
        return import('../layout/root-layout.vue')
    },
    children: [
        {
            path: 'element-ui',
            name: 'ElementUI组件',
            redirect: '/example/element-ui/default',
            meta: {
                iconClass: 'el-icon-s-operation'
            },
            component: () => {
                return import('../layout/two-layout.vue')
            },
            children: [
                {
                    path: 'default',
                    name: '组件容器',
                    meta: {
                        iconClass: 'el-icon-full-screen'
                    },
                    component: () => {
                        return import('../views/element-ui/default.vue')
                    }
                },
                {
                    path: 'catalog-tree',
                    name: '目录树',
                    meta: {
                        iconClass: 'el-icon-coin'
                    },
                    component: () => {
                        return import('../views/element-ui/it-catalog-tree.vue')
                    }
                },
                {
                    path: 'add-search',
                    name: '添加搜索',
                    meta: {
                        iconClass: 'el-icon-position'
                    },
                    component: () => {
                        return import('../views/element-ui/it-add-search.vue')
                    }
                },
                {
                    path: 'it-pagination',
                    name: '分页',
                    meta: {
                        iconClass: 'el-icon-set-up'
                    },
                    component: () => {
                        return import('../views/element-ui/it-pagination.vue')
                    }
                },
                {
                    path: 'dialog-container',
                    name: 'Dialog弹框',
                    meta: {
                        iconClass: 'el-icon-copy-document'
                    },
                    component: () => {
                        return import('../views/element-ui/it-dialog-container.vue')
                    }
                },
                {
                    path: 'dialog-frame',
                    name: 'frame弹框',
                    meta: {
                        iconClass: 'el-icon-copy-document'
                    },
                    component: () => {
                        return import('../views/element-ui/it-dialog-frame.vue')
                    }
                },
                {
                    path: 'project-form',
                    name: '项目表单弹框',
                    meta: {
                        iconClass: 'el-icon-copy-document'
                    },
                    component: () => {
                        return import('../views/element-ui/it-project-form.vue')
                    }
                },
                {
                    path: 'drawer-container',
                    name: '侧弹框',
                    meta: {
                        iconClass: 'el-icon-copy-document'
                    },
                    component: () => {
                        return import('../views/element-ui/it-drawer-container.vue')
                    }
                },
                {
                    path: 'card-list',
                    name: '卡片式列表',
                    meta: {
                        iconClass: 'el-icon-postcard'
                    },
                    component: () => {
                        return import('../views/element-ui/it-card-list.vue')
                    }
                },
                {
                    path: 'normal-list',
                    name: '普通式列表',
                    meta: {
                        iconClass: 'el-icon-s-order'
                    },
                    component: () => {
                        return import('../views/element-ui/it-normal-list.vue')
                    }
                },
                {
                    path: 'simple-dropdown',
                    name: '小巧的下拉选项',
                    meta: {
                        iconClass: 'el-icon-s-order'
                    },
                    component: () => {
                        return import('../views/element-ui/it-simple-dropdown.vue')
                    }
                }
            ]
        },
        {
            path: 'ali',
            name: '阿里云',
            meta: {
                iconClass: 'el-icon-cloudy'
            },
            component: () => {
                return import('../layout/two-layout.vue')
            },
            children: [
                {
                    path: 'oss',
                    name: 'OSS上传参数',
                    meta: {
                        iconClass: 'el-icon-s-data'
                    },
                    component: () => {
                        return import('../views/ali/it-ali-oss.vue')
                    }
                },
                {
                    path: 'oss-batch',
                    name: 'OSS批量上传',
                    meta: {
                        iconClass: 'el-icon-s-data'
                    },
                    component: () => {
                        return import('../views/ali/it-ali-oss-batch.vue')
                    }
                },
                {
                    path: 'vod',
                    name: '视频点播',
                    meta: {
                        iconClass: 'el-icon-video-camera-solid'
                    },
                    component: () => {
                        return import('../views/ali/it-ali-vod.vue')
                    }
                },
                {
                    path: 'file',
                    name: '文件预览',
                    meta: {
                        iconClass: 'el-icon-zoom-in'
                    },
                    component: () => {
                        return import('../views/ali/it-ali-file.vue')
                    }
                }
            ]
        },
        {
            path: 'editor',
            name: '编辑器',
            meta: {
                iconClass: 'el-icon-edit-outline'
            },
            component: () => {
                return import('../layout/two-layout.vue')
            },
            children: [
                {
                    path: 'editor-md',
                    name: 'EditorMD',
                    meta: {
                        iconClass: 'el-icon-edit'
                    },
                    component: () => {
                        return import('../views/editor/it-editor-md.vue')
                    }
                }
            ]
        }
    ]
}
