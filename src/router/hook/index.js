import beforeEach from './beforeEach'
import afterEach from './afterEach'

export default function (router, store) {
    router.beforeEach((to, from, next) => {
        beforeEach({ to, from, next, store })
    })
    router.afterEach((to, from) => {
        afterEach(to, from, store)
    })
}
