<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :destroy-on-close="true"
    >
        <div>
            <el-form
                :model="formItem"
                :rules="rules"
                ref="form"
                label-width="80px"
                label-position="left"
            >
                <el-form-item label="分类" prop="name">
                    <el-input
                        v-model="formItem.name"
                        placeholder="请输入分类"
                    ></el-input>
                </el-form-item>
                <el-form-item label="图片链接" prop="imgSrc">
                    <el-row>
                        <el-col :span="12">
                            <upload-image
                                :imageUrl="formItem.imgSrc"
                                :action="action"
                                @updateImgSrc="updateImgSrc"
                                width="120"
                                height="120"
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
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click.enter="onSubmit('form')">提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import uploadImage from "@c/common/From_tools/UploadImage.vue";

export default {
    name: "CreateNewSort",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            action: this.$store.state.server_url+"/api/bmyx/uploadImage",
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入分类",
                        trigger: "blur",
                    },
                ],
            },
            title: "新增一笔分类",
            formItem: {
                name: "",
                imgSrc:""
            },
        };
    },
    components: {
        uploadImage,
    },
    methods: {
        /**
         * close 事件
         */
        handleClose() {
            this.$confirm("确认关闭？")
                .then(() => {
                    if(this.formItem.imgSrc){
                        this.delUploadImage(this.formItem.imgSrc);
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
                console.log("图片删除失败")
                flat = false;
            }

            return flat;
        },

        async onSubmit(formName) {
            let valid = await this.$refs[formName].validate();
            if (valid) {
                await this.createNewProduct(this.formItem);
                this.$refs["form"].resetFields();
                this.$emit("close");
            }
        },

        async createNewProduct(data) {
            let ret = await this.$HttpApi.createSort(data);
            if (ret.status === 200) {
                if (ret.data.code == 1000) {
                    this.$message({
                        message: `${ret.data.data.name} 添加成功！`,
                        type: "success",
                    });
                    this.$parent.setDataList();
                } else {
                    this.$message({
                        message: ret.data.msg,
                        type: "error",
                    });
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