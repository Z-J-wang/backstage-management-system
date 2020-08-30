<template>
    <el-upload
        class="video-uploader"
        :action="action"
        :show-file-list="false"
        :data="oldSrc"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <video
         v-if="mutablevideoUrl"
         :src="`${$store.state.server_url}/upload/${mutablevideoUrl}`"
         width="380"
         controls="controls">
         你的浏览器不支持视频播放功能
        </video>
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <i
            v-else
            class="el-icon-plus video-uploader-icon"
            :style="{width:width+ 'px', height:height+ 'px', lineHeight:height+ 'px'}"
        ></i> -->
    </el-upload>
</template>

<script>
export default {
    name: "uploadVideo",
    props: {
        videoUrl: {
            type: String
        },
        action: {
            type: String
        },
        width: {
            type: String,
            default: "178"
        },
        height: {
            type: String,
            default: "178"
        }
    },
    data() {
        return {
            mutablevideoUrl: this.videoUrl, // 上传成功的视频路径
            oldSrc:{
                oldvideoSrc: ''
            }
        };
    },
    updated(){
        this.oldSrc.oldvideoSrc = this.mutablevideoUrl;
    },
    methods: {
        handleAvatarSuccess(res) {
            this.mutablevideoUrl = res.data;
            this.$emit("updatevideoSrc", this.mutablevideoUrl);
        },
        beforeAvatarUpload(file) {
            console.log(file)
            const isJPG = file.type === "video/mp4";
            const isLt2M = file.size / 1024 / 1024 < 50;

            if (!isJPG) {
                this.$message.error("上传视频只能是 mp4 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传视频大小不能超过 50 MB!");
            }
            return isJPG && isLt2M;
        }
    }
};
</script>

<style>
.video-uploader .el-upload {
    width: 380px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.video-uploader .el-upload:hover {
    border-color: #409eff;
}
.video-uploader-icon {
    font-size: 28px;
    color: #8c939d;

    text-align: center;
}
.avatar {
    display: block;
}
</style>

