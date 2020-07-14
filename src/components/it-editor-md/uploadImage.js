/**
 * 临时封装一下 拓展 editor.md 的图片上传，支持复制拖拽方式上传
 */
export default (Editor, options = {}, context) => {
    const customUpload = options.customUpload || function () {
        // do some
    }
    const doc = document.getElementById(Editor.id)
    doc.addEventListener('paste', function (event) {
        const clipboardData = event.clipboardData || window.clipboardData
        console.log('clipboardData', clipboardData)
        // console.log(clipboardData.getData('text/html'))
        const items = clipboardData.items
        let file = null
        if (items && items.length) {
            // 搜索剪切板items
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                // console.log('item', item)
                // const asFile = item.getAsFile()
                // console.log('asFile', asFile)
                // const asString = item.getAsString()
                // console.log('asString', asString)
                if (item.type.indexOf('image') !== -1) {
                    file = item.getAsFile()
                    break
                }
            }
        } else {
            console.warn('当前浏览器不支持')
            return
        }
        if (!file) {
            console.warn('粘贴内容非图片')
            return
        }
        // console.log('parst', file)
        customUpload.call(context || this, {
            file,
            event: 'paste'
        })
        event.preventDefault()
        event.stopPropagation()
    })
    doc.addEventListener('dragover', function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    doc.addEventListener('dragenter', function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    doc.addEventListener('drop', function (e) {
        e.preventDefault()
        e.stopPropagation()
        const files = this.files || e.dataTransfer.files
        customUpload.call(context || this, {
            files,
            event: 'drop'
        })
        // console.log('drag', files)
    })
}
