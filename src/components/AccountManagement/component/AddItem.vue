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
                <el-form-item label="账户" prop="account">
                    <el-input v-model="formItem.account" placeholder="请输入账户"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formItem.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwdAgain">
                    <el-input v-model="formItem.pwdAgain" type="password" placeholder="再次输入密码"></el-input>
                </el-form-item>
                <el-form-item label="权限等级" prop="auth">
                    <el-select v-model="formItem.auth" placeholder="请选择账户权限等级" style="width: 100%">
                        <el-option
                            v-for="item in options"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
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
import valid_rules from "./validate-rule";
export default {
    name: "addNewItem",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        let checkpwd = (rule, value, callback) => {
            if (this.formItem.password !== value) {
                callback(new Error("两次密码不一致"));
            } else {
                callback();
            }
        };
        return {
            title: "新增一个账户",
            formItem: {
                account: "",
                password: "",
                pwdAgain: "",
                auth: "",
            },
            options: [
                { code: 0, name: "超级管理员" },
                { code: 1, name: "一般管理员" },
            ],
            rules: Object.assign(valid_rules, {
                pwdAgain: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur",
                    },
                    { validator: checkpwd, trigger: "blur" },
                ],
            }),
        };
    },
    watch: {
        "formItem.auth": function (val) {
            console.log(val);
            let user_account = this.$store.state.account;
            console.log(user_account);
            if (val === 0 && user_account.auth !== 0) {
                this.$message({
                    message:
                        "你不是超级管理员，不能添加权限等级比你高的账户！！",
                    type: "warning",
                });
            }
        },
    },
    methods: {
        /**
         * close 事件
         */
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
                    delete this.formItem.pwdAgain;
                    await this.createNewProduct(this.formItem);
                    this.$refs["form"].resetFields();
                    this.$emit("close");
                }
            });
        },

        async createNewProduct(data) {
            let ret = await this.$HttpApi.createAccount(data);
            if (ret.status === 200) {
                if (ret.data.code == 1000) {
                    this.$message({
                        message: `${ret.data.data.name} 创建成功`,
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