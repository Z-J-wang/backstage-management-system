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
        imageUrlList: {
            type: Array,
        },
    },
    data() {
        return {
            fileList: [],
            limit: 4,
        };
    },
    watch: {
        imageUrlList(list) {
            this.fileList = [];
            list.forEach((element) => {
                this.fileList.push({
                    name: element,
                    url: `${this.$store.state.server_url}/upload/${element}`,
                });
            });
        },
    },
    mounted(){
        this.imageUrlList.forEach((element) => {
                this.fileList.push({
                    name: element,
                    url: `${this.$store.state.server_url}/upload/${element}`,
                });
            });
    },
    methods: {
        handleExceed() {
            this.$message({
                message: `一个商品只能添加${this.limit}张图片。`,
                type: "warning",
            });
        },
        handleAvatarSuccess(res, file, fileList) {
            console.log(fileList)
            console.log(res)
            fileList.forEach((element) => {
                if (element.response) {
                    element.name = element.response.data;
                    this.imageUrlList.push(element.response.data);
                }
            });
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

