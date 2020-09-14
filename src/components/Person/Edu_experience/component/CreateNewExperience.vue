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
                <el-form-item label="主题" prop="theme">
                    <el-input v-model="formItem.theme" placeholder="请输入主题"></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="dateTime">
                    <el-date-picker
                        v-model="formItem.dateTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="描述" prop="detail">
                    <el-input
                        v-model="formItem.detail"
                        type="textarea"
                        maxlength="250"
                        show-word-limit
                        placeholder="请输入描述"
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
export default {
    name: "CreateNewExperience",
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            formItem: {
                theme: "",
                dateTime: "",
                detail: "",
            },
            rules: {
                theme: [
                    { required: true, message: "请输入主题", trigger: "blur" },
                ],
                dateTime: [
                    { required: true, message: "请输入时间", trigger: "blur" },
                ],
                detail: [
                    { required: true, message: "请输入描述", trigger: "blur" },
                ],
            },
            title: "新增一条教育经历记录",
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
        onSubmit(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data = this.createExperience(this.formItem);
                    if (data) {
                        this.$message({
                            type: "success",
                            message: "新增成功",
                        });
                        this.$refs["form"].resetFields();
                        this.$emit("close");
                        this.$parent.getData();
                    }
                } else {
                    return false;
                }
            });
        },

        /***************************** ajax 操作部分 Start  *********************************/
        async createExperience(form) {
            let res = await this.$HttpApi.createExperience(form);
            let data = {};
            if (res.status === 200 && res.data.code === 1000) {
                data = res.data.data;
            } else {
                this.$message.error(res.data.msg);

                return false;
            }

            return data;
        },

        /***************************** ajax 操作部分 End  *********************************/
    },
};
</script>