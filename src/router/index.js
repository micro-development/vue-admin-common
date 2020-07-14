import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import routerHooks from './hook/index'
import store from '../store/index'
Vue.use(Router)

// console.log('store from admin common', store)
// console.log('routes from admin common', routes)
// console.log('common init vuex routes', routes)
store.dispatch('setRoutes', routes)

const router = new Router({
    // mode: 'history',
    // base: '/',
    routes: [
        {
            path: '/',
            name: '根',
            redirect: '/home',
            meta: {
                hideNav: true
            }
        },
        {
            path: '/login',
            name: '登录',
            meta: {
                hideNav: true
            },
            component: () => {
                return import('../views/login.vue')
            }
        },
        {
            path: '/register',
            name: '注册',
            meta: {
                hideNav: true
            },
            component: () => {
                return import('../views/register.vue')
            }
        },
        ...routes
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

export {
    router,
    routerHooks
}
