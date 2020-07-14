export default ({ to, from, next, store } = {}) => {
    const noAuthList = [
        '/login',
        '/register'
    ]
    if (!store.getters.getToken) {
        if (!noAuthList.includes(to.path)) {
            next('/login')
            return
        }
    }
    if (store.getters.getToken) {
        if (!noAuthList.includes(to.path)) {
            if (!store.getters.getUserinfo.user_name && to.path !== '/account/user') {
                next('/account/user')
                return
            }
        }
    }
    // if (to.path === '/login' && store.getters.getToken && store.getters.getUserinfo) {
    //     next('/home')
    //     return
    // }
    next()
}
