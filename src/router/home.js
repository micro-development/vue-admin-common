const testRoutes = []
const testRoutes2 = []

for (let i = 1; i < 10; i++) {
    testRoutes.push({
        path: `test-${i}`,
        name: `菜单-${i}`,
        component: () => {
            return import('../views/dashboard.vue')
        }
    })
    testRoutes2.push({
        path: `test-${i * 10}`,
        name: `菜单-${i * 10}`,
        component: () => {
            return import('../views/dashboard.vue')
        }
    })
}

export default {
    path: '/home',
    name: '首页',
    redirect: '/home/dashboard',
    meta: {
        hideNav: true,
        project: {
            type: 3
        }
    },
    component: () => {
        return import('../layout/root-layout.vue')
    },
    children: [
        {
            path: 'dashboard',
            name: '控制中心',
            meta: {
                iconClass: 'el-icon-goods'
            },
            component: () => {
                return import('../views/dashboard.vue')
            }
        },
        {
            path: 'test',
            name: '测试菜单',
            meta: {
                iconClass: 'el-icon-help'
            },
            component: () => {
                return import('../views/dashboard.vue')
            },
            children: testRoutes
        },
        {
            path: 'test2',
            name: '测试菜单2',
            meta: {
                iconClass: 'el-icon-picture-outline-round'
            },
            component: () => {
                return import('../views/dashboard.vue')
            },
            children: testRoutes2
        }
    ]
}
