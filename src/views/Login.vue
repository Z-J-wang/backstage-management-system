<template>
    <div class="window-container">
        <div class="login">
            <h2 class="text-l">后台管理系统</h2>
            <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                label-width="50px"
                class="demo-ruleForm"
            >
                <el-form-item label="账号" prop="account">
                    <el-input v-model="loginForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            loginForm: {
                account: "",
                password: "",
            },
            rules: {
                account: [
                    { required: true, message: "请输入账户", trigger: "blur" },
                    {
                        max: 18,
                        min: 6,
                        message: "账户字符在6-18之间",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login(this.loginForm);
                }
            });
        },

        async login(data) {
            let res = await this.$HttpApi.login(data);
            if (res.data.code === 1000) {
                this.$Cookie.setToken(res.data.data.token);
                this.$store.commit("setAccount", { account: "admin", auth: 1 });
                this.$router.push({ name: "Home" });
            } else {
                this.$message.error(res.data.msg);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.window-container {
}
.login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 30px;
    border: 1px solid #c5c2c2;
    border-radius: 20px;
    .submit {
        width: 100%;
    }
}
</style>