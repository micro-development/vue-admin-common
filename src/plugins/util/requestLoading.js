import { Loading } from 'element-ui'

export const requestLoading = {
    loadingInstance: null,
    show () {
        this.loadingInstance = Loading.service({
            fullscreen: true,
            body: true,
            lock: true,
            background: 'rgba(0,0,0,.85)',
            text: '光速传输中呢...'
        })
    },
    hide () {
        if (this.loadingInstance) {
            this.loadingInstance.close()
        }
    }
}
