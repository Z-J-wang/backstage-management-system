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
                        @keyup.enter.native="onSubmit('form')"
                    ></el-input>
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
export default {
    name: "addNewItem",
    props: {
        visible: {
            type: Boolean,
            default: false,
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
            title: "新增一笔分类",
            formItem: {
                name: "",
            },
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