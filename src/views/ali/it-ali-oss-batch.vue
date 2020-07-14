<template>
    <component-container>
        <div slot='content'>
            <h1>这是 it-ali-oss 的批量上传示例</h1>
            <div>
                <el-upload multiple action="" :auto-upload="false" :show-file-list="false" :on-change="onChangeUpload">
                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                    <el-button @click="onStartUpload" size="small" type="success">开始上传</el-button>
                </el-upload>
            </div>
            <div class="upload-list">
                <div
                        :key="index"
                        v-for="(item, index) in batchUploadList">
                    <span class="file-name">{{ item.name }}</span>
                    <span class="file-progress-text">{{ item.total }} / {{ item.progress }}</span>
                    <span class="file-progress-animate">
                        <el-progress :percentage="item.progressValue"></el-progress>
                    </span>
                    <span class="file-action">
                        <el-button size="small" @click="onStartItem(item, index)" v-if="item.pause">开始</el-button>
                        <el-button size="small" @click="onPauseItem(item, index)" v-if="!item.pause && item.uploadIng">暂停</el-button>
                        <el-button size="small" @click="onDeleteItem(item, index)">删除</el-button>
                    </span>
                </div>
            </div>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-ali-oss-batch',
        data () {
            return {
                batchUploadList: []
            }
        },
        created () {
            // test
            // this.$log.echo(this.$aliOss, 'it-ali-oss.vue created this.$aliOss', 'log')
            this.init()
        },
        computed: {},
        methods: {
            test () {
                const fileList = [
                    {
                        name: '1.jpg',
                        size: 11111111
                    },
                    {
                        name: '2.jpg',
                        size: 222222222
                    },
                    {
                        name: '3.jpg',
                        size: 333333333
                    }
                ]
                fileList.forEach((file) => {
                    this.batchUploadList.push(this.initOssFileItem(file))
                })
            },
            init () {
                // this.$log.echo(this.Util, 'it-ali-oss init this.Util', 'log')
                // this.test()
            },

            /**
             * 批量上传，初始化每个文件的信息
             */
            initOssFileItem (file) {
                const aliOss = new this.AliOss({
                    aliConfig: {
                        accessKeyId: process.env.VUE_APP_ALI_ACCESS_KEY_ID,
                        accessKeySecret: process.env.VUE_APP_ALI_ACCESS_KEY_SECRET,
                        bucket: process.env.VUE_APP_ALI_BUCKET,
                        region: process.env.VUE_APP_ALI_REGION,
                        endpoint: process.env.VUE_APP_ALI_ENDPOINT,
                        cname: true,
                        secure: true
                    },
                    options: {
                        prefix: `common/oss/${this.$store.state.userinfo.uuid}/`
                    }
                })
                aliOss.file = file
                // aliOss.setOptions({
                //     fileUrl: file.name
                // })
                return {
                    aliOss,
                    uploadParam: {
                        partSize: 100 * 1024,
                        timeout: 12000000
                    },
                    checkpoint: '',
                    file,
                    icon () {
                        return !this.pause ? 'el-icon-video-play' : 'el-icon-video-pause'
                    },
                    name: file.name,
                    total: this.Util.byteToFormat(file.size),
                    progress: this.Util.byteToFormat(0),
                    progressValue: 0,
                    pause: false,
                    uploadIng: false,
                    uploadEnd: false,
                    uploadSuccess: false,
                    uploadError: false
                }
            },

            /**
             * 选择文件
             */
            onChangeUpload (file, fileList) {
                this.$log.echo({
                    file,
                    fileList
                }, 'it-ali-oss-batch.vue onChangeUpload file, fileList', 'log')
                this.batchUploadList.push(this.initOssFileItem(file.raw))
            },

            /**
             * 全部开始上传
             */
            onStartUpload () {
                this.batchUploadList.forEach((ossFileItem) => {
                    ossFileItem.aliOss.multipartUpload({
                        ...ossFileItem.uploadParam,
                        progress: async (percentage, checkpoint) => {
                            const progress = window.parseInt(percentage * 100)
                            ossFileItem.checkpoint = checkpoint
                            ossFileItem.progress = this.Util.byteToFormat(ossFileItem.file.size * percentage)
                            ossFileItem.progressValue = progress > 100 ? 100 : progress
                            // this.$log.echo(ossFileItem.progress, `onChangeUploadByProgress ${ossFileItem.name} progress->percentage`, 'log')
                            this.$log.echo(percentage, `onStartUpload ${ossFileItem.name} progress->percentage`, 'log')
                        }
                    }).then(({ objectName }) => {
                        ossFileItem.objectName = objectName
                        ossFileItem.uploadIng = false
                        ossFileItem.uploadSuccess = true
                    })
                    ossFileItem.uploadIng = true
                })
            },

            /**
             * 单个开始上传
             */
            onStartItem (ossFileItem, ossFileIndex) {
                ossFileItem.pause = false
                ossFileItem.aliOss.resumeUpload(ossFileItem.checkpoint, {
                    ...ossFileItem.uploadParam,
                    progress: async (percentage, checkpoint) => {
                        const progress = window.parseInt(percentage * 100)
                        ossFileItem.checkpoint = checkpoint
                        ossFileItem.progress = this.Util.byteToFormat(ossFileItem.file.size * percentage)
                        ossFileItem.progressValue = progress > 100 ? 100 : progress
                        // this.$log.echo(ossFileItem.progress, `onChangeUploadByProgress ${ossFileItem.name} progress->percentage`, 'log')
                        this.$log.echo(percentage, `onStartUpload ${ossFileItem.name} progress->percentage`, 'log')
                    }
                })
            },
            /**
             * 单个暂停上传
             */
            onPauseItem (ossFileItem, ossFileIndex) {
                ossFileItem.aliOss.cancelUpload()
                ossFileItem.pause = true
            },
            /**
             * 单个删除
             */
            onDeleteItem (ossFileItem, ossFileIndex) {
                ossFileItem.aliOss.cancelUpload()
                this.batchUploadList.splice(ossFileIndex, 1)
            },

            /**
             * 支持拖拽的方式上传图片
             * @param eleFile   element 组装后的  file 对象
             */
            onChangeUploadByDrag (eleFile) {
                this.$log.echo(eleFile, 'it-ali-oss.vue onChangeUploadByDrag eleFile', 'log')
            }
        }
    }
</script>

<style lang="less">
    .file-name{
        display: inline-block;
        width: 500px;
    }
    .file-progress-text{
        display: inline-block;
        width: 200px;
    }
    .file-progress-animate{
        display: inline-block;
        width: 300px;
    }
</style>
