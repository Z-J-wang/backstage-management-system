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
                <el-form-item label="菜名" prop="name">
                    <el-input v-model="formItem.name" placeholder="请输入菜名"></el-input>
                </el-form-item>
                <el-form-item label="今天价格" prop="nowPrice">
                    <el-input v-model="formItem.nowPrice" placeholder="请输入今天价格"></el-input>
                </el-form-item>
                <el-form-item label="图片链接" prop="imgSrc">
                    <el-row>
                        <el-col :span="12">
                            <upload-image
                                :imageUrl="formItem.imgSrc"
                                :action="action"
                                width="120"
                                height="120"
                            ></upload-image>
                        </el-col>
                        <el-col :span="12">
                            <div style="text-align: left; padding-top:30px">
                                点击左侧，进行菜品图片上传
                                <br />注意，图片上传完成及图片修改完毕
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="介绍" prop="detail">
                    <el-input
                        v-model="formItem.detail"
                        type="textarea"
                        maxlength="400"
                        show-word-limit
                        placeholder="请输入博客摘要"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
import uploadImage from "@c/common/From_tools/UploadImage.vue";
import validate_rules from "./validate-rule.js";

export default {
    name: "addNewItem",
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            action: "",
            rules: validate_rules,
            title: "新增一条菜品",
            formItem: {
                name: "",
                nowPrice: "",
                imgSrc: "",
                detail: ""
            }
        };
    },
    components: {
        uploadImage
    },
    methods: {
        handleClose() {
            this.$confirm("确认关闭？")
                .then(() => {
                    this.$refs["form"].resetFields();
                    this.$emit("close");
                })
                .catch(() => {});
        },
        async onSubmit(formName) {
            let valid = await this.$refs[formName].validate();
            if (valid) {
                await this.createNewProduct(this.formItem);
                this.$emit("close");
            }
        },

        async createNewProduct(data) {
            let ret = await this.$HttpApi.createProduct(data);
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: `${ret.data.data.name} 添加成功！`,
                    type: "success"
                });
                this.$parent.setDataList()
            } else {
                this.$message.error("系统出错，请重试！");
            }
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