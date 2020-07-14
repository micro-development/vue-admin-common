/**
 * @author yaimeet
 * @date 2019/3/3
 * @Description
 */
import storejs from 'storejs'
import { cacheKeyPrefix } from '../configs/system'
const tokenKey = `${cacheKeyPrefix}token`
const userinfoKey = `${cacheKeyPrefix}userinfo`
const routesKey = `${cacheKeyPrefix}routes`
export default {
    state: {
        token: storejs.get(tokenKey) || '',
        userinfo: storejs.get(userinfoKey) || {},
        project_type: process.env.VUE_APP_PROJECT_TYPE || '',
        envInfo: {
            isLocal: process.env.NODE_ENV === 'development',
            isTest: process.env.NODE_ENV === 'test',
            isProd: process.env.NODE_ENV === 'production'
        },
        projectInfo: {
            common: {
                title: '公共模块',
                openLocalCallback: 'http://localhost:8101/common'
            },
            basic: {
                title: '底层模块'
            },
            ci: {
                title: 'CI自动化部署'
            },
            info: {
                title: '个人信息'
            }
        },
        layoutSize: 'small',
        colorInfo: {
            primary: '#409EFF',
            success: '#67C23A',
            warning: '#E6A23C',
            danger: '#F56C6C',
            info: '#909399'
        },
        project: {
            /**
             * true 不显示项目操作
             */
            hide: false,
            /**
             * 当前系统支持项目的模块
             */
            allow: {
                1: 'WRITE',
                2: 'CI',
                3: 'INFO'
            },
            /**
             * 搜索框过滤文本
             */
            filterValue: '',
            // 头部下拉框选择的项目
            item: {},
            /**
             * 项目列表
             */
            list: []
        },
        routes: []
    },
    mutations: {
        setAccount: (state, { token, userinfo } = {}) => {
            storejs.set(tokenKey, token)
            storejs.set(userinfoKey, userinfo)
            state.token = token
            state.userinfo = userinfo
        },
        setToken: (state, token) => {
            storejs.set(tokenKey, token)
            state.token = token
        },
        setUserInfo: (state, userinfo) => {
            storejs.set(userinfoKey, userinfo)
            state.userinfo = userinfo
        },
        clearAccount: (state) => {
            storejs.remove(tokenKey)
            storejs.remove(userinfoKey)
            state.token = ''
            state.userinfo = {}
        },
        setRoutes: (state, routes) => {
            storejs.set(routesKey, routes)
            state.routes = routes
        },
        setProject: (state, list) => {
            state.project.list = list
        },
        setProjectFilter: (state, filterValue) => {
            state.project.filterValue = filterValue
        },
        setCurrentProject: (state, item) => {
            // console.log('mutation setCurrentProject')
            state.project.item = item
        },
        setProjectStatus: (state, type) => {
            state.project.hide = type
        }
    },
    actions: {
        async setAccount ({ commit }, opts) {
            commit('setAccount', opts)
        },
        async setToken ({ commit }, opts) {
            commit('setToken', opts)
        },
        async setUserInfo ({ commit }, opts) {
            commit('setUserInfo', opts)
        },
        async clearAccount ({ commit }) {
            commit('clearAccount')
        },
        async setRoutes ({ commit }, routes) {
            commit('setRoutes', routes)
        },
        async setCurrentProject ({ commit }, item) {
            commit('setCurrentProject', item)
        },
        async setProject ({ commit, state }, { projectInfo, $http, init }) {
            console.log({
                projectInfo,
                $http
            }, 'vuex/global actions setProject')
            if (!state.project.allow[projectInfo.type]) {
                console.warn(`项目类型 【${projectInfo.type}】 暂时不支持`)
                commit('setProjectStatus', true)
            } else {
                commit('setProjectStatus', false)
                // console.log($http, 'vuex/global actions setProject $http')
                let basePrefix = ''
                if (projectInfo.type === 1) {
                    basePrefix = 'write'
                }
                if (projectInfo.type === 2) {
                    basePrefix = 'ci'
                }
                if (projectInfo.type === 3) {
                    basePrefix = 'info'
                }
                const data = await $http.fetch({
                    method: 'get',
                    url: `/${basePrefix}/project/list`
                })
                // console.log(data, 'vuex/global actions setProject data')
                if (data) {
                    commit('setProject', data.list)
                    // console.log(data.list, 'vuex/global commit setProject data')
                    if (init === true && data.list.length) {
                        commit('setCurrentProject', data.list[0])
                        // console.log(data.list[0], 'vuex/global commit setCurrentProject data')
                        // commit('setProjectFilter', data.list[0].name)
                    }
                }
            }
        },
        async setProjectFilter ({ commit }, filterValue) {
            // console.log(filterValue, 'vuex/global actions setProjectFilter filterValue')
            commit('setProjectFilter', filterValue)
        }
    },
    getters: {
        getToken: (state) => {
            return state.token
        },
        getUserinfo: (state) => {
            return state.userinfo
        },
        getRoutes: (state) => {
            return state.routes
        },
        getProjectType: (state) => {
            return state.project_type
        },
        getProjectList: (state) => {
            if (!state.project.filterValue) {
                return state.project.list
            }
            return state.project.list.filter((item) => {
                item.name.includes(state.project.filterValue)
            })
        }
    }
}
