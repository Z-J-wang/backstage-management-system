<template>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            :style="{width:width+ 'px', height:height+ 'px'}"
        />
        <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            :style="{width:width+ 'px', height:height+ 'px', lineHeight:height+ 'px'}"
        ></i>
    </el-upload>
</template>

<script>
export default {
    name: "uploadImage",
    props: {
        imageUrl: {
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
            // imageUrl: ""
        };
    },
    updated() {
        console.log(this.imageUrl);
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
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
        }
    }
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

