<template>
    <component-container>
        <div slot='content'>
            <h1>这是 editor-md 示例</h1>
            <el-row class="toggle-editor-md">
                <el-button @click="onToggleMode('full')" size="small" type="default">full</el-button>
                <el-button @click="onToggleMode('simple')" size="small" type="default">simple</el-button>
                <el-button @click="onToggleMode('mini')" size="small" type="default">mini</el-button>
                <el-button @click="onAddTextToolbar" size="small" type="primary">增加文字按钮(推荐)</el-button>
                <el-button @click="onAddIconToolbar" size="small" type="success">增加图标按钮(推荐)</el-button>
                <el-button @click="onAddCustomToolbar" size="small" type="danger">通过HTML自定义增加按钮(不推荐)</el-button>
                <el-button @click="onUpdateOption" size="small" type="success">动态更新参数</el-button>
                <el-button @click="onUpdateValue" size="small" type="primary">动态更新文本值</el-button>
            </el-row>
            <it-editor-md
                :toolbar-handlers="toolbarHandlers"
                :toolbar-icon-texts="toolbarIconTexts"
                :toolbar-icons-class="toolbarIconsClass"
                :toolbar-custom-icons="toolbarCustomIcons"
                :config="config"
                :option-list="optionList"
                :editor-value="defaultValue"
                ref='itEditorMd'>fdfdf</it-editor-md>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-editor-md',
        data () {
            return {
                defaultValue: '> this is default value',
                optionList: {},
                config: {
                    toolbarMode: 'mini'
                },
                // 对下面 toolbarIconTexts 和 toolbarIconsClass 中自定义的按钮绑定事件回调
                // 格式：key 的名称一一对应
                toolbarHandlers: {},
                // 通过 icon 图标定义 例如：指定一个FontAawsome的图标类 fa-gears
                toolbarIconsClass: {},
                // 通过文字定义
                toolbarIconTexts: {},
                // 通过HTML定义，这种形式的事件直接在HTML中绑定，不建议使用
                toolbarCustomIcons: {}
            }
        },
        methods: {
            onToggleMode (mode) {
                // this.$log.echo(this.$refs.itEditorMd.editorMd, 'onToggleMode this.$refs.itEditorMd.editorMd', 'log')
                this.config.toolbarMode = mode
                this.$refs.itEditorMd.editorMd.setToolbar()
            },

            /**
             * 增加自定义文字测试按钮
             */
            onAddTextToolbar () {
                this.toolbarIconTexts.testTextBtn = '测试文字按钮'
                this.toolbarHandlers.testTextBtn = (cm, icon, cursor, selection) => {
                    console.log('onAddTextToolbar testTextBtn')
                    cm.replaceSelection('[' + selection + ':testTextBtn](' + icon.html() + ')')
                    //     console.log('testIcon2 =>', this, icon.html())
                }
                this.$refs.itEditorMd.initEditorMd()
            },

            /**
             * 增加自定义图标测试按钮
             */
            onAddIconToolbar () {
                this.toolbarIconsClass.tesIconBtn = 'fa-gears'
                this.toolbarHandlers.tesIconBtn = (cm, icon, cursor, selection) => {
                    console.log('onAddIconToolbar tesIconBtn')
                    cm.replaceSelection('[' + selection + ':tesIconBtn](' + icon.html() + ')')
                }
                this.$refs.itEditorMd.initEditorMd()
            },

            /**
             * 增加自定义HTML测试按钮
             */
            onAddCustomToolbar () {
                this.toolbarCustomIcons.file = '<input type="file" />'
                this.toolbarCustomIcons.faicon = `<i class="fa fa-star" onclick="alert('faicon');">点击弹框</i>`
                // 下面绑定的事件是无效的
                this.toolbarCustomIcons.custonIcon = `自定义HTML`
                this.toolbarHandlers.custonIcon = (cm, icon, cursor, selection) => {
                    console.log('onAddCustomToolbar custonIcon')
                    cm.replaceSelection('[' + selection + ':custonIcon](' + icon.html() + ')')
                }
                this.$refs.itEditorMd.initEditorMd()
            },

            /**
             * 动态更新 editor.md 的参数
             */
            onUpdateOption () {
                this.optionList.height = '200px'
                this.$refs.itEditorMd.initEditorMd()
            },

            /**
             * 动态更新值
             */
            onUpdateValue () {
                // setCursor
                const editorMd = this.$refs.itEditorMd.editorMd
                editorMd.insertValue('> 动态更新的值')
                editorMd.focus()
            }
        }
    }
</script>

<style lang="less" scoped>
    .toggle-editor-md{
        padding: 10px 0;
    }
</style>
