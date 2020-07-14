const baseUrl = '/account'
export const login = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/login`,
        data,
        opts
    }
}

export const loginWechatConnect = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/wechatConnect/login`,
        data,
        opts
    }
}

export const loginTencentConnect = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/tencentConnect/login`,
        data,
        opts
    }
}
export const sendMobileCodeByRegister = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/sendMobileCodeByRegister`,
        data,
        opts
    }
}

export const sendEmailCodeByRegister = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/sendEmailCodeByRegister`,
        data,
        opts
    }
}

export const register = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/register`,
        data,
        opts
    }
}
