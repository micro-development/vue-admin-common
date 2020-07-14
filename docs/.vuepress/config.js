module.exports = {
    title: 'ItAdminCommon',
    description: '相关使用文档',
    dest: './dist/',
    port: '3001',
    themeConfig: {
        smoothScroll: true,
        editLinks: true,
        editLinkText: '来一起改善此页面！',
        repo: 'https://code.aliyun.com/ittlr/ittlr-admin-common.git',
        lastUpdated: '最后更新时间',
        nav: [
            // {
            //     text: new Date().getTime(),
            //     link: '/login'
            // },
            {
                text: '组件',
                link: '/component/'
            },
            {
                text: '插件',
                link: '/plugin/'
            },
            {
                text: '指令',
                link: '/directive/'
            },
            {
                text: '过滤器',
                link: '/filter/'
            }
        ],
        sidebar: 'auto'
    }
}
