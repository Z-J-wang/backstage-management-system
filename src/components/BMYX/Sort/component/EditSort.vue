<template>
    <el-dialog
        width="30%"
        :title="title"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
    >
        <div>
            <el-form
                ref="form"
                label-width="80px"
                label-position="left"
                :rules="rules"
                :model="formItem"
            >
                <el-form-item
                    prop="name"
                    label="分类"
                >
                    <el-input
                        v-model="formItem.name"
                        placeholder="请输入分类"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="imgSrc"
                    label="图片链接"
                >
                    <el-row>
                        <el-col :span="12">
                            <upload-image
                                width="120"
                                height="120"
                                :action="action"
                                :imageUrl="formItem.imgSrc"
                                @updateImgSrc="updateImgSrc"
                            ></upload-image>
                        </el-col>
                        <el-col :span="12">
                            <div style="text-align: left; padding-top:30px">
                                点击左侧，进行图片上传<br />
                                建议：<br>
                                图片长宽比为1：1, 最好是 26 x 26。
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button @click="handleClose">取 消</el-button>
            <el-button
                type="primary"
                @click="onSubmit('form')"
            >提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import uploadImage from "@c/common/From_tools/UploadImage.vue";
export default {
    name: "EditSort",
    components: {
        uploadImage,
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        formItem: {
            type: Object,
        },
    },
    data() {
        return {
            action: this.$store.state.server_url + "/api/bmyx/uploadImage",
            cur_imgSrc: "", // 修改前的图片
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入分类",
                        trigger: "blur",
                    },
                ],
            },
            title: "修改分类",
        };
    },
    watch: {
        formItem(val) {
            this.cur_imgSrc = val.imgSrc;
            console.log(this.formItem.imgSrc);
            console.log(this.cur_imgSrc);
        },
    },
    methods: {
        /**
         * close 事件
         */
        handleClose() {
            let imgsrc = this.formItem.imgSrc;
            this.$confirm("确认关闭？")
                .then(() => {
                    console.log(imgsrc);
                    console.log(this.cur_imgSrc);
                    if (imgsrc !== this.cur_imgSrc) {
                        this.delUploadImage(imgsrc);
                    }
                    this.$refs["form"].resetFields();
                    this.$emit("close");
                })
                .catch(() => {});
        },

        /**
         * 更新图片 src
         */
        updateImgSrc(imgSrc) {
            this.formItem.imgSrc = imgSrc;
            console.log(`新增图片：${this.formItem.imgSrc}`);
        },

        /**
         * 删除图片
         */
        async delUploadImage(filename) {
            let res = await this.$HttpApi.delUploadImage(filename);
            let flat = false;
            if (res.status === 200 && res.data.code === 1000) {
                console.log(`删除图片：${this.formItem.imgSrc}`);
                flat = true;
            } else {
                console.log(`删除图片失败`);
                flat = false;
            }

            return flat;
        },

        async onSubmit(formName) {
            let valid = await this.$refs[formName].validate();
            if (valid) {
                this.updatedProduct(this.formItem);
                this.$emit("close");
                this.$parent.setDataList();
            }
        },

        async updatedProduct(data) {
            let ret = await this.$HttpApi.updatedSort(data);
            let newImgSrc = ret.data.data.rows[0].imgSrc;
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: "分类信息更新成功！",
                    type: "success",
                });
                if (newImgSrc !== this.cur_imgSrc) {
                    this.delUploadImage(this.cur_imgSrc);
                }
            } else {
                this.$message.error("系统出错，请重试！");
            }
        },
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>