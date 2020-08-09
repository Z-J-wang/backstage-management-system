<template>
    <el-upload
        class="text-l"
        :action="action"
        :file-list="fileList"
        list-type="picture"
        :limit="limit"
        :on-exceed="handleExceed"
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
        },
    },
    data() {
        return {
            fileList: [],
            imageUrlList: [],
            limit: 4,
        };
    },
    methods: {
        handleExceed() {
            this.$message({
                message: `一个商品只能添加${this.limit}张图片。`,
                type: "warning",
            });
        },
        handleAvatarSuccess(res, file, fileList) {
            fileList.forEach((element) => {
                element.name = element.response.data;
            });
            this.imageUrlList.push(res.data);
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
        handleRemove(file, fileList) {
            this.$emit("delUploadImage", file.name);
        },
    },
};
</script>

<style>
</style>

