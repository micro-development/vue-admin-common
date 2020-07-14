import {
    moduleInfo
} from '../output'
import {
    codeField,
    msgField,
    dataField,
    successCodeValue,
    errorCodeValue,
    proxyPath,
    apiErrorCallback,
    networkErrorCallback,
    requestInterceptorsReslove,
    responseInterceptorsReslove,
    responseInterceptorsReject
} from './api'

export default {
    Util: {
        plugin: moduleInfo.plugins.Util,
        options: () => {
            return true
        }
    },
    log: {
        plugin: moduleInfo.plugins.Log,
        options: () => {
            return true
        }
    },
    http: {
        plugin: moduleInfo.plugins.Http,
        options: {
            httpConfig: {
                codeField,
                msgField,
                dataField,
                successCodeValue,
                errorCodeValue,
                proxyPath,
                apiErrorCallback,
                networkErrorCallback
            },
            requestInterceptorsReslove,
            // 当 HTTP 原始状态码  === 200 时，进入这里
            responseInterceptorsReslove,
            // 当 HTTP 原始状态码  !== 200 时，进入这里
            responseInterceptorsReject
        }
    }
    // aliOss: {
    //     plugin: moduleInfo.plugins.AliOss,
    //     options: {
    //         aliConfig: {
    //             accessKeyId: process.env.VUE_APP_ALI_ACCESS_KEY_ID,
    //             accessKeySecret: process.env.VUE_APP_ALI_ACCESS_KEY_SECRET,
    //             bucket: process.env.VUE_APP_ALI_BUCKET,
    //             region: process.env.VUE_APP_ALI_REGION,
    //             endpoint: process.env.VUE_APP_ALI_ENDPOINT,
    //             cname: true,
    //             secure: true
    //         },
    //         options: {
    //             prefix: 'ittlr/'
    //         }
    //     }
    // }
}
