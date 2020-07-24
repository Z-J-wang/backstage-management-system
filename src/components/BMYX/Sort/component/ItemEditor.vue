<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
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
                    <el-input v-model="formItem.name" placeholder="请输入分类"></el-input>
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
export default {
    name: "changeItem",
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
            action: "",
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
                this.updatedProduct(this.formItem);
                this.$emit("close");
                this.$parent.setDataList();
            }
        },

        async updatedProduct(data) {
            let ret = await this.$HttpApi.updatedSort(data);
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: "分类信息更新成功！",
                    type: "success",
                });
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