<template>
    <!-- 基于 EditorMD 封装的 component -->
    <div class="it-editor-md" id='it-editor-md' v-if="refresh">
        <textarea style="display:none;"></textarea>
    </div>
</template>

<script>
    // import '../../../public/editor-md/css/editormd.css'
    // import $script from 'scriptjs'
    import uploadImage from './uploadImage'

    export default {
        name: 'it-editor-md',
        data () {
            return {
                refresh: true,
                $EditorMd: null,
                editorMd: null
            }
        },
        computed: {},
        props: {
            editorValue: {
                type: String,
                default: ''
            },
            /**
             * 初始化editor.md的参数，参考官方
             */
            optionList: {
                type: Object,
                default () {
                    return {}
                }
            },
            /**
             * 参考官方配置
             */
            lang: {
                type: Object,
                default () {
                    return {
                        // toolbar: {
                        //     file: '上传文件',
                        //     testIcon: '自定义按钮testIcon',
                        //     testIcon2: '自定义按钮testIcon2',
                        //     undo: '撤销 (Ctrl+Z)'
                        // }
                    }
                }
            },
            /**
             * 自定义按钮注册事件回调
             * 参考官方
             */
            toolbarHandlers: {
                type: Object,
                default () {
                    return {
                        // testIcon (cm, icon, cursor, selection) {
                        //     cm.replaceSelection('[' + selection + ':testIcon]')
                        //     if (selection === '') {
                        //         cm.setCursor(cursor.line, cursor.ch + 1)
                        //     }
                        //     console.log('testIcon =>', this, cm, icon, cursor, selection)
                        // },
                        // testIcon2 (cm, icon, cursor, selection) {
                        //     cm.replaceSelection('[' + selection + ':testIcon2](' + icon.html() + ')')
                        //     console.log('testIcon2 =>', this, icon.html())
                        // }
                    }
                }
            },
            /**
             * 使用HTML的当时自定义按钮，事件自定义绑定无效，不推荐使用
             */
            toolbarCustomIcons: {
                type: Object,
                default () {
                    return {
                        // file: `<input type="file" accept=".md" />`,
                        // faicon: `<i class="fa fa-star" onclick="alert('faicon');"></i>`
                    }
                }
            },
            /**
             * 通过 icon 自定义按钮
             * 参考官方
             */
            toolbarIconsClass: {
                type: Object,
                default () {
                    return {
                        // testIcon: 'fa-gears' // 指定一个FontAawsome的图标类
                    }
                }
            },
            /**
             * 通过 文本自定义按钮
             * 参考官方
             */
            toolbarIconTexts: {
                type: Object,
                default () {
                    return {
                        // testIcon2: '测试按钮' // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
                    }
                }
            },
            /**
             * 特殊配置
             */
            config: {
                type: Object,
                default () {
                    return {
                        /**
                         * 显示模块 优先级低 full, simple, mini
                         * 显示工具栏项 优先级高
                         */
                        toolbarMode: 'full',
                        toolbarShowList: [
                            // 'info',
                            // 'help'
                        ],
                        // 不要的工具项，会在上面显示中的进行过滤
                        toolbarHideList: [
                            // 'info',
                            // 'help'
                        ]
                    }
                }
            }
        },
        mounted () {
            // this.$log.echo({
            //     editormd: this.$EditorMd,
            //     $: window.$
            // }, 'mounted', 'log')
            // this.initEditorMd()
            this.initScriptSource()
            this.$log.echo(this.editorMd, 'mounted', 'util.js')
        },
        methods: {
            initScriptSource () {
                const $script = require('scriptjs')
                $script('https://source.ittlr.com/frontend/lib/editor.md/1.5.0/jquery.min.js', () => {
                    $script('https://source.ittlr.com/frontend/lib/editor.md/1.5.0/editormd.min.js', () => {
                        this.initEditorMd()
                    })
                })
            },
            initEditorMd () {
                this.$EditorMd = window.editormd
                // this.$log.echo(window.location, 'methods initEditorMd', 'log')
                // let projectPrefix = ''
                // if (window.location.pathname !== '/') {
                //     projectPrefix = `${process.env.VUE_APP_PROJECT_TYPE}/`
                // }
                this.editorMd = this.$EditorMd('it-editor-md', {
                    width: '100%',
                    height: 520,
                    value: this.editorValue || '',
                    toolbarIcons: () => {
                        return this.setToolbarList()
                    },
                    toolbarIconsClass: this.toolbarIconsClass || {},
                    toolbarIconTexts: this.toolbarIconTexts || {},
                    toolbarCustomIcons: this.toolbarCustomIcons || {},
                    toolbarHandlers: this.toolbarHandlers || {},
                    lang: this.lang || {},
                    onload: () => {
                        uploadImage(this.editorMd, {
                            customUpload: ({ file, files, event }) => {
                                this.$log.echo({
                                    file,
                                    files,
                                    event
                                }, 'editorMd onload uploadImage customUpload', 'log')
                            }
                        })
                    },
                    ...(this.optionList || {}),
                    path: 'https://source.ittlr.com/frontend/lib/editor.md/1.5.0/lib/'
                })
                // this.$log.echo(this.editorMd, 'mounted', 'log')
            },
            setToolbarList () {
                // this.$log.echo(window.editormd.toolbarModes, 'toolbarIcons window.editormd.toolbarModes', 'log')
                let result = []
                if (['full', 'simple', 'mini'].includes(this.config.toolbarMode)) {
                    result = this.$EditorMd.toolbarModes[this.config.toolbarMode]
                }
                if (Array.isArray(this.config.toolbarShowList) && this.config.toolbarShowList.length) {
                    result = this.config.toolbarShowList
                }
                if (Array.isArray(this.config.toolbarHideList) && this.config.toolbarHideList.length) {
                    this.config.toolbarHideList.forEach((toolbar) => {
                        const index = result.indexOf(toolbar)
                        if (index !== -1) {
                            result.splice(index, 1)
                        }
                    })
                }
                result = Array.from(new Set(result))
                const customToolbarIconList = Object.keys(this.toolbarIconsClass)
                const customToolbarIconText = Object.keys(this.toolbarIconTexts)
                const customToolbarCustomIconList = Object.keys(this.toolbarCustomIcons)
                if (customToolbarIconList.length || customToolbarIconText.length || customToolbarCustomIconList.length) {
                    result.push('||')
                }
                result = result
                    .concat(customToolbarIconList)
                    .concat(customToolbarIconText)
                    .concat(customToolbarCustomIconList)
                // 去重 主要是为了去除默认带的 竖线 “|”
                // this.$log.echo(Array.from(new Set(result)), 'toolbarIcons new Set(result)', 'log')
                // this.$log.echo(result, 'toolbarIcons result', 'log')
                return result
            },
            reload () {
                this.refresh = false
                this.refresh = true
            }
        }
    }
</script>

<style lang="less">
    @import 'https://source.ittlr.com/frontend/lib/editor.md/1.5.0/css/editormd.css';
    .it-editor-md {
        width: 100%;
    }
</style>
