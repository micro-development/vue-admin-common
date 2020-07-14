const baseUrl = '/account'
export const login = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/getList`,
        data,
        opts
    }
}
