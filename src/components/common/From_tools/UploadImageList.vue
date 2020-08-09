<template>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :file-list="fileList"
        list-type="picture"
        :on-progress="handleProgress"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <el-button
            size="small"
            type="primary"
        >点击上传</el-button>
        <div
            slot="tip"
            class="el-upload__tip"
        >只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
export default {
    name: "uploadImageList",
    props: {
        action: {
            type: String,
        }
    },
    data() {
        return {
            fileList: [],
            imageUrlList:[],
        };
    },
    methods: {
        handleProgress(event, file, fileList){
            console.log(event.percent)
        },
        handleAvatarSuccess(res) {
            this.imageUrlList.push(res.data);
            console.log(this.fileList);
            this.$emit("updateImgSrcList", this.imageUrlList);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        handlePreview(file){

        },
        handleRemove(file, fileList){

        }
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;

    text-align: center;
}
.avatar {
    display: block;
}
</style>

