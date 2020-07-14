import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import './register'
import App from './App.vue'

import {
    store,
    router,
    routerHooks
} from './output'
routerHooks(router, store)

Sentry.init({
    dsn: 'https://e60f7b04761c4eb1b370fb3599430bc0@sentry.io/1867162',
    integrations: [new Integrations.Vue({
        Vue,
        attachProps: true
    })],
    logErrors: true
})
// console.log('test')
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => {
        return h(App)
    },
    methods: {}
}).$mount('#app')
