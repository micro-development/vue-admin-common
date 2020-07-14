<template>
    <component-container>
        <div slot='content'>
            <h1>这是 it-ali-oss的API示例</h1>
            <el-form label-width="200px">
                <el-form-item label="显示进度条(建议大点的文件)">
                    <el-input :value="progressUpload.objectName" :disabled="true" type="textarea" class="oss-input" placeholder="随机ObjectName"></el-input>
                    <el-upload action="" multiple :auto-upload="false" :show-file-list="false" :on-change='onChangeUploadByProgress'
                        class="oss-upload-btn">
                        <el-button size="small" type="primary">选择上传文件</el-button>
                    </el-upload>
                    <div class="oss-preview-list">
                        <el-col class="oss-img-preview" :span="24" :key="ossIndex" v-for="(ossItem, ossIndex) in ossRandomUploadList">
                            <el-col :span="5">{{ ossItem.name }}</el-col>
                            <el-col :span="5">
                                <el-progress
                                    :percentage="ossItem.progressValue"
                                    status="success"
                                    class="oss-upload-progress"></el-progress>
                            </el-col>
                            <el-col :span="5">{{ ossItem.progress }} / {{ ossItem.total }}</el-col>
                            <el-col :span="5">
                                <el-button type="primary" circle :icon="ossItem.icon()" @click="onTogglePlayPause(ossIndex)"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteOssUpload(ossIndex)"></el-button>
                            </el-col>
                        </el-col>
                    </div>
                </el-form-item>
                <el-form-item label="自定义 FileUrl">
                    <el-input
                        v-model="customUpload.fileUrl"
                        class="oss-input"
                        placeholder="自定义 FileUrl">
                        <template slot="prepend">{{ ossPrefixRoot }}</template>
                    </el-input>
                    <el-switch
                        style="display: block"
                        v-model="customUpload.overwrite"
                        active-color="#ff4949"
                        inactive-color="#13ce66"
                        active-text="强行覆盖"
                        inactive-text="询问覆盖">
                    </el-switch>
                    <el-upload
                        action=""
                        :auto-upload="false"
                        :show-file-list="false"
                        accept="image/*"
                        :on-change='onChangeUploadByCustom'
                        class="oss-upload-btn">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <div>
                        <el-col
                            class="oss-img-preview"
                            :span="4">
                            <img
                                v-if="customImageUrl"
                                :src="customImageUrl"
                                class="oss-img"
                                alt="">
                        </el-col>
                    </div>
                </el-form-item>
                <el-form-item label="随机 FileUrl">
                    <el-input
                        :value="randomUpload.objectName"
                        :disabled="true"
                        class="oss-input"
                        placeholder="随机 FileUrl"></el-input>
                    <el-upload
                        drag
                        action=""
                        :auto-upload="false"
                        :show-file-list="false"
                        accept="image/*"
                        :on-change='onChangeUploadByRandom'
                        class="oss-upload-drag">
                        <img
                            v-if="randomImageUrl"
                            :src="randomImageUrl"
                            class="oss-img"
                            alt="">
                        <i class="el-icon-upload" v-if="!randomImageUrl"></i>
                        <div class="el-upload__text" v-if="!randomImageUrl">
                            将文件拖到此处，或<em>点击上传</em>
                            <br>
                            只能上传jpg/png文件，且不超过2M
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-ali-oss',
        data () {
            return {
                ossEndPoint: 'https://source.ittlr.com/',
                ossPrefixRoot: 'it-admin-common/oss-demo/',
                randomUpload: {
                    objectName: ''
                },
                ossRandomUploadList: [],
                customUpload: {
                    overwrite: true,
                    finished: false,
                    fileUrl: ''
                },
                progressUpload: {
                    total: '',
                    finishing: '',
                    progress: 0,
                    objectName: ''
                }
            }
        },
        created () {
            // test
            // this.$log.echo(this.$aliOss, 'it-ali-oss.vue created this.$aliOss', 'log')
            this.init()
        },
        computed: {
            /**
             * 随机上传组装显示的URL
             */
            randomImageUrl () {
                if (this.randomUpload.objectName) {
                    return `${this.ossEndPoint}${this.randomUpload.objectName}`
                }
                return ''
            },

            /**
             * 自定义上传组装显示的URL
             */
            customImageUrl () {
                if (this.customUpload.finished) {
                    return `${this.ossEndPoint}${this.ossPrefixRoot}${this.customUpload.fileUrl}`
                }
                return ''
            },

            /**
             * 进度条上传组装显示的URL
             */
            progressImageUrl () {
                if (this.progressUpload.objectName) {
                    return `${this.ossEndPoint}${this.progressUpload.objectName}`
                }
                return ''
            }
        },
        methods: {
            init () {
                this.$log.echo(this.Util, 'it-ali-oss init this.Util', 'log')
                this.setAliOssOption()
                this.ossRandomUploadList = []
                this.ossRandomUploadList.push(this.initOssFileItem({}))
            },

            /**
             * 批量上传，初始化每个文件的信息
             */
            initOssFileItem (file) {
                return {
                    aliOss: new this.AliOss({
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
                            prefix: 'ittlr/'
                        }
                    }),
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
             * 设置 阿里OSS 参数
             */
            setAliOssOption () {
                this.$aliOss.setOptions({
                    prefix: this.ossPrefixRoot
                })
            },

            /**
             * 进度条 显示 上传图片
             * @param eleFile   element 组装后的  file 对象
             */
            async onChangeUploadByProgress (eleFile) {
                this.$log.echo(eleFile, 'it-ali-oss.vue onChangeUploadByProgress eleFile', 'log')
                const ossFileItem = this.initOssFileItem(eleFile.raw)
                ossFileItem.aliOss.file = ossFileItem.file
                ossFileItem.aliOss.setOptions({
                    prefix: this.ossPrefixRoot
                })
                ossFileItem.aliOss.multipartUpload({
                    partSize: 100 * 1024,
                    timeout: 12000000,
                    progress: async (percentage, checkpoint) => {
                        const progress = window.parseInt(percentage * 100)
                        ossFileItem.checkpoint = checkpoint
                        ossFileItem.progress = this.Util.byteToFormat(ossFileItem.file.size * percentage)
                        ossFileItem.progressValue = progress > 100 ? 100 : progress
                        // this.$log.echo(ossFileItem.progress, `onChangeUploadByProgress ${ossFileItem.name} progress->percentage`, 'log')
                        this.$log.echo(percentage, `onChangeUploadByProgress ${ossFileItem.name} progress->percentage`, 'log')
                    }
                })
                this.ossRandomUploadList.push(ossFileItem)
                // this.progressUpload.total = this.Util.byteToFormat(eleFile.size)
                // this.$aliOss.file = eleFile.raw
                // const result = await this.$aliOss.multipartUpload({
                //     partSize: 1000 * 1024,
                //     timeout: 12000000,
                //     progress: async (percentage) => {
                //         this.$log.echo(percentage, 'onChangeUploadByProgress progress->percentage', 'log')
                //     }
                // })
                // this.progressUpload.objectName = result.objectName
                // this.$log.echo(result, 'it-ali-oss.vue onChangeUploadByProgress result', 'log')
            },

            /**
             * 暂停继续
             * @param ossIndex 当前上传文件的索引
             */
            onTogglePlayPause (ossIndex) {
                const ossItem = this.ossRandomUploadList[ossIndex]
                ossItem.pause = !ossItem.pause
                this.$set(this.ossRandomUploadList, ossIndex, ossItem)
            },

            /**
             * 删除当前正在上传的文件
             * @param ossIndex 当前上传文件的索引
             */
            onDeleteOssUpload (ossIndex) {
                /**
                 * 需要先暂停当前上传再删除
                 */
                this.ossRandomUploadList.splice(ossIndex, 1)
            },

            /**
             * 随机生成 ObjectName 上传图片
             * @param eleFile   element 组装后的  file 对象
             */
            async onChangeUploadByRandom (eleFile) {
                // this.$log.echo(eleFile, 'it-ali-oss.vue onChangeUploadByRandom eleFile', 'log')
                this.$aliOss.file = eleFile.raw
                // this.$log.echo(this.$aliOss, 'it-ali-oss.vue onChangeUploadByRandom this.$aliOss', 'log')
                const result = await this.$aliOss.multipartUpload()
                this.randomUpload.objectName = result.objectName
                this.$log.echo(result, 'it-ali-oss.vue onChangeUploadByRandom result', 'util.js')
            },

            /**
             * 自定义生成 ObjectName 上传图片
             * @param eleFile   element 组装后的  file 对象
             */
            async onChangeUploadByCustom (eleFile) {
                // this.$log.echo(eleFile, 'it-ali-oss.vue onChangeUploadByCustom eleFile', 'log')
                this.customUpload.finished = false
                if (!this.customUpload.fileUrl) {
                    this.$message.error('请输入文件URL')
                    return
                }
                if (this.customUpload.fileUrl[this.customUpload.fileUrl.length - 1] === '/') {
                    this.$message.error('文件URL不允许以斜杠结尾')
                    return
                }
                if (this.customUpload.overwrite) {
                    const checkObjectName = `${this.ossPrefixRoot}${this.customUpload.fileUrl}`
                    const isExist = await this.$aliOss.checkObject(checkObjectName)
                    if (isExist === true) {
                        this.$confirm('该文件已存在，是否强行覆盖？', '上传覆盖', {
                            confirmButtonText: '覆盖',
                            cancelButtonText: '取消',
                            type: 'danger'
                        }).then(() => {
                            this.$log.echo(isExist, '强行覆盖', 'log')
                            this.$aliOss.setOptions({
                                fileUrl: this.customUpload.fileUrl
                            })
                            this.execUpload(eleFile.raw)
                        }).catch(() => {
                            this.$log.echo(isExist, '取消覆盖', 'log')
                        })
                    }
                } else {
                    this.execUpload(eleFile.raw)
                }
            },
            async execUpload (file) {
                this.$aliOss.file = file
                // this.$log.echo(this.$aliOss, 'it-ali-oss.vue execUpload this.$aliOss', 'log')
                const result = await this.$aliOss.multipartUpload()
                this.customUpload.finished = true
                this.$log.echo(result, 'it-ali-oss.vue execUpload result', 'log')
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
    .oss-input{
        width: 70%;
        float: left;
    }
    .oss-upload-btn{
        width: 25%;
        float: right;
    }
    .oss-upload-drag{
        width: 70%;
        clear: both;
        padding-top: 20px;
        > div {
            width: 100%;
        }
        .el-upload-dragger{
            width: 100%;
        }
    }
    .oss-preview-list{
        display: inline-block;
        width: 100%;
        max-height: 200px;
        overflow: auto;
    }
    .oss-img-preview{
        position: relative;
        display: inline-block;
        .oss-img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .oss-upload-progress{
            margin-top: 13px;
        }
    }
</style>
